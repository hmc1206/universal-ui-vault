import { useEffect, type HTMLAttributes, type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #f94239 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface GoodChoiceToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  visible?: boolean;
  title?: ReactNode;
  message?: ReactNode;
  description?: ReactNode;
  status?: string;
  variant?: string;
  onClose?: () => void;
  onDismiss?: () => void;
  duration?: number;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  dismissible?: boolean;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** 여기어때의 빠르고 직접적인 feedback tone을 가진 상태 안내 component입니다. */
export function GoodChoiceToast({ className, description, duration = 0, message, onClose, onDismiss, open = true, position, placement, status, title, variant, visible = true, ...props }: GoodChoiceToastProps) {
  const isOpen = open && visible;
  const close = onClose ?? onDismiss;
  const copy = title ?? message ?? "변경한 내용이 저장되었어요.";
  const location = position ?? placement ?? "top-right";

  useEffect(() => {
    if (!isOpen || !duration || !close) return undefined;
    const timer = window.setTimeout(close, duration);
    return () => window.clearTimeout(timer);
  }, [close, duration, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      {...props}
      aria-live="polite"
      className={joinClasses("fixed z-50 overflow-hidden border border-white/45 bg-white/76 backdrop-blur-xl shadow-[0_18px_44px_rgba(15,23,42,0.18)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current flex w-[min(calc(100vw-2rem),380px)] items-start gap-3 rounded-2xl border border-[#ffd2cf] bg-white p-4 text-[#222222] font-sans transition-all duration-300 ease-out", location.includes("top") ? "top-4" : "bottom-4", location.includes("right") ? "right-4" : "left-4", className)}
      role="status"
    >
      <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#f94239]" />
      <div className="min-w-0 flex-1"><p className="text-sm font-bold">{copy}</p>{description ? <p className="mt-1 text-xs leading-5 text-[#737373]">{description}</p> : null}{status || variant ? <p className="mt-2 text-[10px] font-bold tracking-[0.15em] text-[#f94239]">{status ?? variant}</p> : null}</div>
      {close ? <button aria-label="알림 닫기" className="text-xs font-bold" onClick={close} type="button">닫기</button> : null}
    </div>
  );
}

export default GoodChoiceToast;
