import { useRef } from "react";

const UPLOAD_ZONES = {
  "player-card": [
    { id: "player", label: "Player Photo", required: true, icon: PlayerIcon },
    { id: "logo", label: "Team Logo", required: true, icon: LogoIcon },
    { id: "jersey", label: "Jersey", required: false, icon: JerseyIcon },
  ],
  "game-day": [
    { id: "logo", label: "Home Logo", required: true, icon: LogoIcon },
    { id: "logo-away", label: "Away Logo", required: true, icon: LogoIcon },
    { id: "player", label: "Player Photo", required: false, icon: PlayerIcon },
  ],
  "hype-card": [
    { id: "player", label: "Player Photo", required: true, icon: PlayerIcon },
    { id: "logo", label: "Team Logo", required: true, icon: LogoIcon },
  ],
};

function PlayerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function JerseyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L2 6v4l4-2V2z" />
      <path d="M18 2l4 4v4l-4-2V2z" />
      <path d="M6 2h12v20H6z" />
      <path d="M9 2a3 3 0 006 0" />
    </svg>
  );
}

function UploadZone({ zone, file, onFile }) {
  const inputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) {
      onFile(zone.id, dropped);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    const selected = e.target.files[0];
    if (selected) {
      onFile(zone.id, selected);
    }
  }

  const Icon = zone.icon;
  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`
        relative group cursor-pointer rounded-xl border border-dashed transition-all duration-200
        flex flex-col items-center justify-center gap-2 p-6
        ${
          file
            ? "border-accent/40 bg-accent-muted"
            : "border-border hover:border-text-tertiary bg-surface-raised hover:bg-surface-overlay"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {file ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface">
            <img
              src={previewUrl}
              alt={zone.label}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-accent font-medium">{file.name}</span>
          <span className="text-[10px] text-text-tertiary">Click to replace</span>
        </div>
      ) : (
        <>
          <div className="text-text-tertiary group-hover:text-text-secondary transition-colors">
            <Icon />
          </div>
          <div className="text-center">
            <span className="text-sm text-text-secondary font-medium">
              {zone.label}
            </span>
            {!zone.required && (
              <span className="text-xs text-text-tertiary ml-1.5">
                (optional)
              </span>
            )}
          </div>
          <span className="text-[11px] text-text-tertiary">
            Drag & drop or click to upload
          </span>
        </>
      )}
    </div>
  );
}

export default function StepUpload({
  graphicType,
  files,
  onFile,
  onUseSample,
  onNext,
  onBack,
}) {
  const zones = UPLOAD_ZONES[graphicType] || UPLOAD_ZONES["player-card"];
  const requiredZones = zones.filter((z) => z.required);
  const allRequiredUploaded = requiredZones.every((z) => files[z.id]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Upload your assets
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          Add your photos and logos. We'll handle the rest.
        </p>
      </div>

      <div className={`grid gap-4 mb-8 ${zones.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
        {zones.map((zone) => (
          <UploadZone
            key={zone.id}
            zone={zone}
            file={files[zone.id]}
            onFile={onFile}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
        >
          &larr; Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onUseSample}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer
                       px-4 py-2 rounded-lg border border-border hover:border-border-subtle"
          >
            Use sample assets
          </button>

          <button
            onClick={onNext}
            disabled={!allRequiredUploaded}
            className={`
              text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer
              ${
                allRequiredUploaded
                  ? "bg-accent text-surface hover:bg-accent-hover"
                  : "bg-surface-overlay text-text-tertiary cursor-not-allowed"
              }
            `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
