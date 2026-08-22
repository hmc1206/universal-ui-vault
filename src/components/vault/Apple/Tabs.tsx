import { type ReactNode } from "react";

export interface AppleTabItem { value: string; label: ReactNode; disabled?: boolean; }
export interface AppleTabsProps { tabs: AppleTabItem[]; value: string; onChange: (value: string) => void; layout?: "fill" | "hug" | "scroll"; ariaLabel?: string; className?: string; }
function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Apple의 navigation pulse를 선택 상태에 담은 tab control입니다. */
export function AppleTabs({ ariaLabel = "콘텐츠 탭", className, layout = "hug", onChange, tabs, value }: AppleTabsProps) {
  return <div aria-label={ariaLabel} className={joinClasses("flex gap-1 overflow-x-auto p-1 rounded-[22px] border border-[#d2d2d7] bg-white font-['SF_Pro_Display']", layout === "fill" && "w-full", className)} role="tablist">{tabs.map((tab) => { const active = tab.value === value; return <button aria-selected={active} className={joinClasses("min-h-10 shrink-0 px-4 text-sm font-bold rounded-[22px] transition-all duration-500 ease-out", layout === "fill" && "flex-1", active ? "bg-[#0071e3] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "text-[#6e6e73] hover:bg-[#ffffff]")} disabled={tab.disabled} key={tab.value} onClick={() => onChange(tab.value)} role="tab" type="button">{tab.label}</button>; })}</div>;
}

export default AppleTabs;
