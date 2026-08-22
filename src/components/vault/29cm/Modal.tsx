import { useId, type MouseEvent, type ReactNode } from "react";

export interface TwentyNineCmModalAction {
  /** 상품 또는 에디토리얼 다음 행동을 말하는 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Ghost Outline 또는 투명 sale text 행동을 선택합니다. */
  variant?: "ghost" | "sale-text";
}

export interface TwentyNineCmModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 대화상자의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 구체적인 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: TwentyNineCmModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<TwentyNineCmModalAction["variant"]>, string> = {
  ghost: "h-[52px] rounded border border-[#dddddd] bg-white pl-5 pr-4 text-sm font-bold leading-5 text-black hover:brightness-95 active:translate-y-px",
  "sale-text": "h-[52px] rounded-none border-0 bg-transparent px-2 text-sm font-bold leading-5 text-[#ff4800] underline underline-offset-4 hover:brightness-95 active:translate-y-px",
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
 * 29CM의 흑백 구조·#dddddd outline·Ghost Action을 활용한 제어형 모달 확장 컴포넌트입니다.
 * 공개 캡처에는 dialog의 고유 기하·overlay·shadow가 없으므로, 이 파일은 접근성을 위한 명시적 확장이고 그림자를 추가하지 않습니다.
 */
export function TwentyNineCmModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: TwentyNineCmModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className={joinClasses("w-full max-w-md border border-[#dddddd] bg-white p-6 sm:p-8", className)}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-[23px] font-semibold leading-[29.9px] tracking-[-0.03em] text-black" id={titleId}>
              {title}
            </h2>
            {description ? <div className="mt-3 text-base font-normal leading-6 tracking-[-0.02em] text-[#303033]" id={descriptionId}>{description}</div> : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#5d5d5d] outline-none transition-colors hover:bg-[#f4f4f4] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-6 text-base font-normal leading-6 tracking-[-0.02em] text-[#303033]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex items-center justify-center font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[background-color,filter,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                  actionClasses[action.variant ?? "ghost"],
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

export default TwentyNineCmModal;
