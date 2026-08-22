import { useEffect, useId, type ReactNode } from "react";

export interface AppleModalProps {
  /** 모달 노출 여부입니다. */
  open: boolean;
  /** 모달의 직접적인 제목입니다. */
  title: ReactNode;
  /** 모달 본문입니다. */
  children: ReactNode;
  /** 닫기 요청을 처리할 함수입니다. */
  onClose: () => void;
  /** 제목 아래의 짧은 설명입니다. */
  description?: ReactNode;
  /** 하단 action 영역입니다. */
  footer?: ReactNode;
  /** 닫기 버튼을 표시할지 결정합니다. */
  showCloseButton?: boolean;
  /** backdrop을 눌렀을 때 닫을지 결정합니다. */
  closeOnBackdrop?: boolean;
  /** 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Apple HIG documentation website에서 확인된 white 18px reference-card surface를 사용하는 web modal 확장입니다.
 * 18px은 HIG 문서 chrome의 관측값이며 native iOS/macOS modal token으로 주장하지 않습니다.
 * dim layer, Escape/backdrop dismiss, focus outline은 공개 캡처에 없으므로 재사용과 접근성을 위한 지역 확장입니다.
 */
export function AppleModal({
  children,
  className,
  closeOnBackdrop = true,
  description,
  footer,
  onClose,
  open,
  showCloseButton = true,
  title,
}: AppleModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 font-['SF_Pro_Text']" role="presentation">
      <button
        aria-label="대화상자 닫기"
        className="absolute inset-0 cursor-default bg-black/45"
        onClick={closeOnBackdrop ? onClose : undefined}
        tabIndex={-1}
        type="button"
      />
      <section
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={joinClasses(
          "relative z-10 flex max-h-[min(720px,calc(100vh-2.5rem))] w-full max-w-lg flex-col overflow-hidden rounded-[18px] border border-[#d2d2d7] bg-white",
          className,
        )}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-5 px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
          <div className="min-w-0">
            <h2 className="font-['SF_Pro_Display'] text-[28px] font-normal leading-8 tracking-[0.007em] text-[#1d1d1f]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-[17px] font-normal leading-[25px] tracking-[-0.022em] text-[#515154]" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          {showCloseButton ? (
            <button
              aria-label="대화상자 닫기"
              className="-m-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066cc]"
              onClick={onClose}
              type="button"
            >
              <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
                <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
            </button>
          ) : null}
        </div>
        <div className="min-h-0 overflow-y-auto px-6 pb-6 text-[17px] font-normal leading-[25px] tracking-[-0.022em] text-[#1d1d1f] sm:px-8 sm:pb-8">
          {children}
        </div>
        {footer ? <div className="border-t border-[#d2d2d7] px-6 py-5 sm:px-8">{footer}</div> : null}
      </section>
    </div>
  );
}

export default AppleModal;
