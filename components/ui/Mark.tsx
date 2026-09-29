import { cn } from "./cn";

export interface MarkProps {
  size?: number;
  className?: string;
}

/** Brand mark: a rounded square with a ring and an offset point — "the record, matched". */
export function Mark({ size = 26, className }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <rect x="0" y="0" width="26" height="26" rx="7.5" fill="var(--color-accent-600)" />
      <rect
        x="0.5"
        y="0.5"
        width="25"
        height="25"
        rx="7"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
      />
      <circle cx="13" cy="13" r="6.25" fill="none" stroke="white" strokeWidth="1.6" opacity="0.95" />
      <circle cx="15.4" cy="10.6" r="2.1" fill="white" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Mark />
      <span className="text-[15px] font-medium tracking-[-0.01em] text-ink-900">
        Trial Matcher
      </span>
    </span>
  );
}
