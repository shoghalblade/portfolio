"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBlob3D from "./HeroBlob3D";
import ProjectsHorizontal from "./ProjectsHorizontal";
import Preloader from "./Preloader";
import Marquee from "./Marquee";
import { motion } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */

const skills = [
  {
    name: "WordPress",
    file: "wordpress.config.js",
    category: "// CMS",
    span: "col-span-2",
    big: true,
    note: "10+ client sites",
    bg: "bg-[#111116]",
    viz: null,
    diff: false,
  },
  {
    name: "HTML / CSS / JS",
    file: "index.html",
    category: "// frontend",
    span: "col-span-1",
    big: false,
    note: null,
    bg: "bg-[#0e0e14]",
    viz: null,
    diff: false,
  },
  {
    name: "Python",
    file: "main.py",
    category: "// scripting",
    span: "col-span-1",
    big: false,
    note: "bots & automation",
    bg: "bg-[#111116]",
    viz: null,
    diff: true,
  },
  {
    name: "React / Next.js",
    file: "app/page.tsx",
    category: "// this site",
    span: "col-span-1 md:row-span-2",
    big: true,
    note: "SSR, R3F, GSAP",
    bg: "bg-[#0e0e14]",
    viz: null,
    diff: false,
  },
  {
    name: "AI Agent Engineering",
    file: "agents/hermes.ts",
    category: "// autonomous",
    span: "col-span-2",
    big: true,
    note: "Hermes, live agents",
    bg: "bg-[#111116]",
    viz: "orbit",
    diff: false,
  },
  {
    name: "Prompt Engineering",
    file: "prompts/system.md",
    category: "// llm ops",
    span: "col-span-1",
    big: false,
    note: null,
    bg: "bg-[#0e0e14]",
    viz: null,
    diff: false,
  },

  {
    name: "Linux / Docker",
    file: "Dockerfile",
    category: "// devops",
    span: "col-span-1",
    big: false,
    note: null,
    bg: "bg-[#0e0e14]",
    viz: "terminal",
    diff: false,
  },
  {
    name: "Bug Bounty",
    file: "recon/scan.sh",
    category: "// security",
    span: "col-span-1",
    big: false,
    note: "authorized only",
    bg: "bg-[#111116]",
    viz: null,
    diff: false,
  },
  {
    name: "SEO / Core Web Vitals",
    file: "next.config.ts",
    category: "// performance",
    span: "col-span-1",
    big: false,
    note: "SSR, meta, lighthouse",
    bg: "bg-[#0e0e14]",
    viz: null,
    diff: false,
  },
  {
    name: "Three.js",
    file: "scene/blob.glsl",
    category: "// webgl",
    span: "col-span-1",
    big: false,
    note: "WebGL / shaders",
    bg: "bg-[#0e0e14]",
    viz: null,
    diff: false,
  },
  {
    name: "Cloudflare / DNS",
    file: "wrangler.toml",
    category: "// infra",
    span: "col-span-2",
    big: true,
    note: "tunnels, workers, DNS",
    bg: "bg-[#111116]",
    viz: null,
    diff: false,
  },
  {
    name: "Node.js / Express",
    file: "server/api.ts",
    category: "// backend",
    span: "col-span-1",
    big: false,
    note: "powering Rexaro API",
    bg: "bg-[#111116]",
    viz: null,
    diff: false,
    learning: true,
  },
  {
    name: "REST APIs",
    file: "routes/index.ts",
    category: "// api",
    span: "col-span-1",
    big: false,
    note: "live rates, auth — used in Rexaro",
    bg: "bg-[#111116]",
    viz: null,
    diff: false,
    learning: true,
  },
  {
    name: "PostgreSQL",
    file: "schema.sql",
    category: "// database",
    span: "col-span-1",
    big: false,
    note: "queries & relations",
    bg: "bg-[#0e0e14]",
    viz: null,
    diff: false,
    learning: true,
  },
];

