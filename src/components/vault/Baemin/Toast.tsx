import { useEffect, type HTMLAttributes, type ReactNode } from "react";

export interface BaeminToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
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

/** Baemin의 빠르고 직접적인 feedback tone을 가진 상태 안내 component입니다. */
export function BaeminToast({ className, description, duration = 0, message, onClose, onDismiss, open = true, position, placement, status, title, variant, visible = true, ...props }: BaeminToastProps) {
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
      className={joinClasses("fixed z-50 flex w-[min(calc(100vw-2rem),380px)] items-start gap-3 rounded-[28px] border border-[#222222] bg-white p-4 text-[#222222] font-sans font-black transition-all duration-200 ease-out", location.includes("top") ? "top-4" : "bottom-4", location.includes("right") ? "right-4" : "left-4", className)}
      role="status"
    >
      <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#222222]" />
      <div className="min-w-0 flex-1"><p className="text-sm font-bold">{copy}</p>{description ? <p className="mt-1 text-xs leading-5 text-[#52615e]">{description}</p> : null}{status || variant ? <p className="mt-2 text-[10px] font-bold tracking-[0.15em] text-[#222222]">{status ?? variant}</p> : null}</div>
      {close ? <button aria-label="알림 닫기" className="text-xs font-bold" onClick={close} type="button">닫기</button> : null}
    </div>
  );
}

export default BaeminToast;
