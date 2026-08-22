import type { HTMLAttributes } from "react";

export type FigmaAvatarSize = "sm" | "md" | "lg" | "xl";
export type FigmaAvatarStatus = "active" | "away" | "offline";

export interface FigmaAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. md는 관측된 40px round-action 크기와 일치합니다. */
  size?: FigmaAvatarSize;
  /** 상태 텍스트 및 indicator를 표시합니다. */
  status?: FigmaAvatarStatus;
  /** black 또는 white profile surface를 선택합니다. */
  tone?: "dark" | "light";
}

const sizeClasses: Record<FigmaAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const indicatorSizeClasses: Record<FigmaAvatarSize, string> = {
  sm: "h-2.5 w-2.5 border",
  md: "h-3 w-3 border-2",
  lg: "h-3.5 w-3.5 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<FigmaAvatarStatus, string> = {
  active: "bg-black",
  away: "bg-black/50",
  offline: "bg-[#ebebeb]",
};

const statusLabels: Record<FigmaAvatarStatus, string> = {
  active: "이용 가능",
  away: "자리 비움",
  offline: "오프라인",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
}

/**
 * Figma public black/white chrome와 40px round-action geometry를 참고한 profile avatar 확장입니다.
 * 공개 capture에는 avatar와 presence token이 없으므로, status는 Figma semantic palette를 주장하지 않는 monochrome local expression입니다.
 */
export function FigmaAvatar({
  alt,
  className,
  name = "",
  size = "md",
  src,
  status,
  tone = "dark",
  ...spanProps
}: FigmaAvatarProps) {
  const accessibleName = alt || name || "사용자 프로필";

  return (
    <span {...spanProps} className={joinClasses("relative inline-flex shrink-0 font-['figmaSans']", sizeClasses[size], className)}>
      {src ? (
        <img alt={accessibleName} className="h-full w-full rounded-full border border-black object-cover" src={src} />
      ) : (
        <span
          aria-label={accessibleName}
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border font-[400] tracking-[-0.009em]",
            tone === "dark" ? "border-black bg-black text-white" : "border-black bg-white text-black",
          )}
          role="img"
        >
          {getInitials(name)}
        </span>
      )}
      {status ? (
        <>
          <span aria-hidden="true" className={joinClasses("absolute bottom-0 right-0 rounded-full border-white", indicatorSizeClasses[size], statusClasses[status])} />
          <span className="sr-only">상태: {statusLabels[status]}</span>
        </>
      ) : null}
    </span>
  );
}

export default FigmaAvatar;