const experience = [
  {
    hash: "a3f8c2d",
    years: "2025-present",
    role: "Freelance Vibe Coder",
    detail:
      "Building client sites from scratch, setting up automation, and running security audits. Write my own code when it matters.",
    color: "#10b981",
  },
  {
    hash: "b7e1f09",
    years: "2025-present",
    role: "Bug Bounty Hunter",
    detail:
      "Finding and reporting vulnerabilities — authorized targets only.",
    color: "#8b5cf6",
  },
  {
    hash: "c2d4a81",
    years: "2023-2025",
    role: "Self-Taught Developer",
    detail:
      "Wrote my own code — WordPress sites, static pages, and Python scripts for local businesses.",
    color: "#f59e0b",
  },
  {
    hash: "d9e2b45",
    years: "2022",
    role: "Python Certification",
    detail:
      "Got certified in Python. Started building websites right after.",
    color: "#f59e0b",
  },
];

const projects = [
  { name: "Rexaro", url: "https://rexaro.xyz", tag: "Crypto Exchange" },
  { name: "dental13", url: "https://dental13.com", tag: "Dental Clinic" },
  { name: "Narges Printing", url: "https://nargesprinting.ir", tag: "Print Shop" },
  { name: "DC Tabasom", url: "https://dctabasom.com", tag: "Dental Clinic" },
  { name: "TP Azarmehr", url: "https://tpazarmehr.com", tag: "Trading Company" },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                             */
/* ------------------------------------------------------------------ */

function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i} aria-hidden="true">&nbsp;</span>
        ) : (
          <span key={i} className="hero-char inline-block" aria-hidden="true" style={{ display: "inline-block" }}>
            {char}
          </span>
        )
      )}
    </span>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bar = el.querySelector<HTMLElement>(".heading-bar");
    if (!bar) return;
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { bar.classList.add("is-visible"); return; }
    const st = ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => bar.classList.add("is-visible"),
    });
    return () => st.kill();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
      <span className="heading-bar" aria-hidden="true" />
    </div>
  );
}

function SkillViz({ type }: { type: string | null }) {
  if (!type) return null;
  if (type === "orbit") return (
    <span className="skill-viz" aria-hidden="true"><span className="skill-viz-orbit" /></span>
  );
  if (type === "bars") return (
    <span className="skill-viz" aria-hidden="true">
      <span className="skill-viz-bars"><span /><span /><span /><span /><span /></span>
    </span>
  );
  if (type === "terminal") return (
    <span className="skill-viz" aria-hidden="true"><span className="skill-viz-terminal" /></span>
  );
  return null;
}

