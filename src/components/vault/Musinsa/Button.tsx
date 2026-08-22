import type { ButtonHTMLAttributes, ReactNode } from "react";

export type MusinsaButtonVariant = "primary" | "secondary" | "outline";
export type MusinsaButtonSize = "sm" | "md" | "lg";

export interface MusinsaButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: MusinsaButtonVariant;
  size?: MusinsaButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<MusinsaButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Musinsa의 강한 대비와 선명한 기준으로 룩을 빠르게 선택합니다를 행동 표면에 반영한 독립형 버튼입니다. */
export function MusinsaButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: MusinsaButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-none border border-black bg-black text-white hover:bg-white hover:text-black active:translate-y-px" : variant === "secondary" ? "rounded-none border border-[#111111] bg-white text-[#000000] hover:bg-[#ffffff]" : "rounded-none border border-current bg-transparent text-[#000000] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-sans font-black transition-all duration-150 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000000] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default MusinsaButton;
