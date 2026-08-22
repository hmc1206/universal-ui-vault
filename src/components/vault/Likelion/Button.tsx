import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LikelionButtonVariant = "primary" | "secondary" | "outline";
export type LikelionButtonSize = "sm" | "md" | "lg";

export interface LikelionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: LikelionButtonVariant;
  size?: LikelionButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<LikelionButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Likelion의 배우고 만들고 실행하며 성장하는 빌더의 다음 줄를 행동 표면에 반영한 독립형 버튼입니다. */
export function LikelionButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: LikelionButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-xl border border-[#222222] bg-[#ff6000] text-white hover:translate-x-1 active:translate-y-px" : variant === "secondary" ? "rounded-xl border border-[#f4c6a7] bg-white text-[#222222] hover:bg-[#fcf4ee]" : "rounded-xl border border-current bg-transparent text-[#222222] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-mono transition-all duration-200 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6000] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default LikelionButton;
