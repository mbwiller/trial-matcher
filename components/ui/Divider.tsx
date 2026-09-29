import { cn } from "./cn";

export function Divider({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <hr
      aria-orientation={vertical ? "vertical" : "horizontal"}
      className={cn(
        "border-0 bg-ink-900/[0.07]",
        vertical ? "h-full w-px self-stretch" : "h-px w-full",
        className,
      )}
    />
  );
}
