import type { HTMLAttributes, ReactNode } from "react";

export type UpstageBadgeVariant = "outline" | "conversion" | "pricing";
export type UpstageBadgeSize = "sm" | "md";

export interface UpstageBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 모델, 문서 흐름 또는 카테고리 레이블입니다. */
  children: ReactNode;
  /** 공개 pricing outline, conversion lane, 지원 정보 surface를 선택합니다. */
  variant?: UpstageBadgeVariant;
  /** 배지 크기입니다. */
  size?: UpstageBadgeSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
}

const variantClasses: Record<UpstageBadgeVariant, string> = {
  outline: "border border-[#CDD0D5] bg-white text-[#52525B]",
  conversion: "border border-[#5B52FF] bg-[#5B52FF] text-white",
  pricing: "border border-[#CDD0D5] bg-white text-[#0A0D14]",
};

const sizeClasses: Record<UpstageBadgeSize, string> = {
  sm: "min-h-6 rounded-lg px-2 text-xs font-medium leading-4",
  md: "min-h-8 rounded-lg px-3 text-sm font-medium leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 업스테이지 public action lane(#5B52FF)와 API pricing card(#CDD0D5, white)를 구분한 정보 배지 확장입니다.
 * violet은 conversion context에만 사용하며, success/error/selected 같은 product status 색으로 전용하지 않습니다.
 */
export function UpstageBadge({
  children,
  className,
  leadingIcon,
  size = "sm",
  statusLabel,
  variant = "outline",
  ...spanProps
}: UpstageBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      className={joinClasses("inline-flex max-w-full items-center justify-center gap-1 font-[Geist]", variantClasses[variant], sizeClasses[size], className)}
    >
      {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export default UpstageBadge;
