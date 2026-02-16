import { useState } from "react";

const STYLES = [
  { id: "clean", label: "Clean" },
  { id: "bold", label: "Bold" },
  { id: "vintage", label: "Vintage" },
];

const COLOR_PRESETS = [
  { id: "blue", primary: "#2563eb", secondary: "#1e40af", name: "Blue" },
  { id: "red", primary: "#dc2626", secondary: "#991b1b", name: "Red" },
  { id: "green", primary: "#16a34a", secondary: "#166534", name: "Green" },
  { id: "purple", primary: "#9333ea", secondary: "#6b21a8", name: "Purple" },
  { id: "orange", primary: "#ea580c", secondary: "#c2410c", name: "Orange" },
  { id: "gold", primary: "#d4a843", secondary: "#a37e2c", name: "Gold" },
];

function GraphicPreview({ graphicType, style, color, fields, files }) {
  const colorScheme = COLOR_PRESETS.find((c) => c.id === color) || COLOR_PRESETS[0];
  const playerUrl = files.player ? URL.createObjectURL(files.player) : null;
  const logoUrl = files.logo ? URL.createObjectURL(files.logo) : null;

  const styleClasses = {
    clean: "",
    bold: "uppercase",
    vintage: "",
  };

  const fontStyle = {
    clean: { letterSpacing: "-0.02em" },
    bold: { letterSpacing: "0.05em" },
    vintage: { letterSpacing: "0.02em", fontStyle: "italic" },
  };

  if (graphicType === "game-day") {
    const awayLogoUrl = files["logo-away"] ? URL.createObjectURL(files["logo-away"]) : null;
    return (
      <div
        className="w-full aspect-[4/5] rounded-xl overflow-hidden relative flex flex-col"
        style={{ backgroundColor: "#0d1117" }}
      >
        {/* Top accent */}
        <div className="h-1" style={{ background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})` }} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="text-center pt-8 pb-4">
            <div
              className={`text-xs tracking-[0.25em] font-semibold uppercase ${styleClasses[style]}`}
              style={{ color: colorScheme.primary, ...fontStyle[style] }}
            >
              Game Day
            </div>
            <div className="text-[11px] text-white/30 mt-2">
              {fields.teamName || "TEAM"} vs OPPONENT
            </div>
          </div>

          {/* VS Layout */}
          <div className="flex-1 flex items-center justify-center gap-8 px-8">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colorScheme.primary}15`, border: `1px solid ${colorScheme.primary}30` }}
              >
                {logoUrl ? (
                  <img src={logoUrl} alt="Home" className="w-12 h-12 object-contain" />
                ) : (
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: `${colorScheme.primary}40` }} />
                )}
              </div>
              <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                {fields.teamName || "Home"}
              </span>
            </div>

            <span
              className={`text-2xl font-black text-white/10 ${styleClasses[style]}`}
              style={fontStyle[style]}
            >
              VS
            </span>

            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                {awayLogoUrl ? (
                  <img src={awayLogoUrl} alt="Away" className="w-12 h-12 object-contain" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20" />
                )}
              </div>
              <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Away
              </span>
            </div>
          </div>

          {/* Bottom */}
          <div className="h-12 bg-white/[0.03] border-t border-white/5 flex items-center justify-center">
            <div className="text-[10px] text-white/25 tracking-widest uppercase">
              {style === "vintage" ? "Est. Arena" : "Arena"} · City, ST
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (graphicType === "hype-card") {
    return (
      <div
        className="w-full aspect-[4/5] rounded-xl overflow-hidden relative flex flex-col"
        style={{ backgroundColor: "#0d0808" }}
      >
        {/* Energy lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[20, 40, 60, 80].map((top) => (
            <div
              key={top}
              className="absolute -left-[10%] w-[120%] h-px rotate-[-15deg]"
              style={{
                top: `${top}%`,
                background: `linear-gradient(to right, transparent, ${colorScheme.primary}20, transparent)`,
              }}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          {/* Player image or silhouette */}
          <div className="w-40 h-48 relative mb-6 flex items-end justify-center">
            {playerUrl ? (
              <img
                src={playerUrl}
                alt="Player"
                className="max-w-full max-h-full object-contain"
                style={{
                  filter: style === "vintage" ? "sepia(30%) contrast(110%)" : style === "bold" ? "contrast(120%)" : "none",
                }}
              />
            ) : (
              <svg viewBox="0 0 120 150" className="w-32 h-40 text-white/8">
                <ellipse cx="55" cy="22" rx="16" ry="18" fill="currentColor" />
                <path d="M30 55 Q35 38 55 38 Q75 38 80 55 L90 100 Q92 110 82 110 L28 110 Q18 110 20 100 Z" fill="currentColor" />
                <path d="M82 60 L110 40" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <rect x="18" y="105" width="22" height="32" rx="4" fill="currentColor" />
                <rect x="58" y="105" width="22" height="32" rx="4" fill="currentColor" />
              </svg>
            )}
          </div>

          {/* Hype text */}
          <div className={`text-center space-y-0 ${styleClasses[style]}`}>
            <div
              className="text-3xl font-black text-white tracking-tight leading-none"
              style={fontStyle[style]}
            >
              {fields.playerName?.split(" ")[0] || "BUILT"}
            </div>
            <div
              className="text-3xl font-black tracking-tight leading-none"
              style={{ color: colorScheme.primary, ...fontStyle[style] }}
            >
              {fields.playerName?.split(" ")[1] || "DIFFERENT"}
            </div>
          </div>

          {/* Logo */}
          {logoUrl && (
            <div className="mt-6 w-8 h-8 opacity-40">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
            </div>
          )}
        </div>

        <div className="h-1" style={{ background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})` }} />
      </div>
    );
  }

  // Default: Player Card
  return (
    <div
      className="w-full aspect-[4/5] rounded-xl overflow-hidden relative flex flex-col"
      style={{ backgroundColor: "#111118" }}
    >
      {/* Top accent */}
      <div
        className="h-1"
        style={{ background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})` }}
      />

      <div className="flex-1 flex flex-col items-center justify-between p-6 relative">
        {/* Logo top-right */}
        <div className="self-end">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/10" />
          )}
        </div>

        {/* Player */}
        <div className="relative flex-1 flex items-end justify-center w-full">
          {playerUrl ? (
            <img
              src={playerUrl}
              alt="Player"
              className="max-h-[60%] object-contain"
              style={{
                filter:
                  style === "vintage"
                    ? "sepia(20%) contrast(110%)"
                    : style === "bold"
                    ? "contrast(115%) saturate(110%)"
                    : "none",
              }}
            />
          ) : (
            <svg viewBox="0 0 100 150" className="h-[55%] text-white/8">
              <ellipse cx="50" cy="25" rx="18" ry="20" fill="currentColor" />
              <path d="M20 65 Q25 45 50 45 Q75 45 80 65 L85 110 Q85 120 75 120 L25 120 Q15 120 15 110 Z" fill="currentColor" />
              <rect x="15" y="115" width="25" height="30" rx="4" fill="currentColor" />
              <rect x="60" y="115" width="25" height="30" rx="4" fill="currentColor" />
            </svg>
          )}
        </div>

        {/* Player info */}
        <div className="w-full text-center space-y-1.5 mt-4">
          {fields.position && (
            <div
              className={`text-[10px] tracking-[0.2em] font-semibold uppercase ${styleClasses[style]}`}
              style={{ color: colorScheme.primary, ...fontStyle[style] }}
            >
              {fields.position}
            </div>
          )}
          <div
            className={`text-xl font-bold text-white tracking-tight leading-none ${styleClasses[style]}`}
            style={fontStyle[style]}
          >
            {fields.playerName || "PLAYER NAME"}
          </div>
          {fields.number && (
            <div className="text-3xl font-black text-white/15" style={fontStyle[style]}>
              #{fields.number}
            </div>
          )}
          {fields.teamName && (
            <div className="text-[10px] text-white/30 tracking-widest uppercase">
              {fields.teamName}
            </div>
          )}
        </div>
      </div>

      {/* Bottom decorative bar */}
      {style === "vintage" ? (
        <div className="h-3 flex">
          <div className="flex-1" style={{ backgroundColor: colorScheme.primary }} />
          <div className="flex-1 bg-white" />
          <div className="flex-1" style={{ backgroundColor: colorScheme.secondary }} />
        </div>
      ) : style === "bold" ? (
        <div className="h-2" style={{ backgroundColor: colorScheme.primary }} />
      ) : null}
    </div>
  );
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
                    ${color === c.id ? "ring-2 ring-offset-2 ring-offset-surface" : "hover:scale-110"}
                  `}
                  style={{
                    backgroundColor: c.primary,
                    ringColor: color === c.id ? c.primary : undefined,
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
                      placeholder="#23"
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
