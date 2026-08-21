import { useId, type MouseEvent, type ReactNode } from "react";

export interface TossModalAction {
  /** 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 행동의 시각적 우선순위입니다. */
  variant?: "primary" | "weak" | "danger";
}

export interface TossModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 대화상자의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 구체적인 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: TossModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<TossModalAction["variant"]>, string> = {
  primary: "border-[#3182f6] bg-[#3182f6] text-white hover:border-[#2272eb] hover:bg-[#2272eb] active:bg-[#2272eb]",
  weak: "border-[#e8f3ff] bg-[#e8f3ff] text-[#1b64da] hover:bg-[#dcecff] active:bg-[#dcecff]",
  danger: "border-[#e42939] bg-[#e42939] text-white hover:bg-[#cc2736] active:bg-[#cc2736]",
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
 * 토스의 명확한 질문·다음 행동·넉넉한 터치 기하를 적용한 제어형 모달 확장 컴포넌트입니다.
 * 공식 패킷에는 모달의 고유 기하·딤·모션 토큰이 없으므로, 그림자 없이 접근성 중심의 평면 레이어를 사용합니다.
 */
export function TossModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: TossModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#191f28]/45 p-4 font-[Toss\ Product\ Sans,system-ui,sans-serif] sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className={joinClasses("w-full max-w-md rounded-3xl bg-white p-6 sm:p-8", className)}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-9 tracking-[-0.04em] text-[#191f28]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <div className="mt-3 text-base font-normal leading-6 tracking-[-0.02em] text-[#4e5968]" id={descriptionId}>
                {description}
              </div>
            ) : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#8b95a1] outline-none transition-colors duration-150 hover:bg-[#f2f4f6] hover:text-[#4e5968] focus-visible:ring-2 focus-visible:ring-[#3182f6]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-6 text-base font-normal leading-6 tracking-[-0.02em] text-[#4e5968]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex h-12 items-center justify-center rounded-[14px] border px-5 font-[Toss\ Product\ Sans,system-ui,sans-serif] text-base font-semibold leading-6 tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#3182f6] focus-visible:ring-offset-2 active:scale-[0.98]",
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

export default TossModal;
