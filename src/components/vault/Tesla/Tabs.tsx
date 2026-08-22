import type { ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #3e6ae1 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface TeslaTabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TeslaTabsProps {
  /** 탭 항목입니다. */
  tabs: TeslaTabItem[];
  /** 선택된 value입니다. */
  value: string;
  /** 선택 변경을 전달합니다. */
  onChange: (value: string) => void;
  /** 탭 목록의 접근성 이름입니다. */
  ariaLabel?: string;
  /** 폭 배치 확장입니다. */
  layout?: "fill" | "hug" | "scroll";
  className?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3 공개 carousel의 selected mode-tab typography(17px/500), 4px radius·4px 8px padding을 참조한 tabs입니다.
 * capture에는 keyboard behavior나 animated tab transition이 없으므로, role/keyboard-ready button semantics만 local web extension으로 제공합니다.
 */
export function TeslaTabs({ ariaLabel = "제품 정보 탭", className, layout = "hug", onChange, tabs, value }: TeslaTabsProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={joinClasses(
        "grid grid-flow-col auto-cols-fr gap-1 overflow-x-auto border border-white/45 bg-white/64 p-1 backdrop-blur-xl shadow-[0_10px_26px_rgba(15,23,42,0.10)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current rounded-[4px] bg-[#f4f4f4] p-1 font-sans",
        layout === "fill" && "w-full",
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const selected = tab.value === value;

        return (
          <button
            aria-selected={selected}
            className={joinClasses(
              "min-h-9 min-w-max rounded-[4px] px-2 py-1 text-[17px] font-medium leading-5 outline-none disabled:cursor-not-allowed disabled:opacity-40",
              layout === "fill" && "flex-1",
              selected
                ? "bg-white text-[#171a20] focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]"
                : "text-[#5c5e62] active:text-[#5b5d61] focus-visible:text-[#57595d]",
            )}
            disabled={tab.disabled}
            key={tab.value}
            onClick={() => onChange(tab.value)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default TeslaTabs;
