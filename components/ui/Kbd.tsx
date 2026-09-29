import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export function Kbd({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 items-center rounded-[5px] bg-ink-900/[0.05] px-1.5 font-mono text-[11px] text-ink-500 ring-1 ring-ink-900/[0.06]",
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}
