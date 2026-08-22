import type { ButtonHTMLAttributes, ReactNode } from "react";

export type MusinsaButtonVariant = "global-store" | "product-utility";
export type MusinsaButtonSize = "sm" | "md" | "lg";

export interface MusinsaButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 근거가 되는 storefront 요소를 선택합니다. */
  variant?: MusinsaButtonVariant;
  /** md는 각 요소의 관측 기하를 사용하며 sm/lg는 재사용을 위한 확장입니다. */
  size?: MusinsaButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const variantClasses: Record<MusinsaButtonVariant, string> = {
  "global-store": "border border-transparent bg-transparent text-white/80",
  "product-utility": "border border-transparent bg-transparent text-black",
};

const sizeClasses: Record<MusinsaButtonSize, Record<MusinsaButtonVariant, string>> = {
  sm: {
    "global-store": "h-10 rounded-none px-1.5 text-sm font-medium leading-5",
    "product-utility": "h-6 rounded-none p-1 text-xs font-normal leading-4",
  },
  md: {
    "global-store": "h-14 rounded-none px-2 text-base font-medium leading-[22px]",
    "product-utility": "h-7 rounded-none p-1 text-sm font-normal leading-[21px]",
  },
  lg: {
    "global-store": "h-16 rounded-none px-3 text-lg font-medium leading-6",
    "product-utility": "h-9 rounded-none p-2 text-base font-normal leading-5",
  },
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function LoadingSpinner() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path className="opacity-90" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

/**
 * 무신사 공개 storefront의 Global-navigation Store Link(56px, 0 8px, 16px/500)와 Product Utility Button(28px, p-1, 14px/400)을 분리한 버튼입니다.
 * md가 관측 기하입니다. sm/lg·hover/pressed/loading은 직접 요청을 위한 확장으로, 관측된 storefront state로 주장하지 않습니다.
 */
export function MusinsaButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "product-utility",
  ...buttonProps
}: MusinsaButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-1 font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif] tracking-normal outline-none transition-[opacity,transform] hover:opacity-70 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-35",
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

export default MusinsaButton;
