import { useEffect, useState, type ReactNode } from "react";

export type KakaoBankToastStatus = "success" | "warning" | "error" | "info";

export interface KakaoBankToastProps {
  /** 토스트를 화면에 표시합니다. */
  open: boolean;
  /** 안내의 상태입니다. 상태는 색상보다 레이블과 명확한 문구로 구분합니다. */
  status?: KakaoBankToastStatus;
  /** 사용자에게 먼저 보여줄 짧은 제목입니다. */
  title: ReactNode;
  /** 현재 상태와 다음 행동을 설명하는 보조 안내입니다. */
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

const placementClasses: Record<NonNullable<KakaoBankToastProps["placement"]>, string> = {
  "top-right": "right-4 top-4 sm:right-6 sm:top-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  "top-left": "left-4 top-4 sm:left-6 sm:top-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
};

const statusLabel: Record<KakaoBankToastStatus, string> = {
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
 * KakaoBank 공개 웹의 흰 캔버스·#f7f7f7 section·#e6e6e6 divider·검정 우선 정보를 활용한 토스트 확장 컴포넌트입니다.
 * 현재 공개 증거에는 native banking notification과 의미별 상태색·모션 시간이 없으므로, 상태는 레이블/문구로 구분하고 전환 수치는 고정하지 않습니다.
 */
export function KakaoBankToast({
  action,
  className,
  description,
  onClose,
  open,
  placement = "top-right",
  status = "info",
  title,
}: KakaoBankToastProps) {
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
        "fixed z-50 w-[calc(100%-2rem)] max-w-sm border border-[#e6e6e6] bg-white p-4 font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] text-black transition-[opacity,transform] motion-reduce:transition-none sm:w-full",
        placementClasses[placement],
        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        className,
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex shrink-0 border border-[#e6e6e6] bg-[#f7f7f7] px-2 py-1 text-xs font-normal leading-4 tracking-[-0.02em] text-[#444444]">
          {statusLabel[status]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-5 tracking-[-0.02em]">{title}</p>
          {description ? <div className="mt-1 text-sm font-normal leading-5 tracking-[-0.02em] text-[#444444]">{description}</div> : null}
          {action ? (
            <button
              className="mt-3 inline-flex h-8 items-center px-1 text-sm font-semibold leading-5 tracking-[-0.02em] text-black underline underline-offset-4 outline-none hover:text-[#444444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
            className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#888888] outline-none transition-colors hover:bg-[#f7f7f7] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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

export default KakaoBankToast;
