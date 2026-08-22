import { type ReactNode } from "react";

export interface TwentyNineCmTabItem { value: string; label: ReactNode; disabled?: boolean; }
export interface TwentyNineCmTabsProps { tabs: TwentyNineCmTabItem[]; value: string; onChange: (value: string) => void; layout?: "fill" | "hug" | "scroll"; ariaLabel?: string; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** 29CM의 navigation pulse를 선택 상태에 담은 tab control입니다. */
export function TwentyNineCmTabs({ ariaLabel = "콘텐츠 탭", className, layout = "hug", onChange, tabs, value }: TwentyNineCmTabsProps) {
  return <div aria-label={ariaLabel} className={joinClasses("flex gap-1 overflow-x-auto p-1 rounded-none border border-[#d8d8d8] bg-white font-sans", layout === "fill" && "w-full", className)} role="tablist">{tabs.map((tab) => { const active = tab.value === value; return <button aria-selected={active} className={joinClasses("min-h-10 shrink-0 px-4 text-sm font-bold rounded-none transition-all duration-300 ease-out", layout === "fill" && "flex-1", active ? "bg-[#111111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "text-[#666666] hover:bg-[#f7f7f7]")} disabled={tab.disabled} key={tab.value} onClick={() => onChange(tab.value)} role="tab" type="button">{tab.label}</button>; })}</div>;
}

export default TwentyNineCmTabs;
