"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to Supabase auth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{backgroundColor:"#0f0f0f"}}>
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-5 pointer-events-none" style={{background:"radial-gradient(circle, #f5c518 0%, transparent 70%)"}}/>

      <div className="w-full max-w-md mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white" style={{color:"rgba(255,255,255,0.4)"}}>
          <ArrowLeft size={14}/> Back to home
        </Link>
      </div>

      <div className="w-full max-w-md rounded-2xl p-8" style={{backgroundColor:"#1a1a1a",border:"1px solid #333"}}>
        {/* Logo */}
        <div className="mb-8 text-center">
          <p className="font-bold text-2xl" style={{fontFamily:"system-ui,sans-serif"}}>
            <span style={{color:"#f5c518"}}>Good</span>
            <span className="text-white"> Student</span>
            <span style={{color:"#7a9e87",fontSize:"0.85rem",fontWeight:400,marginLeft:"4px"}}>PH</span>
          </p>
          <h1 className="font-bold text-xl mt-3 mb-1" style={{fontFamily:"system-ui,sans-serif"}}>
            {mode === "login" ? "Welcome back 👋" : "Create your account"}
          </h1>
          <p className="text-sm" style={{color:"rgba(255,255,255,0.4)"}}>
            {mode === "login" ? "Log in to access your purchases" : "Join and start studying smarter"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{color:"rgba(255,255,255,0.6)"}}>Full name</label>
              <input
                type="text"
                placeholder="Juan dela Cruz"
                className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                style={{backgroundColor:"#0f0f0f",border:"1px solid #333"}}
                onFocus={e => e.target.style.borderColor="#f5c51899"}
                onBlur={e => e.target.style.borderColor="#333"}
                required={mode === "signup"}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{color:"rgba(255,255,255,0.6)"}}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="juan@email.com"
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
              style={{backgroundColor:"#0f0f0f",border:"1px solid #333"}}
              onFocus={e => e.target.style.borderColor="#f5c51899"}
              onBlur={e => e.target.style.borderColor="#333"}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{color:"rgba(255,255,255,0.6)"}}>Password</label>
              {mode === "login" && (
                <button type="button" className="text-xs font-semibold hover:underline" style={{color:"#f5c518"}}>Forgot password?</button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white outline-none transition-colors"
                style={{backgroundColor:"#0f0f0f",border:"1px solid #333"}}
                onFocus={e => e.target.style.borderColor="#f5c51899"}
                onBlur={e => e.target.style.borderColor="#333"}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{color:"rgba(255,255,255,0.3)"}}
              >
                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {mode === "signup" && <p className="text-xs" style={{color:"rgba(255,255,255,0.3)"}}>Minimum 8 characters</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-bold py-3.5 rounded-full mt-1 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
            style={{backgroundColor:"#f5c518",color:"#0f0f0f",fontFamily:"system-ui,sans-serif"}}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin"/>{mode === "login" ? "Logging in…" : "Creating account…"}</>
            ) : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{color:"rgba(255,255,255,0.4)"}}>
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-semibold hover:underline" style={{color:"#f5c518"}}>
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>

      <p className="mt-6 text-center text-xs max-w-sm" style={{color:"rgba(255,255,255,0.2)"}}>
        By continuing, you agree to our Terms of Service. Your purchases are tied to your account email.
      </p>
    </div>
  );
}
