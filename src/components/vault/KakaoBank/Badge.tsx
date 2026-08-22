import type { HTMLAttributes, ReactNode } from "react";

export type KakaoBankBadgeVariant = "identity" | "neutral" | "section";
export type KakaoBankBadgeSize = "sm" | "md";

export interface KakaoBankBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 서비스 또는 정보 레이블입니다. */
  children: ReactNode;
  /** 보호된 identity, 중립 정보, pale-gray section 레이블을 선택합니다. */
  variant?: KakaoBankBadgeVariant;
  /** 배지 크기입니다. */
  size?: KakaoBankBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
}

const variantClasses: Record<KakaoBankBadgeVariant, string> = {
  identity: "border border-transparent bg-[#FFE300] text-black",
  neutral: "border border-[#e6e6e6] bg-white text-black",
  section: "border border-transparent bg-[#f7f7f7] text-[#444444]",
};

const sizeClasses: Record<KakaoBankBadgeSize, string> = {
  sm: "min-h-6 rounded-none px-2 text-xs font-normal leading-4",
  md: "min-h-8 rounded-none px-3 text-sm font-normal leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * KakaoBank 공개 웹의 #FFE300 identity 역할, 흰 캔버스, #f7f7f7 section, #e6e6e6 divider를 구분한 배지 확장 컴포넌트입니다.
 * identity variant는 보호된 브랜드 식별 맥락에만 사용하며, Yellow를 앱 상태나 일반 금융 행동의 의미색으로 전용하지 않습니다.
 */
export function KakaoBankBadge({
  children,
  className,
  leadingIcon,
  size = "sm",
  statusLabel,
  variant = "neutral",
  ...spanProps
}: KakaoBankBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1.5 font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] tracking-[-0.02em]",
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

export default KakaoBankBadge;
