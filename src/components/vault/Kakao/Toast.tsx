import { useEffect, type HTMLAttributes } from "react";

export type KakaoToastVariant = "success" | "warning" | "error";

export interface KakaoToastAction {
  /** 현재 안내와 직접 연결된 한 가지 행동입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: () => void;
}

export interface KakaoToastProps extends HTMLAttributes<HTMLDivElement> {
  /** 안내의 성격입니다. */
  variant?: KakaoToastVariant;
  /** 한 문장으로 현재 상태를 설명하는 내용입니다. */
  message?: string;
  /** 최대 한 개의 후속 행동입니다. */
  action?: KakaoToastAction;
  /** 토스트를 보이거나 화면 밖으로 이동합니다. */
  visible?: boolean;
  /** 자동으로 닫기까지 기다릴 시간입니다. 0이면 자동으로 닫지 않습니다. */
  duration?: number;
  /** 자동 닫기 또는 닫기 버튼에서 호출됩니다. */
  onDismiss?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
}

const variantClasses: Record<KakaoToastVariant, string> = {
  success: "border-[#fae100] bg-[#fae100] text-[#333333]",
  warning: "border-[#dbdbdb] bg-white text-[#333333]",
  error: "border-[#111111] bg-[#111111] text-white",
};

const actionClasses: Record<KakaoToastVariant, string> = {
  success: "text-[#111111] focus-visible:ring-[#111111] focus-visible:ring-offset-[#fae100]",
  warning: "text-[#333333] focus-visible:ring-[#fae100] focus-visible:ring-offset-white",
  error: "text-white underline decoration-white/60 focus-visible:ring-white focus-visible:ring-offset-[#111111]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
      <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

/**
 * 카카오의 친숙하고 짧은 서비스 안내를 위한 독립형 토스트입니다.
 * 공식 고정 모션 토큰이 없으므로 화면 모서리 전환은 200ms의 지역 구현으로 한정하며, 의미색은 검증된 옐로·중립 표면만 사용합니다.
 */
export function KakaoToast({
  action,
  className,
  dismissible = false,
  duration = 3000,
  message,
  onDismiss,
  role,
  variant = "success",
  visible = true,
  ...divProps
}: KakaoToastProps) {
  const defaultMessage =
    variant === "success"
      ? "보낸 내용을 확인했어요."
      : variant === "warning"
        ? "내용을 한 번 더 확인해 주세요."
        : "지금은 연결할 수 없어요. 잠시 후 다시 시도해 주세요.";
  const showDismissButton = dismissible && Boolean(onDismiss);

  useEffect(() => {
    if (!visible || duration <= 0 || !onDismiss) {
      return undefined;
    }

    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onDismiss, visible]);

  return (
    <div
      {...divProps}
      aria-atomic="true"
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={joinClasses(
        "fixed bottom-4 right-4 z-50 flex w-[calc(100%-32px)] max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 font-[KakaoSmall,system-ui,sans-serif] text-sm font-normal leading-5 tracking-[-0.02em] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
        variantClasses[variant],
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0",
        className,
      )}
      role={role ?? (variant === "error" ? "alert" : "status")}
    >
      <span className={joinClasses("h-2 w-2 shrink-0 rounded-full", variant === "success" ? "bg-[#111111]" : variant === "warning" ? "bg-[#fae100]" : "bg-white")} />
      <p className="min-w-0 flex-1">{message ?? defaultMessage}</p>
      {action ? (
        <button
          className={joinClasses("shrink-0 text-xs font-bold outline-none focus-visible:ring-2 focus-visible:ring-offset-2", actionClasses[variant])}
          onClick={action.onClick}
          type="button"
        >
          {action.label}
        </button>
      ) : null}
      {showDismissButton ? (
        <button
          aria-label="알림 닫기"
          className={joinClasses("-mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl outline-none focus-visible:ring-2", variant === "success" || variant === "warning" ? "text-[#333333] focus-visible:ring-[#111111]" : "text-white/80 focus-visible:ring-white")}
          onClick={onDismiss}
          type="button"
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
}

export default KakaoToast;
