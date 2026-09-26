"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ShoppingCart, Clock } from "lucide-react";
import { PRODUCTS, type Product } from "@/data/products";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Apps · PWA", value: "apps" },
  { label: "Study Guides", value: "guides" },
  { label: "Templates", value: "templates" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;

  // Coming soon products get a simple, minimal card: just the name + a tag.
  if (product.comingSoon) {
    return (
      <div className="card-dark p-5 flex flex-col gap-4 opacity-70">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: product.accentColor + "1a",
            border: `1px solid ${product.accentColor}33`,
          }}
        >
          <Icon size={22} style={{ color: product.accentColor }} />
        </div>
        <h3 className="font-display font-bold text-base">{product.name}</h3>
        <span className="coming-soon-pill self-start">
          <Clock size={11} />
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <div className="card-dark p-5 flex flex-col gap-4 hover:border-white/30 transition-all duration-200 group relative">
      {/* Tag */}
      {product.tag && (
        <div className="absolute top-4 right-4">
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#f5c518]/10 text-[#f5c518] border border-[#f5c518]/30 font-semibold">
            {product.tag}
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: product.accentColor + "1a",
          border: `1px solid ${product.accentColor}33`,
        }}
      >
        <Icon size={22} style={{ color: product.accentColor }} />
      </div>

      {/* Type badge */}
      <span className="text-xs px-2.5 py-1 rounded-full border border-white/15 text-white/50 self-start">
        {product.type}
      </span>

      {/* Name + desc */}
      <div className="flex-1">
        <h3 className="font-display font-bold text-base mb-2">{product.name}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{product.desc}</p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-1.5">
        {product.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-white/40">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: product.accentColor }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="font-display font-bold text-2xl" style={{ color: product.accentColor }}>
          ₱{product.price}
        </span>
        <Link
          href={`/checkout/${product.slug}`}
          className="btn-primary text-sm px-4 py-2"
        >
          <ShoppingCart size={14} />
          Buy now
        </Link>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-lg tracking-tight">
            <span className="text-[#f5c518]">Good</span>
            <span className="text-white"> Student</span>
            <span className="text-[#7a9e87] text-sm font-normal ml-1">PH</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-white/60 hover:text-white text-sm transition-colors">About</Link>
            <Link href="/#how-it-works" className="text-white/60 hover:text-white text-sm transition-colors">How it works</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm py-2 px-4">Log in</Link>
            <Link href="/shop" className="btn-primary text-sm py-2 px-5">
              Shop <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
          <p className="section-label mb-3">Everything available</p>
          <h1 className="font-display text-5xl font-extrabold mb-4">The Shop</h1>
          <p className="text-white/50 text-lg max-w-xl">
            Pick what fits your study goals. One-time payment, yours forever.
          </p>
        </div>

        {/* Filter pills */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                  active === f.value
                    ? "bg-[#f5c518] text-[#0f0f0f]"
                    : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">
              <p className="font-display text-2xl mb-2">Nothing here yet</p>
              <p className="text-sm">More products coming soon!</p>
            </div>
          )}
        </div>

        {/* Payment banner */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
          <div className="card-dark p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div>
              <h3 className="font-display font-bold text-xl mb-1">
                Pay with GCash or Maya 💸
              </h3>
              <p className="text-white/50 text-sm max-w-md">
                No credit card needed. Pay the Filipino way — fast, familiar, and secure.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <div className="px-5 py-3 rounded-xl bg-[#007aff]/10 border border-[#007aff]/30 text-sm font-semibold text-blue-400">
                GCash
              </div>
              <div className="px-5 py-3 rounded-xl bg-[#7a9e87]/10 border border-[#7a9e87]/30 text-sm font-semibold text-[#7a9e87]">
                Maya
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <div className="font-display font-bold">
            <span className="text-[#f5c518]">Good</span>
            <span className="text-white"> Student</span>
            <span className="text-[#7a9e87]"> PH</span>
          </div>
          <p>© {new Date().getFullYear()} The Good Student PH</p>
          <Link href="/" className="hover:text-white transition-colors">← Back to home</Link>
        </div>
      </footer>
    </>
  );
}
