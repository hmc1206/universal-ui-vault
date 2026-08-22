import { useEffect, useId, type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #ff5160 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface AblyModalAction { label: string; onClick?: () => void; }
export interface AblyModalProps {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: AblyModalAction[];
  footer?: ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Ably의 집중된 결정을 위한 overlay dialog입니다. */
export function AblyModal({ actions, children, className, closeOnBackdrop = true, description, dismissible = true, footer, onClose, open, showCloseButton = true, title }: AblyModalProps) {
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
      <section aria-labelledby={titleId} aria-modal="true" className={joinClasses("relative z-10 w-full border border-white/50 bg-white/78 backdrop-blur-2xl shadow-[0_28px_76px_rgba(15,23,42,0.24)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current max-w-md overflow-hidden rounded-3xl border border-[#ffd5db] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.2)]", className)} role="dialog">
        <div className="flex items-start justify-between gap-5 border-b border-[#ffd5db] p-6">
          <div><p className="text-[10px] font-bold tracking-[0.16em] text-[#ff5160]">STYLE DROP</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#2b1d22]" id={titleId}>{title}</h2>{description ? <p className="mt-2 text-sm leading-6 text-[#7b5962]">{description}</p> : null}</div>
          {(dismissible && showCloseButton) ? <button aria-label="대화상자 닫기" className="h-9 w-9 rounded-3xl border border-[#ffd5db] text-sm font-bold" onClick={close} type="button">×</button> : null}
        </div>
        {children ? <div className="p-6 text-sm leading-6 text-[#2b1d22]">{children}</div> : null}
        {footer || actions ? <div className="flex flex-wrap justify-end gap-2 border-t border-[#ffd5db] p-4">{footer ?? actions?.map((action, index) => <button className={joinClasses("min-h-10 px-4 text-sm font-bold", index === actions.length - 1 ? "rounded-3xl border border-[#ff5160] bg-[#ff5160] text-white hover:scale-105 active:scale-95" : "rounded-3xl border border-[#ffd5db] bg-white")} key={`${action.label}-${index}`} onClick={action.onClick} type="button">{action.label}</button>)}</div> : null}
      </section>
    </div>
  );
}

export default AblyModal;
