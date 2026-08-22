import { useId, type MouseEvent, type ReactNode } from "react";

export interface UpstageModalAction {
  /** 문서 workflow에서 다음으로 할 수 있는 행동을 말하는 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** observed public filled 또는 outlined action을 선택합니다. */
  variant?: "primary" | "secondary";
}

export interface UpstageModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 대화상자의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 구체적인 workflow 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: UpstageModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<UpstageModalAction["variant"]>, string> = {
  primary: "h-12 rounded-lg border border-[#5B52FF] bg-[#5B52FF] px-[18px] text-base font-medium leading-6 text-white hover:brightness-95 active:translate-y-px",
  secondary: "h-12 rounded-lg border border-[#5B52FF] bg-white px-[18px] text-base font-medium leading-6 text-[#5B52FF] hover:bg-[#f7f7ff] active:translate-y-px",
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
 * 업스테이지 public pricing의 white/#CDD0D5/8px card geometry와 public #5B52FF actions를 활용한 모달 확장입니다.
 * 공개 캡처에는 dialog elevation/behavior가 없으므로, 그림자를 추가하지 않고 정보 확인용 지역 확장으로만 제공합니다.
 */
export function UpstageModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: UpstageModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0A0D14]/40 p-4 font-[Geist] sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className={joinClasses("w-full max-w-lg rounded-lg border border-[#CDD0D5] bg-white p-6 sm:p-8", className)}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-medium leading-8 text-[#0A0D14]" id={titleId}>
              {title}
            </h2>
            {description ? <div className="mt-3 text-base font-normal leading-6 text-[#52525B]" id={descriptionId}>{description}</div> : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#52525B] outline-none hover:bg-[#f7f7f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0D14]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-6 text-base font-normal leading-6 text-[#52525B]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex items-center justify-center font-[Geist] outline-none transition-[filter,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0D14]",
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

export default UpstageModal;
