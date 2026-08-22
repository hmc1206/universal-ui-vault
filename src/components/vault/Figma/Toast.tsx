import type { ReactNode } from "react";

export type FigmaToastTone = "success" | "warning" | "error" | "info";
export type FigmaToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface FigmaToastProps {
  /** 현재 결과를 직접 알려주는 제목입니다. */
  title: ReactNode;
  /** 복구 방법이나 다음 행동을 설명하는 짧은 본문입니다. */
  description?: ReactNode;
  /** label과 symbol을 위한 정보 종류입니다. */
  tone?: FigmaToastTone;
  /** 화면 고정 위치입니다. */
  position?: FigmaToastPosition;
  /** 닫기 동작입니다. 제공하지 않으면 닫기 버튼을 숨깁니다. */
  onClose?: () => void;
  /** 닫기 버튼 접근성 레이블입니다. */
  dismissLabel?: string;
  /** 외부 배치 제어를 위한 추가 Tailwind 클래스입니다. */
  className?: string;
}

const positionClasses: Record<FigmaToastPosition, string> = {
  "top-right": "right-5 top-5",
  "top-left": "left-5 top-5",
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
};

const toneLabels: Record<FigmaToastTone, string> = {
  success: "완료",
  warning: "확인 필요",
  error: "작업이 차단됨",
  info: "안내",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ToastSymbol({ tone }: { tone: FigmaToastTone }) {
  const common = "h-5 w-5 shrink-0 text-black";

  if (tone === "success") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="m5.5 12.25 4 4L18.75 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (tone === "warning") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M12 4.5 20 19H4l8-14.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.75" />
        <path d="M12 9v4.25M12 16.15v.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
      </svg>
    );
  }

  if (tone === "error") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="m8.25 8.25 7.5 7.5m0-7.5-7.5 7.5" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 10v5M12 7.5v.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

/**
 * Figma public chrome의 white canvas, black interaction hierarchy, #ebebeb separation,
 * figmaSans/figmaMono role 분리를 사용하는 toast 확장입니다.
 * 성공·경고·오류 색과 slide motion은 current public capture에 없으므로, state는 direct label과 symbol로 구분합니다.
 * fixed placement와 dismiss control은 재사용을 위한 local web extension입니다.
 */
export function FigmaToast({
  className,
  description,
  dismissLabel = "알림 닫기",
  onClose,
  position = "top-right",
  title,
  tone = "info",
}: FigmaToastProps) {
  return (
    <section
      aria-atomic="true"
      aria-label={`${toneLabels[tone]} 알림`}
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={joinClasses(
        "fixed z-50 flex w-[min(calc(100vw-2.5rem),390px)] items-start gap-3 rounded-lg border border-[#ebebeb] bg-white p-4 font-['figmaSans']",
        positionClasses[position],
        className,
      )}
      role="status"
    >
      <ToastSymbol tone={tone} />
      <div className="min-w-0 flex-1">
        <p className="font-['figmaMono'] text-xs font-normal leading-4 tracking-[0.03em] text-black">{toneLabels[tone]}</p>
        <p className="mt-1 text-base font-[400] leading-[23px] tracking-[-0.009em] text-black">{title}</p>
        {description ? <p className="mt-1 text-sm font-[330] leading-5 tracking-[-0.009em] text-black/65">{description}</p> : null}
      </div>
      {onClose ? (
        <button
          aria-label={dismissLabel}
          className="-m-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-[#0d99ff]"
          onClick={onClose}
          type="button"
        >
          <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
            <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          </svg>
        </button>
      ) : null}
    </section>
  );
}

export default FigmaToast;
