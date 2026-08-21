import { useId, type KeyboardEvent, type ReactNode } from "react";

export interface SamsungTabItem {
  /** 탭을 구분하는 고유 값입니다. */
  value: string;
  /** 화면에 표시할 탭 레이블입니다. */
  label: ReactNode;
  /** 선택할 수 없는 탭인지 나타냅니다. */
  disabled?: boolean;
}

export interface SamsungTabsProps {
  /** 탭 목록입니다. */
  tabs: SamsungTabItem[];
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
 * 삼성전자 AI 제품 페이지에서 관측된 18px/700 SamsungOneKorean, 4px 0px 패딩, 0px 반경의 선택 탭을 반영합니다.
 * 캡처에는 선택 하단선의 증거가 없으므로, 선택 상태는 텍스트 위계와 aria-selected로만 명확하게 전달합니다.
 */
export function SamsungTabs({
  ariaLabel = "제품 카테고리",
  className,
  layout = "hug",
  onChange,
  tabs,
  value,
}: SamsungTabsProps) {
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
        "flex min-w-0 gap-6 font-[SamsungOneKorean,sans-serif]",
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
              "inline-flex shrink-0 items-center justify-center rounded-none px-0 py-1 text-left text-lg font-bold leading-6 tracking-[-0.03em] outline-none transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-[#dddddd]",
              layout === "fill" && "flex-1",
              isSelected ? "text-[#000000]" : "text-[#707070] hover:text-[#000000]",
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

export default SamsungTabs;
