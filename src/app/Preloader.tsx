"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { text: "$ init portfolio --env=prod --author=mad", color: "#10b981", delay: 0 },
  { text: "  loading modules ............... [100%]", color: "rgba(255,255,255,0.55)", delay: 380 },
  { text: "  bundling assets ............... [ok]", color: "rgba(255,255,255,0.55)", delay: 680 },
  { text: "  rendering canvas .............. [ok]", color: "rgba(255,255,255,0.55)", delay: 950 },
  { text: "  connecting 3D context ......... [ok]", color: "rgba(255,255,255,0.55)", delay: 1180 },
  { text: "  loading GSAP / ScrollTrigger .. [ok]", color: "rgba(255,255,255,0.55)", delay: 1380 },
  { text: "$ launch // portfolio.chimeracompany2025.shop", color: "#8b5cf6", delay: 1680 },
];

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const unmountRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Curtain lift starts at ~2.0s, unmount after
    unmountRef.current = setTimeout(() => setDone(true), 3300);
    return () => {
      if (unmountRef.current) clearTimeout(unmountRef.current);
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader-root">
      <div className="preloader-inner">
        {/* Top-right name tag */}
        <span className="preloader-name">mad@portfolio</span>

        {/* Boot lines */}
        <div className="preloader-terminal" aria-live="polite">
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              className="preloader-line"
              style={{
                color: line.color,
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(6px)",
              }}
            >
              {line.text}
              {i === BOOT_LINES.length - 1 && visibleLines.includes(i) && (
                <span className="preloader-caret" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Load bar at bottom */}
        <div className="preloader-bar-wrap" aria-hidden="true">
          <div className="preloader-bar" />
        </div>
      </div>

      <style>{`
        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: preloader-curtain 0.85s cubic-bezier(0.77,0,0.18,1) 2.4s forwards;
        }
        @keyframes preloader-curtain {
          to { transform: translateY(-105%); }
        }

        .preloader-inner {
          width: min(640px, 90vw);
          padding: 0 20px;
          position: relative;
        }

        .preloader-name {
          position: fixed;
          top: 18px; right: 20px;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
        }

        .preloader-terminal {
          font-family: var(--font-mono), monospace;
          font-size: clamp(11px, 1.6vw, 14px);
          line-height: 2;
          letter-spacing: 0.02em;
        }

        .preloader-line {
          display: block;
          white-space: pre;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .preloader-caret {
          display: inline-block;
          width: 8px; height: 14px;
          background: #10b981;
          margin-left: 4px;
          vertical-align: middle;
          animation: pcaret 1s step-end infinite;
        }
        @keyframes pcaret {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }

        .preloader-bar-wrap {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .preloader-bar {
          height: 100%;
          background: linear-gradient(to right, #8b5cf6, #10b981, #f59e0b);
          transform: scaleX(0);
          transform-origin: left;
          animation: bar-fill 2.2s cubic-bezier(0.65,0,0.35,1) 0.1s forwards;
        }
        @keyframes bar-fill { to { transform: scaleX(1); } }

        @media (prefers-reduced-motion: reduce) {
          .preloader-root { animation: none; }
          .preloader-line { opacity: 1 !important; transform: none !important; }
          .preloader-caret { animation: none; }
          .preloader-bar { animation: none; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
