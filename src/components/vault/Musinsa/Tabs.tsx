import { useId, type KeyboardEvent, type ReactNode } from "react";

export interface MusinsaTabItem {
  /** 탭을 구분하는 고유 값입니다. */
  value: string;
  /** 화면에 표시할 탭 레이블입니다. */
  label: ReactNode;
  /** 선택할 수 없는 탭인지 나타냅니다. */
  disabled?: boolean;
}

export interface MusinsaTabsProps {
  /** 탭 목록입니다. */
  tabs: MusinsaTabItem[];
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
 * 무신사 storefront의 black foreground, #ebebeb line, Pretendard 14px/400 밀도를 활용한 탭 확장입니다.
 * 공개 자료에는 selected filter/tab state가 없으므로, active underline과 키보드 이동은 요청된 재사용을 위한 지역 확장입니다.
 */
export function MusinsaTabs({
  ariaLabel = "콘텐츠 카테고리",
  className,
  layout = "hug",
  onChange,
  tabs,
  value,
}: MusinsaTabsProps) {
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
        "flex min-w-0 border-b border-[#ebebeb] font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif]",
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
              "relative -mb-px inline-flex h-9 shrink-0 items-center justify-center border-b-2 px-2 text-sm font-normal leading-[21px] outline-none transition-[border-color,color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black disabled:cursor-not-allowed disabled:border-transparent disabled:text-[#666666]",
              layout === "fill" && "flex-1",
              isSelected ? "border-black text-black" : "border-transparent text-[#666666] hover:text-black",
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

export default MusinsaTabs;
