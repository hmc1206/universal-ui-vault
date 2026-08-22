import { type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #ff5160 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface AblyTabItem { value: string; label: ReactNode; disabled?: boolean; }
export interface AblyTabsProps { tabs: AblyTabItem[]; value: string; onChange: (value: string) => void; layout?: "fill" | "hug" | "scroll"; ariaLabel?: string; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Ably의 navigation pulse를 선택 상태에 담은 tab control입니다. */
export function AblyTabs({ ariaLabel = "콘텐츠 탭", className, layout = "hug", onChange, tabs, value }: AblyTabsProps) {
  return <div aria-label={ariaLabel} className={joinClasses("grid grid-flow-col auto-cols-fr gap-1 overflow-x-auto border border-white/45 bg-white/64 p-1 backdrop-blur-xl shadow-[0_10px_26px_rgba(15,23,42,0.10)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current p-1 rounded-3xl border border-[#ffd5db] bg-white font-sans", layout === "fill" && "w-full", className)} role="tablist">{tabs.map((tab) => { const active = tab.value === value; return <button aria-selected={active} className={joinClasses("min-h-10 min-w-max px-4 text-sm font-bold rounded-3xl transition-all duration-200 ease-out", layout === "fill" && "flex-1", active ? "bg-[#ff5160] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "text-[#7b5962] hover:bg-[#fff2f4]")} disabled={tab.disabled} key={tab.value} onClick={() => onChange(tab.value)} role="tab" type="button">{tab.label}</button>; })}</div>;
}

export default AblyTabs;
