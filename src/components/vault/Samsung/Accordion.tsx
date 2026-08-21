import { useId, useState, type ReactNode } from "react";

export interface SamsungAccordionItem {
  /** 항목을 구분하는 고유 값입니다. */
  value: string;
  /** 접힌 상태에서 표시할 제목입니다. */
  title: ReactNode;
  /** 펼쳤을 때 표시할 상세 내용입니다. */
  content: ReactNode;
  /** 항목을 펼칠 수 없는 상태인지 나타냅니다. */
  disabled?: boolean;
}

export interface SamsungAccordionProps {
  /** 아코디언 항목 목록입니다. */
  items: SamsungAccordionItem[];
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
      className={joinClasses("h-5 w-5 shrink-0 text-[#707070] transition-transform duration-150 ease-out motion-reduce:transition-none", open && "rotate-180 text-[#000000]")}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * 삼성 공개 웹에서 관측된 그림자 없는 흰색·연회색·테두리 위계를 사용한 독립형 아코디언입니다.
 * 공식 삼성 아코디언의 모션 값은 현재 증거에 없으므로, 사용성에 필요한 짧은 지역 전환만 적용합니다.
 */
export function SamsungAccordion({
  allowMultiple = false,
  className,
  defaultOpenValues = [],
  items,
  onOpenValuesChange,
  openValues,
}: SamsungAccordionProps) {
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
    <div className={joinClasses("divide-y divide-[#dddddd] border-y border-[#dddddd] bg-[#ffffff] font-[SamsungOneKorean,sans-serif]", className)}>
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
                className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-bold leading-6 tracking-[-0.02em] text-[#000000] outline-none transition-colors duration-150 ease-out hover:bg-[#f7f7f7] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#007aff] disabled:cursor-not-allowed disabled:text-[#707070]"
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
                <div className="px-6 pb-6 text-base font-normal leading-[1.45] tracking-[-0.02em] text-[#707070]">
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

export default SamsungAccordion;
