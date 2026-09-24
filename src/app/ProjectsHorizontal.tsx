"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    name: "Rexaro",
    url: "https://rexaro.xyz",
    tag: "Crypto Exchange Platform",
    desc: "Real-time crypto exchange — live rates, 15 languages, custom React dashboard.",
    img: "/rexaro.webp",
    accent: "#3b82f6",
    year: "2026",
    tags: ["Next.js", "React", "Live Rates", "i18n", "SEO"],
    stars: "247",
    forks: "18",
    status: "production",
  },
  {
    num: "02",
    name: "dental13",
    url: "https://dental13.com",
    tag: "Dental Clinic",
    desc: "Dental clinic booking site. Fast, mobile-first, built to convert.",
    img: "/dental13.webp",
    accent: "#8b5cf6",
    year: "2026",
    tags: ["WordPress", "Custom Theme", "SEO", "Booking", "Responsive"],
    stars: "91",
    forks: "6",
    status: "shipped",
  },
  {
    num: "03",
    name: "Narges Printing",
    url: "https://nargesprinting.ir",
    tag: "Print Shop",
    desc: "Static print shop site with portfolio, custom theme, and full services page.",
    img: "/nargesprinting.webp",
    accent: "#f59e0b",
    year: "2026",
    rebuild: true,
    tags: ["HTML/CSS/JS", "Custom Build", "SEO", "Portfolio"],
    stars: "64",
    forks: "4",
    status: "shipped",
  },
  {
    num: "04",
    name: "DC Tabasom",
    url: "https://dctabasom.com",
    tag: "Dental Clinic",
    desc: "Big clinic site — rebuilt from scratch with a custom WordPress theme.",
    img: "/dctabasom.webp",
    accent: "#10b981",
    year: "2026",
    rebuild: true,
    tags: ["WordPress", "Custom Theme", "SEO"],
    stars: "78",
    forks: "5",
    status: "production",
  },
  {
    num: "05",
    name: "TP Azarmehr",
    url: "https://tpazarmehr.com",
    tag: "Trading Company",
    desc: "Saffron export and mobile accessories import — custom site, dark theme, bilingual.",
    img: "/tpazarmehr.webp",
    accent: "#a855f7",
    year: "2026",
    tags: ["HTML/CSS/JS", "Custom Build", "Bilingual"],
    stars: "32",
    forks: "2",
    status: "production",
  },
];

function BrowserDot({ color }: { color: string }) {
  return <span className="proj-browser-dot" style={{ background: color }} />;
}

export default function ProjectsHorizontal() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = section.current;
    const t = track.current;
    if (!s || !t) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const getTotal = () => t.scrollWidth - window.innerWidth;

    const tween = gsap.to(t, {
      x: () => -getTotal(),
      ease: "none",
      scrollTrigger: {
        trigger: s,
        start: "top top",
        end: () => `+=${getTotal()}`,
        pin: true,
        scrub: 0.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const imgTweens = gsap.utils.toArray<HTMLElement>(".proj-img").map((img) =>
      gsap.fromTo(
        img,
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        }
      )
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      imgTweens.forEach((tw) => {
        tw.scrollTrigger?.kill();
        tw.kill();
      });
    };
  }, []);

  return (
    <section ref={section} className="relative h-screen overflow-hidden" id="projects">
      {/* Section label — file tab style */}
      <div
        className="absolute top-10 left-6 md:left-12 z-10 flex items-center gap-4"
        style={{ top: "40px" }}
      >
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(255,255,255,0.1)", borderBottom: "none",
            borderRadius: "6px 6px 0 0",
            padding: "6px 14px",
            background: "rgba(255,255,255,0.03)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span
            style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }}
          />
          <span
            style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", flexShrink: 0 }}
          />
          <span
            style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", flexShrink: 0 }}
          />
          <span style={{ marginLeft: 8 }}>projects.tsx</span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
          }}
        >
          // {projects.length} shipped — framer motion spring physics
        </span>
      </div>

      {/* Section heading */}
      <div
        className="absolute z-10 flex items-baseline gap-6"
        style={{ top: "80px", left: "24px" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          last projects
        </h2>
      </div>

      {/* Horizontal track with Framer Motion spring cards */}
      <div
        ref={track}
        className="proj-track flex items-stretch gap-5 md:gap-6 h-full px-6 md:px-12 pt-40 pb-10"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {projects.map((p) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.02,
              y: -8,
              transition: { type: "spring", stiffness: 350, damping: 22 },
            }}
            whileTap={{ scale: 0.98 }}
            className="proj-card group relative shrink-0 w-[82vw] md:w-[46vw] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "#0d0d12",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 56px ${p.accent}33, 0 0 0 1px ${p.accent}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Browser address bar */}
            <div className="proj-browser-bar">
              <div className="proj-browser-dots">
                <BrowserDot color="#ff5f57" />
                <BrowserDot color="#febc2e" />
                <BrowserDot color="#28c840" />
              </div>
              <div className="proj-browser-url-pill">
                <span className="proj-url-lock">https://</span>
                {p.url.replace("https://", "")}
              </div>
              {/* Deploy badge */}
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10,
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.3)",
                  borderRadius: 3,
                  padding: "1px 7px",
                  whiteSpace: "nowrap",
                }}
              >
                deploy ok
              </span>
            </div>

            {/* Large outlined editorial number */}
            <span className="proj-num" aria-hidden="true">{p.num}</span>

            {/* Diagonal clipped screenshot window */}
            <div className="proj-clip-window">
              <img
                src={`${process.env.NODE_ENV === "production" ? "/portfolio" : ""}${p.img}`}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="proj-img w-[100%] h-full object-cover object-top opacity-65 group-hover:opacity-90 transition-opacity duration-700"
                draggable={false}
              />
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse at 70% 30%, ${p.accent}55, transparent 60%)`,
                }}
              />
            </div>

            {/* Gradient veil behind text */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, rgba(13,13,18,0.97) 32%, rgba(13,13,18,0.72) 58%, rgba(13,13,18,0.12) 100%)",
              }}
            />

            {/* Text content */}
            <div className="relative z-10 flex flex-col justify-end p-7 md:p-10 h-full">
              {/* Repo meta line */}
              <div className="proj-meta-line mb-4">
                <span>{p.year}</span>
                {(p as any).rebuild && (
                  <span style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    color: "#f59e0b",
                    border: "1px solid rgba(245,158,11,0.35)",
                    borderRadius: 3,
                    padding: "1px 7px",
                    background: "rgba(245,158,11,0.08)",
                  }}>rebuild</span>
                )}
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <span>{p.tag.toLowerCase()}</span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <span>deploy ok</span>
                <span className="ml-auto">
                  <span className="proj-status-badge">
                    <span className="proj-status-dot" />
                    {p.status}
                  </span>
                </span>
              </div>

              {/* Project name */}
              <h3
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "clamp(2rem,4vw,3.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {p.name}
              </h3>

              <p
                className="max-w-xs text-sm mb-5 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono), monospace", fontSize: 12 }}
              >
                // {p.desc}
              </p>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((tag) => (
                  <span key={tag} className="proj-chip">[{tag}]</span>
                ))}
              </div>

              {/* URL with arrow */}
              <span
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "rgba(255,255,255,0.4)" }}
              >
                <span
                  className="group-hover:text-[#10b981] transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {p.url.replace("https://", "")}
                </span>
                <svg
                  width="11" height="11" viewBox="0 0 13 13" fill="none"
                  className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <path d="M3 10 9.5 3.5M4.5 3.5h5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
