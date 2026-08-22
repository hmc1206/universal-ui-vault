import type { ButtonHTMLAttributes, ReactNode } from "react";

export type KakaoBankButtonVariant = "corporate" | "resource";
export type KakaoBankButtonSize = "sm" | "md" | "lg";

export interface KakaoBankButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 공개 Corporate Action 또는 Brand Resource Download를 선택합니다. */
  variant?: KakaoBankButtonVariant;
  /** 버튼 크기입니다. md는 관측된 공개 웹 기하를 사용합니다. */
  size?: KakaoBankButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const variantClasses: Record<KakaoBankButtonVariant, string> = {
  corporate: "bg-black text-white hover:brightness-95 active:translate-y-px",
  resource: "bg-black text-white hover:brightness-95 active:translate-y-px",
};

const sizeClasses: Record<KakaoBankButtonSize, Record<KakaoBankButtonVariant, string>> = {
  sm: {
    corporate: "h-9 rounded-md px-3 text-sm font-semibold leading-5",
    resource: "h-9 rounded-md px-3 text-sm font-normal leading-5",
  },
  md: {
    corporate: "h-[42px] rounded-md px-[18px] text-[15px] font-semibold leading-5",
    resource: "h-[43px] rounded-md pl-5 pr-4 text-base font-normal leading-6",
  },
  lg: {
    corporate: "h-12 rounded-md px-6 text-base font-semibold leading-6",
    resource: "h-12 rounded-md px-6 text-base font-normal leading-6",
  },
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
 * KakaoBank 공개 웹에서 관측된 6px 검정 Corporate Action(42px)과 Brand Resource Download(43px)를 담은 버튼입니다.
 * #FFE300은 보호된 공식 identity 색상이며, 공개 증거 없는 Yellow CTA로 전용하지 않습니다.
 * sm/lg는 요청된 재사용성을 위한 확장이고 md가 관측된 기하입니다.
 */
export function KakaoBankButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "corporate",
  ...buttonProps
}: KakaoBankButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-2 border border-transparent font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[filter,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-[#888888] disabled:text-white",
        variantClasses[variant],
        sizeClasses[size][variant],
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

export default KakaoBankButton;
