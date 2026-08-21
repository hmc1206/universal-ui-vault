import { useId, type KeyboardEvent, type ReactNode } from "react";

export interface TossTabItem {
  /** 탭을 구분하는 고유 값입니다. */
  value: string;
  /** 화면에 표시할 탭 레이블입니다. */
  label: ReactNode;
  /** 선택할 수 없는 탭인지 나타냅니다. */
  disabled?: boolean;
}

export interface TossTabsProps {
  /** 탭 목록입니다. */
  tabs: TossTabItem[];
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
 * 토스의 제품 블루·명확한 텍스트 위계를 활용한 탭 네비게이션 확장 컴포넌트입니다.
 * 현재 패킷은 탭의 공식 기하를 제공하지 않으므로, 활성 하단선은 선택을 빠르게 이해하도록 만든 지역 확장입니다.
 */
export function TossTabs({
  ariaLabel = "카테고리",
  className,
  layout = "hug",
  onChange,
  tabs,
  value,
}: TossTabsProps) {
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
        "flex min-w-0 border-b border-[#e5e8eb] font-[Toss\ Product\ Sans,system-ui,sans-serif]",
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
              "relative -mb-px inline-flex h-12 shrink-0 items-center justify-center border-b-2 px-4 text-base font-semibold leading-6 tracking-[-0.02em] outline-none transition-[border-color,color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3182f6] disabled:cursor-not-allowed disabled:border-transparent disabled:text-[#8b95a1]",
              layout === "fill" && "flex-1",
              isSelected ? "border-[#3182f6] text-[#3182f6]" : "border-transparent text-[#8b95a1] hover:text-[#4e5968]",
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

export default TossTabs;
