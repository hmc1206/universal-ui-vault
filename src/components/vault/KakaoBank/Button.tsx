import type { ButtonHTMLAttributes, ReactNode } from "react";

export type KakaoBankButtonVariant = "primary" | "secondary" | "outline";
export type KakaoBankButtonSize = "sm" | "md" | "lg";

export interface KakaoBankButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: KakaoBankButtonVariant;
  size?: KakaoBankButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<KakaoBankButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** KakaoBank의 복잡한 숫자도 한눈에 읽히는 가벼운 금융 경험를 행동 표면에 반영한 독립형 버튼입니다. */
export function KakaoBankButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: KakaoBankButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-2xl border border-[#171717] bg-[#ffe300] text-[#171717] hover:-translate-y-0.5 active:translate-y-0" : variant === "secondary" ? "rounded-2xl border border-[#ece2a0] bg-white text-[#171717] hover:bg-[#ffffff]" : "rounded-2xl border border-current bg-transparent text-[#171717] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-sans transition-all duration-300 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default KakaoBankButton;
