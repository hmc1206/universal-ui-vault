import type { ButtonHTMLAttributes, ReactNode } from "react";

export type UpstageButtonVariant = "primary" | "secondary";
export type UpstageButtonSize = "sm" | "md" | "lg";

export interface UpstageButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 공개 filled 또는 outlined conversion action을 선택합니다. */
  variant?: UpstageButtonVariant;
  /** md는 관측된 공개 action 기하를 사용하며 sm/lg는 재사용을 위한 확장입니다. */
  size?: UpstageButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const variantClasses: Record<UpstageButtonVariant, string> = {
  primary: "border border-[#5B52FF] bg-[#5B52FF] text-white",
  secondary: "border border-[#5B52FF] bg-white text-[#5B52FF]",
};

const sizeClasses: Record<UpstageButtonSize, string> = {
  sm: "h-9 rounded-lg px-3 text-sm font-medium leading-5",
  md: "h-12 rounded-lg px-[18px] text-base font-medium leading-6",
  lg: "h-14 rounded-lg px-6 text-lg font-medium leading-7",
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
 * 업스테이지 공개 홈에서 관측된 primary/secondary action(#5B52FF, 8px, 12px 18px, 16px/500)을 반영한 버튼입니다.
 * md가 관측 기하입니다. sm/lg·hover/pressed/loading은 사용자 요청을 위한 확장이며, 관측된 public interaction state로 주장하지 않습니다.
 */
export function UpstageButton({
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
}: UpstageButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-2 font-[Geist] tracking-normal outline-none transition-[filter,transform] hover:brightness-95 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0D14] disabled:cursor-not-allowed disabled:opacity-45",
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

export default UpstageButton;
