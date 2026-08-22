import type { HTMLAttributes, ReactNode } from "react";

export type MusinsaBadgeVariant = "outline" | "ink" | "muted";
export type MusinsaBadgeSize = "sm" | "md";

export interface MusinsaBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 카테고리 또는 정보 레이블입니다. */
  children: ReactNode;
  /** 흰 outline, 검정 ink, muted 정보 표면을 선택합니다. */
  variant?: MusinsaBadgeVariant;
  /** 배지 크기입니다. */
  size?: MusinsaBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
}

const variantClasses: Record<MusinsaBadgeVariant, string> = {
  outline: "border border-[#ebebeb] bg-white text-black",
  ink: "border border-black bg-black text-white",
  muted: "border border-[#ebebeb] bg-[#f7f7f7] text-[#666666]",
};

const sizeClasses: Record<MusinsaBadgeSize, string> = {
  sm: "min-h-6 rounded-none px-2 text-xs font-normal leading-4",
  md: "min-h-7 rounded-none px-2 text-sm font-normal leading-[21px]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 무신사 storefront의 black/white/#ebebeb 평면 위계와 14px Pretendard를 활용한 정보 배지 확장입니다.
 * 공개 근거에는 sale/shipping/deal/status badge가 없으므로, 이 컴포넌트는 할인·재고·성공 상태를 암시하지 않는 정보 레이블에만 사용합니다.
 */
export function MusinsaBadge({
  children,
  className,
  leadingIcon,
  size = "sm",
  statusLabel,
  variant = "outline",
  ...spanProps
}: MusinsaBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1 font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export default MusinsaBadge;
