import { useId, type KeyboardEvent, type ReactNode } from "react";

export interface LikelionTabItem {
  /** 탭을 구분하는 고유 값입니다. */
  value: string;
  /** 화면에 표시할 탭 레이블입니다. */
  label: ReactNode;
  /** 선택할 수 없는 탭인지 나타냅니다. */
  disabled?: boolean;
}

export interface LikelionTabsProps {
  /** 탭 목록입니다. */
  tabs: LikelionTabItem[];
  /** 현재 선택한 탭 값입니다. */
  value: string;
  /** 탭이 바뀌었을 때 실행할 함수입니다. */
  onChange: (value: string) => void;
  /** 균등 너비 또는 콘텐츠 너비 레이아웃을 선택합니다. */
  layout?: "fill" | "hug";
  /** 탭 목록의 접근성 레이블입니다. */
  ariaLabel?: string;
  /** 탭 목록 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 멋쟁이사자처럼의 과정 탐색 주목색·헤어라인·직접적인 텍스트 위계를 활용한 탭 네비게이션 확장 컴포넌트입니다.
 * 공식 홈 캡처에는 탭의 고유 기하가 없으므로, 활성 하단선은 선택을 빠르게 읽도록 만든 지역 확장입니다.
 */
export function LikelionTabs({
  ariaLabel = "과정 카테고리",
  className,
  layout = "hug",
  onChange,
  tabs,
  value,
}: LikelionTabsProps) {
  const tabsId = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    let nextIndex = currentIndex;

    for (let step = 0; step < tabs.length; step += 1) {
      nextIndex = (nextIndex + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];

      if (!nextTab.disabled) {
        onChange(nextTab.value);
        break;
      }
    }
  }

  return (
    <div
      aria-label={ariaLabel}
      className={joinClasses(
        "flex min-w-0 border-b border-[#e5e5e5] font-[inherit]",
        layout === "fill" ? "w-full" : "w-fit max-w-full overflow-x-auto",
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
              "relative -mb-px inline-flex h-12 shrink-0 items-center justify-center border-b-2 px-4 text-base font-semibold leading-6 tracking-[-0.02em] outline-none transition-[border-color,color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563eb] disabled:cursor-not-allowed disabled:border-transparent disabled:text-[#a3a3a3]",
              layout === "fill" && "flex-1",
              isSelected ? "border-[#ff6000] text-[#222222]" : "border-transparent text-[#737373] hover:text-[#222222]",
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

export default LikelionTabs;
