import { useId, type MouseEvent, type ReactNode } from "react";

export interface BaeminModalAction {
  /** 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 행동의 시각적 우선순위입니다. */
  variant?: "primary" | "light" | "outline";
}

export interface BaeminModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 모달의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 간결한 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: BaeminModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<BaeminModalAction["variant"]>, string> = {
  primary: "border border-[#0cefd3] bg-[#0cefd3] text-[#222222] hover:border-[#62f4e2] hover:bg-[#62f4e2]",
  light: "border border-transparent bg-[#f3f4f5] text-[#232324] hover:bg-[#e7e8e9]",
  outline: "border border-[#a6a7a9] bg-white text-[#232324] hover:bg-[#f3f4f5]",
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
 * 배달의민족의 명료한 확인 흐름을 위한 독립형 제어형 모달입니다.
 * 공개된 고정 모션 토큰이 없으므로 패널과 딤에 짧은 지역 전환만 적용하고, 그림자 대신 테두리와 딤으로 깊이를 만듭니다.
 */
export function BaeminModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: BaeminModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 font-[BAEMINWORK,system-ui,sans-serif] transition-opacity duration-200 ease-out motion-reduce:transition-none sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div
        className={joinClasses(
          "w-full max-w-md translate-y-0 rounded-2xl border border-[#e1e1e1] bg-white p-6 transition-transform duration-200 ease-out motion-reduce:transition-none",
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-8 tracking-[-0.03em] text-[#232324]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-base font-normal leading-6 tracking-[-0.02em] text-[#6c6d6f]" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#6c6d6f] outline-none transition-[background-color,color] duration-200 hover:bg-[#f3f4f5] hover:text-[#232324] focus-visible:ring-2 focus-visible:ring-[#0cefd3]/40"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-5 text-sm leading-6 tracking-[-0.02em] text-[#6c6d6f]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex h-[52px] items-center justify-center rounded-lg px-[22px] text-base font-bold leading-[1.4] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#0cefd3] focus-visible:ring-offset-2",
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

export default BaeminModal;
