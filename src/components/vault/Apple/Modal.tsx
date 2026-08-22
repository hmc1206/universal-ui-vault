import { useEffect, useId, type ReactNode } from "react";

export interface AppleModalAction { label: string; onClick?: () => void; }
export interface AppleModalProps {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: AppleModalAction[];
  footer?: ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Apple의 집중된 결정을 위한 overlay dialog입니다. */
export function AppleModal({ actions, children, className, closeOnBackdrop = true, description, dismissible = true, footer, onClose, open, showCloseButton = true, title }: AppleModalProps) {
  const titleId = useId();
  useEffect(() => {
    if (!open || !onClose) return undefined;
    const handleKeydown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose, open]);
  if (!open) return null;
  const close = onClose ?? (() => undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-['SF_Pro_Display']" role="presentation">
      <button aria-label="대화상자 닫기" className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={closeOnBackdrop ? close : undefined} type="button" />
      <section aria-labelledby={titleId} aria-modal="true" className={joinClasses("relative z-10 w-full max-w-md overflow-hidden rounded-[22px] border-[0.5px] border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.2)]", className)} role="dialog">
        <div className="flex items-start justify-between gap-5 border-b border-[#d2d2d7] p-6">
          <div><p className="text-[10px] font-bold tracking-[0.16em] text-[#2997ff]">DESIGNED TO FEEL NATURAL</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#1d1d1f]" id={titleId}>{title}</h2>{description ? <p className="mt-2 text-sm leading-6 text-[#6e6e73]">{description}</p> : null}</div>
          {(dismissible && showCloseButton) ? <button aria-label="대화상자 닫기" className="h-9 w-9 rounded-[22px] border border-[#d2d2d7] text-sm font-bold" onClick={close} type="button">×</button> : null}
        </div>
        {children ? <div className="p-6 text-sm leading-6 text-[#1d1d1f]">{children}</div> : null}
        {footer || actions ? <div className="flex flex-wrap justify-end gap-2 border-t border-[#d2d2d7] p-4">{footer ?? actions?.map((action, index) => <button className={joinClasses("min-h-10 px-4 text-sm font-bold", index === actions.length - 1 ? "rounded-full border-[0.5px] border-white/70 bg-[#0071e3] text-white shadow-[0_10px_30px_rgba(0,113,227,0.18)] hover:brightness-110 active:scale-[0.98]" : "rounded-[22px] border border-[#d2d2d7] bg-white")} key={`${action.label}-${index}`} onClick={action.onClick} type="button">{action.label}</button>)}</div> : null}
      </section>
    </div>
  );
}

export default AppleModal;
