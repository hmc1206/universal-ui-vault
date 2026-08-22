import type { ButtonHTMLAttributes, ReactNode } from "react";

export type GoodChoiceButtonVariant = "primary" | "secondary" | "outline";
export type GoodChoiceButtonSize = "sm" | "md" | "lg";

export interface GoodChoiceButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: GoodChoiceButtonVariant;
  size?: GoodChoiceButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<GoodChoiceButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** 여기어때의 떠나고 싶은 순간을 넓게 열어 두는 여행의 시작를 행동 표면에 반영한 독립형 버튼입니다. */
export function GoodChoiceButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: GoodChoiceButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-xl border border-[#f94239] bg-[#f94239] text-white shadow-[0_7px_0_#bd2f28] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none" : variant === "secondary" ? "rounded-2xl border border-[#ffd2cf] bg-white text-[#222222] hover:bg-[#ffffff]" : "rounded-2xl border border-current bg-transparent text-[#222222] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-sans transition-all duration-300 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f94239] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default GoodChoiceButton;
