import { useState, useMemo } from "react";

const STYLES = [
  { id: "clean", label: "Clean" },
  { id: "bold", label: "Bold" },
  { id: "vintage", label: "Vintage" },
];

const COLOR_PRESETS = [
  { id: "blue", primary: "#2563eb", secondary: "#1e40af", bg: "#0f1628", name: "Blue" },
  { id: "red", primary: "#dc2626", secondary: "#991b1b", bg: "#1a0f0f", name: "Red" },
  { id: "green", primary: "#16a34a", secondary: "#166534", bg: "#0f1a12", name: "Green" },
  { id: "purple", primary: "#9333ea", secondary: "#6b21a8", bg: "#150f1f", name: "Purple" },
  { id: "orange", primary: "#ea580c", secondary: "#c2410c", bg: "#1a120a", name: "Orange" },
  { id: "gold", primary: "#d4a843", secondary: "#a37e2c", bg: "#1a170f", name: "Gold" },
];

function PlayerSilhouette({ color, style }) {
  const glow = style === "bold" ? 0.25 : style === "vintage" ? 0.1 : 0.15;
  return (
    <svg viewBox="0 0 200 300" className="w-full h-full" style={{ filter: `drop-shadow(0 0 30px ${color}${Math.round(glow * 255).toString(16).padStart(2, "0")})` }}>
      <ellipse cx="100" cy="45" rx="32" ry="36" fill="white" fillOpacity={style === "vintage" ? 0.15 : 0.2} />
      <path d="M45 120 Q55 85 100 85 Q145 85 155 120 L165 220 Q167 235 152 235 L48 235 Q33 235 35 220 Z" fill="white" fillOpacity={style === "vintage" ? 0.15 : 0.2} />
      <rect x="35" y="230" width="45" height="55" rx="8" fill="white" fillOpacity={style === "vintage" ? 0.12 : 0.18} />
      <rect x="120" y="230" width="45" height="55" rx="8" fill="white" fillOpacity={style === "vintage" ? 0.12 : 0.18} />
    </svg>
  );
}

