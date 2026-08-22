import type { HTMLAttributes, ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #3e6ae1 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export type TeslaBadgeTone = "neutral" | "product" | "contrast";
export type TeslaBadgeSize = "sm" | "md" | "lg";

export interface TeslaBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지 안에 표시할 짧은 콘텐츠입니다. */
  children: ReactNode;
  /** 정보 면의 대비를 선택합니다. */
  tone?: TeslaBadgeTone;
  /** 재사용 크기입니다. */
  size?: TeslaBadgeSize;
}

const sizeClasses: Record<TeslaBadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

const toneClasses: Record<TeslaBadgeTone, string> = {
  neutral: "bg-[#f4f4f4] text-[#393c41]",
  product: "bg-[#3e6ae1] text-white",
  contrast: "bg-white text-[#171a20] ring-1 ring-[#d0d1d2]",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3의 neutral card/#3e6ae1 action 대비를 정보 표면에만 적용한 badge 확장입니다.
 * 공개 마케팅 캡처에는 badge와 semantic status 색이 없으므로 tone은 재사용 목적의 local extension이며 상태 의미를 주장하지 않습니다.
 */
export function TeslaBadge({ children, className, size = "md", tone = "neutral", ...props }: TeslaBadgeProps) {
  return (
    <span
      {...props}
      className={joinClasses("inline-flex items-center relative overflow-hidden border-white/45 bg-white/68 backdrop-blur-md shadow-[0_6px_16px_rgba(15,23,42,0.08)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current rounded-[4px] font-sans font-medium leading-4", sizeClasses[size], toneClasses[tone], className)}
    >
      {children}
    </span>
  );
}

export default TeslaBadge;
