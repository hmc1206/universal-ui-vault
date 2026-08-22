import { useId, useState, type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #3e6ae1 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface TeslaAccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TeslaAccordionProps {
  /** 펼쳐 보일 항목입니다. */
  items: TeslaAccordionItem[];
  /** 초기 열린 항목입니다. */
  defaultOpenValues?: string[];
  /** 제어형으로 전달할 열린 항목입니다. */
  openValues?: string[];
  /** 열린 항목이 달라질 때 호출됩니다. */
  onOpenValuesChange?: (values: string[]) => void;
  /** 여러 항목을 동시에 열지 결정합니다. */
  allowMultiple?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3의 #f4f4f4 filled information-card, 8px card corner, #171a20/#5c5e62 copy hierarchy를 바탕으로 한 accordion 확장입니다.
 * 공개 캡처에는 FAQ와 expand motion이 없으므로, 열림/닫힘 제어는 Tesla 공식 behavior로 주장하지 않으며 animation을 추가하지 않습니다.
 */
export function TeslaAccordion({
  allowMultiple = false,
  className,
  defaultOpenValues = [],
  items,
  onOpenValuesChange,
  openValues,
}: TeslaAccordionProps) {
  const [localValues, setLocalValues] = useState<string[]>(defaultOpenValues);
  const values = openValues ?? localValues;
  const baseId = useId();

  function toggle(value: string) {
    const isOpen = values.includes(value);
    const nextValues = isOpen
      ? values.filter((item) => item !== value)
      : allowMultiple
        ? [...values, value]
        : [value];

    if (openValues === undefined) {
      setLocalValues(nextValues);
    }

    onOpenValuesChange?.(nextValues);
  }

  return (
    <div className={joinClasses("relative isolate overflow-hidden border border-white/45 bg-white/70 backdrop-blur-xl shadow-[0_14px_34px_rgba(15,23,42,0.10)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current rounded-[8px] bg-[#f4f4f4] font-sans text-[#171a20]", className)}>
      {items.map((item, index) => {
        const isOpen = values.includes(item.value);
        const panelId = `${baseId}-${item.value}`;

        return (
          <div className={index ? "border-t border-[#d0d1d2]" : ""} key={item.value}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="flex min-h-14 w-full items-center justify-between gap-4 px-6 text-left text-sm font-medium outline-none focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={item.disabled}
              onClick={() => toggle(item.value)}
              type="button"
            >
              <span>{item.title}</span>
              <span aria-hidden="true" className={joinClasses("text-[#393c41]", isOpen && "rotate-180")}>
                ▾
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-[#d0d1d2] bg-white px-6 py-5 text-sm leading-6 text-[#5c5e62]" id={panelId}>
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default TeslaAccordion;
