import type { ReactNode } from "react";
import { cn } from "./cn";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-14 text-center", className)}>
      {icon && (
        <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-ink-900/[0.04] text-ink-400 [&_svg]:size-5">
          {icon}
        </div>
      )}
      <div className="text-[15px] font-medium text-ink-900">{title}</div>
      {description && (
        <div className="mt-1 max-w-sm text-[13.5px] leading-relaxed text-ink-500 text-pretty">
          {description}
        </div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
