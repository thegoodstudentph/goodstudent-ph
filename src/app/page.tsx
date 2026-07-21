"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Sparkles, BookOpen, Smartphone, FileText, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const fn = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    fn();
    const id = setInterval(fn, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const countdown = useCountdown("2026-08-14T08:00:00+08:00");
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const { error: err } = await supabase
        .from("waitlist")
        .insert([{ email }]);
      if (err) {
        if (err.code === "23505") {
          setError("You're already on the list! We'll notify you when we launch.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor:"#0f0f0f",color:"white"}}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full" style={{background:"radial-gradient(circle, #f5c51815 0%, transparent 65%)"}}/>
      </div>
      <nav className="relative z-10 px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="font-bold text-lg" style={{fontFamily:"system-ui,sans-serif"}}>
          <span style={{color:"#f5c518"}}>Good</span><span> Student</span>
          <span style={{color:"#7a9e87",fontSize:"0.8rem",fontWeight:400,marginLeft:"4px"}}>PH</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full" style={{backgroundColor:"#f5c51811",border:"1px solid #f5c51833",color:"#f5c518"}}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{backgroundColor:"#f5c518"}}/>
          Coming Soon
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <div className={`max-w-2xl w-full text-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8" style={{backgroundColor:"#f5c51811",border:"1px solid #f5c51833",color:"#f5c518"}}>
            <Sparkles size={14}/>We're building something for Filipino students
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold leading-[1.05] mb-6" style={{fontFamily:"system-ui,sans-serif"}}>
            Study smarter.<br/><span style={{color:"#f5c518"}}>Score higher.</span>
          </h1>
          <p className="text-lg mb-8" style={{color:"rgba(255,255,255,0.55)",lineHeight:1.7}}>
            The Good Student PH is launching soon — digital apps, reviewers, and templates made for Filipino students. Pay via GCash or Maya. No subscriptions.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[{icon:Smartphone,label:"PWA Study Apps"},{icon:BookOpen,label:"PDF Reviewers"},{icon:FileText,label:"Note Templates"}].map(({icon:Icon,label}) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{backgroundColor:"#1a1a1a",border:"1px solid #333",color:"rgba(255,255,255,0.6)"}}>
                <Icon size={14} style={{color:"#7a9e87"}}/>{label}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto mb-10">
            {[{value:countdown.days,label:"Days"},{value:countdown.hours,label:"Hours"},{value:countdown.minutes,label:"Mins"},{value:countdown.seconds,label:"Secs"}].map(({value,label}) => (
              <div key={label} className="rounded-2xl py-4 text-center" style={{backgroundColor:"#1a1a1a",border:"1px solid #333"}}>
                <p className="text-3xl font-bold" style={{color:"#f5c518",fontFamily:"system-ui,sans-serif"}}>{String(value).padStart(2,"0")}</p>
                <p className="text-xs mt-1" style={{color:"rgba(255,255,255,0.35)"}}>{label}</p>
              </div>
            ))}
          </div>
          {!submitted ? (
            <div className="max-w-md mx-auto mb-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={e=>{setEmail(e.target.value);setError("");}}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  className="flex-1 px-5 py-3.5 rounded-full text-sm text-white outline-none disabled:opacity-60"
                  style={{backgroundColor:"#1a1a1a",border:"1px solid #333"}}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
                  style={{backgroundColor:"#f5c518",color:"#0f0f0f"}}
                >
                  {loading ? <><Loader2 size={14} className="animate-spin"/>Saving…</> : <>Notify me <ArrowRight size={14}/></>}
                </button>
              </form>
              {error && (
                <p className="text-sm" style={{color:"#f87171"}}>{error}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-sm font-semibold mb-6 py-3.5" style={{color:"#7a9e87"}}>
              <CheckCircle size={18}/>You're on the list! We'll email you when we launch. 🎉
            </div>
          )}
          <p className="text-xs" style={{color:"rgba(255,255,255,0.25)"}}>No spam ever. Just one email when we go live.</p>
        </div>
      </main>
      <footer className="relative z-10 text-center py-6 text-xs" style={{color:"rgba(255,255,255,0.2)"}}>
        © {new Date().getFullYear()} The Good Student PH · Built with 💛 for Filipino students
      </footer>
    </div>
  );
}
