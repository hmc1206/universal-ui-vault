import { useId, type MouseEvent, type ReactNode } from "react";

export interface GoodChoiceModalAction {
  /** 예약 또는 확인의 다음 행동을 말하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Cyan 핵심 행동, 외곽선 보조 행동, red 주의 행동을 선택합니다. */
  variant?: "primary" | "outline" | "danger";
}

export interface GoodChoiceModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 대화상자의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 구체적인 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: GoodChoiceModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<GoodChoiceModalAction["variant"]>, string> = {
  primary: "border-[#1D8BFF] bg-[#1D8BFF] text-white hover:brightness-95 active:translate-y-px",
  outline: "border-[#E6E6E6] bg-white text-[#222222] hover:bg-[#E3F0FF] active:translate-y-px",
  danger: "border-[#F94239] bg-[#F94239] text-white hover:brightness-95 active:translate-y-px",
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
 * 여기어때 YDS의 Dialog Raised 역할, 20px 모듈 반경, Cyan 800 행동을 적용한 제어형 모달입니다.
 * 공개 자료에 Raised의 수치값은 없으므로 Tailwind의 shadow-lg는 용도 역할을 표현하는 지역 구현입니다.
 */
export function GoodChoiceModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: GoodChoiceModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/40 p-4 font-[Pretendard,system-ui,sans-serif] sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className={joinClasses("w-full max-w-md rounded-[20px] bg-white p-6 shadow-lg sm:p-8", className)}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-8 tracking-[-0.04em] text-[#222222]" id={titleId}>
              {title}
            </h2>
            {description ? <div className="mt-3 text-base font-normal leading-6 tracking-[-0.02em] text-[#737373]" id={descriptionId}>{description}</div> : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#737373] outline-none transition-colors duration-150 hover:bg-[#E3F0FF] hover:text-[#222222] focus-visible:ring-2 focus-visible:ring-[#1D8BFF]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-6 text-base font-normal leading-6 tracking-[-0.02em] text-[#737373]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex h-11 items-center justify-center rounded-lg border px-4 font-[Pretendard,system-ui,sans-serif] text-base font-semibold leading-6 tracking-[-0.02em] outline-none transition-[background-color,border-color,filter,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#1D8BFF] focus-visible:ring-offset-2",
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

export default GoodChoiceModal;
