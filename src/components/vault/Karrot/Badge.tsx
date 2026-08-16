import type { HTMLAttributes, ReactNode } from "react";

export type KarrotBadgeVariant = "neutral" | "primary" | "info" | "success" | "error";
export type KarrotBadgeSize = "sm" | "md";

export interface KarrotBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지의 의미를 나타내는 색상 톤입니다. */
  variant?: KarrotBadgeVariant;
  /** 작은 메타데이터 또는 기본 메타데이터 크기입니다. */
  size?: KarrotBadgeSize;
  /** 텍스트 앞에 표시할 아이콘입니다. */
  icon?: ReactNode;
  /** 작은 상태 점을 표시합니다. */
  dot?: boolean;
}

const variantClasses: Record<KarrotBadgeVariant, string> = {
  neutral: "bg-[#f2f3f6] text-[#51545a]",
  primary: "bg-[#fff5f0] text-[#e55f00]",
  info: "bg-[#e8f7ff] text-[#007fc0]",
  success: "bg-[#e8f7f0] text-[#167c59]",
  error: "bg-[#fff0ef] text-[#d91f12]",
};

const dotClasses: Record<KarrotBadgeVariant, string> = {
  neutral: "bg-[#868b94]",
  primary: "bg-[#ff6f0f]",
  info: "bg-[#009ceb]",
  success: "bg-[#1aa174]",
  error: "bg-[#fa2314]",
};

const sizeClasses: Record<KarrotBadgeSize, string> = {
  sm: "min-h-5 gap-1 rounded-full px-2 text-[11px] leading-4",
  md: "min-h-6 gap-2 rounded-full px-3 text-xs leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 당근의 콘텐츠 중심 화면에서 카테고리와 상태를 조용히 구분하는 독립형 배지입니다.
 * 브랜드 오렌지는 선택·주요 상태에만 제한하고, 다른 색상은 의미 전달에만 사용합니다.
 */
export function KarrotBadge({
  children,
  className,
  dot = false,
  icon,
  size = "md",
  variant = "neutral",
  ...spanProps
}: KarrotBadgeProps) {
  return (
    <span
      {...spanProps}
      className={joinClasses(
        "inline-flex max-w-full items-center font-semibold tracking-[-0.02em]",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className={joinClasses("h-2 w-2 shrink-0 rounded-full", dotClasses[variant])} /> : null}
      {icon ? <span aria-hidden="true" className="flex shrink-0 items-center">{icon}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export default KarrotBadge;
