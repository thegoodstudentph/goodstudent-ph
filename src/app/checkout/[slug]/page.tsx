"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { PAYMENT_METHODS, type PaymentMethodId } from "@/data/payment";
import { supabase } from "@/lib/supabaseClient";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [method, setMethod] = useState<PaymentMethodId>("gcash");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activeMethod = PAYMENT_METHODS.find((m) => m.id === method)!;

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(activeMethod.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available, ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !name || !email || !reference) return;
    setLoading(true);
    setError("");
    try {
      const { error: err } = await supabase.from("orders").insert([
        {
          product_slug: product.slug,
          product_name: product.name,
          price: product.price,
          buyer_name: name,
          buyer_email: email,
          payment_method: method,
          reference_number: reference,
          status: "pending_verification",
        },
      ]);
      if (err) {
        setError("Something went wrong submitting your order. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong submitting your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Product not found ────────────────────────────────────────────────
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ backgroundColor: "#0f0f0f" }}>
        <p className="font-display text-2xl font-bold mb-2">Product not found</p>
        <p className="text-white/50 mb-6">This item doesn&apos;t exist or may have been removed.</p>
        <Link href="/shop" className="btn-primary text-sm px-5 py-2.5">Back to shop</Link>
      </div>
    );
  }

  // ── Coming soon guard ────────────────────────────────────────────────
  if (product.comingSoon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ backgroundColor: "#0f0f0f" }}>
        <span className="coming-soon-pill mb-4">
          <Clock size={11} />
          Coming Soon
        </span>
        <p className="font-display text-2xl font-bold mb-2">{product.name} isn&apos;t available yet</p>
        <p className="text-white/50 mb-6 max-w-sm">We&apos;re still putting the finishing touches on this one. Check back soon!</p>
        <Link href="/shop" className="btn-primary text-sm px-5 py-2.5">Browse other products</Link>
      </div>
    );
  }

  // ── Order confirmed ──────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ backgroundColor: "#0f0f0f" }}>
        <CheckCircle size={40} style={{ color: "#7a9e87" }} className="mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">Order received! 🎉</h1>
        <p className="text-white/55 max-w-md mb-8 leading-relaxed">
          We&apos;re verifying your {activeMethod.label} payment for <strong className="text-white">{product.name}</strong>.
          You&apos;ll get an email at <strong className="text-white">{email}</strong> with your download link within 24 hours.
        </p>
        <Link href="/shop" className="btn-ghost text-sm px-5 py-2.5">Continue shopping</Link>
      </div>
    );
  }

  const Icon = product.icon;

  return (
    <div className="min-h-screen px-4 py-10 sm:py-16" style={{ backgroundColor: "#0f0f0f", color: "white" }}>
      <div className="max-w-lg mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm mb-8 text-white/40 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to shop
        </Link>

        {/* Order summary */}
        <div className="card-dark p-5 flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: product.accentColor + "1a", border: `1px solid ${product.accentColor}33` }}
          >
            <Icon size={22} style={{ color: product.accentColor }} />
          </div>
          <div className="flex-1">
            <p className="font-display font-bold">{product.name}</p>
            <p className="text-white/40 text-xs">{product.type}</p>
          </div>
          <p className="font-display font-bold text-xl" style={{ color: product.accentColor }}>
            ₱{product.price}
          </p>
        </div>

        {/* Payment method */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-white/70 mb-3">1. Pay via</p>
          <div className="flex gap-3 mb-4">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold border transition-all"
                style={
                  method === m.id
                    ? { backgroundColor: m.color + "22", borderColor: m.color + "88", color: m.color }
                    : { backgroundColor: "#1a1a1a", borderColor: "#333", color: "rgba(255,255,255,0.6)" }
                }
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="card-dark p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-white/40 mb-1">Send ₱{product.price} to</p>
              <p className="font-mono font-semibold">{activeMethod.accountNumber}</p>
              <p className="text-xs text-white/40 mt-0.5">{activeMethod.accountName}</p>
            </div>
            <button
              type="button"
              onClick={copyNumber}
              className="btn-ghost text-xs px-3 py-2 flex-shrink-0"
            >
              <Copy size={12} /> {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Buyer details */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-white/70">2. Confirm your details</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/60">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan dela Cruz"
              required
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none disabled:opacity-60"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/60">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan@email.com"
              required
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none disabled:opacity-60"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
            />
            <p className="text-xs text-white/30">We&apos;ll send your download link here.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/60">{activeMethod.label} reference number</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. 1234567890123"
              required
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none disabled:opacity-60"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
            />
            <p className="text-xs text-white/30">Found in your {activeMethod.label} receipt after sending payment.</p>
          </div>

          {error && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary justify-center py-3.5 mt-2"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Submitting…</>
            ) : (
              <>Confirm order — ₱{product.price}</>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-white/30 mt-1">
            <ShieldCheck size={12} /> Every order is checked manually before your download link is sent.
          </p>
        </form>
      </div>
    </div>
  );
}
