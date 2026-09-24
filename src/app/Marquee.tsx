"use client";

const items = [
  "[Next.js]", "[React]", "[Three.js]", "[R3F]", "[Python]",
  "[GSAP]", "[AI Agents]", "[SEO]", "[Bug Bounty]",
  "[Linux]", "[Docker]", "[Cloudflare]", "[TypeScript]", "[WordPress]",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="relative py-6 overflow-hidden select-none"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      data-hover
    >
      <div className="marquee-track">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="marquee-tag">{s}</span>
            <span className="marquee-sep">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
