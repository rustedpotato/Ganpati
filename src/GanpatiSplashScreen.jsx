import React, { useEffect, useState } from "react";

// Total animation duration in ms (passed as prop)
const GOLD = "#D4A017";
const GOLD_BRIGHT = "#F2C94C";
const BG = "#1A0E0A";

export default function GanpatiSplashScreen({ duration = 4000, onFinish }) {
  const [phase, setPhase] = useState("drawing"); // "drawing" | "hold" | "exit"

  useEffect(() => {
    const drawTime  = duration * 0.72;
    const holdTime  = duration * 0.12;
    const t1 = setTimeout(() => setPhase("hold"), drawTime);
    const t2 = setTimeout(() => setPhase("exit"),  drawTime + holdTime);
    const t3 = setTimeout(() => onFinish?.(),       duration);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [duration, onFinish]);

  const D = (duration * 0.72) / 1000; // draw phase in seconds

  // Helper: stagger delay as a fraction of D, duration as fraction of D
  const p = (startFrac, durFrac, extraStroke = {}) => ({
    strokeDasharray: 1200,
    strokeDashoffset: 1200,
    animation: `drawPath ${(D * durFrac).toFixed(2)}s cubic-bezier(0.4,0,0.2,1) ${(D * startFrac).toFixed(2)}s forwards`,
    ...extraStroke,
  });

  const isExit = phase === "exit";

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: BG,
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999,
      opacity: isExit ? 0 : 1,
      transition: isExit ? "opacity 0.6s ease-in" : "none",
    }}>
      {/* Ambient radial glow that grows as the drawing completes */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 55% 55% at 50% 48%, rgba(212,160,23,0.08) 0%, transparent 70%)`,
        opacity: phase === "hold" || phase === "exit" ? 1 : 0,
        transition: "opacity 1.2s ease-out",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        transform: isExit ? "scale(0.96)" : "scale(1)",
        transition: isExit ? "transform 0.6s ease-in" : "none",
      }}>

        {/* Top Sanskrit chant */}
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(11px, 3vw, 15px)",
          letterSpacing: "0.14em",
          color: GOLD,
          opacity: 0.75,
          marginBottom: 4,
          textAlign: "center",
          width: "100%",
        }}>॥ श्री गणेशाय नमः ॥</div>

        {/* ── The SVG ── */}
        <svg viewBox="0 0 200 385" style={{ width: "min(72vw, 270px)", height: "auto", overflow: "visible" }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* All paths share base props via a wrapper – emulated via repeated attrs */}
          {/* ── CROWN ── */}
          <path fill="none" stroke={GOLD} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
            d="M 72 66 Q 80 52 100 48 Q 120 52 128 66 L 123 74 Q 100 68 77 74 Z"
            style={p(0, 0.07)} />
          <path fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round"
            d="M 100 48 L 100 36"
            style={p(0.03, 0.03)} />
          <path fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round"
            d="M 88 42 L 84 32 M 112 42 L 116 32"
            style={p(0.04, 0.03)} />
          {/* Crown gem */}
          <circle fill="none" stroke={GOLD_BRIGHT} strokeWidth="2" cx="100" cy="60" r="5"
            style={p(0.06, 0.02)} />

          {/* ── LEFT EAR ── */}
          <path fill="none" stroke={GOLD} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
            d="M 74 92 C 32 85, 14 108, 20 138 C 26 164, 54 172, 74 162"
            style={p(0.07, 0.11)} />
          <path fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round"
            d="M 44 115 C 32 128, 30 148, 42 160"
            style={p(0.15, 0.06)} />

          {/* ── RIGHT EAR ── */}
          <path fill="none" stroke={GOLD} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
            d="M 126 92 C 168 85, 186 108, 180 138 C 174 164, 146 172, 126 162"
            style={p(0.07, 0.11)} />
          <path fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round"
            d="M 156 115 C 168 128, 170 148, 158 160"
            style={p(0.15, 0.06)} />

          {/* ── HEAD outline ── */}
          <path fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            d="M 74 92 Q 74 72, 100 70 Q 126 72, 126 92"
            style={p(0.05, 0.05)} />
          <path fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            d="M 74 162 Q 74 192, 88 200 L 112 200 Q 126 192, 126 162"
            style={p(0.20, 0.09)} />

          {/* ── TILAK ── */}
          <path fill="none" stroke={GOLD_BRIGHT} strokeWidth="2.2" strokeLinecap="round"
            d="M 96 88 L 100 97 L 104 88"
            style={p(0.28, 0.03)} />

          {/* ── EYES ── */}
          <ellipse fill="none" stroke={GOLD} strokeWidth="2.2" cx="84" cy="114" rx="9" ry="7"
            style={p(0.30, 0.04)} />
          <ellipse fill="none" stroke={GOLD} strokeWidth="2.2" cx="116" cy="114" rx="9" ry="7"
            style={p(0.30, 0.04)} />
          {/* pupils — appear only after eyes drawn */}
          <circle fill={GOLD} cx="84" cy="114" r="3.5"
            style={{ opacity: phase === "drawing" ? 0 : 1, transition: "opacity 0.5s ease-out 0.1s" }} />
          <circle fill={GOLD} cx="116" cy="114" r="3.5"
            style={{ opacity: phase === "drawing" ? 0 : 1, transition: "opacity 0.5s ease-out 0.1s" }} />

          {/* ── TRUNK (long elegant curve) ── */}
          <path fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            d="M 96 172 C 88 182, 72 188, 66 204 C 60 220, 70 238, 84 234 C 96 230, 92 214, 80 216"
            style={p(0.34, 0.13)} />

          {/* ── TUSKS ── */}
          <path fill="none" stroke={GOLD_BRIGHT} strokeWidth="2.2" strokeLinecap="round"
            d="M 84 170 L 68 188 L 73 198"
            style={p(0.45, 0.05)} />
          <path fill="none" stroke={GOLD_BRIGHT} strokeWidth="2.2" strokeLinecap="round"
            d="M 116 170 Q 132 180, 138 200 Q 140 215, 130 218"
            style={p(0.45, 0.06)} />

          {/* ── BODY ── */}
          <path fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            d="M 86 200 C 70 210, 62 232, 66 262 C 70 286, 90 300, 100 302 C 110 300, 130 286, 134 262 C 138 232, 130 210, 114 200"
            style={p(0.48, 0.14)} />

          {/* Belly line */}
          <path fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round"
            d="M 78 240 Q 100 248, 122 240"
            style={p(0.60, 0.03)} />
          {/* Belly button */}
          <circle fill="none" stroke={GOLD} strokeWidth="2" cx="100" cy="265" r="6"
            style={p(0.62, 0.03)} />

          {/* ── LEFT ARM ── */}
          <path fill="none" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
            d="M 70 228 C 50 222, 36 234, 36 252 C 36 268, 50 276, 64 268"
            style={p(0.62, 0.09)} />
          {/* Left hand holding modak */}
          <circle fill="none" stroke={GOLD} strokeWidth="2" cx="56" cy="272" r="11"
            style={p(0.69, 0.03)} />
          <path fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round"
            d="M 50 268 Q 56 260, 62 268"
            style={p(0.71, 0.02)} />

          {/* ── RIGHT ARM ── */}
          <path fill="none" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
            d="M 130 228 C 150 222, 164 234, 164 252 C 164 268, 150 276, 136 268"
            style={p(0.62, 0.09)} />
          {/* Right hand – raised in Abhaya mudra */}
          <path fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round"
            d="M 150 255 C 158 244, 163 232, 160 222"
            style={p(0.70, 0.05)} />
          <path fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round"
            d="M 156 238 L 162 228 M 160 234 L 167 225 M 154 232 L 159 221"
            style={p(0.73, 0.03)} />

          {/* ── LEGS in lotus pose ── */}
          <path fill="none" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
            d="M 68 295 C 56 302, 46 310, 46 320 Q 72 330, 100 328 Q 128 330, 154 320 C 154 310, 144 302, 132 295"
            style={p(0.72, 0.11)} />
          <path fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"
            d="M 50 318 Q 44 328, 54 333"
            style={p(0.81, 0.03)} />
          <path fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"
            d="M 150 318 Q 156 328, 146 333"
            style={p(0.81, 0.03)} />

          {/* ── ORNAMENTS ── */}
          {/* Necklace */}
          <path fill="none" stroke={GOLD_BRIGHT} strokeWidth="1.6" strokeLinecap="round"
            d="M 84 200 Q 100 208, 116 200"
            style={p(0.83, 0.03)} />
          {/* Pendant */}
          <circle fill="none" stroke={GOLD_BRIGHT} strokeWidth="1.6" cx="100" cy="210" r="5"
            style={p(0.85, 0.02)} />
          {/* Earrings */}
          <circle fill="none" stroke={GOLD} strokeWidth="1.6" cx="28" cy="130" r="6"
            style={p(0.86, 0.02)} />
          <circle fill="none" stroke={GOLD} strokeWidth="1.6" cx="172" cy="130" r="6"
            style={p(0.86, 0.02)} />
          {/* Dhoti folds */}
          <path fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round"
            d="M 80 288 Q 100 296, 120 288"
            style={p(0.87, 0.03)} />
          <path fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round"
            d="M 84 280 Q 100 287, 116 280"
            style={p(0.89, 0.03)} />

          {/* Glow overlay on full image when "hold" */}
          <ellipse cx="100" cy="195" rx="110" ry="175"
            fill="none"
            stroke={GOLD}
            strokeWidth="1"
            opacity={phase === "hold" ? 0.15 : 0}
            style={{ transition: "opacity 1s ease-out", filter: "url(#glow)" }}
          />
        </svg>

        {/* ── Label ── */}
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(16px, 4.5vw, 22px)",
          letterSpacing: "0.06em",
          color: GOLD,
          textAlign: "center",
          width: "100%",
          opacity: phase === "drawing" ? 0 : 1,
          transform: phase === "drawing" ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}>गणपति बप्पा मोरया</div>

      {/* Inject keyframes */}
      <style>{`
        @keyframes drawPath {
          from { stroke-dashoffset: 1200; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
      </div>
    </div>
  );
}
