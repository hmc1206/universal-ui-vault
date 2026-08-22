import { useId, type KeyboardEvent, type ReactNode } from "react";

export interface UpstageTabItem {
  /** 탭을 구분하는 고유 값입니다. */
  value: string;
  /** 화면에 표시할 탭 레이블입니다. */
  label: ReactNode;
  /** 선택할 수 없는 탭인지 나타냅니다. */
  disabled?: boolean;
}

export interface UpstageTabsProps {
  /** 탭 목록입니다. */
  tabs: UpstageTabItem[];
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
 * 업스테이지 public API-pricing tab의 white, #0A0D14, #E2E4E9, 8px, 18px/500 geometry를 활용한 탭 확장입니다.
 * 공개 자료는 static current markup만 기록하므로, keyboard navigation과 selected switching은 요청된 재사용을 위한 지역 확장입니다.
 */
export function UpstageTabs({
  ariaLabel = "모델 카테고리",
  className,
  layout = "hug",
  onChange,
  tabs,
  value,
}: UpstageTabsProps) {
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
        "flex min-w-0 gap-2 font-[Geist]",
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
              "inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border px-4 py-2 text-base font-medium leading-6 outline-none transition-[border-color,background-color,color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B52FF] disabled:cursor-not-allowed disabled:opacity-45",
              layout === "fill" && "flex-1",
              isSelected ? "border-[#E2E4E9] bg-white text-[#0A0D14]" : "border-transparent bg-white text-[#52525B] hover:border-[#E2E4E9]",
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

export default UpstageTabs;
