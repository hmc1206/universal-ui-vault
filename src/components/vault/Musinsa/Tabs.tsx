import { type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #000000 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface MusinsaTabItem { value: string; label: ReactNode; disabled?: boolean; }
export interface MusinsaTabsProps { tabs: MusinsaTabItem[]; value: string; onChange: (value: string) => void; layout?: "fill" | "hug" | "scroll"; ariaLabel?: string; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Musinsa의 navigation pulse를 선택 상태에 담은 tab control입니다. */
export function MusinsaTabs({ ariaLabel = "콘텐츠 탭", className, layout = "hug", onChange, tabs, value }: MusinsaTabsProps) {
  return <div aria-label={ariaLabel} className={joinClasses("grid grid-flow-col auto-cols-fr gap-1 overflow-x-auto border border-white/45 bg-white/64 p-1 backdrop-blur-xl shadow-[0_10px_26px_rgba(15,23,42,0.10)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current p-1 rounded-none border border-[#111111] bg-white font-sans font-black", layout === "fill" && "w-full", className)} role="tablist">{tabs.map((tab) => { const active = tab.value === value; return <button aria-selected={active} className={joinClasses("min-h-10 min-w-max px-4 text-sm font-bold rounded-none transition-all duration-150 ease-out", layout === "fill" && "flex-1", active ? "bg-[#000000] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "text-[#666666] hover:bg-[#ffffff]")} disabled={tab.disabled} key={tab.value} onClick={() => onChange(tab.value)} role="tab" type="button">{tab.label}</button>; })}</div>;
}

export default MusinsaTabs;
