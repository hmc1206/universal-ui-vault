import type { HTMLAttributes, ReactNode } from "react";

export type TossBadgeVariant = "blue" | "mint" | "yellow" | "coral" | "gray";
export type TossBadgeSize = "sm" | "md" | "lg";

export interface TossBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지의 의미와 색상 톤을 결정합니다. */
  variant?: TossBadgeVariant;
  /** 배지의 높이와 텍스트 크기를 결정합니다. */
  size?: TossBadgeSize;
  /** 텍스트 앞에 표시할 아이콘입니다. */
  icon?: ReactNode;
  /** 텍스트 앞에 상태 점을 표시합니다. */
  dot?: boolean;
  /** 제거 버튼을 표시합니다. */
  removable?: boolean;
  /** 제거 버튼을 눌렀을 때 실행할 함수입니다. */
  onRemove?: () => void;
  /** 제거 버튼의 스크린 리더용 설명입니다. */
  removeLabel?: string;
}

const variantClasses: Record<TossBadgeVariant, string> = {
  blue: "border-[#d8eaff] bg-[#e8f3ff] text-[#3182f6]",
  mint: "border-[#d5f4e8] bg-[#e9faf3] text-[#1d9b6d]",
  yellow: "border-[#ffe9bd] bg-[#fff5df] text-[#d98a00]",
  coral: "border-[#ffe0dc] bg-[#fff0ee] text-[#e65a4f]",
  gray: "border-[#e7e8eb] bg-[#f3f4f6] text-[#6b7280]",
};

const dotClasses: Record<TossBadgeVariant, string> = {
  blue: "bg-[#3182f6]",
  mint: "bg-[#1d9b6d]",
  yellow: "bg-[#e89a00]",
  coral: "bg-[#e65a4f]",
  gray: "bg-[#89909a]",
};

const sizeClasses: Record<TossBadgeSize, string> = {
  sm: "min-h-5 gap-1 rounded-md px-1.5 text-[10px] leading-4",
  md: "min-h-6 gap-1.5 rounded-[7px] px-2 text-xs leading-5",
  lg: "min-h-7 gap-1.5 rounded-lg px-2.5 text-[13px] leading-5",
};

const iconSizeClasses: Record<TossBadgeSize, string> = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-full w-full" fill="none" viewBox="0 0 16 16">
      <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * 토스의 부드러운 파스텔 색감과 친근한 정보 전달 방식을 반영한 독립형 배지입니다.
 * 상태 점, 아이콘, 제거 동작을 선택적으로 조합할 수 있습니다.
 */
export function TossBadge({
  children,
  className,
  dot = false,
  icon,
  onRemove,
  removable = false,
  removeLabel = "배지 제거",
  size = "md",
  variant = "blue",
  ...spanProps
}: TossBadgeProps) {
  const showRemoveButton = removable && Boolean(onRemove);

  return (
    <span
      {...spanProps}
      className={joinClasses(
        "inline-flex max-w-full items-center border font-semibold tracking-[-0.015em] transition-colors duration-150",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={joinClasses("shrink-0 rounded-full", dotClasses[variant], size === "sm" ? "h-1 w-1" : "h-1.5 w-1.5")}
        />
      ) : null}
      {icon ? <span aria-hidden="true" className={joinClasses("flex shrink-0 items-center", iconSizeClasses[size])}>{icon}</span> : null}
      <span className="truncate">{children}</span>
      {showRemoveButton ? (
        <button
          aria-label={removeLabel}
          className={joinClasses(
            "-mr-0.5 inline-flex shrink-0 items-center justify-center rounded-sm opacity-60 outline-none transition-[background-color,opacity,transform] duration-150 hover:bg-black/[0.07] hover:opacity-100 focus-visible:bg-black/[0.08] focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-current/30 active:scale-90",
            iconSizeClasses[size],
          )}
          onClick={onRemove}
          type="button"
        >
          <CloseIcon />
        </button>
      ) : null}
    </span>
  );
}

export default TossBadge;
