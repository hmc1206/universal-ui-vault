import type { ButtonHTMLAttributes, ReactNode } from "react";

export type BaeminButtonVariant = "primary" | "light" | "overlay" | "ghost" | "download";
export type BaeminButtonSize = "sm" | "md" | "lg";

export interface BaeminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼이 놓이는 확인된 표면에 맞는 배색입니다. */
  variant?: BaeminButtonVariant;
  /** 제품 행동에 맞는 버튼 크기입니다. */
  size?: BaeminButtonSize;
  /** 작업이 진행 중임을 표시합니다. */
  loading?: boolean;
  /** 레이블 앞에 표시할 요소입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 요소입니다. */
  trailingIcon?: ReactNode;
  /** 버튼 내용입니다. */
  children: ReactNode;
}

const sizeClasses: Record<BaeminButtonSize, string> = {
  sm: "h-10 rounded-lg px-4 text-sm",
  md: "h-[52px] rounded-lg px-[22px] text-base",
  lg: "h-14 rounded-xl px-6 text-base",
};

const variantClasses: Record<BaeminButtonVariant, string> = {
  primary:
    "border border-[#0cefd3] bg-[#0cefd3] text-[#222222] hover:border-[#62f4e2] hover:bg-[#62f4e2] active:scale-[0.98] active:border-[#0cefd3] active:bg-[#0cefd3]",
  light:
    "border border-transparent bg-[#f3f4f5] text-[#232324] hover:bg-[#e7e8e9] active:scale-[0.98] active:bg-[#dde0e1]",
  overlay:
    "border border-white bg-black/30 text-white hover:bg-black/40 active:scale-[0.98] active:bg-black/50",
  ghost:
    "border border-transparent bg-transparent text-[#232324] hover:bg-[#f3f4f5] active:scale-[0.98] active:bg-[#e7e8e9]",
  download:
    "h-[54px] rounded-xl border border-[#e7e7e7] bg-white px-[19px] text-[14px] font-normal text-[#222222] hover:border-[#c9c9c9] hover:bg-[#fafafa] active:scale-[0.98] active:bg-[#f6f6f6]",
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
 * 배달의민족의 밝은 민트 제품 행동과 현재 공개 웹의 카드형·기업형 컨트롤을 구분해 제공하는 독립형 버튼입니다.
 * WORK 글꼴이 프로젝트에 적법하게 로드된 경우 우선 적용되며, 이 파일은 글꼴 파일을 포함하거나 대체하지 않습니다.
 */
export function BaeminButton({
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
}: BaeminButtonProps) {
  const isDisabled = disabled || loading;
  const resolvedSizeClass = variant === "download" ? "" : sizeClasses[size];

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 select-none items-center justify-center gap-2 font-[BAEMINWORK,system-ui,sans-serif] font-bold leading-[1.4] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#0cefd3] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#cccccc] disabled:bg-[#f3f4f5] disabled:text-[#cccccc]",
        resolvedSizeClass,
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

export default BaeminButton;
