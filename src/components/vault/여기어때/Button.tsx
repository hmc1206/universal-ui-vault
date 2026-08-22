import type { ButtonHTMLAttributes, ReactNode } from "react";

export type GoodChoiceButtonVariant = "primary" | "outline" | "discount" | "neutral";
export type GoodChoiceButtonSize = "sm" | "md" | "lg";

export interface GoodChoiceButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 예약·탐색 행동의 강조 유형입니다. */
  variant?: GoodChoiceButtonVariant;
  /** 버튼 크기입니다. */
  size?: GoodChoiceButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const variantClasses: Record<GoodChoiceButtonVariant, string> = {
  primary: "border-[#1D8BFF] bg-[#1D8BFF] text-white hover:brightness-95 active:translate-y-px",
  outline: "border-[#E6E6E6] bg-white text-[#222222] hover:bg-[#E3F0FF] active:translate-y-px",
  discount: "border-[#F94239] bg-[#F94239] text-white hover:brightness-95 active:translate-y-px",
  neutral: "border-[#E6E6E6] bg-[#E3F0FF] text-[#222222] hover:bg-white active:translate-y-px",
};

const sizeClasses: Record<GoodChoiceButtonSize, string> = {
  sm: "h-9 rounded-lg px-3 text-sm font-semibold leading-5",
  md: "h-11 rounded-lg px-4 text-base font-semibold leading-6",
  lg: "h-12 rounded-lg px-5 text-base font-semibold leading-6",
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
 * 여기어때 YDS의 Cyan 800 primary action, 8px 반경, enabled·pressed·disabled 상태를 반영한 독립형 버튼입니다.
 * Pretendard가 프로젝트에 적법하게 로드된 경우에만 우선 적용되며, 글꼴 파일은 포함하지 않습니다.
 */
export function GoodChoiceButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "primary",
  ...buttonProps
}: GoodChoiceButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-2 border font-[Pretendard,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[background-color,border-color,filter,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#1D8BFF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#E6E6E6] disabled:bg-[#E6E6E6] disabled:text-[#737373]",
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

export default GoodChoiceButton;
