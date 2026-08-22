import type { HTMLAttributes } from "react";

export interface SamsungAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "active" | "away" | "offline";
  showStatus?: boolean;
  tone?: "light" | "dark";
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }
function initials(name: string) { return name.trim().split(/\s+/).filter(Boolean).map((word) => word[0]).join("").slice(0, 2).toUpperCase() || "?"; }

/** Samsung의 profile marker와 collaboration presence를 표현하는 avatar입니다. */
export function SamsungAvatar({ alt, className, name = "Alex Kim", showStatus = false, size = "md", src, status = "active", tone = "dark", ...props }: SamsungAvatarProps) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-base", xl: "h-20 w-20 text-xl" };
  const statusClass = status === "active" ? "bg-[#007aff]" : status === "away" ? "bg-[#6b7280]" : "bg-[#d1d5db]";
  return <div {...props} className={joinClasses("relative inline-flex shrink-0 font-sans", sizes[size], className)}>{src ? <img alt={alt ?? name} className="h-full w-full rounded-full border-2 border-white object-cover" src={src} /> : <span aria-label={alt ?? name} className={joinClasses("inline-flex h-full w-full items-center justify-center rounded-full border-2 border-[#dbe3f0] font-black", tone === "light" ? "bg-white text-[#111111]" : "bg-[#007aff] text-white")} role="img">{initials(name)}</span>}{showStatus ? <span aria-label={status} className={joinClasses("absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white", statusClass)} /> : null}</div>;
}

export default SamsungAvatar;
