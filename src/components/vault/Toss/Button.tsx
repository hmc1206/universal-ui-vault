import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TossButtonSurface = "product" | "marketing";
export type TossButtonVariant = "primary" | "danger" | "light" | "dark" | "weak";
export type TossButtonSize = "sm" | "md" | "lg" | "xlarge";

export interface TossButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** TDS 제품 버튼 또는 toss.im 마케팅 버튼 표면을 명시합니다. */
  surface?: TossButtonSurface;
  /** 표면 안에서 사용할 의미·강조 유형입니다. */
  variant?: TossButtonVariant;
  /** 제품 버튼 크기입니다. xlarge는 TDS의 기본 터치 행동 기하를 사용합니다. */
  size?: TossButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시하되 버튼 너비를 유지합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const productVariantClasses: Record<TossButtonVariant, string> = {
  primary: "border-[#3182f6] bg-[#3182f6] text-white hover:border-[#2272eb] hover:bg-[#2272eb] active:border-[#2272eb] active:bg-[#2272eb]",
  danger: "border-[#e42939] bg-[#e42939] text-white hover:bg-[#cc2736] active:bg-[#cc2736]",
  light: "border-[#e5e8eb] bg-[#f2f4f6] text-[#191f28] hover:bg-[#e5e8eb] active:bg-[#e5e8eb]",
  dark: "border-[#191f28] bg-[#191f28] text-white hover:bg-[#333d4b] active:bg-[#333d4b]",
  weak: "border-[#e8f3ff] bg-[#e8f3ff] text-[#1b64da] hover:bg-[#dcecff] active:bg-[#dcecff]",
};

const productSizeClasses: Record<TossButtonSize, string> = {
  sm: "h-8 rounded-lg px-3 text-sm font-semibold leading-5",
  md: "h-[38px] rounded-[10px] px-4 text-sm font-semibold leading-5",
  lg: "h-12 rounded-[14px] px-5 text-base font-semibold leading-6",
  xlarge: "h-14 rounded-2xl px-5 text-[17px] font-semibold leading-6",
};

const marketingVariantClasses: Record<TossButtonVariant, string> = {
  primary: "border-[#e8f3ff] bg-[#e8f3ff] text-[#1b64da]",
  danger: "border-[#e42939] bg-[#e42939] text-white",
  light: "border-[#e8f3ff] bg-[#e8f3ff] text-[#1b64da]",
  dark: "border-transparent bg-[rgba(0,12,30,0.8)] text-white",
  weak: "border-[#e8f3ff] bg-[#e8f3ff] text-[#1b64da]",
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
 * TDS Mobile 버튼과 toss.im 마케팅 CTA를 surface prop으로 명시적으로 분리한 독립형 버튼입니다.
 * Toss Product Sans가 프로젝트에 적법하게 로드된 경우에만 우선 적용되며, 글꼴 파일은 포함하지 않습니다.
 */
export function TossButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "xlarge",
  surface = "product",
  trailingIcon,
  type = "button",
  variant = "primary",
  ...buttonProps
}: TossButtonProps) {
  const isDisabled = disabled || loading;
  const isMarketingDark = surface === "marketing" && variant === "dark";
  const sizeClass = surface === "marketing"
    ? isMarketingDark
      ? "h-[46px] rounded-[7px] px-4 text-[17px] font-semibold leading-6"
      : "h-10 rounded-[7px] px-4 text-[15px] font-semibold leading-5"
    : productSizeClasses[size];

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "relative inline-flex shrink-0 items-center justify-center gap-2 border font-[Toss\ Product\ Sans,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#3182f6] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45",
        surface === "product" ? productVariantClasses[variant] : marketingVariantClasses[variant],
        sizeClass,
        fullWidth && "w-full",
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <LoadingSpinner /> : leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className={joinClasses("truncate", loading && "opacity-0")}>{children}</span>
      {!loading && trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{trailingIcon}</span> : null}
      {loading ? <span className="sr-only">처리 중</span> : null}
    </button>
  );
}

export default TossButton;
