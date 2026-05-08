'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const PATH_D =
  "M 400 0 C 400 150, 220 220, 400 420 C 580 620, 220 680, 400 900 C 580 1100, 400 1150, 400 1200";

const CARDS = [
  {
    step: "04",
    title: "It writes its own tests. Then runs them.",
    description: "Generates missing tests, runs the full suite, checks coverage. If anything fails, it loops back automatically.",
    position: "left" as const,
    active: false,
    scrollStart: 0.12,
  },
  {
    step: "05 — shipped",
    title: "Clean code lands in main. You didn't write a single test.",
    description: "Passes CI/CD, opens a PR with a plain-English summary, merges on green. Production branch stays clean, always.",
    position: "right" as const,
    active: true,
    scrollStart: 0.52,
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0);
      tl.to(dotRef.current, {
        motionPath: { path: PATH_D, align: "self", alignOrigin: [0.5, 0.5], autoRotate: false },
        ease: "none",
      }, 0);
      tl.to(bgRef.current, { y: -80, ease: "none" }, 0);

      CARDS.forEach((card, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        tl.to(el, { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.2 }, card.scrollStart);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "280vh", position: "relative" }}>
      <div ref={bgRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34,197,94,0.07) 0%, transparent 70%)" }} />

      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", top: "6vh", left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10, whiteSpace: "nowrap" }}>
          <p className="text-xs uppercase tracking-[0.25em] text-green-400/60 font-mono mb-2">Autonomous Pipeline</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white/90">How it ships</h2>
        </div>

        <svg viewBox="0 0 800 1200" style={{ position: "absolute", height: "80vh", width: "auto", left: "50%", transform: "translateX(-50%)", top: "14vh" }} preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="tlPathGlow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="tlDotGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d={PATH_D} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
          <path ref={pathRef} d={PATH_D} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" filter="url(#tlPathGlow)" />
          <circle ref={dotRef} r="8" fill="#22c55e" filter="url(#tlDotGlow)" />
        </svg>

        <div style={{ position: "absolute", height: "80vh", aspectRatio: "800 / 1200", left: "50%", transform: "translateX(-50%)", top: "14vh", pointerEvents: "none" }}>
          {CARDS.map((card, i) => (
            <div key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                position: "absolute",
                top: `${card.scrollStart * 100}%`,
                ...(card.position === "left" ? { right: "calc(50% + 44px)" } : { left: "calc(50% + 44px)" }),
                width: "clamp(200px, 24vw, 320px)",
                opacity: 0,
                transform: "translateY(28px) scale(0.95)",
                pointerEvents: "auto",
              }}
              className={`rounded-2xl p-5 flex flex-col gap-3 backdrop-blur-md bg-white/[0.04] border ${
                card.active
                  ? "border-green-500 shadow-[0_0_28px_2px_rgba(34,197,94,0.4),inset_0_0_20px_rgba(34,197,94,0.07)]"
                  : "border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
              }`}>
              <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col gap-2">
                <div className="flex gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/50" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <span className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="h-1.5 w-3/4 rounded bg-white/10" />
                <div className="h-1.5 w-1/2 rounded bg-white/[0.06]" />
                <div className="h-7 w-full rounded-lg mt-1 flex items-center px-2"
                  style={{ background: card.active ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)", border: card.active ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="h-3 w-2/3 rounded" style={{ background: card.active ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.07)" }} />
                </div>
                <div className="h-1.5 w-full rounded bg-white/[0.06]" />
                <div className="h-1.5 w-4/5 rounded bg-white/[0.04]" />
              </div>
              <span className="text-xs font-mono text-green-400/80 tracking-widest uppercase">{card.step}</span>
              <h3 className="text-white font-bold text-sm leading-snug">{card.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{card.description}</p>
              {card.active && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
                  <span className="text-green-400 text-xs font-mono">live</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
