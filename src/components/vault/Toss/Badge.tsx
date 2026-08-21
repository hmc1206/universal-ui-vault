import type { HTMLAttributes, ReactNode } from "react";

export type TossBadgeVariant = "fill" | "weak";
export type TossBadgeTone = "primary" | "danger" | "neutral" | "dark";
export type TossBadgeSize = "xs" | "sm" | "md" | "lg";

export interface TossBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 상태 또는 카테고리입니다. */
  children: ReactNode;
  /** 채움 또는 약한 표면을 선택합니다. */
  variant?: TossBadgeVariant;
  /** 상태를 구분하는 색상 톤입니다. */
  tone?: TossBadgeTone;
  /** 배지 크기입니다. */
  size?: TossBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
}

const toneClasses: Record<TossBadgeVariant, Record<TossBadgeTone, string>> = {
  fill: {
    primary: "border-[#3182f6] bg-[#3182f6] text-white",
    danger: "border-[#e42939] bg-[#e42939] text-white",
    neutral: "border-[#4e5968] bg-[#4e5968] text-white",
    dark: "border-[#191f28] bg-[#191f28] text-white",
  },
  weak: {
    primary: "border-[#e8f3ff] bg-[#e8f3ff] text-[#1b64da]",
    danger: "border-[#fff1f1] bg-[#fff1f1] text-[#e42939]",
    neutral: "border-[#f2f4f6] bg-[#f2f4f6] text-[#4e5968]",
    dark: "border-[#e5e8eb] bg-[#f2f4f6] text-[#191f28]",
  },
};

const sizeClasses: Record<TossBadgeSize, string> = {
  xs: "min-h-5 rounded px-1.5 text-[11px] font-semibold leading-4",
  sm: "min-h-6 rounded-md px-2 text-xs font-semibold leading-4",
  md: "min-h-7 rounded-md px-2.5 text-sm font-semibold leading-5",
  lg: "min-h-8 rounded-lg px-3 text-sm font-semibold leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * TDS Mobile의 fill·weak, 의미 톤, 네 단계 크기 계약을 담은 독립형 설명용 배지입니다.
 * 배지는 상태 또는 카테고리를 설명하며 행동을 대신하지 않습니다.
 */
export function TossBadge({
  children,
  className,
  leadingIcon,
  size = "sm",
  statusLabel,
  tone = "primary",
  variant = "weak",
  ...spanProps
}: TossBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1 border font-[Toss\ Product\ Sans,system-ui,sans-serif] tracking-[-0.02em]",
        toneClasses[variant][tone],
        sizeClasses[size],
        className,
      )}
    >
      {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export default TossBadge;
