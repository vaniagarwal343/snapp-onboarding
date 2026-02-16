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
    <div className="w-full aspect-[3/4] bg-[#1a1a2e] rounded-lg overflow-hidden relative flex flex-col">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

      <div className="flex-1 flex flex-col items-center justify-between p-4 relative">
        {/* Team logo placeholder */}
        <div className="w-8 h-8 rounded-full bg-white/10 self-end" />

        {/* Player silhouette */}
        <div className="relative flex-1 flex items-end justify-center w-full">
          <div className="w-24 h-36 relative">
            <svg viewBox="0 0 100 150" className="w-full h-full text-white/15">
              <ellipse cx="50" cy="25" rx="18" ry="20" fill="currentColor" />
              <path
                d="M20 65 Q25 45 50 45 Q75 45 80 65 L85 110 Q85 120 75 120 L25 120 Q15 120 15 110 Z"
                fill="currentColor"
              />
              <rect x="15" y="115" width="25" height="30" rx="4" fill="currentColor" />
              <rect x="60" y="115" width="25" height="30" rx="4" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Player info */}
        <div className="w-full text-center space-y-1 mt-2">
          <div className="text-[10px] tracking-[0.2em] text-blue-400 font-semibold uppercase">
            Point Guard
          </div>
          <div className="text-base font-bold text-white tracking-tight leading-none">
            PLAYER NAME
          </div>
          <div className="text-2xl font-black text-white/20">#23</div>
        </div>
      </div>
    </div>
  );
}

function GameDayPreview() {
  return (
    <div className="w-full aspect-[3/4] bg-[#0d1117] rounded-lg overflow-hidden relative flex flex-col">
      {/* Header */}
      <div className="text-center pt-4 pb-2">
        <div className="text-[9px] tracking-[0.25em] text-red-400 font-semibold uppercase">
          Game Day
        </div>
        <div className="text-[8px] text-white/30 mt-1">FRI NOV 15 · 7:00 PM</div>
      </div>

      {/* VS Layout */}
      <div className="flex-1 flex items-center justify-center gap-4 px-4">
        {/* Home */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-500/30" />
          </div>
          <div className="text-[9px] font-semibold text-white/60 uppercase tracking-wider">
            Home
          </div>
        </div>

        {/* VS */}
        <div className="text-lg font-black text-white/10">VS</div>

        {/* Away */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-red-500/30" />
          </div>
          <div className="text-[9px] font-semibold text-white/60 uppercase tracking-wider">
            Away
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="h-10 bg-white/[0.03] border-t border-white/5 flex items-center justify-center">
        <div className="text-[8px] text-white/25 tracking-widest uppercase">
          Arena Name · City, ST
        </div>
      </div>
    </div>
  );
}

function HypeCardPreview() {
  return (
    <div className="w-full aspect-[3/4] bg-[#1a0a0a] rounded-lg overflow-hidden relative flex flex-col">
      {/* Diagonal energy lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] -left-[10%] w-[120%] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rotate-[-15deg]" />
          <div className="absolute top-[40%] -left-[10%] w-[120%] h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rotate-[-15deg]" />
          <div className="absolute top-[60%] -left-[10%] w-[120%] h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent rotate-[-15deg]" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        {/* Player silhouette - action pose */}
        <div className="w-28 h-32 relative mb-3">
          <svg viewBox="0 0 120 140" className="w-full h-full text-white/10">
            <ellipse cx="55" cy="20" rx="16" ry="18" fill="currentColor" />
            <path
              d="M30 55 Q35 38 55 38 Q75 38 80 55 L90 95 Q92 105 82 105 L28 105 Q18 105 20 95 Z"
              fill="currentColor"
            />
            <path d="M82 60 L110 40" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            <rect x="18" y="100" width="22" height="32" rx="4" fill="currentColor" />
            <rect x="58" y="100" width="22" height="32" rx="4" fill="currentColor" transform="rotate(5 69 116)" />
          </svg>
        </div>

        {/* Hype text */}
        <div className="text-center space-y-1">
          <div className="text-xl font-black text-white tracking-tight leading-none uppercase">
            Built
          </div>
          <div className="text-xl font-black text-orange-500 tracking-tight leading-none uppercase">
            Different
          </div>
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
