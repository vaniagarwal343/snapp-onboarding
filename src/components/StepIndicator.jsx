export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isCompleted = step < current;

        return (
          <div key={step} className="flex items-center gap-3">
            {i > 0 && (
              <div
                className={`w-8 h-px transition-colors duration-300 ${
                  isCompleted ? "bg-accent" : "bg-border"
                }`}
              />
            )}
            <div
              className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                transition-all duration-300
                ${
                  isActive
                    ? "bg-accent text-surface ring-1 ring-accent/30 ring-offset-2 ring-offset-surface"
                    : isCompleted
                    ? "bg-accent/20 text-accent"
                    : "bg-surface-raised text-text-tertiary border border-border"
                }
              `}
            >
              {isCompleted ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 6l3 3 5-5" />
                </svg>
              ) : (
                step
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
