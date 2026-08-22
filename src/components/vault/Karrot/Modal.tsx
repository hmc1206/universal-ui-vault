import { useEffect, useId, type ReactNode } from "react";

export interface KarrotModalAction { label: string; onClick?: () => void; }
export interface KarrotModalProps {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: KarrotModalAction[];
  footer?: ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Karrot의 집중된 결정을 위한 overlay dialog입니다. */
export function KarrotModal({ actions, children, className, closeOnBackdrop = true, description, dismissible = true, footer, onClose, open, showCloseButton = true, title }: KarrotModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans" role="presentation">
      <button aria-label="대화상자 닫기" className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={closeOnBackdrop ? close : undefined} type="button" />
      <section aria-labelledby={titleId} aria-modal="true" className={joinClasses("relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#ffe1d0] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.2)]", className)} role="dialog">
        <div className="flex items-start justify-between gap-5 border-b border-[#ffe1d0] p-6">
          <div><p className="text-[10px] font-bold tracking-[0.16em] text-[#ff6f0f]">우리 동네</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#212124]" id={titleId}>{title}</h2>{description ? <p className="mt-2 text-sm leading-6 text-[#868b94]">{description}</p> : null}</div>
          {(dismissible && showCloseButton) ? <button aria-label="대화상자 닫기" className="h-9 w-9 rounded-3xl border border-[#ffe1d0] text-sm font-bold" onClick={close} type="button">×</button> : null}
        </div>
        {children ? <div className="p-6 text-sm leading-6 text-[#212124]">{children}</div> : null}
        {footer || actions ? <div className="flex flex-wrap justify-end gap-2 border-t border-[#ffe1d0] p-4">{footer ?? actions?.map((action, index) => <button className={joinClasses("min-h-10 px-4 text-sm font-bold", index === actions.length - 1 ? "rounded-2xl border border-[#ff6f0f] bg-[#ff6f0f] text-white hover:-translate-y-1 active:translate-y-0" : "rounded-3xl border border-[#ffe1d0] bg-white")} key={`${action.label}-${index}`} onClick={action.onClick} type="button">{action.label}</button>)}</div> : null}
      </section>
    </div>
  );
}

export default KarrotModal;
