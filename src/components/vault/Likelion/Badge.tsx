import type { HTMLAttributes, ReactNode } from "react";

export type LikelionBadgeVariant = "warm" | "outline" | "subtle";
export type LikelionBadgeSize = "sm" | "md";

export interface LikelionBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 카테고리 또는 상태입니다. */
  children: ReactNode;
  /** 따뜻한 프로모션·외곽선·낮은 강조 표면을 선택합니다. */
  variant?: LikelionBadgeVariant;
  /** 배지 크기입니다. */
  size?: LikelionBadgeSize;
  /** 레이블 앞에 표시할 아이콘 또는 점입니다. */
  leadingIcon?: ReactNode;
  /** 상태를 말로 보완하는 접근성 레이블입니다. */
  statusLabel?: string;
}

const variantClasses: Record<LikelionBadgeVariant, string> = {
  warm: "border border-transparent bg-[#fcf4ee] text-[#222222]",
  outline: "border border-[#d4d4d4] bg-transparent text-[#222222]",
  subtle: "border border-[#e5e5e5] bg-white text-[#737373]",
};

const sizeClasses: Record<LikelionBadgeSize, string> = {
  sm: "min-h-6 rounded-full px-2.5 text-xs font-normal leading-4",
  md: "min-h-8 rounded-full px-3.5 text-sm font-normal leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 멋쟁이사자처럼의 따뜻한 프로모션 표면과 계정 필 테두리 위계를 활용한 독립형 설명용 배지 확장 컴포넌트입니다.
 * 홈페이지에는 범용 태그 관측이 없으므로, 이 배지는 행동이 아닌 카테고리·상태 메타데이터로만 사용합니다.
 */
export function LikelionBadge({
  children,
  className,
  leadingIcon,
  size = "sm",
  statusLabel,
  variant = "warm",
  ...spanProps
}: LikelionBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={statusLabel}
      className={joinClasses(
        "inline-flex max-w-full items-center justify-center gap-1.5 font-[inherit] tracking-[-0.02em]",
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

export default LikelionBadge;
