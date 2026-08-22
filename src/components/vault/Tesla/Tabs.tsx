import type { ReactNode } from "react";

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
        "flex gap-1 overflow-x-auto rounded-[4px] bg-[#f4f4f4] p-1 font-sans",
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
              "min-h-9 shrink-0 rounded-[4px] px-2 py-1 text-[17px] font-medium leading-5 outline-none disabled:cursor-not-allowed disabled:opacity-40",
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
