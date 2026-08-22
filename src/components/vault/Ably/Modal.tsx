import { useId, type MouseEvent, type ReactNode } from "react";

export interface AblyModalAction {
  /** 방문자가 다음으로 할 수 있는 행동을 말하는 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** ABLY Team primary 또는 soft action을 선택합니다. */
  variant?: "primary" | "soft";
}

export interface AblyModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 대화상자의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 구체적인 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: AblyModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<AblyModalAction["variant"]>, string> = {
  primary: "h-14 min-w-40 rounded-xl bg-[#ff5160] px-6 text-lg font-semibold leading-6 text-white hover:brightness-95 active:translate-y-px",
  soft: "h-12 min-w-32 rounded-xl bg-[#fff2ea] px-5 text-base font-semibold leading-5 text-[#ff5160] hover:bg-[#ffe6dc] active:translate-y-px",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
      <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * ABLY Team의 12px story-card, #fff2ea surface, 0 4px 48px rgba(0,0,0,.08) shadow, #ff5160 action을 활용한 모달 확장입니다.
 * native consumer bottom sheet/dialog가 아니라 corporate/editorial 안내에만 맞춘 컴포넌트입니다.
 */
export function AblyModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: AblyModalProps) {
  const titleId = useId();
  const generatedDescriptionId = useId();
  const descriptionId = description ? generatedDescriptionId : undefined;

  function handleBackdropMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (closeOnBackdrop && onClose && event.target === event.currentTarget) {
      onClose();
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1f1f1f]/45 p-4 font-[Pretendard,system-ui,sans-serif] sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className={joinClasses("w-full max-w-md rounded-xl bg-white p-6 shadow-[0_4px_48px_rgba(0,0,0,0.08)] sm:p-8", className)}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.3px] text-[#1f1f1f]" id={titleId}>
              {title}
            </h2>
            {description ? <div className="mt-3 text-base font-normal leading-6 tracking-[-0.3px] text-[#757575]" id={descriptionId}>{description}</div> : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#777777] outline-none transition-colors hover:bg-[#fff2ea] hover:text-[#1f1f1f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-6 text-base font-normal leading-6 tracking-[-0.3px] text-[#757575]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex items-center justify-center border border-transparent font-[Pretendard,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[filter,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f]",
                  actionClasses[action.variant ?? "primary"],
                )}
                key={action.label}
                onClick={action.onClick}
                type="button"
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AblyModal;
