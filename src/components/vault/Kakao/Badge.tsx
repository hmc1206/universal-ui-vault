import type { HTMLAttributes, ReactNode } from "react";

export type KakaoBadgeVariant = "yellow" | "darkTag" | "neutral" | "outline";
export type KakaoBadgeSize = "sm" | "md";

export interface KakaoBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지의 표면 톤입니다. */
  variant?: KakaoBadgeVariant;
  /** 작은 메타데이터 또는 기본 메타데이터 크기입니다. */
  size?: KakaoBadgeSize;
  /** 텍스트 앞에 표시할 요소입니다. */
  icon?: ReactNode;
  /** 작은 상태 점을 표시합니다. */
  dot?: boolean;
}

const variantClasses: Record<KakaoBadgeVariant, string> = {
  yellow: "bg-[#fae100] text-[#333333]",
  darkTag: "border-2 border-white bg-[#111111] text-white",
  neutral: "bg-[#eeeeee] text-black",
  outline: "border border-[#dbdbdb] bg-white text-[#888888]",
};

const dotClasses: Record<KakaoBadgeVariant, string> = {
  yellow: "bg-[#111111]",
  darkTag: "bg-[#fae100]",
  neutral: "bg-[#333333]",
  outline: "bg-[#fae100]",
};

const sizeClasses: Record<KakaoBadgeSize, string> = {
  sm: "min-h-5 gap-1 rounded-full px-2 text-[11px] leading-4",
  md: "min-h-6 gap-2 rounded-full px-3 text-xs leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 카카오 기업 웹에서 확인된 마케팅 옐로·다크 태그·중립 표면을 사용해 상태나 카테고리를 담는 독립형 배지입니다.
 * 다크 태그는 2px 흰색 테두리와 16px 반경의 확인된 표면 특성을 유지합니다.
 */
export function KakaoBadge({
  children,
  className,
  dot = false,
  icon,
  size = "md",
  variant = "neutral",
  ...spanProps
}: KakaoBadgeProps) {
  const resolvedSizeClass = variant === "darkTag" ? "h-8 gap-1 rounded-2xl px-2 pb-2 pt-[7px] text-[13px] leading-4" : sizeClasses[size];

  return (
    <span
      {...spanProps}
      className={joinClasses(
        "inline-flex max-w-full items-center font-[KakaoSmall,system-ui,sans-serif] font-bold tracking-[-0.02em]",
        resolvedSizeClass,
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

export default KakaoBadge;
