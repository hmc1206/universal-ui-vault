import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LinearButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type LinearButtonSize = "sm" | "md" | "lg";

export interface LinearButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 시각적 계층을 결정합니다. */
  variant?: LinearButtonVariant;
  /** 버튼의 높이와 여백을 결정합니다. */
  size?: LinearButtonSize;
  /** 버튼 오른쪽에 표시할 단축키 안내입니다. 예: "⌘ K" */
  shortcut?: string;
  /** 비동기 작업이 진행 중인지 나타냅니다. */
  loading?: boolean;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤, 단축키 앞에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
}

const sizeClasses: Record<LinearButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-md px-2.5 text-xs",
  md: "h-9 gap-2 rounded-[7px] px-3 text-[13px]",
  lg: "h-10 gap-2.5 rounded-[8px] px-4 text-sm",
};

const shortcutSizeClasses: Record<LinearButtonSize, string> = {
  sm: "h-4 min-w-4 px-1 text-[9px]",
  md: "h-[18px] min-w-[18px] px-1.5 text-[10px]",
  lg: "h-5 min-w-5 px-1.5 text-[10px]",
};

const variantClasses: Record<LinearButtonVariant, string> = {
  primary:
    "border-[#6974dc] bg-[#5e6ad2] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.35)] hover:border-[#7b85e2] hover:bg-[#6974dc] active:translate-y-px active:bg-[#535ebd]",
  secondary:
    "border-[#303035] bg-[#202023] text-[#f0f0f1] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.3)] hover:border-[#414147] hover:bg-[#28282c] active:translate-y-px active:bg-[#1b1b1e]",
  ghost:
    "border-transparent bg-transparent text-[#b8b8bd] hover:border-[#303035] hover:bg-[#202023] hover:text-[#f3f3f4] active:translate-y-px active:bg-[#27272a]",
  danger:
    "border-[#6b292d] bg-[#3b1d20] text-[#ffb4b7] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.28)] hover:border-[#8c393e] hover:bg-[#4a2024] hover:text-[#ffd4d5] active:translate-y-px active:bg-[#35191c]",
};

const shortcutVariantClasses: Record<LinearButtonVariant, string> = {
  primary: "border-white/15 bg-[#4f5ac2] text-[#eef0ff] group-hover:bg-[#5965cf]",
  secondary: "border-[#3a3a40] bg-[#19191b] text-[#a9a9b0] group-hover:border-[#48484e] group-hover:text-[#d1d1d5]",
  ghost: "border-[#303035] bg-[#19191b] text-[#8e8e96] group-hover:border-[#414147] group-hover:text-[#c8c8cd]",
  danger: "border-[#743135] bg-[#301719] text-[#efa0a3] group-hover:border-[#914146] group-hover:text-[#ffc8ca]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function LoadingSpinner() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

/**
 * Linear의 정밀한 다크 인터페이스를 재현한 독립형 버튼입니다.
 * 아이콘, 로딩 상태, 키보드 단축키 힌트를 하나의 컴포넌트에서 지원합니다.
 */
export function LinearButton({
  children,
  className,
  disabled,
  leadingIcon,
  loading = false,
  shortcut,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "secondary",
  ...buttonProps
}: LinearButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={joinClasses(
        "group relative inline-flex shrink-0 select-none items-center justify-center border font-medium tracking-[-0.01em] outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#5e6ad2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0d] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <LoadingSpinner /> : leadingIcon ? <span className="flex shrink-0 items-center">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
      {!loading && trailingIcon ? <span className="flex shrink-0 items-center">{trailingIcon}</span> : null}
      {shortcut ? (
        <kbd
          className={joinClasses(
            "ml-0.5 inline-flex shrink-0 items-center justify-center rounded border font-sans font-medium leading-none tracking-normal transition-colors duration-150",
            shortcutSizeClasses[size],
            shortcutVariantClasses[variant],
          )}
        >
          {shortcut}
        </kbd>
      ) : null}
    </button>
  );
}

export default LinearButton;
