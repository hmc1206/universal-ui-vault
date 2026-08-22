import { useId, useState, type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #0071e3 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface AppleAccordionItem { value: string; title: ReactNode; content: ReactNode; disabled?: boolean; }
export interface AppleAccordionProps { items: AppleAccordionItem[]; defaultOpenValues?: string[]; openValues?: string[]; onOpenValuesChange?: (values: string[]) => void; allowMultiple?: boolean; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Apple의 정보 위계를 필요할 때만 열어 보이는 accordion입니다. */
export function AppleAccordion({ allowMultiple = false, className, defaultOpenValues = [], items, onOpenValuesChange, openValues }: AppleAccordionProps) {
  const [localValues, setLocalValues] = useState(defaultOpenValues);
  const values = openValues ?? localValues;
  const id = useId();
  function toggle(value: string) { const next = values.includes(value) ? values.filter((item) => item !== value) : allowMultiple ? [...values, value] : [value]; if (openValues === undefined) setLocalValues(next); onOpenValuesChange?.(next); }
  return <div className={joinClasses("relative isolate overflow-hidden border border-white/45 bg-white/70 backdrop-blur-xl shadow-[0_14px_34px_rgba(15,23,42,0.10)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current rounded-[22px] border border-[#d2d2d7] bg-white font-['SF_Pro_Display']", className)}>{items.map((item, index) => { const open = values.includes(item.value); const panelId = `${id}-${item.value}`; return <div className={index ? "border-t border-[#d2d2d7]" : ""} key={item.value}><button aria-controls={panelId} aria-expanded={open} className="flex min-h-12 w-full items-center justify-between gap-4 px-4 text-left text-sm font-bold text-[#1d1d1f]" disabled={item.disabled} onClick={() => toggle(item.value)} type="button"><span>{item.title}</span><span className={joinClasses("text-[#2997ff] transition-all duration-500 ease-out", open && "rotate-180")}>⌄</span></button><div className={joinClasses("grid transition-all duration-500 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")} id={panelId}><div className="min-h-0 overflow-hidden"><p className="border-t border-[#d2d2d7] px-4 py-4 text-sm leading-6 text-[#6e6e73]">{item.content}</p></div></div></div>; })}</div>;
}

export default AppleAccordion;
