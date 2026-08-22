import type { ButtonHTMLAttributes, ReactNode } from "react";

export type AppleButtonVariant = "primary" | "outline" | "dark-link";
export type AppleButtonSize = "sm" | "md" | "lg";

export interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 공개 웹 표면에 맞는 action variant입니다. */
  variant?: AppleButtonVariant;
  /** sm은 검증된 36px compact control, md/lg는 검증된 44px marketing control입니다. */
  size?: AppleButtonSize;
  /** 버튼에 표시할 내용입니다. */
  children: ReactNode;
  /** 진행 중 상태를 화면 읽기 도구에 알립니다. */
  loading?: boolean;
}

const variantClasses: Record<AppleButtonVariant, string> = {
  primary: "border border-[#0071e3] bg-[#0071e3] text-white",
  outline: "border border-[#0066cc] bg-transparent text-[#0066cc]",
  "dark-link": "border border-transparent bg-transparent text-[#2997ff]",
};

const sizeClasses: Record<AppleButtonSize, string> = {
  sm: "min-h-9 px-[15px] py-2 text-sm leading-5",
  md: "min-h-11 px-[21px] py-[11px] text-[17px] leading-[22px]",
  lg: "min-h-11 px-[21px] py-[11px] text-[17px] leading-[22px]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * apple.com marketing의 검증된 pill action을 분리해 표현합니다.
 * hover/pressed/disabled 표면은 캡처에 없었으므로 공식 Apple 상태로 표현하지 않습니다.
 * focus-visible outline은 웹 접근성을 위한 지역 확장입니다.
 */
export function AppleButton({
  children,
  className,
  loading = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...buttonProps
}: AppleButtonProps) {
  const isDisabled = Boolean(buttonProps.disabled || loading);

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex items-center justify-center rounded-[980px] font-['SF_Pro_Text'] font-normal tracking-[-0.01em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]",
        sizeClasses[size],
        variantClasses[variant],
        isDisabled && "cursor-not-allowed opacity-55",
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="sr-only">처리 중: </span> : null}
      {children}
    </button>
  );
}

export default AppleButton;
