import type { HTMLAttributes } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #000000 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface MusinsaAvatarProps extends HTMLAttributes<HTMLDivElement> {
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

/** Musinsa의 profile marker와 collaboration presence를 표현하는 avatar입니다. */
export function MusinsaAvatar({ alt, className, name = "Alex Kim", showStatus = false, size = "md", src, status = "active", tone = "dark", ...props }: MusinsaAvatarProps) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-base", xl: "h-20 w-20 text-xl" };
  const statusClass = status === "active" ? "bg-[#000000]" : status === "away" ? "bg-[#666666]" : "bg-[#d1d5db]";
  return <div {...props} className={joinClasses("relative isolate inline-flex shrink-0 rounded-full bg-white/48 p-0.5 backdrop-blur-md shadow-[0_8px_18px_rgba(15,23,42,0.12)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current font-sans font-black", sizes[size], className)}>{src ? <img alt={alt ?? name} className="h-full w-full rounded-full border-2 border-white object-cover" src={src} /> : <span aria-label={alt ?? name} className={joinClasses("inline-flex h-full w-full items-center justify-center rounded-full border-2 border-[#111111] font-black", tone === "light" ? "bg-white text-[#000000]" : "bg-[#000000] text-white")} role="img">{initials(name)}</span>}{showStatus ? <span aria-label={status} className={joinClasses("absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white", statusClass)} /> : null}</div>;
}

export default MusinsaAvatar;
