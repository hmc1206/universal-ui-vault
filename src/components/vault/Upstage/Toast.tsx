import { useEffect, useState, type ReactNode } from "react";

export type UpstageToastStatus = "success" | "warning" | "error" | "info";

export interface UpstageToastProps {
  /** 토스트를 화면에 표시합니다. */
  open: boolean;
  /** 안내 상태입니다. 상태는 임의의 meaning color보다 레이블과 직접적인 문구로 구분합니다. */
  status?: UpstageToastStatus;
  /** 사용자에게 먼저 보여줄 짧은 제목입니다. */
  title: ReactNode;
  /** 문서 또는 workflow 맥락과 다음 행동을 설명합니다. */
  description?: ReactNode;
  /** 사용자가 이어서 할 수 있는 한 가지 행동입니다. */
  action?: { label: string; onClick: () => void };
  /** 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 화면의 어느 모서리에 표시할지 결정합니다. */
  placement?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  /** 토스트 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const placementClasses: Record<NonNullable<UpstageToastProps["placement"]>, string> = {
  "top-right": "right-4 top-4 sm:right-6 sm:top-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  "top-left": "left-4 top-4 sm:left-6 sm:top-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
};

const statusLabel: Record<UpstageToastStatus, string> = {
  success: "완료",
  warning: "검토 필요",
  error: "작업 확인",
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
 * 업스테이지 공개 surface의 white, #0A0D14, #52525B, #CDD0D5 hierarchy와 workflow-first message를 활용한 토스트 확장입니다.
 * 공개 자료에는 toast/semantic state/motion이 없으므로, 상태는 색상 의미를 발명하지 않고 레이블과 맥락 문구로만 구분합니다.
 */
export function UpstageToast({
  action,
  className,
  description,
  onClose,
  open,
  placement = "top-right",
  status = "info",
  title,
}: UpstageToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsVisible(false);
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frameId);
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <section
      aria-atomic="true"
      aria-live={status === "error" ? "assertive" : "polite"}
      className={joinClasses(
        "fixed z-50 w-[calc(100%-2rem)] max-w-sm rounded-lg border border-[#CDD0D5] bg-white p-4 font-[Geist] text-[#0A0D14] transition-[opacity,transform] motion-reduce:transition-none sm:w-full",
        placementClasses[placement],
        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        className,
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex shrink-0 rounded-lg border border-[#CDD0D5] bg-white px-2 py-1 text-xs font-medium leading-4 text-[#52525B]">
          {statusLabel[status]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-medium leading-6">{title}</p>
          {description ? <div className="mt-1 text-sm font-normal leading-5 text-[#52525B]">{description}</div> : null}
          {action ? (
            <button
              className="mt-3 inline-flex h-8 items-center rounded-lg px-2 text-sm font-medium leading-5 text-[#5B52FF] outline-none hover:bg-[#f7f7ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0D14]"
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
            className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#52525B] outline-none hover:bg-[#f7f7f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0D14]"
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

export default UpstageToast;
