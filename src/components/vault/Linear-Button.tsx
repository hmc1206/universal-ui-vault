import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LinearButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type LinearButtonSize = "sm" | "md" | "lg";

export interface LinearButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 작업의 우선순위에 맞는 버튼 변형입니다. */
  variant?: LinearButtonVariant;
  /** 버튼의 높이와 밀도를 결정합니다. */
  size?: LinearButtonSize;
  /** 오른쪽에 표시할 단축키입니다. 예: "⌘ K" 또는 "G B" */
  shortcut?: string;
  /** 실행 중 상태를 표시합니다. */
  loading?: boolean;
  /** 레이블 앞에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 레이블 뒤, 단축키 앞에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
}

const sizeClasses: Record<LinearButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-md px-2.5 text-xs",
  md: "h-9 gap-2 rounded-[7px] px-3 text-[13px]",
  lg: "h-10 gap-2.5 rounded-[8px] px-3.5 text-sm",
};

const shortcutSizeClasses: Record<LinearButtonSize, string> = {
  sm: "h-4 min-w-4 px-1 text-[9px]",
  md: "h-[18px] min-w-[18px] px-1.5 text-[10px]",
  lg: "h-5 min-w-5 px-1.5 text-[10px]",
};

const variantClasses: Record<LinearButtonVariant, string> = {
  primary:
    "border-[#737ee2] bg-[#5e6ad2] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.45)] hover:border-[#8992ea] hover:bg-[#6974dc] active:border-[#4d57b6] active:bg-[#525dbc]",
  secondary:
    "border-[#343438] bg-[#202023] text-[#ededf0] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_1px_2px_rgba(0,0,0,0.4)] hover:border-[#45454b] hover:bg-[#27272b] hover:text-white active:border-[#2c2c30] active:bg-[#1a1a1d]",
  ghost:
    "border-transparent bg-transparent text-[#b8b8c0] shadow-none hover:border-[#303034] hover:bg-[#1e1e21] hover:text-[#f1f1f3] active:bg-[#262629]",
  danger:
    "border-[#713238] bg-[#3c1d21] text-[#ffb5b8] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.36)] hover:border-[#914048] hover:bg-[#4a2025] hover:text-[#ffd5d7] active:bg-[#33191c]",
};

const shortcutClasses: Record<LinearButtonVariant, string> = {
  primary: "border-white/15 bg-[#4f59bb] text-[#f0f1ff] group-hover:bg-[#5864ca]",
  secondary: "border-[#3b3b40] bg-[#171719] text-[#9898a2] group-hover:border-[#4a4a50] group-hover:text-[#c9c9cf]",
  ghost: "border-[#333337] bg-[#171719] text-[#8d8d96] group-hover:border-[#444449] group-hover:text-[#c6c6cc]",
  danger: "border-[#78353b] bg-[#32181b] text-[#efa2a5] group-hover:border-[#934249] group-hover:text-[#ffc8ca]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function Spinner() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

/**
 * Linear의 고밀도 다크 인터페이스를 위한 독립형 액션 버튼입니다.
 * 1px 보더, 절제된 모노톤 대비, 내장된 키보드 단축키 안내를 제공합니다.
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
        "group relative inline-flex shrink-0 select-none items-center justify-center border font-medium tracking-[-0.01em] outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#5e6ad2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0d] active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <Spinner /> : leadingIcon ? <span className="flex shrink-0 items-center">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>
      {!loading && trailingIcon ? <span className="flex shrink-0 items-center">{trailingIcon}</span> : null}
      {shortcut ? (
        <kbd
          className={joinClasses(
            "ml-0.5 inline-flex shrink-0 items-center justify-center rounded border font-mono font-medium leading-none tracking-normal transition-colors duration-150",
            shortcutSizeClasses[size],
            shortcutClasses[variant],
          )}
        >
          {shortcut}
        </kbd>
      ) : null}
    </button>
  );
}

export default LinearButton;
