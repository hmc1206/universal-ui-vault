import { useId, type MouseEvent, type ReactNode } from "react";

export interface KarrotModalAction {
  /** 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 주요 행동인지 표시합니다. */
  variant?: "primary" | "secondary" | "danger";
}

export interface KarrotModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 모달 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 간결한 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: KarrotModalAction[];
  /** 딤 영역 또는 닫기 버튼으로 닫을 때 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<KarrotModalAction["variant"]>, string> = {
  primary: "border border-[#ff6f0f] bg-[#ff6f0f] text-white hover:border-[#ff9e66] hover:bg-[#ff9e66] active:border-[#ff9e66] active:bg-[#ff9e66]",
  secondary: "border border-[#eaebee] bg-white text-[#212124] hover:bg-[#f7f8fa] active:bg-[#f2f3f6]",
  danger: "border border-[#fa2314] bg-[#fa2314] text-white hover:border-[#ff766a] hover:bg-[#ff766a] active:border-[#ff766a] active:bg-[#ff766a]",
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
 * 당근의 차분한 대화 흐름을 위한 독립형 제어형 모달입니다.
 * 열릴 때 40px 아래에서 250ms 동안 올라오며, 배경 딤은 동시에 나타납니다.
 */
export function KarrotModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: KarrotModalProps) {
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
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 transition-opacity duration-[250ms] ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div
        className={joinClasses(
          "w-full max-w-md translate-y-0 rounded-t-2xl bg-white px-5 pb-5 pt-6 transition-transform duration-[250ms] ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none sm:rounded-2xl sm:p-6",
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold leading-7 tracking-[-0.03em] text-[#212124]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#51545a]" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#868b94] outline-none transition-colors duration-150 hover:bg-[#f2f3f6] hover:text-[#212124] focus-visible:ring-2 focus-visible:ring-[#ff6f0f]/30"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-5 text-sm leading-5 tracking-[-0.02em] text-[#51545a]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex h-11 items-center justify-center rounded-lg px-4 text-[15px] font-semibold tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#ff6f0f] focus-visible:ring-offset-2",
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

export default KarrotModal;
