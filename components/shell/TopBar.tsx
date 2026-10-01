import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark, cn } from "@/components/ui";

export interface TopBarProps {
  /** Center slot (e.g. the workspace Stepper). */
  center?: ReactNode;
  /** Right slot (e.g. EngineBadge, CTA). */
  right?: ReactNode;
  /** Sticky glass bar (workspace) vs. transparent bar over the hero (landing). */
  variant?: "glass" | "transparent";
  /** Match the wider dashboard canvas. */
  wide?: boolean;
  className?: string;
}

export function TopBar({ center, right, variant = "glass", wide = false, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "z-30 w-full",
        variant === "glass" && "sticky top-0 glass-strong rounded-none border-x-0 border-t-0 shadow-none hairline-b",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto grid h-14 grid-cols-[1fr_auto_1fr] items-center px-6 transition-[max-width] duration-300 ease-out-quart",
          wide ? "max-w-[1480px]" : "max-w-[1180px]",
        )}
      >
        <Link href="/" className="justify-self-start rounded-md" aria-label="Trial Matcher home">
          <Wordmark />
        </Link>
        <div className="justify-self-center">{center}</div>
        <div className="flex items-center gap-2 justify-self-end">{right}</div>
      </div>
    </header>
  );
}
