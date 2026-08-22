import { useId, useState, type ReactNode } from "react";

export interface KakaoAccordionItem { value: string; title: ReactNode; content: ReactNode; disabled?: boolean; }
export interface KakaoAccordionProps { items: KakaoAccordionItem[]; defaultOpenValues?: string[]; openValues?: string[]; onOpenValuesChange?: (values: string[]) => void; allowMultiple?: boolean; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Kakao의 정보 위계를 필요할 때만 열어 보이는 accordion입니다. */
export function KakaoAccordion({ allowMultiple = false, className, defaultOpenValues = [], items, onOpenValuesChange, openValues }: KakaoAccordionProps) {
  const [localValues, setLocalValues] = useState(defaultOpenValues);
  const values = openValues ?? localValues;
  const id = useId();
  function toggle(value: string) { const next = values.includes(value) ? values.filter((item) => item !== value) : allowMultiple ? [...values, value] : [value]; if (openValues === undefined) setLocalValues(next); onOpenValuesChange?.(next); }
  return <div className={joinClasses("overflow-hidden rounded-[22px] border border-[#e8d000] bg-white font-sans", className)}>{items.map((item, index) => { const open = values.includes(item.value); const panelId = `${id}-${item.value}`; return <div className={index ? "border-t border-[#e8d000]" : ""} key={item.value}><button aria-controls={panelId} aria-expanded={open} className="flex min-h-12 w-full items-center justify-between gap-4 px-4 text-left text-sm font-bold text-[#3c1e1e]" disabled={item.disabled} onClick={() => toggle(item.value)} type="button"><span>{item.title}</span><span className={joinClasses("text-[#3c1e1e] transition-all duration-200 ease-out", open && "rotate-180")}>⌄</span></button><div className={joinClasses("grid transition-all duration-200 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")} id={panelId}><div className="min-h-0 overflow-hidden"><p className="border-t border-[#e8d000] px-4 py-4 text-sm leading-6 text-[#6b5353]">{item.content}</p></div></div></div>; })}</div>;
}

export default KakaoAccordion;
