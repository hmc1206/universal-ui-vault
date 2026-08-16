import { useEffect, type HTMLAttributes } from "react";

export type KarrotToastVariant = "success" | "warning" | "error";

export interface KarrotToastAction {
  /** 현재 안내와 직접 연결된 한 가지 행동입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: () => void;
}

export interface KarrotToastProps extends HTMLAttributes<HTMLDivElement> {
  /** 성공, 주의, 오류 피드백의 의미입니다. */
  variant?: KarrotToastVariant;
  /** 한 문장으로 현재 상태를 알리는 내용입니다. */
  message?: string;
  /** 최대 한 개의 후속 행동입니다. */
  action?: KarrotToastAction;
  /** 토스트를 표시하거나 화면 밖으로 이동합니다. */
  visible?: boolean;
  /** 자동으로 닫기까지 기다릴 시간입니다. 0이면 자동으로 닫지 않습니다. */
  duration?: number;
  /** 자동 닫기 또는 닫기 버튼에서 호출됩니다. */
  onDismiss?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
}

const accentClasses: Record<KarrotToastVariant, string> = {
  success: "bg-[#1aa174]",
  warning: "bg-[#ff6f0f]",
  error: "bg-[#fa2314]",
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
 * 당근 SEED 스낵바의 짧고 조용한 피드백 원칙을 담은 독립형 토스트입니다.
 * `visible` 값을 전환하면 화면 오른쪽 아래에서 250ms 동안 슬라이드로 나타나거나 사라집니다.
 */
export function KarrotToast({
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
}: KarrotToastProps) {
  const defaultMessage =
    variant === "success"
      ? "저장했어요."
      : variant === "warning"
        ? "한 번 더 확인해 주세요."
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
        "fixed bottom-4 right-4 z-50 flex w-[calc(100%-32px)] max-w-sm items-center gap-3 overflow-hidden rounded-lg bg-[#1a1c20] px-4 py-3 text-sm font-normal leading-5 tracking-[-0.02em] text-white transition-[opacity,transform] duration-[250ms] ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-10 opacity-0",
        className,
      )}
      role={role ?? (variant === "error" ? "alert" : "status")}
    >
      <span aria-hidden="true" className={joinClasses("absolute inset-y-0 left-0 w-1", accentClasses[variant])} />
      <p className="min-w-0 flex-1 pl-1">{message ?? defaultMessage}</p>
      {action ? (
        <button
          className="shrink-0 text-sm font-semibold text-[#ff9e66] underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-[#ff9e66]"
          onClick={action.onClick}
          type="button"
        >
          {action.label}
        </button>
      ) : null}
      {showDismissButton ? (
        <button
          aria-label="알림 닫기"
          className="-mr-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#c5c8ce] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={onDismiss}
          type="button"
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
}

export default KarrotToast;
