import { type ReactNode } from "react";

export interface SamsungTabItem { value: string; label: ReactNode; disabled?: boolean; }
export interface SamsungTabsProps { tabs: SamsungTabItem[]; value: string; onChange: (value: string) => void; layout?: "fill" | "hug" | "scroll"; ariaLabel?: string; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Samsung의 navigation pulse를 선택 상태에 담은 tab control입니다. */
export function SamsungTabs({ ariaLabel = "콘텐츠 탭", className, layout = "hug", onChange, tabs, value }: SamsungTabsProps) {
  return <div aria-label={ariaLabel} className={joinClasses("flex gap-1 overflow-x-auto p-1 rounded-2xl border border-[#dbe3f0] bg-white font-sans", layout === "fill" && "w-full", className)} role="tablist">{tabs.map((tab) => { const active = tab.value === value; return <button aria-selected={active} className={joinClasses("min-h-10 shrink-0 px-4 text-sm font-bold rounded-2xl transition-all duration-300 ease-out", layout === "fill" && "flex-1", active ? "bg-[#007aff] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "text-[#6b7280] hover:bg-[#ffffff]")} disabled={tab.disabled} key={tab.value} onClick={() => onChange(tab.value)} role="tab" type="button">{tab.label}</button>; })}</div>;
}

export default SamsungTabs;
