import { useId, type MouseEvent, type ReactNode } from "react";

export interface KakaoModalAction {
  /** 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 행동의 시각적 우선순위입니다. */
  variant?: "marketing" | "surface" | "outline";
}

export interface KakaoModalProps {
  /** 모달을 화면에 표시합니다. */
  open: boolean;
  /** 모달의 핵심 질문 또는 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 간결한 맥락입니다. */
  description?: ReactNode;
  /** 본문 콘텐츠입니다. */
  children?: ReactNode;
  /** 주요 또는 보조 행동입니다. */
  actions?: KakaoModalAction[];
  /** 딤 영역 또는 닫기 버튼에서 실행할 함수입니다. */
  onClose?: () => void;
  /** 닫기 버튼을 표시합니다. */
  dismissible?: boolean;
  /** 딤 영역을 눌렀을 때 닫습니다. */
  closeOnBackdrop?: boolean;
  /** 모달 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<KakaoModalAction["variant"]>, string> = {
  marketing: "border border-[#fae100] bg-[#fae100] text-[#333333] hover:border-[#f3d900] hover:bg-[#f3d900]",
  surface: "border border-transparent bg-[#eeeeee] text-black hover:bg-[#e3e3e3]",
  outline: "border border-[#dbdbdb] bg-white text-[#333333] hover:bg-[#eeeeee]",
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
 * 카카오 기업 웹의 밝은 패널과 마케팅 옐로 행동을 담은 독립형 제어형 모달입니다.
 * 공식 고정 모션 토큰이 없으므로 그림자 대신 테두리와 다크 딤으로 깊이를 만들고, 짧은 지역 전환만 적용합니다.
 */
export function KakaoModal({
  actions = [],
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  onClose,
  open,
  title,
}: KakaoModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 font-[KakaoSmall,system-ui,sans-serif] transition-opacity duration-200 ease-out motion-reduce:transition-none sm:items-center"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div
        className={joinClasses(
          "w-full max-w-md translate-y-0 rounded-2xl border border-[#dbdbdb] bg-white p-6 transition-transform duration-200 ease-out motion-reduce:transition-none",
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-[KakaoBig,system-ui,sans-serif] text-[28px] font-bold leading-[1.5] tracking-[-0.03em] text-[#111111]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-sm font-normal leading-6 tracking-[-0.02em] text-[#555555]" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          {dismissible && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="-mr-2 -mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#888888] outline-none transition-[background-color,color] duration-200 hover:bg-[#eeeeee] hover:text-[#333333] focus-visible:ring-2 focus-visible:ring-[#fae100]/60"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        {children ? <div className="mt-5 text-sm leading-6 tracking-[-0.02em] text-[#555555]">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {actions.map((action) => (
              <button
                className={joinClasses(
                  "inline-flex h-11 items-center justify-center rounded-full px-5 font-[KakaoSmall,system-ui,sans-serif] text-base font-bold leading-[1.4] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#fae100] focus-visible:ring-offset-2",
                  actionClasses[action.variant ?? "marketing"],
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

export default KakaoModal;
