const GRAPHIC_TYPES = [
  {
    id: "player-card",
    label: "Player Card",
    description: "Spotlight a single player with stats and style",
    preview: PlayerCardPreview,
  },
  {
    id: "game-day",
    label: "Game Day Graphic",
    description: "Announce matchups and build pregame hype",
    preview: GameDayPreview,
  },
  {
    id: "hype-card",
    label: "Hype Card",
    description: "Bold visuals for moments that matter",
    preview: HypeCardPreview,
  },
];

function PlayerCardPreview() {
  return (
    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative flex flex-col" style={{ background: "linear-gradient(160deg, #0f1628 0%, #1a1a2e 40%, #0d0d1a 100%)" }}>
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500" />

      {/* Background glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full bg-blue-500/8 blur-3xl" />

      <div className="flex-1 flex flex-col relative p-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[8px] tracking-[0.2em] text-blue-400 font-bold uppercase">Point Guard</div>
            <div className="text-[7px] text-white/25 mt-0.5 tracking-wider">2024-25 SEASON</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/5 flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-blue-400/60">
              <circle cx="10" cy="10" r="7" fill="currentColor" />
              <text x="10" y="13" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">W</text>
            </svg>
          </div>
        </div>

        {/* Player silhouette — larger, centered */}
        <div className="flex-1 flex items-end justify-center relative">
          {/* Number behind player */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[72px] font-black text-white/[0.04] leading-none select-none">
            23
          </div>
          <svg viewBox="0 0 100 150" className="w-28 h-40 relative z-10 text-white/20 drop-shadow-lg" style={{ filter: "drop-shadow(0 0 20px rgba(59,130,246,0.15))" }}>
            <ellipse cx="50" cy="22" rx="17" ry="19" fill="currentColor" />
            <path d="M22 60 Q27 42 50 42 Q73 42 78 60 L83 108 Q83 118 73 118 L27 118 Q17 118 17 108 Z" fill="currentColor" />
            <rect x="17" y="113" width="24" height="28" rx="4" fill="currentColor" />
            <rect x="59" y="113" width="24" height="28" rx="4" fill="currentColor" />
          </svg>
        </div>

        {/* Player info bar */}
        <div className="relative z-10 mt-2">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 backdrop-blur-sm">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[15px] font-extrabold text-white tracking-tight leading-none">
                  JAYLEN MITCHELL
                </div>
                <div className="text-[9px] text-blue-400/80 font-semibold mt-1 tracking-wider uppercase">
                  Wildcats Basketball
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white/90 leading-none">#23</div>
              </div>
            </div>
            {/* Stats row */}
            <div className="flex gap-4 mt-2 pt-2 border-t border-white/[0.06]">
              {[{ label: "PPG", val: "24.3" }, { label: "APG", val: "8.1" }, { label: "RPG", val: "5.7" }].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[10px] font-bold text-white/80">{s.val}</div>
                  <div className="text-[7px] text-white/30 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameDayPreview() {
  return (
    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative flex flex-col" style={{ background: "linear-gradient(180deg, #0d1117 0%, #111827 50%, #0d1117 100%)" }}>
      {/* Top accent */}
      <div className="h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-red-600" />

      {/* Background halves glow */}
      <div className="absolute top-[30%] left-[15%] w-[30%] h-[30%] rounded-full bg-blue-500/6 blur-3xl" />
      <div className="absolute top-[30%] right-[15%] w-[30%] h-[30%] rounded-full bg-red-500/6 blur-3xl" />

      {/* Header */}
      <div className="text-center pt-5 pb-1 relative z-10">
        <div className="text-[7px] tracking-[0.3em] text-red-400 font-bold uppercase">Game Day</div>
        <div className="text-[15px] font-black text-white/90 mt-1 tracking-tight">WILDCATS vs EAGLES</div>
        <div className="text-[7px] text-white/30 mt-1 tracking-widest uppercase">Fri Nov 15 · 7:00 PM EST</div>
      </div>

      {/* VS Layout */}
      <div className="flex-1 flex items-center justify-center gap-3 px-3 relative z-10">
        {/* Home */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center" style={{ boxShadow: "0 0 30px rgba(59,130,246,0.1)" }}>
            <svg viewBox="0 0 40 40" className="w-9 h-9">
              <circle cx="20" cy="20" r="16" fill="#2563eb" opacity="0.7" />
              <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">W</text>
            </svg>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold text-white/80 uppercase tracking-wide">Wildcats</div>
            <div className="text-[7px] text-white/30 font-medium">12-3 · Home</div>
          </div>
        </div>

        {/* VS badge */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
            <span className="text-[10px] font-black text-white/40">VS</span>
          </div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-16 h-16 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center" style={{ boxShadow: "0 0 30px rgba(239,68,68,0.1)" }}>
            <svg viewBox="0 0 40 40" className="w-9 h-9">
              <circle cx="20" cy="20" r="16" fill="#dc2626" opacity="0.7" />
              <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">E</text>
            </svg>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold text-white/80 uppercase tracking-wide">Eagles</div>
            <div className="text-[7px] text-white/30 font-medium">10-5 · Away</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-3 mb-3">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 flex items-center justify-between">
          <div className="text-[7px] text-white/30 tracking-wider uppercase">Memorial Arena · Portland, OR</div>
          <div className="text-[7px] text-red-400/70 font-bold tracking-wider uppercase">Live on ESPN</div>
        </div>
      </div>
    </div>
  );
}

function HypeCardPreview() {
  return (
    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative flex flex-col" style={{ background: "linear-gradient(160deg, #1a0a02 0%, #1a0a0a 40%, #0d0505 100%)" }}>
      {/* Energy lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[15, 30, 45, 60, 75].map((top, i) => (
          <div
            key={top}
            className="absolute -left-[10%] w-[130%] rotate-[-20deg]"
            style={{
              top: `${top}%`,
              height: i % 2 === 0 ? "2px" : "1px",
              background: `linear-gradient(to right, transparent 10%, rgba(234,88,12,${0.08 + i * 0.04}) 50%, transparent 90%)`,
            }}
          />
        ))}
      </div>

      {/* Top accent */}
      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-red-500" />

      {/* Big number watermark */}
      <div className="absolute top-[5%] right-[-5%] text-[100px] font-black text-white/[0.03] leading-none select-none rotate-[-10deg]">
        01
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        {/* Player silhouette — action pose with glow */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-150" />
          <svg viewBox="0 0 120 140" className="w-28 h-36 relative z-10 text-white/20" style={{ filter: "drop-shadow(0 0 15px rgba(234,88,12,0.2))" }}>
            <ellipse cx="55" cy="18" rx="15" ry="17" fill="currentColor" />
            <path d="M30 50 Q35 35 55 35 Q75 35 80 50 L88 92 Q90 102 80 102 L30 102 Q20 102 22 92 Z" fill="currentColor" />
            <path d="M80 55 L108 35" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            <path d="M30 55 L8 70" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
            <rect x="20" y="98" width="20" height="30" rx="4" fill="currentColor" transform="rotate(-5 30 113)" />
            <rect x="58" y="98" width="20" height="30" rx="4" fill="currentColor" transform="rotate(8 68 113)" />
          </svg>
        </div>

        {/* Hype text */}
        <div className="text-center">
          <div className="text-[22px] font-black text-white tracking-tight leading-none uppercase">
            BUILT
          </div>
          <div className="text-[22px] font-black text-orange-500 tracking-tight leading-none uppercase mt-0.5">
            DIFFERENT
          </div>
          <div className="text-[7px] text-white/20 tracking-[0.3em] uppercase mt-2 font-medium">
            Marcus Johnson · #7
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="relative z-10 mx-3 mb-3">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 16 16" className="w-3 h-3">
              <circle cx="8" cy="8" r="6" fill="#ea580c" opacity="0.7" />
            </svg>
            <span className="text-[7px] text-white/40 font-semibold uppercase tracking-wider">Wildcats</span>
          </div>
          <span className="text-[7px] text-orange-400/60 font-bold tracking-wider uppercase">2024</span>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500" />
    </div>
  );
}

export default function StepChoose({ onSelect }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          What are you creating?
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          Pick a format to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {GRAPHIC_TYPES.map((type) => {
          const Preview = type.preview;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className="group text-left bg-surface-raised border border-border rounded-xl p-3 pb-4
                         transition-all duration-200 cursor-pointer
                         hover:border-accent/40 hover:bg-surface-overlay
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
            >
              <div className="mb-3 rounded-lg overflow-hidden">
                <Preview />
              </div>
              <div className="px-1">
                <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-200">
                  {type.label}
                </div>
                <div className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  {type.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
