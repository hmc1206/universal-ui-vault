import type { HTMLAttributes, ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #000000 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface MusinsaBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Musinsa의 콘텐츠 분류 리듬을 담는 standalone badge입니다. */
export function MusinsaBadge({ children, className, size = "md", tone, variant, ...props }: MusinsaBadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  return <span {...props} className={joinClasses("inline-flex items-center relative overflow-hidden border-white/45 bg-white/68 backdrop-blur-md shadow-[0_6px_16px_rgba(15,23,42,0.08)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current gap-1 border border-[#111111] bg-white font-bold text-[#000000] rounded-none", sizeClass, tone === "accent" || variant === "filled" ? "border-[#000000] bg-[#000000] text-white" : "", className)}>{children}</span>;
}

export default MusinsaBadge;
