import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LikelionButtonVariant = "account" | "outline" | "search";
export type LikelionButtonSize = "sm" | "md" | "lg";

export interface LikelionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 홈페이지 계정 필, 중립 외곽선, 검색 주목 행동을 선택합니다. */
  variant?: LikelionButtonVariant;
  /** 버튼 크기입니다. md는 관측된 43px 계정 필 기하를 사용합니다. */
  size?: LikelionButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const variantClasses: Record<LikelionButtonVariant, string> = {
  account: "border-[#d4d4d4] bg-transparent text-[#222222] hover:bg-[#fcf4ee] active:bg-[#fcf4ee]",
  outline: "border-[#e5e5e5] bg-white text-[#222222] hover:bg-[#fcf4ee] active:bg-[#fcf4ee]",
  search: "border-[#ff6000] bg-transparent text-[#ff6000] hover:bg-[#fcf4ee] active:bg-[#fcf4ee]",
};

const sizeClasses: Record<LikelionButtonSize, string> = {
  sm: "h-9 rounded-full px-3 text-sm font-normal leading-5",
  md: "h-[43px] rounded-full px-4 text-base font-normal leading-6",
  lg: "h-12 rounded-full px-5 text-base font-semibold leading-6",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function LoadingSpinner() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
      <path className="opacity-90" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * 멋쟁이사자처럼 홈페이지의 43px 계정 필과 헤어라인을 기반으로 한 독립형 버튼 확장 컴포넌트입니다.
 * #ff6000은 일반 CTA가 아니라 관측된 검색·주목 맥락에서만 쓰도록 search variant로 분리합니다.
 */
export function LikelionButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "account",
  ...buttonProps
}: LikelionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-2 border font-[inherit] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <LoadingSpinner /> : leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
      {!loading && trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{trailingIcon}</span> : null}
    </button>
  );
}

export default LikelionButton;
