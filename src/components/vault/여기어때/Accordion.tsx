import { useId, useState, type ReactNode } from "react";

export interface GoodChoiceAccordionItem {
  /** 항목을 구분하는 고유 값입니다. */
  value: string;
  /** 접힌 상태에서 표시할 제목입니다. */
  title: ReactNode;
  /** 펼쳤을 때 표시할 상세 내용입니다. */
  content: ReactNode;
  /** 항목을 펼칠 수 없는 상태인지 나타냅니다. */
  disabled?: boolean;
}

export interface GoodChoiceAccordionProps {
  /** 아코디언 항목 목록입니다. */
  items: GoodChoiceAccordionItem[];
  /** 처음 펼쳐둘 항목 값입니다. */
  defaultOpenValues?: string[];
  /** 제어형으로 사용할 펼친 항목 값입니다. */
  openValues?: string[];
  /** 펼친 항목이 바뀌었을 때 실행할 함수입니다. */
  onOpenValuesChange?: (values: string[]) => void;
  /** 여러 항목을 동시에 펼칠지 결정합니다. */
  allowMultiple?: boolean;
  /** 최상위 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={joinClasses("h-5 w-5 shrink-0 text-[#737373] transition-transform duration-150 ease-out motion-reduce:transition-none", open && "rotate-180 text-[#1D8BFF]")}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="m7 10 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" transform="rotate(90 12 12)" />
    </svg>
  );
}

/**
 * 여기어때의 Neutral outline·Cyan 포커스·명확한 조건 정보 위계를 활용한 아코디언 확장 컴포넌트입니다.
 * 공개 자료에는 아코디언의 고유 모션 토큰이 없으므로, 사용성에 필요한 짧은 지역 전환만 적용합니다.
 */
export function GoodChoiceAccordion({
  allowMultiple = false,
  className,
  defaultOpenValues = [],
  items,
  onOpenValuesChange,
  openValues,
}: GoodChoiceAccordionProps) {
  const [uncontrolledOpenValues, setUncontrolledOpenValues] = useState<string[]>(defaultOpenValues);
  const accordionId = useId();
  const activeValues = openValues ?? uncontrolledOpenValues;

  function handleToggle(value: string) {
    const isOpen = activeValues.includes(value);
    let nextValues: string[];

    if (isOpen) {
      nextValues = activeValues.filter((openValue) => openValue !== value);
    } else if (allowMultiple) {
      nextValues = [...activeValues, value];
    } else {
      nextValues = [value];
    }

    if (openValues === undefined) {
      setUncontrolledOpenValues(nextValues);
    }

    onOpenValuesChange?.(nextValues);
  }

  return (
    <div className={joinClasses("divide-y divide-[#E6E6E6] rounded-xl border border-[#E6E6E6] bg-white font-[Pretendard,system-ui,sans-serif]", className)}>
      {items.map((item) => {
        const isOpen = activeValues.includes(item.value);
        const buttonId = `${accordionId}-button-${item.value}`;
        const panelId = `${accordionId}-panel-${item.value}`;

        return (
          <div key={item.value}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold leading-6 tracking-[-0.02em] text-[#222222] outline-none transition-colors duration-150 ease-out hover:bg-[#E3F0FF] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1D8BFF] disabled:cursor-not-allowed disabled:text-[#737373]"
                disabled={item.disabled}
                id={buttonId}
                onClick={() => handleToggle(item.value)}
                type="button"
              >
                <span className="min-w-0 flex-1">{item.title}</span>
                <ChevronDownIcon open={isOpen} />
              </button>
            </h3>
            <div
              aria-labelledby={buttonId}
              className={joinClasses(
                "grid overflow-hidden transition-[grid-template-rows] duration-150 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
              id={panelId}
              role="region"
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-5 pb-5 text-base font-normal leading-6 tracking-[-0.02em] text-[#737373]">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GoodChoiceAccordion;
