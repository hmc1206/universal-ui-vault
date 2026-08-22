import { useId, type KeyboardEvent, type ReactNode } from "react";

export interface FigmaTabItem {
  /** 탭을 구분하는 고유 값입니다. */
  value: string;
  /** 사용자에게 보이는 탭 레이블입니다. */
  label: ReactNode;
  /** 탭을 선택할 수 없는지 나타냅니다. */
  disabled?: boolean;
}

export interface FigmaTabsProps {
  /** 탭 목록입니다. */
  tabs: FigmaTabItem[];
  /** 현재 선택한 탭 값입니다. */
  value: string;
  /** 탭 변경을 처리할 함수입니다. */
  onChange: (value: string) => void;
  /** 탭 목록의 접근성 레이블입니다. */
  ariaLabel?: string;
  /** 가로 스크롤 또는 균등 폭 배치를 선택합니다. */
  layout?: "scroll" | "fill";
  /** 최상위 탭 목록에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Figma public product segment의 50px radius, 43px height, 8px 18px 10px padding,
 * active rgba(0,0,0,0.08)와 inactive white surface를 반영합니다.
 * keyboard navigation과 focus-visible dashed outline은 접근성을 위한 local web extension입니다.
 */
export function FigmaTabs({
  ariaLabel = "제품 보기",
  className,
  layout = "scroll",
  onChange,
  tabs,
  value,
}: FigmaTabsProps) {
  const tabsId = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") {
      return;
    }

    event.preventDefault();
    let nextIndex = currentIndex;

    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      const direction = event.key === "ArrowRight" ? 1 : -1;
      for (let step = 0; step < tabs.length; step += 1) {
        nextIndex = (nextIndex + direction + tabs.length) % tabs.length;
        if (!tabs[nextIndex].disabled) {
          break;
        }
      }
    }

    const nextTab = tabs[nextIndex];
    if (!nextTab.disabled) {
      onChange(nextTab.value);
    }
  }

  return (
    <div
      aria-label={ariaLabel}
      className={joinClasses(
        "flex w-fit max-w-full gap-1 rounded-[50px] bg-white p-1 font-['figmaSans']",
        layout === "scroll" ? "overflow-x-auto" : "w-full",
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab, index) => {
        const isSelected = tab.value === value;
        const tabId = `${tabsId}-tab-${tab.value}`;
        const panelId = `${tabsId}-panel-${tab.value}`;

        return (
          <button
            aria-controls={panelId}
            aria-selected={isSelected}
            className={joinClasses(
              "inline-flex min-h-[43px] shrink-0 items-center justify-center rounded-[50px] px-[18px] pb-[10px] pt-2 text-base font-[330] leading-[23px] tracking-[-0.009em] text-black outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-[#0d99ff] disabled:cursor-not-allowed disabled:opacity-45",
              layout === "fill" && "flex-1",
              isSelected ? "bg-[rgba(0,0,0,0.08)]" : "bg-white",
            )}
            disabled={tab.disabled}
            id={tabId}
            key={tab.value}
            onClick={() => onChange(tab.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            type="button"
          >
            <span className="truncate">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FigmaTabs;
