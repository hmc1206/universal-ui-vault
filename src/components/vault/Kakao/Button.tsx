import type { ButtonHTMLAttributes, ReactNode } from "react";

export type KakaoButtonVariant = "primary" | "secondary" | "outline";
export type KakaoButtonSize = "sm" | "md" | "lg";

export interface KakaoButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: KakaoButtonVariant;
  size?: KakaoButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<KakaoButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Kakao의 가볍게 말을 건네고 바로 이어지는 일상의 연결를 행동 표면에 반영한 독립형 버튼입니다. */
export function KakaoButton({ children, className, disabled, fullWidth = false, loading = false, size = "md", type = "button", variant = "primary", ...props }: KakaoButtonProps) {
  const isDisabled = disabled || loading;
  const variantClass = variant === "primary" ? "rounded-[22px] border border-[#fae100] bg-[#fae100] text-[#3c1e1e] hover:brightness-95 active:scale-[0.97]" : variant === "secondary" ? "rounded-[22px] border border-[#e8d000] bg-white text-[#3c1e1e] hover:bg-[#ffffff]" : "rounded-[22px] border border-current bg-transparent text-[#3c1e1e] hover:bg-black/5";

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses("inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c1e1e] disabled:cursor-not-allowed disabled:opacity-45", sizeClasses[size], variantClass, fullWidth && "w-full", className)}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default KakaoButton;
