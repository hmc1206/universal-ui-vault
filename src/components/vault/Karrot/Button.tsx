import type { ButtonHTMLAttributes, ReactNode } from "react";

export type KarrotButtonVariant = "primary" | "primaryLow" | "secondary" | "danger" | "marketing";
export type KarrotButtonSize = "sm" | "md" | "lg";

export interface KarrotButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 제품용 또는 마케팅용 버튼 배색입니다. */
  variant?: KarrotButtonVariant;
  /** 4px 리듬에 맞춘 버튼 크기입니다. */
  size?: KarrotButtonSize;
  /** 작업 진행 중임을 표시합니다. */
  loading?: boolean;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 버튼 내용입니다. */
  children: ReactNode;
}

const sizeClasses: Record<KarrotButtonSize, string> = {
  sm: "h-9 gap-2 rounded-md px-3 text-sm",
  md: "h-10 gap-2 rounded-lg px-4 text-[15px]",
  lg: "h-12 gap-2 rounded-lg px-5 text-base",
};

const variantClasses: Record<KarrotButtonVariant, string> = {
  primary:
    "border border-[#ff6f0f] bg-[#ff6f0f] text-white hover:border-[#ff9e66] hover:bg-[#ff9e66] active:border-[#ff9e66] active:bg-[#ff9e66]",
  primaryLow:
    "border border-transparent bg-[#fff5f0] text-[#e55f00] hover:bg-[#ffe9dc] active:bg-[#ffe1d0]",
  secondary:
    "border border-[#eaebee] bg-white text-[#212124] hover:bg-[#f7f8fa] active:bg-[#f2f3f6]",
  danger:
    "border border-[#fa2314] bg-[#fa2314] text-white hover:border-[#ff766a] hover:bg-[#ff766a] active:border-[#ff766a] active:bg-[#ff766a]",
  marketing:
    "border border-[#ff6600] bg-[#ff6600] text-white hover:border-[#ff8a4a] hover:bg-[#ff8a4a] active:border-[#ff8a4a] active:bg-[#ff8a4a]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function Spinner() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

/**
 * 당근 SEED 제품 액션과 마케팅 CTA를 한 파일에서 구분해 제공하는 독립형 버튼입니다.
 * `primary`는 제품 시스템의 #ff6f0f를, `marketing`은 공개 웹의 #ff6600을 사용합니다.
 */
export function KarrotButton({
  children,
  className,
  disabled,
  leadingIcon,
  loading = false,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "primary",
  ...buttonProps
}: KarrotButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 select-none items-center justify-center font-semibold tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#ff6f0f] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#eaebee] disabled:bg-[#eaebee] disabled:text-[#868b94]",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <Spinner /> : leadingIcon ? <span className="flex shrink-0 items-center">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
      {!loading && trailingIcon ? <span className="flex shrink-0 items-center">{trailingIcon}</span> : null}
    </button>
  );
}

export default KarrotButton;
