import type { ButtonHTMLAttributes, ReactNode } from "react";

export type FigmaButtonVariant = "primary" | "indigo" | "outline";
export type FigmaButtonSize = "sm" | "md" | "lg";

export interface FigmaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 공개 Figma page에서 관측된 action surface입니다. */
  variant?: FigmaButtonVariant;
  /** md는 49px public action, sm/lg는 재사용을 위한 지역 확장입니다. */
  size?: FigmaButtonSize;
  /** 버튼 내용입니다. */
  children: ReactNode;
  /** 진행 중 상태를 화면 읽기 도구에 알립니다. */
  loading?: boolean;
}

const geometryClasses: Record<FigmaButtonVariant, Record<FigmaButtonSize, string>> = {
  primary: {
    sm: "min-h-10 px-4 py-2 text-sm leading-5",
    md: "min-h-[49px] px-[21px] py-3 text-base leading-[23px]",
    lg: "min-h-14 px-6 py-4 text-lg leading-6",
  },
  indigo: {
    sm: "min-h-10 px-4 py-2 text-base leading-5",
    md: "min-h-[49px] px-5 py-3 text-lg leading-[23px]",
    lg: "min-h-14 px-6 py-4 text-xl leading-6",
  },
  outline: {
    sm: "min-h-10 px-4 py-2 text-sm leading-5",
    md: "min-h-[49px] px-[21px] py-3 text-base leading-[23px]",
    lg: "min-h-14 px-6 py-4 text-lg leading-6",
  },
};

const variantClasses: Record<FigmaButtonVariant, string> = {
  primary: "border border-black bg-black text-white font-[330]",
  indigo: "border border-[#4d49fc] bg-[#4d49fc] text-white font-[480]",
  outline: "border border-black bg-transparent text-black font-[330]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Figma public pages의 49px action, 8px radius, black/white primary,
 * #4d49fc alternate action, transparent outline 및 dashed #0d99ff focus를 반영합니다.
 * md가 검증된 public action입니다. sm/lg와 disabled presentation은 요청된 재사용을 위한 지역 확장이며,
 * hover/pressed visual은 캡처에 없으므로 공식 Figma 상태로 표현하지 않습니다.
 */
export function FigmaButton({
  children,
  className,
  loading = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...buttonProps
}: FigmaButtonProps) {
  const isDisabled = Boolean(buttonProps.disabled || loading);

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex items-center justify-center rounded-lg font-['figmaSans'] tracking-[-0.009em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-[#0d99ff]",
        geometryClasses[variant][size],
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

export default FigmaButton;
