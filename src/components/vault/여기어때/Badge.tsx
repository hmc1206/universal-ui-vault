import type { HTMLAttributes, ReactNode } from "react";

export type GoodChoiceBadgeVariant = "price-marker" | "filter" | "soft" | "discount";
export type GoodChoiceBadgeSize = "sm" | "md";

export interface GoodChoiceBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 가격, 조건 또는 상태입니다. */
  children: ReactNode;
  /** Price Marker, Filter Chip, 부드러운 보조, 할인 강조 표면을 선택합니다. */
  variant?: GoodChoiceBadgeVariant;
  /** 배지 크기입니다. */
  size?: GoodChoiceBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
  /** 선택 상태를 표시합니다. */
  selected?: boolean;
}

const variantClasses: Record<GoodChoiceBadgeVariant, string> = {
  "price-marker": "border border-[#E6E6E6] bg-white text-[#222222]",
  filter: "border-[1.5px] border-[#E6E6E6] bg-white text-[#222222]",
  soft: "border border-transparent bg-[#E3F0FF] text-[#222222]",
  discount: "border border-transparent bg-[#FFEDEA] text-[#F94239]",
};

const sizeClasses: Record<GoodChoiceBadgeSize, string> = {
  sm: "min-h-7 rounded-full px-2.5 text-xs font-semibold leading-4",
  md: "min-h-8 rounded-full px-3.5 text-sm font-semibold leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 여기어때의 관측된 Price Marker(흰색·20px 반경)와 Filter Chip(1.5px #E6E6E6·50% 반경)을 담은 독립형 설명용 배지입니다.
 * 색상만으로 조건을 구분하지 않도록 statusLabel 또는 레이블 텍스트를 함께 제공합니다.
 */
export function GoodChoiceBadge({
  children,
  className,
  leadingIcon,
  selected = false,
  size = "sm",
  statusLabel,
  variant = "filter",
  ...spanProps
}: GoodChoiceBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      aria-pressed={variant === "filter" ? selected : undefined}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1.5 font-[Pretendard,system-ui,sans-serif] tracking-[-0.02em]",
        variantClasses[variant],
        sizeClasses[size],
        variant === "filter" && selected && "border-[#1D8BFF] bg-[#E3F0FF] text-[#222222]",
        className,
      )}
    >
      {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export default GoodChoiceBadge;
