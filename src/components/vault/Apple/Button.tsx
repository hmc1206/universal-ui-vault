import type { ButtonHTMLAttributes, ReactNode } from "react";

export type AppleButtonVariant = "primary" | "secondary" | "outline";
export type AppleButtonSize = "sm" | "md" | "lg";

export interface AppleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: AppleButtonVariant;
  size?: AppleButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<AppleButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Apple의 정밀한 도구가 일을 방해하지 않고 자연스럽게 이어집니다를 행동 표면에 반영한 독립형 버튼입니다. */
export function AppleButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: AppleButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-full border-[0.5px] border-white/70 bg-[#0071e3] text-white shadow-[0_10px_30px_rgba(0,113,227,0.18)] hover:brightness-110 active:scale-[0.98]" : variant === "secondary" ? "rounded-[22px] border border-[#d2d2d7] bg-white text-[#1d1d1f] hover:bg-[#ffffff]" : "rounded-[22px] border border-current bg-transparent text-[#1d1d1f] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-['SF_Pro_Display'] transition-all duration-500 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default AppleButton;
