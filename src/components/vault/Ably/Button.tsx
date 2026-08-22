import type { ButtonHTMLAttributes, ReactNode } from "react";

export type AblyButtonSurface = "consumer-entry" | "team-primary" | "team-soft" | "team-editorial" | "seller-entry";
export type AblyButtonSize = "sm" | "md" | "lg";

export interface AblyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 안에 표시할 레이블 또는 콘텐츠입니다. */
  children: ReactNode;
  /** 근거가 되는 공개 표면을 선택합니다. */
  surface?: AblyButtonSurface;
  /** md는 각 표면의 관측 기하를 사용하며 sm/lg는 재사용을 위한 확장입니다. */
  size?: AblyButtonSize;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 진행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 전체 너비로 확장합니다. */
  fullWidth?: boolean;
}

const surfaceClasses: Record<AblyButtonSurface, string> = {
  "consumer-entry": "border border-[#dddddd] bg-white text-[#1f1f1f]",
  "team-primary": "border border-transparent bg-[#ff5160] text-white",
  "team-soft": "border border-transparent bg-[#fff2ea] text-[#ff5160]",
  "team-editorial": "border border-transparent bg-white text-[#4e4e4e]",
  "seller-entry": "border border-transparent bg-[#ff5160] text-white",
};

const sizeClasses: Record<AblyButtonSize, Record<AblyButtonSurface, string>> = {
  sm: {
    "consumer-entry": "h-6 rounded-[18px] px-2 text-[11px] font-semibold leading-[14px]",
    "team-primary": "h-10 rounded-lg px-5 text-sm font-semibold leading-5",
    "team-soft": "h-9 rounded-lg px-4 text-sm font-semibold leading-5",
    "team-editorial": "h-9 rounded-full px-3 text-sm font-normal leading-5",
    "seller-entry": "h-10 rounded-full px-5 text-sm font-normal leading-5",
  },
  md: {
    "consumer-entry": "h-7 w-[62px] rounded-[20px] px-2 text-xs font-semibold leading-4 tracking-[-0.2px]",
    "team-primary": "h-14 w-40 rounded-xl px-6 text-lg font-semibold leading-6",
    "team-soft": "h-12 w-[312px] rounded-xl px-6 text-base font-semibold leading-5",
    "team-editorial": "h-12 w-[105px] rounded-[24px] px-4 text-base font-normal leading-5",
    "seller-entry": "h-[49px] w-[114px] rounded-full px-[30px] text-sm font-normal leading-5",
  },
  lg: {
    "consumer-entry": "h-9 rounded-[20px] px-4 text-sm font-semibold leading-5",
    "team-primary": "h-16 rounded-xl px-8 text-xl font-semibold leading-7",
    "team-soft": "h-14 rounded-xl px-8 text-lg font-semibold leading-6",
    "team-editorial": "h-14 rounded-[24px] px-6 text-lg font-normal leading-6",
    "seller-entry": "h-14 rounded-full px-9 text-base font-normal leading-6",
  },
};

const fontClasses: Record<AblyButtonSurface, string> = {
  "consumer-entry": "font-[Pretendard,system-ui,sans-serif]",
  "team-primary": "font-[Pretendard,system-ui,sans-serif]",
  "team-soft": "font-[Pretendard,system-ui,sans-serif]",
  "team-editorial": "font-[Pretendard,system-ui,sans-serif]",
  "seller-entry": "font-[Noto_Sans_KR,system-ui,sans-serif]",
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
 * 에이블리 Consumer mobile web, ABLY Team, Seller Square의 관측 버튼을 표면별로 분리한 컴포넌트입니다.
 * md가 각 표면의 실제 공개 기하이며 sm/lg·hover/pressed/loading은 요청된 재사용을 위한 명시적 확장입니다.
 * #ff5160은 current coral identity/action으로 사용하되, native consumer purchase CTA로 주장하지 않습니다.
 */
export function AblyButton({
  children,
  className,
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "md",
  surface = "team-primary",
  trailingIcon,
  type = "button",
  ...buttonProps
}: AblyButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex shrink-0 items-center justify-center gap-2 tracking-[-0.02em] outline-none transition-[filter,transform] hover:brightness-95 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f] disabled:cursor-not-allowed disabled:opacity-45",
        surfaceClasses[surface],
        sizeClasses[size][surface],
        fontClasses[surface],
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

export default AblyButton;
