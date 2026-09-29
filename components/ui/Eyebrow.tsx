import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export function Eyebrow({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("eyebrow block", className)} {...rest}>
      {children}
    </span>
  );
}
