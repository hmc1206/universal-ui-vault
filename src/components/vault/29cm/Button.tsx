import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TwentyNineCmButtonVariant = "ghost" | "carousel";
export type TwentyNineCmButtonSize = "sm" | "md" | "lg";

export interface TwentyNineCmButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 관측된 Ghost Outline 또는 Carousel Control을 선택합니다. */
  variant?: TwentyNineCmButtonVariant;
  /** 버튼 크기입니다. md는 관측된 52px 컴포넌트 기하를 사용합니다. */
  size?: TwentyNineCmButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const variantClasses: Record<TwentyNineCmButtonVariant, string> = {
  ghost: "border-[#dddddd] bg-white text-black hover:brightness-95 active:translate-y-px",
  carousel: "border-transparent bg-black/50 text-white hover:bg-black/60 active:scale-[0.96]",
};

const sizeClasses: Record<TwentyNineCmButtonSize, Record<TwentyNineCmButtonVariant, string>> = {
  sm: {
    ghost: "h-10 rounded px-3 text-sm font-bold leading-5",
    carousel: "h-10 w-10 rounded-full p-2 text-sm font-normal leading-5",
  },
  md: {
    ghost: "h-[52px] rounded pl-5 pr-4 text-sm font-bold leading-5",
    carousel: "h-[52px] w-[52px] rounded-full p-3.5 text-base font-normal leading-6",
  },
  lg: {
    ghost: "h-14 rounded px-6 text-base font-bold leading-6",
    carousel: "h-14 w-14 rounded-full p-4 text-base font-normal leading-6",
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
 * 29CM 공개 화면에서 관측된 Ghost Outline(흰색·검정·1px #dddddd·4px·52px)과
 * Carousel Control(rgba black·흰색·52px·full-round)을 담은 독립형 버튼입니다.
 * sale accent #ff4800은 투명 배경의 가격/할인 텍스트 전용이므로 버튼 채움으로 사용하지 않습니다.
 */
export function TwentyNineCmButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "ghost",
  ...buttonProps
}: TwentyNineCmButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-2 border font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[background-color,filter,transform] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        sizeClasses[size][variant],
        fullWidth && variant === "ghost" && "w-full",
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <LoadingSpinner /> : leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span className={joinClasses("truncate", variant === "carousel" && "sr-only")}>{children}</span>
      {!loading && trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{trailingIcon}</span> : null}
    </button>
  );
}

export default TwentyNineCmButton;
