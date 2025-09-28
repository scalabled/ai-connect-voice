import { cn } from "@/lib/utils";

type LogoVariant = "default" | "onDark";
type LogoLayout = "horizontal" | "stacked";

interface AICLogoProps {
  variant?: LogoVariant;
  layout?: LogoLayout;
  className?: string;
}

const AICLogo = ({ variant = "default", layout = "horizontal", className }: AICLogoProps) => {
  const isOnDark = variant === "onDark";

  return (
    <div
      className={cn(
        layout === "stacked" ? "flex flex-col items-center gap-2" : "flex items-center gap-3",
        className,
      )}
      aria-label="AI Connect Community logo"
    >
      <svg
        viewBox="0 0 140 40"
        role="img"
        aria-hidden="true"
        className={cn("h-9 w-auto", isOnDark ? "text-pure-white" : "text-primary-blue")}
      >
        <path fill="currentColor" d="M10.4 40L22 4h6l11.6 36h-7.2l-2.2-7H15l-2.2 7zm15.6-14.4h9.6L30 12.1z" />
        <rect x="52" y="4" width="6.6" height="36" rx="1.6" fill="currentColor" />
        <path
          fill="currentColor"
          d="M95 4c13.2 0 21.8 8.6 21.8 20s-8.6 20-21.8 20c-9.3 0-16-4.2-19.4-11l6.5-4.4c2.2 4.5 6.2 7.2 11.7 7.2 7.9 0 12.8-5 12.8-11.8S102.7 12.2 95 12.2c-5.4 0-9.3 2.7-11.6 7.1l-6.4-4.5C79.6 8.3 86 4 95 4z"
        />
        <circle
          cx="55.3"
          cy="10.3"
          r="4.3"
          fill={isOnDark ? "hsl(var(--accent-orange))" : "hsl(var(--primary-orange))"}
        />
      </svg>
      <div className={cn(layout === "stacked" ? "flex flex-col items-center gap-1" : "flex items-center gap-2")}>
        <span
          className={cn(
            "font-heading text-lg tracking-tight",
            isOnDark ? "text-pure-white" : "text-neutral-gray",
          )}
        >
          AI Connect
        </span>
        <span
          className={cn(
            "font-semibold uppercase tracking-[0.35em] text-xs",
            isOnDark ? "text-pure-white/70" : "text-neutral-gray/60",
          )}
        >
          Community
        </span>
      </div>
    </div>
  );
};

export default AICLogo;
