import type { ButtonHTMLAttributes, ReactNode } from "react";

export type KakaoButtonVariant = "marketing" | "navLight" | "navDark" | "filter" | "footer" | "darkTag" | "ghost";
export type KakaoButtonSize = "sm" | "md" | "lg";

export interface KakaoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 카카오 기업 웹에서 확인된 표면에 맞는 배색과 기하입니다. */
  variant?: KakaoButtonVariant;
  /** 일반 행동에 사용할 크기입니다. 표면 전용 variant는 고정 기하를 우선합니다. */
  size?: KakaoButtonSize;
  /** 작업이 진행 중임을 표시합니다. */
  loading?: boolean;
  /** 레이블 앞에 표시할 요소입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 요소입니다. */
  trailingIcon?: ReactNode;
  /** 버튼 내용입니다. */
  children: ReactNode;
}

const sizeClasses: Record<KakaoButtonSize, string> = {
  sm: "h-9 rounded-xl px-3 text-sm",
  md: "h-11 rounded-2xl px-5 text-base",
  lg: "h-[52px] rounded-2xl px-6 text-base",
};

const variantClasses: Record<KakaoButtonVariant, string> = {
  marketing:
    "border border-[#fae100] bg-[#fae100] text-[#333333] hover:border-[#f3d900] hover:bg-[#f3d900] active:scale-[0.98] active:bg-[#e8d000]",
  navLight:
    "h-[37px] rounded-full border border-transparent bg-white px-4 pb-1.5 pt-1 text-[17px] font-normal text-black hover:border-[#dbdbdb] hover:bg-[#f7f7f7] active:scale-[0.98]",
  navDark:
    "h-[37px] rounded-full border border-transparent bg-black px-4 pb-1.5 pt-1 text-[17px] font-normal text-white hover:border-white/40 hover:bg-[#222222] active:scale-[0.98]",
  filter:
    "h-11 rounded-full border border-transparent bg-[#eeeeee] px-5 pb-3 pt-2 text-base text-black hover:bg-[#e3e3e3] active:scale-[0.98] active:bg-[#d8d8d8]",
  footer:
    "h-10 rounded-[24px] border border-transparent bg-[#eeeeee] px-5 pb-3 pt-2 text-xs font-normal text-black hover:bg-[#e3e3e3] active:scale-[0.98]",
  darkTag:
    "h-8 rounded-2xl border-2 border-white bg-[#111111] px-2 pb-2 pt-[7px] text-[13px] text-white hover:bg-[#242424] active:scale-[0.98]",
  ghost:
    "border border-transparent bg-transparent text-[#333333] hover:bg-[#eeeeee] active:scale-[0.98] active:bg-[#e3e3e3]",
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
 * 카카오 기업 웹의 마케팅·내비게이션·필터·푸터 표면을 구분해 제공하는 독립형 버튼입니다.
 * 카카오 로그인은 기호·색상·레이블 규정을 따르는 별도 통합 컴포넌트이므로 일반 행동 버튼에 포함하지 않습니다.
 */
export function KakaoButton({
  children,
  className,
  disabled,
  leadingIcon,
  loading = false,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "marketing",
  ...buttonProps
}: KakaoButtonProps) {
  const isDisabled = disabled || loading;
  const usesSurfaceGeometry = ["navLight", "navDark", "filter", "footer", "darkTag"].includes(variant);

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 select-none items-center justify-center gap-2 font-[KakaoSmall,system-ui,sans-serif] font-bold leading-[1.4] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#fae100] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#dbdbdb] disabled:bg-[#eeeeee] disabled:text-[#888888]",
        !usesSurfaceGeometry && sizeClasses[size],
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

export default KakaoButton;
