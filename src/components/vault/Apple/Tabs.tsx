import { useId, type KeyboardEvent, type ReactNode } from "react";

export interface AppleTabItem {
  /** 탭을 구분하는 고유 값입니다. */
  value: string;
  /** 사용자에게 보이는 탭 레이블입니다. */
  label: ReactNode;
  /** 탭을 선택할 수 없는지 나타냅니다. */
  disabled?: boolean;
}

export interface AppleTabsProps {
  /** 탭 목록입니다. */
  tabs: AppleTabItem[];
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
 * Apple Store product gallery에서 관측된 53px, SF Pro Text, selected/unselected state를 활용한 tab 확장입니다.
 * 선택 상태의 정확한 decorative treatment과 motion은 캡처에 없으므로, #1d1d1f underline은 명시성을 위한 지역 web extension입니다.
 */
export function AppleTabs({
  ariaLabel = "콘텐츠 보기",
  className,
  layout = "scroll",
  onChange,
  tabs,
  value,
}: AppleTabsProps) {
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
        "flex border-b border-[#d2d2d7] font-['SF_Pro_Text']",
        layout === "scroll" ? "max-w-full overflow-x-auto" : "w-full",
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
              "relative inline-flex h-[53px] shrink-0 items-center justify-center px-4 text-[17px] font-normal leading-[22px] tracking-[-0.01em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0066cc] disabled:cursor-not-allowed disabled:text-[#6e6e73]",
              layout === "fill" && "flex-1",
              isSelected ? "text-[#1d1d1f] after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:bg-[#1d1d1f]" : "text-[#6e6e73]",
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

export default AppleTabs;