function PlayerCardPreview({ style, colorScheme, fields, files }) {
  const playerUrl = useMemo(() => files.player ? URL.createObjectURL(files.player) : null, [files.player]);
  const logoUrl = useMemo(() => files.logo ? URL.createObjectURL(files.logo) : null, [files.logo]);

  const name = fields.playerName || "PLAYER NAME";
  const number = fields.number || "00";
  const position = fields.position || "POSITION";
  const team = fields.teamName || "TEAM NAME";

  const isBold = style === "bold";
  const isVintage = style === "vintage";

  return (
    <div
      className="w-full aspect-[4/5] rounded-xl overflow-hidden relative flex flex-col"
      style={{
        background: isVintage
          ? `linear-gradient(170deg, ${colorScheme.bg} 0%, #1a1814 60%, #12100d 100%)`
          : `linear-gradient(160deg, ${colorScheme.bg} 0%, #111118 50%, #0a0a10 100%)`,
      }}
    >
      {/* Top accent bar */}
      <div
        className={isBold ? "h-2" : "h-1"}
        style={{ background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})` }}
      />

      {/* Vintage texture overlay */}
      {isVintage && (
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='white'/%3E%3C/svg%3E\")", backgroundSize: "6px 6px" }} />
      )}

      {/* Background number watermark */}
      <div
        className="absolute top-[10%] right-[-8%] leading-none select-none pointer-events-none"
        style={{
          fontSize: "180px",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: `2px ${colorScheme.primary}${isBold ? "12" : "08"}`,
          opacity: isBold ? 1 : 0.7,
        }}
      >
        {number}
      </div>

      {/* Background glow */}
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[35%] rounded-full blur-3xl"
        style={{ backgroundColor: `${colorScheme.primary}${isBold ? "12" : "08"}` }}
      />

      <div className="flex-1 flex flex-col relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div
              className="font-bold uppercase"
              style={{
                fontSize: isBold ? "11px" : "9px",
                letterSpacing: isVintage ? "0.15em" : "0.2em",
                color: colorScheme.primary,
                fontStyle: isVintage ? "italic" : "normal",
              }}
            >
              {position}
            </div>
            {isVintage && (
              <div className="text-[7px] text-white/20 mt-0.5 tracking-wider italic">Est. 2024</div>
            )}
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `${colorScheme.primary}15`,
              border: `1px solid ${colorScheme.primary}25`,
            }}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-6 h-6 object-contain" style={{ filter: isVintage ? "sepia(30%)" : "none" }} />
            ) : (
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: `${colorScheme.primary}40` }} />
            )}
          </div>
        </div>

        {/* Player image area */}
        <div className="flex-1 flex items-end justify-center relative">
          <div className="w-[75%] h-[85%] relative flex items-end justify-center">
            {playerUrl ? (
              <img
                src={playerUrl}
                alt="Player"
                className="max-w-full max-h-full object-contain relative z-10"
                style={{
                  filter: isVintage
                    ? "sepia(25%) contrast(110%) brightness(95%)"
                    : isBold
                    ? "contrast(120%) saturate(110%)"
                    : "none",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-end justify-center">
                <PlayerSilhouette color={colorScheme.primary} style={style} />
              </div>
            )}
          </div>
        </div>

        {/* Player info panel */}
        <div className="relative z-10 mt-3">
          <div
            className="rounded-lg px-4 py-3"
            style={{
              backgroundColor: isBold ? `${colorScheme.primary}15` : "rgba(255,255,255,0.03)",
              border: `1px solid ${isBold ? `${colorScheme.primary}30` : "rgba(255,255,255,0.06)"}`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-end justify-between">
              <div className="min-w-0 flex-1">
                <div
                  className="text-white leading-none truncate"
                  style={{
                    fontSize: isBold ? "22px" : isVintage ? "18px" : "19px",
                    fontWeight: isBold ? 900 : isVintage ? 700 : 700,
                    letterSpacing: isBold ? "0.03em" : isVintage ? "0.01em" : "-0.02em",
                    fontStyle: isVintage ? "italic" : "normal",
                    textTransform: isBold ? "uppercase" : "none",
                  }}
                >
                  {name}
                </div>
                <div
                  className="font-semibold mt-1 uppercase truncate"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: `${colorScheme.primary}cc`,
                    fontStyle: isVintage ? "italic" : "normal",
                  }}
                >
                  {team}
                </div>
              </div>
              <div
                className="leading-none flex-shrink-0 ml-3"
                style={{
                  fontSize: isBold ? "36px" : "30px",
                  fontWeight: 900,
                  color: isBold ? colorScheme.primary : "rgba(255,255,255,0.85)",
                  fontStyle: isVintage ? "italic" : "normal",
                  textShadow: isBold ? `0 0 20px ${colorScheme.primary}40` : "none",
                }}
              >
                #{number}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — style-dependent */}
      {isVintage ? (
        <div className="h-3 flex">
          <div className="flex-1" style={{ backgroundColor: colorScheme.primary }} />
          <div className="w-2 bg-white/80" />
          <div className="flex-1" style={{ backgroundColor: colorScheme.secondary }} />
          <div className="w-2 bg-white/80" />
          <div className="flex-1" style={{ backgroundColor: colorScheme.primary }} />
        </div>
      ) : isBold ? (
        <div className="h-2.5" style={{ backgroundColor: colorScheme.primary }} />
      ) : (
        <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${colorScheme.primary}60, transparent)` }} />
      )}
    </div>
  );
}

