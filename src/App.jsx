import { useState, useRef, useEffect } from "react";
import StepIndicator from "./components/StepIndicator";
import StepChoose from "./components/StepChoose";
import StepUpload from "./components/StepUpload";
import StepCustomize from "./components/StepCustomize";

// Lightweight placeholder images encoded as tiny data URIs (1x1 colored pixels)
const SAMPLE_FILES = {
  "player-card": {
    player: "player",
    logo: "logo",
  },
  "game-day": {
    logo: "logo",
    "logo-away": "logo-away",
  },
  "hype-card": {
    player: "player",
    logo: "logo",
  },
};

function createSampleFile(name) {
  // Create a small SVG blob as a sample image
  const svgs = {
    player: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
      <rect width="400" height="500" fill="#1a1a2e"/>
      <circle cx="200" cy="140" r="60" fill="#4a5568"/>
      <path d="M120 250 Q130 200 200 200 Q270 200 280 250 L300 420 Q305 440 285 440 L115 440 Q95 440 100 420 Z" fill="#4a5568"/>
    </svg>`,
    logo: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="#2563eb" opacity="0.8"/>
      <text x="100" y="115" text-anchor="middle" fill="white" font-size="48" font-weight="bold" font-family="sans-serif">S</text>
    </svg>`,
    "logo-away": `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="#dc2626" opacity="0.8"/>
      <text x="100" y="115" text-anchor="middle" fill="white" font-size="48" font-weight="bold" font-family="sans-serif">O</text>
    </svg>`,
  };

  const svg = svgs[name] || svgs.logo;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return new File([blob], `${name}-sample.svg`, { type: "image/svg+xml" });
}

export default function App() {
  const [step, setStep] = useState(1);
  const [graphicType, setGraphicType] = useState(null);
  const [files, setFiles] = useState({});
  const [direction, setDirection] = useState("forward");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef(null);

  function animateTransition(newStep, dir) {
    setDirection(dir);
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setIsTransitioning(false);
    }, 200);
  }

  function handleChoose(type) {
    setGraphicType(type);
    animateTransition(2, "forward");
  }

  function handleFile(id, file) {
    setFiles((prev) => ({ ...prev, [id]: file }));
  }

  function handleUseSample() {
    const sampleKeys = SAMPLE_FILES[graphicType] || SAMPLE_FILES["player-card"];
    const sampleFiles = {};
    for (const [key, name] of Object.entries(sampleKeys)) {
      sampleFiles[key] = createSampleFile(name);
    }
    setFiles(sampleFiles);
  }

  function handleUploadNext() {
    animateTransition(3, "forward");
  }

  function handleBackToChoose() {
    setFiles({});
    animateTransition(1, "back");
  }

  function handleBackToUpload() {
    animateTransition(2, "back");
  }

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const transitionClass = isTransitioning
    ? direction === "forward"
      ? "opacity-0 translate-x-4"
      : "opacity-0 -translate-x-4"
    : "opacity-100 translate-x-0";

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-text-primary tracking-tight">
              snapp
            </span>
            <span className="text-xs text-text-tertiary font-normal">
              / create
            </span>
          </div>
          <StepIndicator current={step} total={3} />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-6 py-12 lg:py-16">
        <div
          ref={contentRef}
          className={`w-full transition-all duration-200 ease-out ${transitionClass}`}
        >
          {step === 1 && <StepChoose onSelect={handleChoose} />}
          {step === 2 && (
            <StepUpload
              graphicType={graphicType}
              files={files}
              onFile={handleFile}
              onUseSample={handleUseSample}
              onNext={handleUploadNext}
              onBack={handleBackToChoose}
            />
          )}
          {step === 3 && (
            <StepCustomize
              graphicType={graphicType}
              files={files}
              onBack={handleBackToUpload}
            />
          )}
        </div>
      </main>
    </div>
  );
}
