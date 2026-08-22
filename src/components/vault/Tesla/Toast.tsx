import { useEffect, type HTMLAttributes, type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #3e6ae1 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export type TeslaToastVariant = "success" | "warning" | "error" | "info";
export type TeslaToastPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface TeslaToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 토스트의 노출 여부입니다. */
  open: boolean;
  /** 짧은 상태 제목입니다. */
  title?: ReactNode;
  /** title의 별칭입니다. */
  message?: ReactNode;
  /** 제목 아래의 보충 정보입니다. */
  description?: ReactNode;
  /** 요청된 상태 분류입니다. 색상 의미가 아닌 텍스트 라벨로 표시합니다. */
  variant?: TeslaToastVariant;
  /** variant의 별칭입니다. */
  status?: TeslaToastVariant;
  /** 노출 위치입니다. */
  placement?: TeslaToastPlacement;
  /** placement의 별칭입니다. */
  position?: TeslaToastPlacement;
  /** 자동 닫기 시간입니다. 0이면 유지합니다. */
  duration?: number;
  /** 닫기 요청을 처리합니다. */
  onClose?: () => void;
}

const placementClasses: Record<TeslaToastPlacement, string> = {
  "top-right": "right-4 top-4",
  "top-left": "left-4 top-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

const variantLabel: Record<TeslaToastVariant, string> = {
  success: "완료",
  warning: "확인 필요",
  error: "다시 확인",
  info: "안내",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3의 #f4f4f4 card, #171a20/#393c41 text hierarchy를 사용한 상태 안내 확장입니다.
 * success/warning/error 색은 공개 마케팅 표면에 관측되지 않았으므로 Tesla semantic palette로 만들지 않고 텍스트 라벨로만 구분합니다.
 * slide motion도 관측되지 않아 포함하지 않습니다.
 */
export function TeslaToast({
  className,
  description,
  duration = 0,
  message,
  onClose,
  open,
  placement,
  position,
  status,
  title,
  variant = "info",
  ...props
}: TeslaToastProps) {
  const resolvedVariant = status ?? variant;
  const resolvedPlacement = position ?? placement ?? "top-right";
  const resolvedTitle = title ?? message ?? "변경한 내용이 반영되었습니다.";

  useEffect(() => {
    if (!open || duration <= 0 || !onClose) {
      return undefined;
    }

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      {...props}
      aria-live="polite"
      className={joinClasses(
        "fixed z-50 overflow-hidden border border-white/45 bg-white/76 backdrop-blur-xl shadow-[0_18px_44px_rgba(15,23,42,0.18)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current flex w-[min(calc(100vw-2rem),360px)] items-start gap-3 rounded-[8px] bg-[#f4f4f4] px-6 py-5 font-sans text-[#171a20]",
        placementClasses[resolvedPlacement],
        className,
      )}
      role="status"
    >
      <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#3e6ae1]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-5">{resolvedTitle}</p>
        {description ? <p className="mt-1 text-xs leading-5 text-[#5c5e62]">{description}</p> : null}
        <p className="mt-3 text-[10px] font-medium tracking-[0.16em] text-[#5c5e62]">{variantLabel[resolvedVariant]}</p>
      </div>
      {onClose ? (
        <button
          aria-label="알림 닫기"
          className="rounded-[4px] p-1 text-xs font-medium text-[#393c41] outline-none focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]"
          onClick={onClose}
          type="button"
        >
          닫기
        </button>
      ) : null}
    </div>
  );
}

export default TeslaToast;
