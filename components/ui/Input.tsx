"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

/**
 * Form controls for editing structured values. One look for all three:
 * 36px, `rounded-field`, a faint white fill with a hairline, accent focus ring.
 */
const CONTROL =
  "w-full rounded-field bg-white/70 text-[13.5px] text-ink-900 shadow-[inset_0_0_0_1px_rgba(11,18,32,0.1)] " +
  "placeholder:text-ink-300 transition-[background-color,box-shadow] duration-150 ease-out-quart " +
  "hover:bg-white/90 focus:bg-white focus:shadow-[inset_0_0_0_1px_var(--color-accent-500)] focus:outline-none " +
  "disabled:pointer-events-none disabled:opacity-50";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Monospace + tabular numerals (dates, values, ids). */
  mono?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ mono = false, className, type = "text", ...rest }, ref) {
  return <input ref={ref} type={type} className={cn(CONTROL, "h-9 px-3", mono && "font-mono text-[13px] tnum", className)} {...rest} />;
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, children, ...rest }, ref) {
  return (
    <span className={cn("relative block", className)}>
      <select ref={ref} className={cn(CONTROL, "h-9 appearance-none pl-3 pr-8")} {...rest}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-400" aria-hidden />
    </span>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, rows = 4, ...rest },
  ref,
) {
  return <textarea ref={ref} rows={rows} className={cn(CONTROL, "block resize-y px-3 py-2.5 leading-relaxed", className)} {...rest} />;
});
