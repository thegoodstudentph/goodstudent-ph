"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Star, Download, Smartphone, BookOpen,
  FileText, Play, ChevronRight, Menu, X, CheckCircle,
  Zap, Shield, ArrowRight, TrendingUp,
} from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Student Planner App", price: 99, type: "PWA App", tag: "Popular", icon: Smartphone, color: "#f5c518", desc: "Stay on top of tasks, deadlines, and study schedules — right from your phone." },
  { id: 2, name: "UPCAT Prep App", price: 149, type: "PWA App", tag: "Best Seller", icon: Zap, color: "#f5c518", desc: "Practice tests and reviewers designed specifically for UPCAT coverage." },
  { id: 3, name: "Science Reviewer", price: 79, type: "PDF Guide", tag: null, icon: BookOpen, color: "#7a9e87", desc: "Compact, exam-ready science notes covering all major high school topics." },
  { id: 4, name: "Note-taking Template Pack", price: 49, type: "Template", tag: "Bestseller", icon: FileText, color: "#7a9e87", desc: "Clean, printable note templates that make studying less painful." },
];

const REVIEWS = [
  { name: "Alexa R.", school: "UST, Manila", text: "Sobrang helpful ng UPCAT app! Parang may study buddy ka 24/7. Sulit na sulit ang ₱149.", stars: 5 },
  { name: "Jomar T.", school: "UP Diliman", text: "Yung planner app changed how I study. Hindi na ako late sa deadlines. Highly recommend!", stars: 5 },
  { name: "Bea C.", school: "Ateneo de Davao", text: "Ang ganda ng note templates. Printed ko lahat and my notebooks look so clean now!", stars: 5 },
];

const STEPS = [
  { num: "01", title: "Browse the shop", desc: "Pick the app, guide, or template that fits your study needs.", icon: ShoppingBag },
  { num: "02", title: "Pay once, own it forever", desc: "One-time payment. No subscriptions, no hidden fees.", icon: Shield },
  { num: "03", title: "Download & start winning", desc: "Get instant access. Install the PWA or open the PDF right away.", icon: Download },
];

const STATS = [
  { value: "2,400+", label: "Students helped" },
  { value: "₱39", label: "Starting price" },
  { value: "6", label: "Products available" },
  { value: "5★", label: "Average rating" },
];

