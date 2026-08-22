import { useId, useState, type ReactNode } from "react";

export interface FigmaAccordionItem {
  /** 항목을 구분하는 고유 값입니다. */
  value: string;
  /** 접힌 상태에서 보이는 직접적인 질문 또는 제목입니다. */
  title: ReactNode;
  /** 펼친 상태에서 보이는 설명입니다. */
  content: ReactNode;
  /** 항목을 열 수 없는지 나타냅니다. */
  disabled?: boolean;
}

export interface FigmaAccordionProps {
  /** 아코디언 항목 목록입니다. */
  items: FigmaAccordionItem[];
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
      className={joinClasses("h-5 w-5 shrink-0 text-black transition-transform motion-reduce:transition-none", open && "rotate-180")}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

/**
 * Figma public page의 white canvas, #ebebeb separation, black type, figmaSans와 dashed #0d99ff focus treatment을 사용하는 accordion 확장입니다.
 * 공개 capture에는 accordion state와 motion이 없으므로 open behavior와 chevron rotation은 local web extension이며 reduced-motion을 존중합니다.
 * general card shadow 또는 editor panel state를 주장하지 않습니다.
 */
export function FigmaAccordion({
  allowMultiple = false,
  className,
  defaultOpenValues = [],
  items,
  onOpenValuesChange,
  openValues,
}: FigmaAccordionProps) {
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
    <div className={joinClasses("overflow-hidden rounded-lg border border-[#ebebeb] bg-white font-['figmaSans']", className)}>
      {items.map((item, index) => {
        const isOpen = activeOpenValues.includes(item.value);
        const buttonId = `${accordionId}-button-${item.value}`;
        const panelId = `${accordionId}-panel-${item.value}`;

        return (
          <div className={index > 0 ? "border-t border-[#ebebeb]" : undefined} key={item.value}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex min-h-[49px] w-full items-center justify-between gap-5 px-5 py-3 text-left text-base font-[400] leading-[23px] tracking-[-0.009em] text-black outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-[-2px] focus-visible:outline-[#0d99ff] disabled:cursor-not-allowed disabled:text-black/45"
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
              <div className="border-t border-[#ebebeb] px-5 py-5 text-base font-[330] leading-[1.42] tracking-[-0.009em] text-black/65">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FigmaAccordion;