function GameDayPreview({ style, colorScheme, fields, files }) {
  const logoUrl = useMemo(() => files.logo ? URL.createObjectURL(files.logo) : null, [files.logo]);
  const awayLogoUrl = useMemo(() => files["logo-away"] ? URL.createObjectURL(files["logo-away"]) : null, [files["logo-away"]]);

  const team = fields.teamName || "WILDCATS";
  const isBold = style === "bold";
  const isVintage = style === "vintage";

  return (
    <div
      className="w-full aspect-[4/5] rounded-xl overflow-hidden relative flex flex-col"
      style={{
        background: isVintage
          ? "linear-gradient(180deg, #141210 0%, #1a1814 50%, #0f0e0c 100%)"
          : `linear-gradient(180deg, #0d1117 0%, ${colorScheme.bg} 50%, #0a0a10 100%)`,
      }}
    >
      {/* Top accent */}
      <div className={isBold ? "h-2.5" : "h-1.5"} style={{ background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})` }} />

      {isVintage && (
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='white'/%3E%3C/svg%3E\")", backgroundSize: "6px 6px" }} />
      )}

      {/* Background glows */}
      <div className="absolute top-[25%] left-[10%] w-[35%] h-[30%] rounded-full blur-3xl" style={{ backgroundColor: `${colorScheme.primary}08` }} />
      <div className="absolute top-[25%] right-[10%] w-[35%] h-[30%] rounded-full blur-3xl opacity-50" style={{ backgroundColor: `${colorScheme.secondary}08` }} />

      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="text-center pt-6 pb-2">
          <div
            className="font-bold uppercase"
            style={{
              fontSize: isBold ? "11px" : "8px",
              letterSpacing: "0.3em",
              color: colorScheme.primary,
              fontStyle: isVintage ? "italic" : "normal",
            }}
          >
            Game Day
          </div>
          <div
            className="text-white/90 mt-2 tracking-tight leading-none uppercase"
            style={{
              fontSize: isBold ? "20px" : "16px",
              fontWeight: isBold ? 900 : 700,
              fontStyle: isVintage ? "italic" : "normal",
            }}
          >
            {team} <span className="text-white/30 mx-1">vs</span> OPPONENT
          </div>
          <div
            className="text-white/25 mt-2 tracking-widest uppercase"
            style={{
              fontSize: "8px",
              fontStyle: isVintage ? "italic" : "normal",
            }}
          >
            Fri Nov 15 · 7:00 PM EST
          </div>
        </div>

        {/* VS layout */}
        <div className="flex-1 flex items-center justify-center gap-6 px-6">
          {/* Home */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div
              className="w-20 h-20 flex items-center justify-center"
              style={{
                borderRadius: isBold ? "16px" : "50%",
                backgroundColor: `${colorScheme.primary}12`,
                border: `${isBold ? "2px" : "1px"} solid ${colorScheme.primary}${isBold ? "40" : "25"}`,
                boxShadow: isBold ? `0 0 30px ${colorScheme.primary}15` : "none",
              }}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Home" className="w-11 h-11 object-contain" style={{ filter: isVintage ? "sepia(30%)" : "none" }} />
              ) : (
                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: `${colorScheme.primary}40` }} />
              )}
            </div>
            <div className="text-center">
              <div
                className="font-bold text-white/80 uppercase"
                style={{
                  fontSize: isBold ? "12px" : "10px",
                  letterSpacing: "0.08em",
                  fontStyle: isVintage ? "italic" : "normal",
                }}
              >
                {team}
              </div>
              <div className="text-[8px] text-white/25 mt-0.5">12-3 · Home</div>
            </div>
          </div>

          {/* VS */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: isBold ? `${colorScheme.primary}15` : "rgba(255,255,255,0.04)",
              border: `1px solid ${isBold ? `${colorScheme.primary}30` : "rgba(255,255,255,0.08)"}`,
            }}
          >
            <span
              className="font-black text-white/30"
              style={{
                fontSize: isBold ? "12px" : "10px",
                fontStyle: isVintage ? "italic" : "normal",
              }}
            >
              VS
            </span>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div
              className="w-20 h-20 flex items-center justify-center"
              style={{
                borderRadius: isBold ? "16px" : "50%",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: `${isBold ? "2px" : "1px"} solid rgba(255,255,255,0.08)`,
              }}
            >
              {awayLogoUrl ? (
                <img src={awayLogoUrl} alt="Away" className="w-11 h-11 object-contain" style={{ filter: isVintage ? "sepia(30%)" : "none" }} />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/15" />
              )}
            </div>
            <div className="text-center">
              <div
                className="font-bold text-white/80 uppercase"
                style={{
                  fontSize: isBold ? "12px" : "10px",
                  letterSpacing: "0.08em",
                  fontStyle: isVintage ? "italic" : "normal",
                }}
              >
                Opponent
              </div>
              <div className="text-[8px] text-white/25 mt-0.5">10-5 · Away</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mx-4 mb-4 rounded-lg px-3 py-2 flex items-center justify-between"
          style={{
            backgroundColor: isBold ? `${colorScheme.primary}10` : "rgba(255,255,255,0.03)",
            border: `1px solid ${isBold ? `${colorScheme.primary}20` : "rgba(255,255,255,0.05)"}`,
          }}
        >
          <div className="text-[8px] text-white/25 tracking-wider uppercase" style={{ fontStyle: isVintage ? "italic" : "normal" }}>
            {isVintage ? "Est. " : ""}Memorial Arena · Portland, OR
          </div>
          <div className="text-[8px] font-bold tracking-wider uppercase" style={{ color: `${colorScheme.primary}90` }}>
            Live
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      {isVintage ? (
        <div className="h-3 flex">
          <div className="flex-1" style={{ backgroundColor: colorScheme.primary }} />
          <div className="w-2 bg-white/80" />
          <div className="flex-1" style={{ backgroundColor: colorScheme.secondary }} />
        </div>
      ) : isBold ? (
        <div className="h-2.5" style={{ backgroundColor: colorScheme.primary }} />
      ) : (
        <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${colorScheme.primary}60, transparent)` }} />
      )}
    </div>
  );
}