// ─── FADE IN HOOK ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight" style={{fontFamily:"system-ui,sans-serif"}}>
          <span style={{color:"#f5c518"}}>Good</span><span className="text-white"> Student</span><span style={{color:"#7a9e87",fontSize:"0.8rem",fontWeight:400,marginLeft:"4px"}}>PH</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-white/60 hover:text-white text-sm transition-colors">About</Link>
          <Link href="#how-it-works" className="text-white/60 hover:text-white text-sm transition-colors">How it works</Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="border border-white/30 text-white text-sm font-semibold px-5 py-2 rounded-full hover:border-white/60 hover:bg-white/5 transition-all">Log in</Link>
          <Link href="/shop" className="text-sm font-semibold px-5 py-2 rounded-full transition-all hover:opacity-90 active:scale-95 flex items-center gap-1.5" style={{backgroundColor:"#f5c518",color:"#0f0f0f"}}>
            Shop <ChevronRight size={14}/>
          </Link>
        </div>
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0f0f0f] px-4 pb-6 pt-4 flex flex-col gap-4">
          <Link href="#about" className="text-white/70 py-2" onClick={() => setOpen(false)}>About</Link>
          <Link href="#how-it-works" className="text-white/70 py-2" onClick={() => setOpen(false)}>How it works</Link>
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <Link href="/login" className="border border-white/30 text-white font-semibold px-5 py-3 rounded-full text-center hover:bg-white/5 transition-all">Log in</Link>
            <Link href="/shop" className="font-semibold px-5 py-3 rounded-full text-center" style={{backgroundColor:"#f5c518",color:"#0f0f0f"}}>Shop now</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  return (
    <section className="pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{background:"radial-gradient(circle, #f5c518 0%, transparent 70%)"}}/>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-semibold" style={{borderColor:"#f5c518"+"44",color:"#f5c518",backgroundColor:"#f5c518"+"11"}}>
            <TrendingUp size={12}/> 2,400+ Filipino students already studying smarter
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.05] mb-4" style={{fontFamily:"system-ui,sans-serif"}}>
            Study smarter.<br/>
            <span style={{color:"#f5c518"}}>Score higher.</span><br/>
            <span className="text-white/70 text-4xl sm:text-5xl font-bold">Finally make it easy.</span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-md">
            Digital apps, reviewers, and templates built for Filipino students — from ₱39. No card needed, no subscriptions. Just tools that actually work.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="font-bold text-base px-7 py-3.5 rounded-full flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg" style={{backgroundColor:"#f5c518",color:"#0f0f0f",boxShadow:"0 0 30px #f5c51844"}}>
              Browse products <ArrowRight size={16}/>
            </Link>
            <Link href="#how-it-works" className="border border-white/30 text-white font-semibold text-base px-7 py-3.5 rounded-full hover:border-white/60 hover:bg-white/5 transition-all">
              How it works
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-6">
            {["GCash accepted","Maya accepted","One-time payment"].map(t => (
              <div key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                <CheckCircle size={12} style={{color:"#7a9e87"}}/>{t}
              </div>
            ))}
          </div>
        </div>
        <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] aspect-video flex items-center justify-center group cursor-pointer hover:border-white/20 transition-colors">
            <div className="absolute inset-0" style={{background:"linear-gradient(135deg, #f5c51811 0%, #7a9e8711 100%)"}}/>
            <div className="relative z-10 flex flex-col items-center gap-3 text-white/50 group-hover:text-white transition-all">
              <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{backgroundColor:"#f5c51822",border:"1px solid #f5c51844"}}>
                <Play size={24} style={{color:"#f5c518",marginLeft:"3px"}}/>
              </div>
              <span className="text-sm">Watch demo</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/5 rounded-lg px-4 py-2 text-xs text-white/40">See how a PWA app works on your phone</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsBar() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} className={`border-y border-white/10 bg-[#1a1a1a] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl sm:text-3xl font-bold" style={{color:"#f5c518",fontFamily:"system-ui,sans-serif"}}>{s.value}</p>
            <p className="text-white/50 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
