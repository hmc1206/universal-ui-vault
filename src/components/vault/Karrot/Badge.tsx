import type { HTMLAttributes, ReactNode } from "react";

export interface KarrotBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Karrot의 콘텐츠 분류 리듬을 담는 standalone badge입니다. */
export function KarrotBadge({ children, className, size = "md", tone, variant, ...props }: KarrotBadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  return <span {...props} className={joinClasses("inline-flex items-center gap-1 border border-[#ffe1d0] bg-white font-bold text-[#212124] rounded-3xl", sizeClass, tone === "accent" || variant === "filled" ? "border-[#ff6f0f] bg-[#ff6f0f] text-white" : "", className)}>{children}</span>;
}

export default KarrotBadge;