function HypeCardPreview({ style, colorScheme, fields, files }) {
  const playerUrl = useMemo(() => files.player ? URL.createObjectURL(files.player) : null, [files.player]);
  const logoUrl = useMemo(() => files.logo ? URL.createObjectURL(files.logo) : null, [files.logo]);

  const nameParts = (fields.playerName || "").split(" ");
  const firstWord = nameParts[0] || "BUILT";
  const secondWord = nameParts.slice(1).join(" ") || "DIFFERENT";
  const number = fields.number || "00";
  const team = fields.teamName || "TEAM";

  const isBold = style === "bold";
  const isVintage = style === "vintage";

  return (
    <div
      className="w-full aspect-[4/5] rounded-xl overflow-hidden relative flex flex-col"
      style={{
        background: isVintage
          ? "linear-gradient(160deg, #1a1408 0%, #151010 40%, #0d0a08 100%)"
          : `linear-gradient(160deg, ${colorScheme.bg} 0%, #0d0808 40%, #080505 100%)`,
      }}
    >
      {/* Top accent */}
      <div
        className={isBold ? "h-2.5" : "h-1.5"}
        style={{ background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})` }}
      />

      {isVintage && (
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='white'/%3E%3C/svg%3E\")", backgroundSize: "6px 6px" }} />
      )}

      {/* Energy lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[12, 28, 44, 60, 76].map((top, i) => (
          <div
            key={top}
            className="absolute -left-[10%] w-[130%]"
            style={{
              top: `${top}%`,
              height: isBold ? "3px" : "1px",
              transform: `rotate(${isBold ? -25 : -18}deg)`,
              background: `linear-gradient(to right, transparent 5%, ${colorScheme.primary}${isBold ? (10 + i * 5).toString(16) : "0a"} 50%, transparent 95%)`,
            }}
          />
        ))}
      </div>

      {/* Big number watermark */}
      <div
        className="absolute top-[2%] right-[-5%] leading-none select-none pointer-events-none"
        style={{
          fontSize: "140px",
          fontWeight: 900,
          transform: `rotate(-12deg)`,
          color: "transparent",
          WebkitTextStroke: `${isBold ? "3px" : "1px"} ${colorScheme.primary}${isBold ? "15" : "08"}`,
        }}
      >
        {number}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-5 relative z-10">
        {/* Player area */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full scale-[1.8] blur-3xl" style={{ backgroundColor: `${colorScheme.primary}${isBold ? "15" : "0a"}` }} />
          <div className="w-36 h-44 relative flex items-end justify-center">
            {playerUrl ? (
              <img
                src={playerUrl}
                alt="Player"
                className="max-w-full max-h-full object-contain relative z-10"
                style={{
                  filter: isVintage
                    ? "sepia(30%) contrast(110%) brightness(90%)"
                    : isBold
                    ? "contrast(130%) saturate(110%)"
                    : "none",
                  WebkitFilter: isVintage
                    ? "sepia(30%) contrast(110%) brightness(90%)"
                    : isBold
                    ? "contrast(130%) saturate(110%)"
                    : "none",
                }}
              />
            ) : (
              <svg viewBox="0 0 120 150" className="w-full h-full text-white/15 relative z-10" style={{ filter: `drop-shadow(0 0 20px ${colorScheme.primary}20)` }}>
                <ellipse cx="55" cy="18" rx="15" ry="17" fill="currentColor" />
                <path d="M30 50 Q35 35 55 35 Q75 35 80 50 L88 95 Q90 105 80 105 L30 105 Q20 105 22 95 Z" fill="currentColor" />
                <path d="M80 55 L108 35" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <path d="M30 55 L8 72" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
                <rect x="20" y="100" width="20" height="32" rx="4" fill="currentColor" transform="rotate(-5 30 116)" />
                <rect x="58" y="100" width="20" height="32" rx="4" fill="currentColor" transform="rotate(8 68 116)" />
              </svg>
            )}
          </div>
        </div>

        {/* Hype text */}
        <div className="text-center">
          <div
            className="text-white leading-none uppercase"
            style={{
              fontSize: isBold ? "34px" : "28px",
              fontWeight: 900,
              letterSpacing: isBold ? "0.05em" : "0.01em",
              fontStyle: isVintage ? "italic" : "normal",
              textShadow: isBold ? `0 0 30px ${colorScheme.primary}30` : "none",
            }}
          >
            {firstWord}
          </div>
          <div
            className="leading-none uppercase"
            style={{
              fontSize: isBold ? "34px" : "28px",
              fontWeight: 900,
              color: colorScheme.primary,
              letterSpacing: isBold ? "0.05em" : "0.01em",
              fontStyle: isVintage ? "italic" : "normal",
              textShadow: isBold ? `0 0 40px ${colorScheme.primary}40` : "none",
              marginTop: "2px",
            }}
          >
            {secondWord}
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex items-center gap-2 mt-4">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-4 h-4 object-contain opacity-40" style={{ filter: isVintage ? "sepia(40%)" : "none" }} />
          ) : (
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${colorScheme.primary}50` }} />
          )}
          <span
            className="text-white/25 font-semibold uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "0.2em",
              fontStyle: isVintage ? "italic" : "normal",
            }}
          >
            {team} · #{number}
          </span>
        </div>
      </div>

      {/* Bottom accent */}
      {isVintage ? (
        <div className="h-3 flex">
          <div className="flex-1" style={{ backgroundColor: colorScheme.primary }} />
          <div className="w-2 bg-white/80" />
          <div className="flex-1" style={{ backgroundColor: colorScheme.secondary }} />
        </div>
      ) : isBold ? (
        <div className="h-2.5" style={{ backgroundColor: colorScheme.primary }} />
      ) : (
        <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${colorScheme.primary}60, transparent)` }} />
      )}
    </div>
  );
}

function GraphicPreview({ graphicType, style, color, fields, files }) {
  const colorScheme = COLOR_PRESETS.find((c) => c.id === color) || COLOR_PRESETS[0];

  if (graphicType === "game-day") {
    return <GameDayPreview style={style} colorScheme={colorScheme} fields={fields} files={files} />;
  }
  if (graphicType === "hype-card") {
    return <HypeCardPreview style={style} colorScheme={colorScheme} fields={fields} files={files} />;
  }
  return <PlayerCardPreview style={style} colorScheme={colorScheme} fields={fields} files={files} />;
}

function FieldInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-[11px] text-text-tertiary uppercase tracking-wider font-medium block mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary
                   placeholder:text-text-tertiary outline-none transition-colors
                   focus:border-accent/40"
      />
    </div>
  );
}

export default function StepCustomize({ graphicType, files, onBack }) {
  const [style, setStyle] = useState("clean");
  const [color, setColor] = useState("blue");
  const [fields, setFields] = useState({
    playerName: "",
    number: "",
    position: "",
    teamName: "",
  });
  const [exported, setExported] = useState(false);

  function updateField(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function handleExport() {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }

  const isGameDay = graphicType === "game-day";

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Customize your graphic
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          Tweak the details. Preview updates live.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Preview */}
        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-sm sticky top-8">
            <GraphicPreview
              graphicType={graphicType}
              style={style}
              color={color}
              fields={fields}
              files={files}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="w-full lg:w-72 space-y-6">
          {/* Style Toggle */}
          <div>
            <label className="text-[11px] text-text-tertiary uppercase tracking-wider font-medium block mb-2">
              Style
            </label>
            <div className="flex gap-1.5 bg-surface border border-border rounded-lg p-1">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`
                    flex-1 text-xs font-medium py-1.5 rounded-md transition-all duration-200 cursor-pointer
                    ${
                      style === s.id
                        ? "bg-accent text-surface"
                        : "text-text-secondary hover:text-text-primary"
                    }
                  `}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="text-[11px] text-text-tertiary uppercase tracking-wider font-medium block mb-2">
              Color Scheme
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  title={c.name}
                  className={`
                    w-7 h-7 rounded-full transition-all duration-200 cursor-pointer
                    ${color === c.id ? "ring-2 ring-offset-2 ring-offset-surface scale-110" : "hover:scale-110"}
                  `}
                  style={{
                    backgroundColor: c.primary,
                    ...(color === c.id ? { boxShadow: `0 0 12px ${c.primary}40` } : {}),
                  }}
                />
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {!isGameDay && (
              <>
                <FieldInput
                  label="Player Name"
                  value={fields.playerName}
                  onChange={(v) => updateField("playerName", v)}
                  placeholder="e.g. Marcus Johnson"
                />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <FieldInput
                      label="Number"
                      value={fields.number}
                      onChange={(v) => updateField("number", v)}
                      placeholder="23"
                    />
                  </div>
                  <div className="flex-1">
                    <FieldInput
                      label="Position"
                      value={fields.position}
                      onChange={(v) => updateField("position", v)}
                      placeholder="PG"
                    />
                  </div>
                </div>
              </>
            )}
            <FieldInput
              label="Team Name"
              value={fields.teamName}
              onChange={(v) => updateField("teamName", v)}
              placeholder="e.g. Wildcats"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleExport}
              className="w-full bg-accent hover:bg-accent-hover text-surface font-medium text-sm
                         py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
            >
              {exported ? "Exported!" : "Export Graphic"}
            </button>
            <button
              onClick={onBack}
              className="w-full text-sm text-text-tertiary hover:text-text-secondary
                         transition-colors cursor-pointer py-1"
            >
              &larr; Back to uploads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
