import { useId, useState, type ReactNode } from "react";

export interface AppleAccordionItem {
  /** 항목을 구분하는 고유 값입니다. */
  value: string;
  /** 접힌 상태에서 보이는 직접적인 질문 또는 제목입니다. */
  title: ReactNode;
  /** 펼친 상태에서 보이는 설명입니다. */
  content: ReactNode;
  /** 항목을 열 수 없는지 나타냅니다. */
  disabled?: boolean;
}

export interface AppleAccordionProps {
  /** 아코디언 항목 목록입니다. */
  items: AppleAccordionItem[];
  /** 처음 펼쳐둘 항목 값입니다. */
  defaultOpenValues?: string[];
  /** 제어형으로 사용하려는 펼친 항목 값입니다. */
  openValues?: string[];
  /** 펼친 항목 값이 달라졌을 때 실행할 함수입니다. */
  onOpenValuesChange?: (values: string[]) => void;
  /** 여러 항목을 동시에 펼칠지 결정합니다. */
  allowMultiple?: boolean;
  /** 최상위 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={joinClasses("h-5 w-5 shrink-0 text-[#515154] transition-transform motion-reduce:transition-none", open && "rotate-180")}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

/**
 * Apple public web의 SF Pro Text, #1d1d1f/#515154 hierarchy와 HIG documentation의 white 18px surface를 활용한 accordion 확장입니다.
 * 18px은 HIG 문서 chrome의 관측값일 뿐 native platform token이 아닙니다.
 * accordion behavior와 chevron rotation은 공개 캡처에 없으므로 local web extension이며 reduced-motion을 존중합니다.
 */
export function AppleAccordion({
  allowMultiple = false,
  className,
  defaultOpenValues = [],
  items,
  onOpenValuesChange,
  openValues,
}: AppleAccordionProps) {
  const [uncontrolledOpenValues, setUncontrolledOpenValues] = useState<string[]>(defaultOpenValues);
  const accordionId = useId();
  const activeOpenValues = openValues ?? uncontrolledOpenValues;

  function toggleItem(value: string) {
    const isOpen = activeOpenValues.includes(value);
    let nextValues: string[];

    if (isOpen) {
      nextValues = activeOpenValues.filter((openValue) => openValue !== value);
    } else if (allowMultiple) {
      nextValues = [...activeOpenValues, value];
    } else {
      nextValues = [value];
    }

    if (openValues === undefined) {
      setUncontrolledOpenValues(nextValues);
    }

    onOpenValuesChange?.(nextValues);
  }

  return (
    <div className={joinClasses("overflow-hidden rounded-[18px] border border-[#d2d2d7] bg-white font-['SF_Pro_Text']", className)}>
      {items.map((item, index) => {
        const isOpen = activeOpenValues.includes(item.value);
        const buttonId = `${accordionId}-button-${item.value}`;
        const panelId = `${accordionId}-panel-${item.value}`;

        return (
          <div className={index > 0 ? "border-t border-[#d2d2d7]" : undefined} key={item.value}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex min-h-[53px] w-full items-center justify-between gap-5 px-5 py-4 text-left text-[17px] font-normal leading-[22px] tracking-[-0.01em] text-[#1d1d1f] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0066cc] disabled:cursor-not-allowed disabled:text-[#6e6e73] sm:px-6"
                disabled={item.disabled}
                id={buttonId}
                onClick={() => toggleItem(item.value)}
                type="button"
              >
                <span className="min-w-0 flex-1">{item.title}</span>
                <ChevronIcon open={isOpen} />
              </button>
            </h3>
            <div
              aria-labelledby={buttonId}
              className={isOpen ? "block" : "hidden"}
              id={panelId}
              role="region"
            >
              <div className="border-t border-[#d2d2d7] px-5 py-5 text-[17px] font-normal leading-[25px] tracking-[-0.022em] text-[#515154] sm:px-6">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AppleAccordion;