/* Typing effect hook */
function useTypingLoop(words: string[], speed = 60, pause = 1800, deleteSpeed = 35) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay: number;

    if (!deleting && charIdx < current.length) {
      delay = speed;
      const t = setTimeout(() => setCharIdx((c) => c + 1), delay);
      return () => clearTimeout(t);
    } else if (!deleting && charIdx === current.length) {
      delay = pause;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    } else if (deleting && charIdx > 0) {
      delay = deleteSpeed;
      const t = setTimeout(() => setCharIdx((c) => c - 1), delay);
      return () => clearTimeout(t);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
  }, [charIdx, deleting, wordIdx, words, speed, pause, deleteSpeed]);

  useEffect(() => {
    setDisplay(words[wordIdx].slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return display;
}

function AboutTerminal() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; res: string }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1100),
      setTimeout(() => setStep(4), 1500),
      setTimeout(() => setStep(5), 1900),
      setTimeout(() => setStep(6), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [started]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = inputVal.trim().toLowerCase();
      if (!cmd) return;

      let res = "";
      if (cmd === "help") {
        res = "Available commands: stack, contact, clear, whoami, date, github";
      } else if (cmd === "stack") {
        res = "Next.js, React, TypeScript, Node.js, Python, PostgreSQL, GSAP, Framer Motion";
      } else if (cmd === "contact") {
        res = "Email: tornikato@gmail.com | Telegram: @mad_fekri | X: @0xkhala";
      } else if (cmd === "whoami") {
        res = "Mohammad Javad (Mad) — Web Developer & Vibe Coder";
      } else if (cmd === "date") {
        res = new Date().toUTCString();
      } else if (cmd === "github") {
        res = "https://github.com/shoghalblade/portfolio";
      } else if (cmd === "clear") {
        setHistory([]);
        setInputVal("");
        return;
      } else {
        res = `command not found: ${cmd}. Type 'help' for available commands.`;
      }

      setHistory((prev) => [...prev, { cmd: inputVal, res }]);
      setInputVal("");
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="terminal-window cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-titlebar">
        <span className="filetab-dot filetab-dot-red" aria-hidden="true" />
        <span className="filetab-dot filetab-dot-yellow" aria-hidden="true" />
        <span className="filetab-dot filetab-dot-green" aria-hidden="true" />
        <span className="terminal-title">mad@portfolio: ~ (interactive shell)</span>
      </div>
      <div className="terminal-body" aria-label="About Mad">
        <span className="t-line">
          <span className="t-prompt-user">mad</span>
          <span className="t-sep">@</span>
          <span className="t-prompt-host">portfolio</span>
          <span className="t-sep">:</span>
          <span className="t-prompt-path">~</span>
          <span className="t-sep">$ </span>
          <span className="t-prompt">
            {step >= 1 ? "whoami" : ""}
            {step === 1 && <span className="hero-typed-caret" />}
          </span>
        </span>

        {step >= 2 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-1 mt-2">
            <span className="t-line"><span className="t-key">name</span><span className="t-sep">:     </span><span className="t-str">"Mohammad Javad (Mad)"</span></span>
            <span className="t-line"><span className="t-key">role</span><span className="t-sep">:     </span><span className="t-str">"Web Developer &amp; Vibe Coder"</span></span>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-1">
            <span className="t-line"><span className="t-key">focus</span><span className="t-sep">:    </span><span className="t-str">"web development · full-stack apps · performance · security"</span></span>
            <span className="t-line"><span className="t-key">stack</span><span className="t-sep">:    </span><span className="t-val">["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL"]</span></span>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-1">
            <span className="t-line"><span className="t-key">security</span><span className="t-sep">: </span><span className="t-bool">true</span><span className="t-comment"> // bug bounty, authorized only</span></span>
            <span className="t-line"><span className="t-key">clients</span><span className="t-sep">:  </span><span className="t-num">4</span><span className="t-comment"> // active contracts, more delivered</span></span>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-1 mt-2">
            <span className="t-line t-comment"># i build websites and web apps — crypto exchanges, clinic systems, print shops.</span>
            <span className="t-line t-comment"># fast load times, clean code, things that actually work.</span>
          </motion.div>
        )}

        {/* Render Command History */}
        {history.map((item, idx) => (
          <div key={idx} className="mt-2 flex flex-col gap-1">
            <span className="t-line">
              <span className="t-prompt-user">mad</span>
              <span className="t-sep">@</span>
              <span className="t-prompt-host">portfolio</span>
              <span className="t-sep">:</span>
              <span className="t-prompt-path">~</span>
              <span className="t-sep">$ </span>
              <span style={{ color: "#fff" }}>{item.cmd}</span>
            </span>
            <span className="t-line" style={{ color: "#10b981", paddingLeft: "12px" }}>
              ➜ {item.res}
            </span>
          </div>
        ))}

        {step >= 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center gap-2">
            <span className="t-line shrink-0">
              <span className="t-prompt-user">mad</span>
              <span className="t-sep">@</span>
              <span className="t-prompt-host">portfolio</span>
              <span className="t-sep">:</span>
              <span className="t-prompt-path">~</span>
              <span className="t-sep">$ </span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none border-none text-white font-mono text-sm w-full caret-[#10b981]"
              style={{ fontSize: "16px" }}
              placeholder="type 'help'..."
              autoFocus={false}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const hero = useRef<HTMLDivElement>(null);
  const aboutSection = useRef<HTMLElement>(null);
  const aboutGhost = useRef<HTMLSpanElement>(null);
  const timelineSection = useRef<HTMLDivElement>(null);
  const timelineBorderRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sId) => {
      const el = document.getElementById(sId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sId);
          }
        },
        {
          root: null,
          rootMargin: "-15% 0px -50% 0px",
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  useEffect(() => {
    if (!navBarRef.current) return;
    const activeEl = navBarRef.current.querySelector<HTMLElement>(".nav-tab.active");
    if (activeEl) {
      navBarRef.current.scrollTo({
        left: activeEl.offsetLeft - navBarRef.current.offsetWidth / 2 + activeEl.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  const typedText = useTypingLoop(
    ["Vibe Coder", "Web Developer", "Bug Bounty Hunter"],
    65, 1800, 38
  );

  useEffect(() => setLoaded(true), []);

  /* Hero GSAP */
  useEffect(() => {
    if (!hero.current) return;
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".hero-char, .hero-sub, .hero-cta, .hero-scroll", { opacity: 1, y: 0, rotationZ: 0 });
      } else {
        gsap.fromTo(".hero-char",
          { y: 60, opacity: 0, rotationZ: 8, transformOrigin: "50% 100%" },
          { y: 0, opacity: 1, rotationZ: 0, stagger: 0.022, duration: 0.85, ease: "power4.out", delay: 1.8 }
        );
        gsap.fromTo(".hero-sub", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.5 });
        gsap.fromTo(".hero-cta", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 2.75 });
        gsap.fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out", delay: 3.1 });
        gsap.to(".hero-bg", {
          scale: 1.12, opacity: 0.3,
          scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.fromTo(".hero-ghost-text",
          { xPercent: -10 },
          { xPercent: 10, ease: "none",
            scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true } }
        );
      }
    }, hero);
    return () => ctx.revert();
  }, [loaded]);

  /* About parallax */
  useEffect(() => {
    if (!aboutGhost.current || !aboutSection.current) return;
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const tween = gsap.fromTo(aboutGhost.current, { yPercent: 15 }, {
      yPercent: -15, ease: "none",
      scrollTrigger: { trigger: aboutSection.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [loaded]);

  /* Experience timeline border */
  useEffect(() => {
    const border = timelineBorderRef.current;
    const section = timelineSection.current;
    if (!border || !section) return;
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const st = ScrollTrigger.create({
      trigger: section, start: "top 70%", end: "bottom 30%",
      onEnter: () => border.classList.add("in-view"),
      onLeave: () => border.classList.remove("in-view"),
      onEnterBack: () => border.classList.add("in-view"),
      onLeaveBack: () => border.classList.remove("in-view"),
    });
    return () => st.kill();
  }, [loaded]);

  /* Shared fade-up data-reveal */
  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { gsap.set("[data-reveal]", { opacity: 1, y: 0 }); return; }
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const triggers = els.map((el) =>
      gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } })
    );
    return () => { triggers.forEach((tw) => { tw.scrollTrigger?.kill(); tw.kill(); }); };
  }, [loaded]);

  /* ---------------------------------------------------------------- */
  /*  RENDER                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <main className="relative">

      {/* ============ CODE CANVAS BACKGROUND ============ */}
      <div className="code-canvas-bg" aria-hidden="true">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />

        {/* Decorative faint syntax tokens scattered on background */}
        {[
          { cls: "tk-keyword",  text: 'const deploy = async () => {', top: "8%",  left: "2%"   },
          { cls: "tk-string",   text: '"portfolio.chimeracompany2025.shop"', top: "12%", left: "68%"  },
          { cls: "tk-function", text: 'function buildExperience(mad) {', top: "22%", left: "78%"  },
          { cls: "tk-comment",  text: '// vibe coded by mad_fekri',  top: "32%", left: "5%"   },
          { cls: "tk-keyword",  text: 'import * as THREE from "three"',  top: "45%", left: "72%"  },
          { cls: "tk-string",   text: '"autonomous agents ready"',   top: "55%", left: "3%"   },
          { cls: "tk-function", text: 'gsap.to(hero, { opacity: 1 })',  top: "68%", left: "80%"  },
          { cls: "tk-keyword",  text: 'export default function Mad() {', top: "78%", left: "65%"  },
          { cls: "tk-string",   text: '"bug bounty: authorized only"',  top: "92%", left: "2%"   },
        ].map((t, i) => (
          <span
            key={i}
            className={`syntax-token ${t.cls}`}
            style={{ top: t.top, left: t.left }}
          >
            {t.text}
          </span>
        ))}
      </div>

      <Preloader />
      <div className="grain" aria-hidden />

      {/* ============ NAV — editor tab bar ============ */}
      <nav ref={navBarRef} className="nav-bar" aria-label="Site navigation">
        <div className="nav-tabs">
          {[
            { label: "about.tsx", href: "#about", id: "about" },
            { label: "skills.json", href: "#skills", id: "skills" },
            { label: "projects.tsx", href: "#projects", id: "projects" },
            { label: "experience.log", href: "#experience", id: "experience" },
            { label: "contact.sh", href: "#contact", id: "contact" },
          ].map((tab) => (
            <a
              key={tab.label}
              href={tab.href}
              className={`nav-tab ${activeSection === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="nav-status">
          <span className="nav-branch">main*</span>
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section
        ref={hero}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-10"
        id="hero"
      >
        {/* Ghost watermark — mono style */}
        <div className="hero-ghost" aria-hidden="true">
          <span className="hero-ghost-text">MAD</span>
        </div>

        {/* 3D scene */}
        <div className="hero-bg">
          <div className="hero-glow-1" />
          <div className="hero-glow-2" />
          <div className="absolute inset-0">
            {loaded && <HeroBlob3D />}
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(10,10,10,0.75), rgba(10,10,10,0.92) 45%, #0a0a0a 70%)",
            }}
          />
        </div>

        {/* Headline */}
        <h1
          className="max-w-6xl w-full text-white font-bold tracking-tight leading-[1.05] text-[clamp(2.6rem,5vw,5rem)]"
          aria-label="I Write Code. You Ship."
        >
          <SplitChars text="I Write Code." />
        </h1>
        <h1
          className="max-w-6xl w-full font-bold tracking-tight leading-[1.05] text-[clamp(2.6rem,5vw,5rem)]"
          aria-label="You Ship."
        >
          <SplitChars text="You Ship." />
          &nbsp;
          <span
            className="gradient-pill align-middle mx-1"
            style={{ height: "0.65em", width: "1.4em", verticalAlign: "middle" }}
            aria-hidden="true"
          />
        </h1>

        {/* Typed subtitle */}
        <div className="hero-sub mt-8 opacity-0 flex flex-col items-center gap-3">
          <div className="hero-typed-line">
            <span className="hero-typed-prefix">mad@portfolio:~$</span>
            <span aria-live="polite" aria-label="role">{typedText}</span>
            <span className="hero-typed-caret" aria-hidden="true" />
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
            // websites, crypto platforms, clinic sites — shipped and live
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-cta mt-10 flex gap-4 opacity-0 flex-wrap justify-center">
          <a href="#projects" className="hero-cta-primary">
            view work
          </a>
          <a href="mailto:tornikato@gmail.com" className="hero-cta-secondary">
            <span style={{ color: "rgba(255,255,255,0.35)", marginRight: 4 }}>--contact</span>
            get in touch
          </a>
        </div>

        {/* VS Code status bar at hero bottom */}
        <div className="vscode-statusbar">
          <div className="vscode-statusbar-item">
            <span className="vscode-live-dot" aria-hidden="true" />
            portfolio live
          </div>
          <div className="vscode-statusbar-item">main*</div>
          <div className="vscode-statusbar-item">UTF-8</div>
          <div className="vscode-statusbar-item">TypeScript</div>
          <div className="vscode-statusbar-item" style={{ marginLeft: "auto" }}>Ln 1, Col 1</div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll opacity-0" style={{ bottom: "36px" }}>
          <span className="hero-scroll-label">scroll</span>
          <span
            style={{
              display: "block",
              width: "1px", height: "40px",
              background: "linear-gradient(to bottom, rgba(139,92,246,0.6), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee />

      {/* ============ ABOUT — terminal window ============ */}
      <section
        ref={aboutSection}
        id="about"
        className="py-32 md:py-48 px-6 relative overflow-hidden"
        data-reveal
      >
        <span ref={aboutGhost} className="about-ghost" aria-hidden="true">
          WHOAMI
        </span>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* File tab header */}
          <div className="mb-0">
            <div className="section-filetab">
              <span className="filetab-dot filetab-dot-red" aria-hidden="true" />
              <span className="filetab-dot filetab-dot-yellow" aria-hidden="true" />
              <span className="filetab-dot filetab-dot-green" aria-hidden="true" />
              <span style={{ marginLeft: 8 }}>about.tsx</span>
            </div>
          </div>
          <div className="section-tab-rule" />

          {/* Terminal window */}
          <AboutTerminal />
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="py-32 md:py-48 px-6" id="skills" data-reveal>
        <div className="max-w-5xl mx-auto">
          {/* File tab */}
          <div className="flex items-end gap-0 mb-0">
            <div className="section-filetab">
              <span className="filetab-dot filetab-dot-red" aria-hidden="true" />
              <span className="filetab-dot filetab-dot-yellow" aria-hidden="true" />
              <span className="filetab-dot filetab-dot-green" aria-hidden="true" />
              <span style={{ marginLeft: 8 }}>skills.json</span>
            </div>
          </div>
          <div className="section-tab-rule" />

          <div className="mb-10">
            <SectionHeading className="inline-flex flex-col items-start">
              <h2 className="section-heading-mono">skills</h2>
            </SectionHeading>
            <p className="section-comment mt-2">// full-stack plus autonomous systems — an unusual combination</p>
          </div>

          <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[minmax(110px,auto)]">
            {skills.map((s, i) => {
              const directions = [
                { x: -70, y: -50, rotate: -4 },
                { x: 0, y: 90, rotate: 3 },
                { x: 80, y: -60, rotate: 5 },
                { x: -60, y: 70, rotate: -3 },
              ];
              const dir = directions[i % directions.length];

              return (
                <motion.div
                  key={s.name}
                  className={`${s.span} bento-wrapper rounded-xl`}
                  initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                    delay: (i % 4) * 0.07,
                  }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                <div
                  className={`
                    rounded-xl border p-5 flex flex-col justify-end gap-1 group
                    transition-colors duration-500 overflow-hidden relative h-full
                    ${s.bg} border-white/[0.07] hover:border-white/20 hover:bg-white/[0.02]
                  `}
                >
                  {/* Hover glow */}
                  <span className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#10b981] opacity-0 group-hover:opacity-30 transition-opacity duration-700" style={{ filter: "blur(24px)" }} />

                  {/* Micro-viz */}
                  <SkillViz type={s.viz ?? null} />

                  {/* Diff lines for Python card */}
                  {s.diff && (
                    <div className="absolute top-14 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
                      <span className="diff-line diff-del">- import time; time.sleep(9999)</span>
                      <span className="diff-line diff-add">+ import asyncio; await ship()</span>
                      <span className="diff-line diff-ctx">  # no sleep, only grind</span>
                    </div>
                  )}

                  {/* File header */}
                  <div className="skill-file-header">
                    <span className="skill-file-icon">{"{}"}</span>
                    <span>{s.file}</span>
                  </div>

                  {/* Category comment */}
                  <span className="skill-category">
                    {s.category}
                  </span>

                  {/* Skill name */}
                  <div className="skill-name-wrap">
                    <span
                      className={`skill-name-inner font-semibold tracking-tight font-mono ${
                        s.big ? "text-lg md:text-xl" : "text-sm md:text-base"
                      }`}
                    >
                      {s.name}
                    </span>
                    {(s as any).learning && (
                      <span style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 9,
                        color: "#f59e0b",
                        border: "1px solid rgba(245,158,11,0.3)",
                        borderRadius: 3,
                        padding: "1px 6px",
                        background: "rgba(245,158,11,0.07)",
                        marginLeft: 8,
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                      }}>learning</span>
                    )}
                    <span
                      className="skill-underline"
                      style={undefined}
                    />
                  </div>

                  {s.note && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "10px",
                        color: "rgba(139,92,246,0.7)",
                      }}
                    >
                      // {s.note}
                    </span>
                  )}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <ProjectsHorizontal />

      {/* ============ EXPERIENCE ============ */}
      <section className="py-32 md:py-48 px-6" id="experience" data-reveal>
        <div className="max-w-3xl mx-auto">
          {/* File tab */}
          <div className="flex items-end gap-0 mb-0">
            <div className="section-filetab">
              <span className="filetab-dot filetab-dot-red" aria-hidden="true" />
              <span className="filetab-dot filetab-dot-yellow" aria-hidden="true" />
              <span className="filetab-dot filetab-dot-green" aria-hidden="true" />
              <span style={{ marginLeft: 8 }}>experience.log</span>
            </div>
          </div>
          <div className="section-tab-rule" />

          <SectionHeading className="mb-14">
            <h2 className="section-heading-mono">
              git log --author=mad
            </h2>
          </SectionHeading>

          <div ref={timelineSection} className="relative pl-10 space-y-14">
            <div ref={timelineBorderRef} className="git-graph-line" />
            {experience.map((e, i) => (
              <motion.div
                key={e.hash}
                className="relative group"
                initial={{ opacity: 0, x: 45, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
                  delay: i * 0.15,
                }}
              >
                {/* Git node dot */}
                <motion.span
                  className="git-node"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: i * 0.15 + 0.1 }}
                  style={{
                    top: "4px",
                    background: e.color,
                    boxShadow: `0 0 12px ${e.color}88`,
                  }}
                />

                {/* Commit meta line */}
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="commit-hash">#{e.hash}</span>
                  <span className="commit-arrow">--&gt;</span>
                  <span className="commit-date">{e.years}</span>
                  <span
                    className="inline-flex items-center gap-5 border border-white/10 rounded-sm px-2 py-0.5 font-mono text-[10px]"
                    style={{ color: e.color, borderColor: `${e.color}33`, background: `${e.color}0a` }}
                  >
                    <span
                      style={{ width: 5, height: 5, borderRadius: "50%", background: e.color, display: "inline-block", boxShadow: `0 0 4px ${e.color}` }}
                    />
                    {i === 0 ? "HEAD" : i === 1 ? "main" : "stable"}
                  </span>
                </div>

                <div className="commit-role">{e.role}</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-mono)", maxWidth: "480px" }}>
                  // {e.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="py-32 md:py-56 px-6 text-center" id="contact" data-reveal>
        {/* File tab */}
        <div className="flex items-end justify-center gap-0 mb-0">
          <div className="section-filetab">
            <span className="filetab-dot filetab-dot-red" aria-hidden="true" />
            <span className="filetab-dot filetab-dot-yellow" aria-hidden="true" />
            <span className="filetab-dot filetab-dot-green" aria-hidden="true" />
            <span style={{ marginLeft: 8 }}>contact.sh</span>
          </div>
        </div>
        <div className="section-tab-rule" style={{ maxWidth: 540, margin: "0 auto 40px" }} />

        <p className="section-comment mb-4">// available for work — freelance &amp; collaborations worldwide</p>

        <SectionHeading className="inline-flex flex-col items-center mb-10">
          <h2
            className="section-heading-mono"
            style={{
              fontSize: "clamp(2rem,5.5vw,4.5rem)",
              background: "linear-gradient(to right, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            &gt; contact --send
          </h2>
        </SectionHeading>

        {/* Command palette */}
        <div className="cmd-palette" style={{ margin: "0 auto 40px" }}>
          <div className="cmd-palette-header">
            <span className="cmd-prompt-sym">&gt;</span>
            <span>command palette</span>
            <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.5 }}>esc to close</span>
          </div>
          <div className="cmd-input-line">
            <span style={{ color: "#10b981" }}>&gt;</span>
            <span>contact --send --to=mad</span>
            <span className="cmd-cursor" aria-hidden="true" />
          </div>
          {/* Social chips as command results */}
          <div style={{ padding: "12px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
            <a
              href="mailto:tornikato@gmail.com"
              className="terminal-chip"
              aria-label="Send email"
            >
              <span className="terminal-chip-label">email</span>
              <span>tornikato@gmail.com</span>
            </a>
            <a
              href="https://t.me/mad_fekri"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-chip"
              aria-label="Telegram"
            >
              <span className="terminal-chip-label">telegram</span>
              <span>@mad_fekri</span>
            </a>
            <a
              href="https://x.com/0xkhala"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-chip"
              aria-label="Twitter"
            >
              <span className="terminal-chip-label">twitter</span>
              <span>@0xkhala</span>
            </a>

          </div>
          <div style={{ padding: "10px 18px", borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            3 results — press Enter to open
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="pt-16 pb-12 px-8 md:px-16">
        <div className="footer-top-border mb-12" />
        <div className="max-w-6xl mx-auto">
          <span className="footer-wordmark" aria-label="Mad">MAD</span>

          <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span style={{ color: "#10b981" }}>const</span>{" "}
                <span style={{ color: "#8b5cf6" }}>author</span>{" "}
                <span style={{ color: "rgba(255,255,255,0.3)" }}>=</span>{" "}
                <span style={{ color: "#f59e0b" }}>"Mohammad Javad"</span>
              </p>
              <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
                // built with Next.js · Three.js · GSAP — &copy; {new Date().getFullYear()} all rights reserved
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-10 gap-y-3 font-mono" aria-label="Projects">
              {projects.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col"
                >
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    <span className="group-hover:text-[#10b981] transition-colors duration-300">
                      {p.name}
                    </span>
                  </span>
                  <span className="text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>
                    // {p.tag.toLowerCase()}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
