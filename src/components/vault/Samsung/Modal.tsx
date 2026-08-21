import { useId, type MouseEvent, type ReactNode } from "react";

export interface SamsungModalAction {
  /** 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 행동의 시각적 우선순위입니다. */
  variant?: "contained" | "outlined";
}

export interface SamsungModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 대화상자의 핵심 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 구체적인 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: SamsungModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<SamsungModalAction["variant"]>, string> = {
  contained: "border-[#000000] bg-[#000000] text-[#ffffff] hover:bg-[#333333] active:bg-[#000000]",
  outlined: "border-[#000000] bg-transparent text-[#000000] hover:bg-[#f7f7f7] active:bg-[#eeeeee]",
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
 * 삼성 공개 웹에서 관측된 그림자 없는 흑백·회색 위계를 적용한 독립형 제어 모달입니다.
 * 캡처에는 모달의 공식 기하나 상태가 없으므로, 이 컴포넌트는 접근성 요구를 충족하는 중립적 패턴이며 Samsung 고유 모달로 주장하지 않습니다.
 */
export function SamsungModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: SamsungModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 font-[SamsungOneKorean,sans-serif] sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className={joinClasses("w-full max-w-md border border-[#dddddd] bg-[#ffffff] p-6", className)}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-[SamsungSharpSans,Samsung\ Sharp\ Sans,sans-serif] text-2xl font-bold leading-8 tracking-[-0.04em] text-[#000000]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <div className="mt-3 text-base font-normal leading-[1.45] tracking-[-0.02em] text-[#707070]" id={descriptionId}>
                {description}
              </div>
            ) : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#707070] outline-none transition-colors duration-150 hover:bg-[#f7f7f7] hover:text-[#000000] focus-visible:ring-2 focus-visible:ring-[#007aff]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-5 text-base font-normal leading-[1.45] tracking-[-0.02em] text-[#000000]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex h-10 items-center justify-center rounded-[20px] border px-6 pb-[9px] pt-2.5 font-[SamsungOneKorean,sans-serif] text-sm font-bold leading-[19px] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2 active:scale-[0.98]",
                  actionClasses[action.variant ?? "contained"],
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

export default SamsungModal;
