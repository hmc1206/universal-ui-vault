import type { ButtonHTMLAttributes, ReactNode } from "react";

export type KarrotButtonVariant = "primary" | "secondary" | "outline";
export type KarrotButtonSize = "sm" | "md" | "lg";

export interface KarrotButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: KarrotButtonVariant;
  size?: KarrotButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<KarrotButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Karrot의 가까운 이웃과 따뜻하게 물건과 이야기를 나눠요를 행동 표면에 반영한 독립형 버튼입니다. */
export function KarrotButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: KarrotButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-2xl border border-[#ff6f0f] bg-[#ff6f0f] text-white hover:-translate-y-1 active:translate-y-0" : variant === "secondary" ? "rounded-3xl border border-[#ffe1d0] bg-white text-[#212124] hover:bg-[#fff5f0]" : "rounded-3xl border border-current bg-transparent text-[#212124] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6f0f] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default KarrotButton;
