import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TossButtonVariant = "primary" | "secondary" | "outline";
export type TossButtonSize = "sm" | "md" | "lg";

export interface TossButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: TossButtonVariant;
  size?: TossButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<TossButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Toss의 복잡한 일도 넓고 부드러운 흐름으로 바로 시작합니다를 행동 표면에 반영한 독립형 버튼입니다. */
export function TossButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: TossButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-3xl border border-[#3182f6] bg-[#3182f6] text-white shadow-[0_8px_16px_rgba(49,130,246,0.22)] hover:scale-[1.03] active:scale-[0.96]" : variant === "secondary" ? "rounded-3xl border border-[#dcecff] bg-white text-[#191f28] hover:bg-[#ffffff]" : "rounded-3xl border border-current bg-transparent text-[#191f28] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-sans transition-all duration-300 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3182f6] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default TossButton;
