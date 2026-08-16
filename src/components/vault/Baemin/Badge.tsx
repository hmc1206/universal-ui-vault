import type { HTMLAttributes, ReactNode } from "react";

export type BaeminBadgeVariant = "mint" | "neutral" | "dark" | "outline";
export type BaeminBadgeSize = "sm" | "md";

export interface BaeminBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지의 표면 톤입니다. */
  variant?: BaeminBadgeVariant;
  /** 작은 메타데이터 또는 기본 메타데이터 크기입니다. */
  size?: BaeminBadgeSize;
  /** 텍스트 앞에 표시할 요소입니다. */
  icon?: ReactNode;
  /** 작은 상태 점을 표시합니다. */
  dot?: boolean;
}

const variantClasses: Record<BaeminBadgeVariant, string> = {
  mint: "bg-[#0cefd3] text-[#222222]",
  neutral: "bg-[#f3f4f5] text-[#232324]",
  dark: "bg-[#232324] text-white",
  outline: "border border-[#a6a7a9] bg-white text-[#6c6d6f]",
};

const dotClasses: Record<BaeminBadgeVariant, string> = {
  mint: "bg-[#222222]",
  neutral: "bg-[#6c6d6f]",
  dark: "bg-[#0cefd3]",
  outline: "bg-[#0cefd3]",
};

const sizeClasses: Record<BaeminBadgeSize, string> = {
  sm: "min-h-5 gap-1 rounded-full px-2 text-[11px] leading-4",
  md: "min-h-6 gap-2 rounded-full px-3 text-xs leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 배달의민족 공개 웹의 민트·중립·진한 전경 토큰을 사용해 상태나 카테고리를 담는 독립형 배지입니다.
 * 별도 의미 색상은 추정하지 않고, 색상 대신 레이블과 상태 점으로 정보를 구분합니다.
 */
export function BaeminBadge({
  children,
  className,
  dot = false,
  icon,
  size = "md",
  variant = "neutral",
  ...spanProps
}: BaeminBadgeProps) {
  return (
    <span
      {...spanProps}
      className={joinClasses(
        "inline-flex max-w-full items-center font-[BAEMINWORK,system-ui,sans-serif] font-bold tracking-[-0.02em]",
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

export default BaeminBadge;
