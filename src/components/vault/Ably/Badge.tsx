import type { HTMLAttributes, ReactNode } from "react";

export type AblyBadgeVariant = "editorial" | "soft" | "coral" | "neutral";
export type AblyBadgeSize = "sm" | "md";

export interface AblyBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 카테고리 또는 설명 레이블입니다. */
  children: ReactNode;
  /** ABLY Team 기반의 editorial/soft 또는 확장된 coral/neutral 맥락을 선택합니다. */
  variant?: AblyBadgeVariant;
  /** 배지 크기입니다. */
  size?: AblyBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
}

const variantClasses: Record<AblyBadgeVariant, string> = {
  editorial: "border border-transparent bg-white text-[#4e4e4e]",
  soft: "border border-transparent bg-[#fff2ea] text-[#ff5160]",
  coral: "border border-transparent bg-[#ff5160] text-white",
  neutral: "border border-[#e5e7eb] bg-white text-[#1f1f1f]",
};

const sizeClasses: Record<AblyBadgeSize, string> = {
  sm: "min-h-6 rounded-full px-2 text-xs font-semibold leading-4",
  md: "min-h-8 rounded-full px-3 text-sm font-normal leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * ABLY Team의 white editorial pill(24px), pale peach #fff2ea, current coral #ff5160을 활용한 배지 확장입니다.
 * native consumer deal/shipping/status badge는 공개 근거가 없으므로, 이 컴포넌트는 카테고리와 정보 맥락에만 사용합니다.
 */
export function AblyBadge({
  children,
  className,
  leadingIcon,
  size = "sm",
  statusLabel,
  variant = "editorial",
  ...spanProps
}: AblyBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1.5 font-[Pretendard,system-ui,sans-serif] tracking-[-0.02em]",
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

export default AblyBadge;
