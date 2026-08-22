import type { ReactNode } from "react";

export type AppleToastTone = "success" | "warning" | "error" | "info";
export type AppleToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface AppleToastProps {
  /** 피드백의 직접적인 제목입니다. */
  title: ReactNode;
  /** 필요한 경우에만 덧붙이는 짧은 설명입니다. */
  description?: ReactNode;
  /** 아이콘과 접근성 안내에 사용할 피드백 종류입니다. */
  tone?: AppleToastTone;
  /** 화면 고정 위치입니다. */
  position?: AppleToastPosition;
  /** 닫기 동작입니다. 제공하지 않으면 닫기 버튼을 숨깁니다. */
  onClose?: () => void;
  /** 닫기 버튼 접근성 레이블입니다. */
  dismissLabel?: string;
  /** 외부 배치 제어를 위한 추가 Tailwind 클래스입니다. */
  className?: string;
}

const positionClasses: Record<AppleToastPosition, string> = {
  "top-right": "right-5 top-5",
  "top-left": "left-5 top-5",
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
};

const toneLabels: Record<AppleToastTone, string> = {
  success: "완료",
  warning: "확인 필요",
  error: "문제가 발생함",
  info: "안내",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ToastSymbol({ tone }: { tone: AppleToastTone }) {
  const common = "h-5 w-5 shrink-0 text-[#1d1d1f]";

  if (tone === "success") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="m8.25 12.1 2.3 2.25 5.2-5.15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (tone === "warning") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M12 4.25 20 19H4l8-14.75Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M12 9v4.25M12 16.25v.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (tone === "error") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="m9.25 9.25 5.5 5.5m0-5.5-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10.5v5M12 7.8v.15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

/**
 * Apple public web의 white/#f5f5f7/#1d1d1f/#6e6e73 및 concise-copy hierarchy를 사용하는 toast 확장입니다.
 * 공개 캡처에는 toast, semantic status color, slide motion이 없으므로 각 상태는 label과 symbol로만 구분합니다.
 * 위치 고정과 close control은 재사용을 위한 지역 웹 확장입니다.
 */
export function AppleToast({
  className,
  description,
  dismissLabel = "알림 닫기",
  onClose,
  position = "top-right",
  title,
  tone = "info",
}: AppleToastProps) {
  return (
    <section
      aria-atomic="true"
      aria-label={`${toneLabels[tone]} 알림`}
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={joinClasses(
        "fixed z-50 flex w-[min(calc(100vw-2.5rem),380px)] items-start gap-3 rounded-[18px] border border-[#d2d2d7] bg-white p-5 font-['SF_Pro_Text']",
        positionClasses[position],
        className,
      )}
      role="status"
    >
      <ToastSymbol tone={tone} />
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-normal leading-[22px] tracking-[-0.01em] text-[#1d1d1f]">{title}</p>
        {description ? <p className="mt-1 text-sm font-normal leading-[18px] tracking-[-0.01em] text-[#6e6e73]">{description}</p> : null}
      </div>
      {onClose ? (
        <button
          aria-label={dismissLabel}
          className="-m-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#515154] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066cc]"
          onClick={onClose}
          type="button"
        >
          <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
            <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
        </button>
      ) : null}
    </section>
  );
}

export default AppleToast;
