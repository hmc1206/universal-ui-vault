import { useEffect, type ReactNode } from "react";

export type SamsungToastStatus = "success" | "warning" | "error" | "info";

export interface SamsungToastProps {
  /** 토스트를 화면에 표시합니다. */
  open: boolean;
  /** 안내의 상태입니다. */
  status?: SamsungToastStatus;
  /** 사용자에게 먼저 보여줄 짧은 제목입니다. */
  title: ReactNode;
  /** 제목을 보완하는 구체적인 안내입니다. */
  description?: ReactNode;
  /** 사용자가 되돌리거나 확인할 수 있는 한 가지 행동입니다. */
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

const placementClasses: Record<NonNullable<SamsungToastProps["placement"]>, string> = {
  "top-right": "right-4 top-4 sm:right-6 sm:top-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  "top-left": "left-4 top-4 sm:left-6 sm:top-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
};

const statusLabel: Record<SamsungToastStatus, string> = {
  success: "완료",
  warning: "확인 필요",
  error: "다시 확인",
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
 * 삼성 공개 웹의 흰색·검정·옅은 회색 표면으로 만든 독립형 토스트입니다.
 * 현재 패킷에는 삼성 고유 토스트 상태나 모션 값이 없으므로, 그림자 없이 테두리·명확한 문구·접근성만 사용합니다.
 */
export function SamsungToast({
  action,
  className,
  description,
  duration = 5000,
  onClose,
  open,
  placement = "top-right",
  status = "info",
  title,
}: SamsungToastProps) {
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
        "fixed z-50 w-[calc(100%-2rem)] max-w-sm border border-[#dddddd] bg-[#ffffff] p-4 font-[SamsungOneKorean,sans-serif] text-[#000000] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none sm:w-full",
        placementClasses[placement],
        className,
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex shrink-0 rounded-full bg-[#000000] px-2 py-1 text-[11px] font-bold leading-3 tracking-[-0.02em] text-[#ffffff]">
          {statusLabel[status]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-5 tracking-[-0.02em]">{title}</p>
          {description ? <div className="mt-1 text-sm font-normal leading-5 tracking-[-0.02em] text-[#707070]">{description}</div> : null}
          {action ? (
            <button
              className="mt-3 inline-flex h-8 items-center border-b border-[#000000] text-sm font-bold leading-5 tracking-[-0.02em] text-[#000000] outline-none transition-colors duration-150 hover:text-[#707070] focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2"
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
            className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#707070] outline-none transition-colors duration-150 hover:text-[#000000] focus-visible:ring-2 focus-visible:ring-[#007aff]"
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

export default SamsungToast;
