import { useEffect, useId, type ReactNode } from "react";

export interface TeslaModalAction {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "contrast";
}

export interface TeslaModalProps {
  /** 모달 표시 여부입니다. */
  open: boolean;
  /** 대화상자의 핵심 제목입니다. */
  title: ReactNode;
  /** 제목 아래의 간결한 정보입니다. */
  description?: ReactNode;
  /** 본문입니다. */
  children?: ReactNode;
  /** 하단의 선택 행동입니다. */
  actions?: TeslaModalAction[];
  /** actions를 대체하는 footer 콘텐츠입니다. */
  footer?: ReactNode;
  /** 닫기 요청을 처리합니다. */
  onClose?: () => void;
  /** close control 노출 여부입니다. */
  dismissible?: boolean;
  /** backdrop click 닫기 여부입니다. */
  closeOnBackdrop?: boolean;
  /** dismissible의 별칭입니다. */
  showCloseButton?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3의 filled information-card surface를 사용한 dialog 확장입니다.
 * 공개 마케팅 캡처에는 modal/overlay/elevation 계약이 없으므로, backdrop·Escape·footer behavior는 접근성 재사용을 위한 local extension입니다.
 * 관측된 information card에는 shadow가 없으므로 panel은 평면으로 유지합니다.
 */
export function TeslaModal({
  actions,
  children,
  className,
  closeOnBackdrop = true,
  description,
  dismissible = true,
  footer,
  onClose,
  open,
  showCloseButton = true,
  title,
}: TeslaModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open || !onClose) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans" role="presentation">
      <button
        aria-label="대화상자 닫기"
        className="absolute inset-0 bg-[#171a20]/45"
        onClick={closeOnBackdrop ? onClose : undefined}
        type="button"
      />
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className={joinClasses("relative z-10 w-full max-w-md rounded-[8px] bg-[#f4f4f4] text-[#171a20]", className)}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-5 border-b border-[#d0d1d2] px-6 pb-5 pt-6">
          <div>
            <p className="text-[10px] font-medium tracking-[0.16em] text-[#5c5e62]">PRODUCT DETAIL</p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]" id={titleId}>
              {title}
            </h2>
            {description ? <p className="mt-2 text-sm leading-6 text-[#5c5e62]">{description}</p> : null}
          </div>
          {dismissible && showCloseButton && onClose ? (
            <button
              aria-label="대화상자 닫기"
              className="rounded-[4px] border-2 border-transparent bg-white px-2 py-1 text-sm font-medium outline-none focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]"
              onClick={onClose}
              type="button"
            >
              닫기
            </button>
          ) : null}
        </div>

        {children ? <div className="px-6 py-6 text-sm leading-6 text-[#393c41]">{children}</div> : null}

        {footer || actions?.length ? (
          <div className="flex flex-wrap justify-end gap-2 border-t border-[#d0d1d2] px-6 py-4">
            {footer ??
              actions?.map((action, index) => {
                const primary = action.variant ?? (index === actions.length - 1 ? "primary" : "contrast");
                return (
                  <button
                    className={joinClasses(
                      "min-h-10 rounded-[4px] border-[3px] border-transparent px-4 text-sm font-medium outline-none",
                      primary === "primary"
                        ? "bg-[#3e6ae1] text-white active:bg-[#3e6ae0] focus-visible:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.05)]"
                        : "bg-white text-[#393c41] active:bg-[#f4f4f4] focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]",
                    )}
                    key={`${action.label}-${index}`}
                    onClick={action.onClick}
                    type="button"
                  >
                    {action.label}
                  </button>
                );
              })}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default TeslaModal;
