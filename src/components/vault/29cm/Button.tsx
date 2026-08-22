import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TwentyNineCmButtonVariant = "primary" | "secondary" | "outline";
export type TwentyNineCmButtonSize = "sm" | "md" | "lg";

export interface TwentyNineCmButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: TwentyNineCmButtonVariant;
  size?: TwentyNineCmButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<TwentyNineCmButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** 29CM의 정제된 선택을 위한 여백과 선명한 대비를 행동 표면에 반영한 독립형 버튼입니다. */
export function TwentyNineCmButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: TwentyNineCmButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-none border border-black bg-black text-white hover:bg-[#ff4800] active:scale-[0.98]" : variant === "secondary" ? "rounded-none border border-[#d8d8d8] bg-white text-[#111111] hover:bg-[#f7f7f7]" : "rounded-none border border-current bg-transparent text-[#111111] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-sans transition-all duration-300 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default TwentyNineCmButton;
