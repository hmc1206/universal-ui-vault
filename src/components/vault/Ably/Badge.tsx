import type { HTMLAttributes, ReactNode } from "react";

export interface AblyBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Ably의 콘텐츠 분류 리듬을 담는 standalone badge입니다. */
export function AblyBadge({ children, className, size = "md", tone, variant, ...props }: AblyBadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  return <span {...props} className={joinClasses("inline-flex items-center gap-1 border border-[#ffd5db] bg-white font-bold text-[#2b1d22] rounded-3xl", sizeClass, tone === "accent" || variant === "filled" ? "border-[#ff5160] bg-[#ff5160] text-white" : "", className)}>{children}</span>;
}

export default AblyBadge;