function FeaturedProducts() {
  const { ref, visible } = useFadeIn();
  return (
    <section id="products" ref={ref} className={`py-20 px-4 sm:px-6 max-w-6xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"#7a9e87"}}>What's available</p>
          <h2 className="text-4xl font-bold" style={{fontFamily:"system-ui,sans-serif"}}>Featured products</h2>
        </div>
        <Link href="/shop" className="text-sm font-semibold hover:underline hidden sm:block" style={{color:"#f5c518"}}>View all →</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRODUCTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-5 flex flex-col gap-4 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-2xl"
              style={{transitionDelay:`${i*60}ms`}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{backgroundColor:p.color+"22",border:`1px solid ${p.color}44`}}>
                <Icon size={22} style={{color:p.color}}/>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-1 rounded-full border border-white/20 text-white/60">{p.type}</span>
                {p.tag && <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{backgroundColor:"#f5c51811",color:"#f5c518",border:"1px solid #f5c51833"}}>{p.tag}</span>}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base mb-1.5" style={{fontFamily:"system-ui,sans-serif"}}>{p.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="font-bold text-xl" style={{color:p.color,fontFamily:"system-ui,sans-serif"}}>₱{p.price}</span>
                <Link href="/shop" className="text-xs font-semibold text-white/50 group-hover:text-white transition-colors" style={{}}>Get it →</Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 sm:hidden text-center">
        <Link href="/shop" className="text-sm font-semibold" style={{color:"#f5c518"}}>View all products →</Link>
      </div>
    </section>
  );
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
function Reviews() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} className={`py-16 px-4 sm:px-6 bg-[#1a1a1a] border-y border-white/10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"#7a9e87"}}>What students say</p>
          <h2 className="text-4xl font-bold" style={{fontFamily:"system-ui,sans-serif"}}>Real reviews 💬</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex gap-1">{[...Array(r.stars)].map((_,j) => <Star key={j} size={14} style={{fill:"#f5c518",color:"#f5c518"}}/>)}</div>
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div>
                <p className="font-semibold text-sm" style={{fontFamily:"system-ui,sans-serif"}}>{r.name}</p>
                <p className="text-white/40 text-xs">{r.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const { ref, visible } = useFadeIn();
  return (
    <section id="how-it-works" ref={ref} className={`py-20 px-4 sm:px-6 max-w-6xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] aspect-video flex items-center justify-center group cursor-pointer hover:border-white/20 transition-colors">
          <div className="absolute inset-0" style={{background:"linear-gradient(225deg, #7a9e8711 0%, #f5c51808 100%)"}}/>
          <div className="relative z-10 flex flex-col items-center gap-3 text-white/50 group-hover:text-white transition-all">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={24} style={{color:"white",marginLeft:"3px"}}/>
            </div>
            <span className="text-sm">How to pay & download</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"#7a9e87"}}>Simple process</p>
          <h2 className="text-4xl font-bold mb-8" style={{fontFamily:"system-ui,sans-serif"}}>
            From checkout to studying in <span style={{color:"#7a9e87"}}>3 steps</span>
          </h2>
          <div className="flex flex-col gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex gap-5 items-start group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:scale-105 transition-all">
                    <Icon size={20} style={{color:"#f5c518"}}/>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs font-mono mb-1">{step.num}</p>
                    <h3 className="font-bold mb-1" style={{fontFamily:"system-ui,sans-serif"}}>{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const { ref, visible } = useFadeIn();
  return (
    <section id="about" ref={ref} className={`py-20 px-4 sm:px-6 bg-[#1a1a1a] border-t border-white/10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:"#7a9e87"}}>Our story</p>
        <h2 className="text-4xl font-bold mb-6" style={{fontFamily:"system-ui,sans-serif"}}>
          Built by a student, <span style={{color:"#f5c518"}}>for students</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed mb-4">
          The Good Student PH started as a personal mission — to give Filipino students study tools that actually fit their lives. No dollar subscriptions. No complicated setups. Just useful digital products you can pay for with GCash.
        </p>
        <p className="text-white/45 text-base leading-relaxed">Every product is designed with one goal: help you study smarter, score higher, and stress less. Built with AI, designed for you.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {["GCash & Maya accepted","One-time payment, no subs","Works offline (PWA apps)","Instant download"].map(t => (
            <div key={t} className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle size={16} style={{color:"#7a9e87"}}/>{t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOCIALS ──────────────────────────────────────────────────────────────────
function Socials() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} className={`py-16 px-4 sm:px-6 max-w-6xl mx-auto text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:"#7a9e87"}}>Stay connected</p>
      <h2 className="text-3xl font-bold mb-6" style={{fontFamily:"system-ui,sans-serif"}}>Follow our journey</h2>
      <p className="text-white/50 mb-8 max-w-md mx-auto">Tips, product updates, and study hacks — follow us on social media.</p>
      <div className="flex justify-center gap-4 flex-wrap">
        {[{label:"TikTok",color:"#f5c518"},{label:"Instagram",color:"#7a9e87"},{label:"Facebook",color:"#7a9e87"}].map(s => (
          <a key={s.label} href="#" className="px-6 py-3 rounded-full border border-white/20 text-sm font-semibold hover:border-white/50 hover:-translate-y-1 transition-all duration-200" style={{color:s.color}}>
            @goodstudentph on {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
        <div className="font-bold" style={{fontFamily:"system-ui,sans-serif"}}>
          <span style={{color:"#f5c518"}}>Good</span><span className="text-white"> Student</span><span style={{color:"#7a9e87"}}> PH</span>
        </div>
        <p>© {new Date().getFullYear()} The Good Student PH. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav/>
      <main>
        <Hero/>
        <StatsBar/>
        <FeaturedProducts/>
        <Reviews/>
        <HowItWorks/>
        <About/>
        <Socials/>
      </main>
      <Footer/>
    </>
  );
}
