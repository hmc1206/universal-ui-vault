import { type ReactNode } from "react";

export interface FigmaTabItem { value: string; label: ReactNode; disabled?: boolean; }
export interface FigmaTabsProps { tabs: FigmaTabItem[]; value: string; onChange: (value: string) => void; layout?: "fill" | "hug" | "scroll"; ariaLabel?: string; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Figma의 navigation pulse를 선택 상태에 담은 tab control입니다. */
export function FigmaTabs({ ariaLabel = "콘텐츠 탭", className, layout = "hug", onChange, tabs, value }: FigmaTabsProps) {
  return <div aria-label={ariaLabel} className={joinClasses("flex gap-1 overflow-x-auto p-1 rounded-sm border border-[#4d4d4d] bg-white font-['figmaSans']", layout === "fill" && "w-full", className)} role="tablist">{tabs.map((tab) => { const active = tab.value === value; return <button aria-selected={active} className={joinClasses("min-h-10 shrink-0 px-4 text-sm font-bold rounded-sm transition-all duration-150 ease-out", layout === "fill" && "flex-1", active ? "bg-[#2c2c2c] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "text-[#b8b8b8] hover:bg-[#2c2c2c]")} disabled={tab.disabled} key={tab.value} onClick={() => onChange(tab.value)} role="tab" type="button">{tab.label}</button>; })}</div>;
}

export default FigmaTabs;
