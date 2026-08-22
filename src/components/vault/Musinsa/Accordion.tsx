import { useId, useState, type ReactNode } from "react";

export interface MusinsaAccordionItem {
  /** 항목을 구분하는 고유 값입니다. */
  value: string;
  /** 접힌 상태에서 표시할 제목입니다. */
  title: ReactNode;
  /** 펼쳤을 때 표시할 상세 내용입니다. */
  content: ReactNode;
  /** 항목을 펼칠 수 없는 상태인지 나타냅니다. */
  disabled?: boolean;
}

export interface MusinsaAccordionProps {
  /** 아코디언 항목 목록입니다. */
  items: MusinsaAccordionItem[];
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
      className={joinClasses("h-5 w-5 shrink-0 text-[#666666] transition-transform motion-reduce:transition-none", open && "rotate-180 text-black")}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="m7 10 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" transform="rotate(90 12 12)" />
    </svg>
  );
}

/**
 * 무신사 storefront의 white canvas, #ebebeb line, black foreground, 14px Pretendard 밀도를 활용한 아코디언 확장입니다.
 * 공개 자료에는 accordion 상태와 모션이 없으므로, 펼침 기능은 요청된 재사용을 위한 지역 확장입니다.
 */
export function MusinsaAccordion({
  allowMultiple = false,
  className,
  defaultOpenValues = [],
  items,
  onOpenValuesChange,
  openValues,
}: MusinsaAccordionProps) {
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
    <div className={joinClasses("divide-y divide-[#ebebeb] border border-[#ebebeb] bg-white font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif]", className)}>
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
                className="flex min-h-12 w-full items-center justify-between gap-4 px-3 py-3 text-left text-sm font-normal leading-[21px] text-black outline-none transition-colors hover:bg-[#f7f7f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black disabled:cursor-not-allowed disabled:text-[#666666]"
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
              className={joinClasses("overflow-hidden", isOpen ? "block" : "hidden")}
              id={panelId}
              role="region"
            >
              <div className="border-t border-[#ebebeb] bg-white px-3 py-4 text-sm font-normal leading-[21px] text-[#666666]">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MusinsaAccordion;
