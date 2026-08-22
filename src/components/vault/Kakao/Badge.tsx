import type { HTMLAttributes, ReactNode } from "react";

export interface KakaoBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Kakao의 콘텐츠 분류 리듬을 담는 standalone badge입니다. */
export function KakaoBadge({ children, className, size = "md", tone, variant, ...props }: KakaoBadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  return <span {...props} className={joinClasses("inline-flex items-center gap-1 border border-[#e8d000] bg-white font-bold text-[#3c1e1e] rounded-[22px]", sizeClass, tone === "accent" || variant === "filled" ? "border-[#3c1e1e] bg-[#3c1e1e] text-white" : "", className)}>{children}</span>;
}

export default KakaoBadge;
