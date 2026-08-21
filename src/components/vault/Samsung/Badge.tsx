import type { HTMLAttributes, ReactNode } from "react";

export type SamsungBadgeVariant = "neutral" | "dark" | "outlined" | "chip";
export type SamsungBadgeSize = "sm" | "md";

export interface SamsungBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 텍스트 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 배지 표면 유형입니다. */
  variant?: SamsungBadgeVariant;
  /** 배지 크기입니다. */
  size?: SamsungBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
}

const variantClasses: Record<SamsungBadgeVariant, string> = {
  neutral: "border border-transparent bg-[#f7f7f7] text-[#000000]",
  dark: "border border-[#000000] bg-[#000000] text-[#ffffff]",
  outlined: "border border-[#dddddd] bg-transparent text-[#000000]",
  chip: "border border-[#dddddd] bg-[#ffffff] text-[#000000]",
};

const sizeClasses: Record<SamsungBadgeSize, string> = {
  sm: "min-h-6 rounded-[20px] px-2.5 text-xs font-bold leading-4",
  md: "min-h-8 rounded-[20px] px-3.5 text-sm font-bold leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 삼성전자 공개 웹에서 관측된 흰색·회색·검정 표면 및 둥근 CTA 기하를 재사용한 독립형 인라인 배지입니다.
 * 의미별 색상 체계는 현재 패킷에 없으므로, 상태는 색상보다 텍스트로 구분합니다.
 */
export function SamsungBadge({
  children,
  className,
  leadingIcon,
  size = "sm",
  statusLabel,
  variant = "neutral",
  ...spanProps
}: SamsungBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1.5 font-[SamsungOneKorean,sans-serif] tracking-[-0.02em]",
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

export default SamsungBadge;
