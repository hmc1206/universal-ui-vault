import type { HTMLAttributes, ReactNode } from "react";

export type TwentyNineCmBadgeVariant = "sale" | "price-marker" | "filter" | "flag";
export type TwentyNineCmBadgeSize = "sm" | "md";

export interface TwentyNineCmBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 가격, 조건 또는 상태입니다. */
  children: ReactNode;
  /** sale text, price marker, filter chip, compact flag를 선택합니다. */
  variant?: TwentyNineCmBadgeVariant;
  /** 배지 크기입니다. */
  size?: TwentyNineCmBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
  /** Filter Chip 선택 상태를 표시합니다. */
  selected?: boolean;
}

const variantClasses: Record<TwentyNineCmBadgeVariant, string> = {
  sale: "rounded-none border-0 bg-transparent p-0 text-[#ff4800]",
  "price-marker": "rounded-[10px] border border-[#dddddd] bg-white text-black",
  filter: "rounded-full border border-[#dddddd] bg-white text-black",
  flag: "rounded-none border-0 bg-transparent p-0 text-[#474747]",
};

const sizeClasses: Record<TwentyNineCmBadgeSize, Record<TwentyNineCmBadgeVariant, string>> = {
  sm: {
    sale: "text-[13px] font-bold leading-[18.2px]",
    "price-marker": "min-h-7 px-2.5 text-xs font-bold leading-4",
    filter: "min-h-7 px-3 text-xs font-medium leading-4",
    flag: "text-[10px] font-medium leading-3",
  },
  md: {
    sale: "text-sm font-bold leading-5",
    "price-marker": "min-h-8 px-3.5 text-sm font-bold leading-5",
    filter: "min-h-8 px-4 text-sm font-medium leading-5",
    flag: "text-xs font-medium leading-4",
  },
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 29CM BEST Product Grid의 투명 #ff4800 sale text, 10px Price Marker, full-round Filter Chip, 10px flag를 담은 배지입니다.
 * 할인 텍스트는 관측값대로 투명 배경·0px radius로 유지하며, 채워진 sale pill로 바꾸지 않습니다.
 */
export function TwentyNineCmBadge({
  children,
  className,
  leadingIcon,
  selected = false,
  size = "sm",
  statusLabel,
  variant = "filter",
  ...spanProps
}: TwentyNineCmBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      aria-pressed={variant === "filter" ? selected : undefined}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1.5 font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] tracking-[-0.02em]",
        variantClasses[variant],
        sizeClasses[size][variant],
        variant === "filter" && selected && "border-black bg-black text-white",
        className,
      )}
    >
      {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export default TwentyNineCmBadge;
