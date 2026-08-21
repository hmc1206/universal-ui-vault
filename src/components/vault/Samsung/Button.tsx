import type { ButtonHTMLAttributes, ReactNode } from "react";

export type SamsungButtonVariant = "contained" | "outlined" | "text";
export type SamsungButtonSize = "sm" | "md" | "lg";

export interface SamsungButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 공개 웹 CTA의 표면 유형입니다. */
  variant?: SamsungButtonVariant;
  /** 버튼 크기입니다. sm은 측정된 40px 홈페이지 CTA 기하를 사용합니다. */
  size?: SamsungButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const variantClasses: Record<SamsungButtonVariant, string> = {
  contained: "border-[#000000] bg-[#000000] text-[#ffffff] hover:bg-[#333333] active:bg-[#000000]",
  outlined: "border-[#000000] bg-transparent text-[#000000] hover:bg-[#f7f7f7] active:bg-[#eeeeee]",
  text: "border-transparent bg-transparent text-[#000000] hover:bg-[#f7f7f7] active:bg-[#eeeeee]",
};

const sizeClasses: Record<SamsungButtonSize, string> = {
  sm: "h-10 rounded-[20px] px-6 pb-[9px] pt-2.5 text-sm font-bold leading-[19px]",
  md: "h-11 rounded-[22px] px-7 text-sm font-bold leading-5",
  lg: "h-12 rounded-[24px] px-8 text-base font-bold leading-5",
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
 * 삼성전자 한국 공개 웹의 블랙 40px CTA와 외곽선 CTA를 바탕으로 한 독립형 버튼입니다.
 * SamsungOneKorean은 프로젝트에서 적법하게 로드된 경우에만 우선 적용되며, 웹폰트 파일은 포함하지 않습니다.
 */
export function SamsungButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "sm",
  trailingIcon,
  type = "button",
  variant = "contained",
  ...buttonProps
}: SamsungButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-2 border font-[SamsungOneKorean,sans-serif] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45",
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

export default SamsungButton;
