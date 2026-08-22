import type { HTMLAttributes, ReactNode } from "react";

export interface LikelionBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Likelion의 콘텐츠 분류 리듬을 담는 standalone badge입니다. */
export function LikelionBadge({ children, className, size = "md", tone, variant, ...props }: LikelionBadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  return <span {...props} className={joinClasses("inline-flex items-center gap-1 border border-[#f4c6a7] bg-white font-bold text-[#222222] rounded-xl", sizeClass, tone === "accent" || variant === "filled" ? "border-[#ff6000] bg-[#ff6000] text-white" : "", className)}>{children}</span>;
}

export default LikelionBadge;
