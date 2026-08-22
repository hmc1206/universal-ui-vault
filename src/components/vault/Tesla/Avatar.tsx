import type { HTMLAttributes } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #3e6ae1 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export type TeslaAvatarSize = "sm" | "md" | "lg" | "xl";
export type TeslaAvatarStatus = "active" | "away" | "offline";

export interface TeslaAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 이미지 URL입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  size?: TeslaAvatarSize;
  /** profile presence를 위한 재사용 확장 상태입니다. */
  status?: TeslaAvatarStatus;
  /** status indicator 표시 여부입니다. */
  showStatus?: boolean;
}

const sizeClasses: Record<TeslaAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

const statusClasses: Record<TeslaAvatarStatus, string> = {
  active: "bg-[#3e6ae1]",
  away: "bg-[#5c5e62]",
  offline: "bg-[#d0d1d2]",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

/**
 * Tesla Model 3의 #f4f4f4/#171a20 neutral hierarchy를 활용한 profile marker 확장입니다.
 * 공개 마케팅에는 avatar와 online status가 없으므로 status color는 Tesla product semantic으로 주장하지 않습니다.
 */
export function TeslaAvatar({
  alt,
  className,
  name = "Tesla Driver",
  showStatus = false,
  size = "md",
  src,
  status = "active",
  ...props
}: TeslaAvatarProps) {
  return (
    <div {...props} className={joinClasses("relative isolate inline-flex shrink-0 rounded-full bg-white/48 p-0.5 backdrop-blur-md shadow-[0_8px_18px_rgba(15,23,42,0.12)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current font-sans", sizeClasses[size], className)}>
      {src ? (
        <img alt={alt ?? name} className="h-full w-full rounded-full border-2 border-white object-cover" src={src} />
      ) : (
        <span
          aria-label={alt ?? name}
          className="inline-flex h-full w-full items-center justify-center rounded-full bg-[#f4f4f4] font-medium text-[#171a20] ring-1 ring-[#d0d1d2]"
          role="img"
        >
          {getInitials(name)}
        </span>
      )}
      {showStatus ? (
        <span
          aria-label={status}
          className={joinClasses("absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white", statusClasses[status])}
        />
      ) : null}
    </div>
  );
}

export default TeslaAvatar;
