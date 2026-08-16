import type { HTMLAttributes, ReactNode } from "react";

export type AppleToastVariant = "info" | "success" | "error";

export interface AppleToastAction {
  /** 수행할 일을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: () => void;
}

export interface AppleToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 피드백의 의미를 결정합니다. */
  variant?: AppleToastVariant;
  /** 발생한 일 또는 다음 단계를 짧게 설명하는 제목입니다. */
  title?: ReactNode;
  /** 사람에게 필요한 맥락과 복구 방법을 설명합니다. */
  description?: ReactNode;
  /** 되돌리기처럼 명확한 후속 행동입니다. */
  action?: AppleToastAction;
  /** 토스트를 닫을 수 있는 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 닫기 버튼을 눌렀을 때 실행할 함수입니다. */
  onDismiss?: () => void;
}

const accentClasses: Record<AppleToastVariant, string> = {
  info: "bg-[#0071e3]",
  success: "bg-[#248a3d]",
  error: "bg-[#d70015]",
};

const iconClasses: Record<AppleToastVariant, string> = {
  info: "text-[#0071e3]",
  success: "text-[#248a3d]",
  error: "text-[#d70015]",
};

const actionClasses: Record<AppleToastVariant, string> = {
  info: "text-[#0066cc]",
  success: "text-[#248a3d]",
  error: "text-[#d70015]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ToastIcon({ variant }: { variant: AppleToastVariant }) {
  if (variant === "success") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        <path d="m8 12.2 2.6 2.6L16.5 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (variant === "error") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 7.7v5.7m0 3.05h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 10.8v5M12 8h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
      <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.65" />
    </svg>
  );
}

/**
 * Apple의 단순성·책임성 원칙을 반영한 독립형 피드백 토스트입니다.
 * 결과를 분명하게 전달하고, 필요한 경우 회복 가능한 다음 행동을 제공합니다.
 */
export function AppleToast({
  action,
  className,
  description,
  dismissible = false,
  onDismiss,
  role,
  title,
  variant = "info",
  ...divProps
}: AppleToastProps) {
  const defaultTitle = variant === "success" ? "완료되었습니다" : variant === "error" ? "다시 확인해 주세요" : "알려드립니다";
  const defaultDescription =
    variant === "success"
      ? "요청한 변경 사항이 저장되었습니다."
      : variant === "error"
        ? "지금은 이 작업을 마칠 수 없습니다. 잠시 후 다시 시도해 주세요."
        : "필요한 정보가 업데이트되었습니다.";
  const showDismissButton = dismissible && Boolean(onDismiss);

  return (
    <div
      {...divProps}
      aria-atomic="true"
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={joinClasses(
        "relative flex w-full max-w-md gap-3 overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white p-4 text-[#1d1d1f] [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Helvetica_Neue',Arial,sans-serif]",
        className,
      )}
      role={role ?? (variant === "error" ? "alert" : "status")}
    >
      <span aria-hidden="true" className={joinClasses("absolute inset-y-0 left-0 w-1", accentClasses[variant])} />
      <span aria-hidden="true" className={joinClasses("mt-0.5 flex shrink-0 items-center", iconClasses[variant])}>
        <ToastIcon variant={variant} />
      </span>

      <div className="min-w-0 flex-1 pr-1">
        <p className="text-[15px] font-semibold leading-5 tracking-[-0.02em]">{title ?? defaultTitle}</p>
        <p className="mt-1 text-sm font-normal leading-[18px] tracking-[-0.016em] text-[#515154]">{description ?? defaultDescription}</p>
        {action ? (
          <button
            className={joinClasses(
              "mt-3 inline-flex h-5 items-center text-sm font-normal leading-5 tracking-[-0.016em] underline underline-offset-2",
              actionClasses[variant],
            )}
            onClick={action.onClick}
            type="button"
          >
            {action.label}
          </button>
        ) : null}
      </div>

      {showDismissButton ? (
        <button
          aria-label="알림 닫기"
          className="-mr-1 -mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#6e6e73]"
          onClick={onDismiss}
          type="button"
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
}

export default AppleToast;
