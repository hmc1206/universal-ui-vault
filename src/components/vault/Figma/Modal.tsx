import { useEffect, useId, type ReactNode } from "react";

export interface FigmaModalProps {
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
  /** backdrop 클릭으로 닫을지 결정합니다. */
  closeOnBackdrop?: boolean;
  /** 패널에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Figma public page의 white/black chrome, #ebebeb separation, figmaSans/figmaMono hierarchy를 사용하는 modal 확장입니다.
 * large showcased panel에서만 측정된 0 24px 70px rgba(0,0,0,0.1) separation을 overlay panel에 한정해 사용하며,
 * 일반 card shadow 또는 editor panel token으로 주장하지 않습니다.
 * modal, backdrop dismissal, Escape behavior는 public capture에 없으므로 local web extension입니다.
 */
export function FigmaModal({
  children,
  className,
  closeOnBackdrop = true,
  description,
  footer,
  onClose,
  open,
  showCloseButton = true,
  title,
}: FigmaModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 font-['figmaSans']" role="presentation">
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
          "relative z-10 flex max-h-[min(720px,calc(100vh-2.5rem))] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-black bg-white shadow-[0_24px_70px_rgba(0,0,0,0.1)]",
          className,
        )}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-5 border-b border-[#ebebeb] px-6 py-5">
          <div className="min-w-0">
            <p className="font-['figmaMono'] text-xs font-normal leading-4 tracking-[0.03em] text-black">SHARED SPACE</p>
            <h2 className="mt-2 text-[32px] font-[400] leading-none tracking-[-0.015em] text-black" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-base font-[330] leading-[23px] tracking-[-0.009em] text-black/65" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          {showCloseButton ? (
            <button
              aria-label="대화상자 닫기"
              className="-m-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-[#0d99ff]"
              onClick={onClose}
              type="button"
            >
              <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 18 18" width="18">
                <path d="m4.5 4.5 9 9m0-9-9 9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            </button>
          ) : null}
        </div>
        <div className="min-h-0 overflow-y-auto px-6 py-6 text-base font-[330] leading-[1.42] tracking-[-0.009em] text-black">{children}</div>
        {footer ? <div className="border-t border-[#ebebeb] px-6 py-5">{footer}</div> : null}
      </section>
    </div>
  );
}

export default FigmaModal;
