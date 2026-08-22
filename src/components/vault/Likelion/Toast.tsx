import { useEffect, type ReactNode } from "react";

export type LikelionToastStatus = "success" | "warning" | "error" | "info";

export interface LikelionToastProps {
  /** 토스트를 화면에 표시합니다. */
  open: boolean;
  /** 안내의 상태입니다. 상태는 색상보다 문구로 구분합니다. */
  status?: LikelionToastStatus;
  /** 사용자에게 먼저 보여줄 짧은 제목입니다. */
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

const placementClasses: Record<NonNullable<LikelionToastProps["placement"]>, string> = {
  "top-right": "right-4 top-4 sm:right-6 sm:top-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  "top-left": "left-4 top-4 sm:left-6 sm:top-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
};

const statusLabel: Record<LikelionToastStatus, string> = {
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
 * 멋쟁이사자처럼 홈페이지의 따뜻한 표면·#222222 텍스트·헤어라인을 활용한 토스트 확장 컴포넌트입니다.
 * 공식 홈 캡처에는 토스트나 의미별 색상 토큰이 없으므로, 상태는 색상 대신 제목·상태 레이블·다음 행동으로 전달합니다.
 */
export function LikelionToast({
  action,
  className,
  description,
  duration = 5000,
  onClose,
  open,
  placement = "top-right",
  status = "info",
  title,
}: LikelionToastProps) {
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
        "fixed z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-[#e5e5e5] bg-white p-4 font-[inherit] text-[#222222] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none sm:w-full",
        placementClasses[placement],
        className,
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex shrink-0 rounded-full border border-[#d4d4d4] bg-[#fcf4ee] px-2 py-1 text-xs font-normal leading-4 tracking-[-0.02em] text-[#222222]">
          {statusLabel[status]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-5 tracking-[-0.02em]">{title}</p>
          {description ? <div className="mt-1 text-sm font-normal leading-5 tracking-[-0.02em] text-[#737373]">{description}</div> : null}
          {action ? (
            <button
              className="mt-3 inline-flex h-8 items-center rounded-md px-1 text-sm font-semibold leading-5 tracking-[-0.02em] text-[#222222] outline-none transition-colors duration-150 hover:text-[#737373] focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
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
            className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#a3a3a3] outline-none transition-colors duration-150 hover:bg-[#fcf4ee] hover:text-[#222222] focus-visible:ring-2 focus-visible:ring-[#2563eb]"
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

export default LikelionToast;
