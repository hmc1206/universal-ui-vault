import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #ff5160 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export type AblyButtonVariant = "primary" | "secondary" | "outline";
export type AblyButtonSize = "sm" | "md" | "lg";

export interface AblyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: AblyButtonVariant;
  size?: AblyButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<AblyButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Ably의 좋아하는 것을 빠르게 발견하고 함께 나누는 쇼핑를 행동 표면에 반영한 독립형 버튼입니다. */
export function AblyButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: AblyButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-3xl border border-[#ff5160] bg-[#ff5160] text-white hover:scale-105 active:scale-95" : variant === "secondary" ? "rounded-3xl border border-[#ffd5db] bg-white text-[#2b1d22] hover:bg-[#fff2f4]" : "rounded-3xl border border-current bg-transparent text-[#2b1d22] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("relative isolate inline-flex items-center justify-center gap-2 overflow-hidden before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[inherit] before:bg-gradient-to-br before:from-white/55 before:via-white/0 before:to-[#ff5160]/30 before:opacity-90 backdrop-blur-sm font-sans transition-all duration-200 ease-out outline-none motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5160] disabled:cursor-not-allowed shadow-[0_10px_26px_rgba(15,23,42,0.14)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.18)] active:translate-y-0 active:scale-[0.985] disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default AblyButton;
