import { type ReactNode } from "react";

export interface KarrotTabItem { value: string; label: ReactNode; disabled?: boolean; }
export interface KarrotTabsProps { tabs: KarrotTabItem[]; value: string; onChange: (value: string) => void; layout?: "fill" | "hug" | "scroll"; ariaLabel?: string; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Karrot의 navigation pulse를 선택 상태에 담은 tab control입니다. */
export function KarrotTabs({ ariaLabel = "콘텐츠 탭", className, layout = "hug", onChange, tabs, value }: KarrotTabsProps) {
  return <div aria-label={ariaLabel} className={joinClasses("flex gap-1 overflow-x-auto p-1 rounded-3xl border border-[#ffe1d0] bg-white font-sans", layout === "fill" && "w-full", className)} role="tablist">{tabs.map((tab) => { const active = tab.value === value; return <button aria-selected={active} className={joinClasses("min-h-10 shrink-0 px-4 text-sm font-bold rounded-3xl transition-all duration-200 ease-out", layout === "fill" && "flex-1", active ? "bg-[#ff6f0f] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "text-[#868b94] hover:bg-[#fff5f0]")} disabled={tab.disabled} key={tab.value} onClick={() => onChange(tab.value)} role="tab" type="button">{tab.label}</button>; })}</div>;
}

export default KarrotTabs;
