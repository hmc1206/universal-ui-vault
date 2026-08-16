import type { ButtonHTMLAttributes, ReactNode } from "react";

export type AppleButtonVariant = "primary" | "outline";
export type AppleButtonSize = "marketing" | "compact";

export interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Apple 웹 표면에 맞는 채움 또는 외곽선 액션입니다. */
  variant?: AppleButtonVariant;
  /** 44px 마케팅 CTA 또는 36px 타일 CTA 크기입니다. */
  size?: AppleButtonSize;
  /** 레이블 뒤에 표시할 콘텐츠입니다. */
  trailingIcon?: ReactNode;
  /** 기본 화살표를 표시합니다. */
  showChevron?: boolean;
}

const sizeClasses: Record<AppleButtonSize, string> = {
  marketing: "h-11 gap-1.5 px-[21px] py-[11px] text-[17px] leading-[22px]",
  compact: "h-9 gap-1 px-[15px] py-2 text-sm leading-5",
};

const variantClasses: Record<AppleButtonVariant, string> = {
  primary: "border border-[#0071e3] bg-[#0071e3] text-white",
  outline: "border border-[#0066cc] bg-transparent text-[#0066cc]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" className="h-[0.85em] w-[0.85em] shrink-0" fill="none" viewBox="0 0 16 16">
      <path d="m6 3 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Apple 웹 마케팅 표면의 검증된 CTA 지오메트리를 반영한 독립형 버튼입니다.
 * 44px 마케팅 버튼과 36px 컴팩트 타일 버튼을 각각 명시적으로 지원합니다.
 */
export function AppleButton({
  children,
  className,
  showChevron = false,
  size = "marketing",
  trailingIcon,
  type = "button",
  variant = "primary",
  ...buttonProps
}: AppleButtonProps) {
  return (
    <button
      {...buttonProps}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center rounded-full font-normal tracking-[-0.022em] [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Helvetica_Neue',Arial,sans-serif]",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      type={type}
    >
      <span>{children}</span>
      {trailingIcon ? <span className="flex shrink-0 items-center">{trailingIcon}</span> : showChevron ? <ChevronRight /> : null}
    </button>
  );
}

export default AppleButton;
