import type { HTMLAttributes, ReactNode } from "react";

export interface AppleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Apple의 콘텐츠 분류 리듬을 담는 standalone badge입니다. */
export function AppleBadge({ children, className, size = "md", tone, variant, ...props }: AppleBadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  return <span {...props} className={joinClasses("inline-flex items-center gap-1 border border-[#d2d2d7] bg-white font-bold text-[#1d1d1f] rounded-[22px]", sizeClass, tone === "accent" || variant === "filled" ? "border-[#2997ff] bg-[#2997ff] text-white" : "", className)}>{children}</span>;
}

export default AppleBadge;
