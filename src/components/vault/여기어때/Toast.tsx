import { useEffect, type ReactNode } from "react";

export type GoodChoiceToastStatus = "success" | "warning" | "error" | "info";

export interface GoodChoiceToastProps {
  /** 토스트를 화면에 표시합니다. */
  open: boolean;
  /** 안내의 상태입니다. */
  status?: GoodChoiceToastStatus;
  /** 사용자에게 먼저 보여줄 짧고 분명한 제목입니다. */
  title: ReactNode;
  /** 현재 상태와 다음 행동을 설명하는 보조 안내입니다. */
  description?: ReactNode;
  /** 사용자가 이어서 할 수 있는 한 가지 행동입니다. */
  action?: { label: string; onClick: () => void };
  /** 닫기 버튼 또는 자동 닫기에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 자동으로 닫힐 시간입니다. 0이면 자동 닫기를 사용하지 않습니다. */
  duration?: number;
  /** 화면의 어느 모서리에 표시할지 결정합니다. */
  placement?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  /** 토스트 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const placementClasses: Record<NonNullable<GoodChoiceToastProps["placement"]>, string> = {
  "top-right": "right-4 top-4 sm:right-6 sm:top-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  "top-left": "left-4 top-4 sm:left-6 sm:top-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
};

const statusClasses: Record<GoodChoiceToastStatus, string> = {
  success: "bg-[#E3F0FF] text-[#1D8BFF]",
  warning: "bg-[#FFF5D8] text-[#222222]",
  error: "bg-[#FFEDEA] text-[#F94239]",
  info: "bg-[#E3F0FF] text-[#1D8BFF]",
};

const statusLabel: Record<GoodChoiceToastStatus, string> = {
  success: "완료",
  warning: "확인해 주세요",
  error: "다시 확인해 주세요",
  info: "안내",
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
 * 여기어때의 Cyan·Lively Red·명확한 예약 안내를 활용한 토스트 확장 컴포넌트입니다.
 * 공식 공개 catalog에는 토스트 기하와 상태 계약이 없으므로, 이 파일은 색상·구조·접근성 원칙을 적용한 명시적 확장입니다.
 */
export function GoodChoiceToast({
  action,
  className,
  description,
  duration = 5000,
  onClose,
  open,
  placement = "top-right",
  status = "info",
  title,
}: GoodChoiceToastProps) {
  useEffect(() => {
    if (!open || !onClose || duration <= 0) {
      return undefined;
    }

    const timeoutId = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeoutId);
  }, [duration, onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <section
      aria-atomic="true"
      aria-live={status === "error" ? "assertive" : "polite"}
      className={joinClasses(
        "fixed z-50 w-[calc(100%-2rem)] max-w-sm rounded-xl border border-[#E6E6E6] bg-white p-4 font-[Pretendard,system-ui,sans-serif] text-[#222222] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none sm:w-full",
        placementClasses[placement],
        className,
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-start gap-3">
        <span className={joinClasses("mt-0.5 inline-flex shrink-0 rounded-lg px-2 py-1 text-xs font-semibold leading-4 tracking-[-0.02em]", statusClasses[status])}>
          {statusLabel[status]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-5 tracking-[-0.02em]">{title}</p>
          {description ? <div className="mt-1 text-sm font-normal leading-5 tracking-[-0.02em] text-[#737373]">{description}</div> : null}
          {action ? (
            <button
              className="mt-3 inline-flex h-8 items-center rounded-md px-1 text-sm font-semibold leading-5 tracking-[-0.02em] text-[#1D8BFF] outline-none transition-colors duration-150 hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[#1D8BFF] focus-visible:ring-offset-2"
              onClick={action.onClick}
              type="button"
            >
              {action.label}
            </button>
          ) : null}
        </div>
        {onClose ? (
          <button
            aria-label="안내 닫기"
            className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#737373] outline-none transition-colors duration-150 hover:bg-[#E3F0FF] hover:text-[#222222] focus-visible:ring-2 focus-visible:ring-[#1D8BFF]"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default GoodChoiceToast;
