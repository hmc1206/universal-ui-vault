import { useId, type MouseEvent, type ReactNode } from "react";

export interface MusinsaModalAction {
  /** 방문자가 다음으로 할 수 있는 행동을 말하는 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** outline 또는 ink 행동을 선택합니다. */
  variant?: "outline" | "ink";
}

export interface MusinsaModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 대화상자의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 구체적인 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: MusinsaModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<MusinsaModalAction["variant"]>, string> = {
  outline: "h-9 rounded-none border border-[#ebebeb] bg-white px-3 text-sm font-normal leading-[21px] text-black hover:bg-[#f7f7f7] active:translate-y-px",
  ink: "h-9 rounded-none border border-black bg-black px-3 text-sm font-normal leading-[21px] text-white hover:opacity-80 active:translate-y-px",
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
 * 무신사 storefront의 white canvas, black foreground, #ebebeb line, flat/no-shadow treatment을 활용한 모달 확장입니다.
 * 공개 캡처에는 dialog/sheet geometry가 없으므로, 이는 native commerce modal이 아니라 정보 확인용 지역 확장입니다.
 */
export function MusinsaModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: MusinsaModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif] sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className={joinClasses("w-full max-w-md rounded-none border border-[#ebebeb] bg-white p-6 sm:p-8", className)}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-medium leading-[22px] text-black" id={titleId}>
              {title}
            </h2>
            {description ? <div className="mt-3 text-sm font-normal leading-[21px] text-[#666666]" id={descriptionId}>{description}</div> : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-none text-[#666666] outline-none transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-6 text-sm font-normal leading-[21px] text-[#666666]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex items-center justify-center font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif] outline-none transition-[background-color,opacity,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                  actionClasses[action.variant ?? "ink"],
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

export default MusinsaModal;
