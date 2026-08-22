import type { HTMLAttributes } from "react";

export type AppleAvatarSize = "sm" | "md" | "lg" | "xl";
export type AppleAvatarStatus = "active" | "away" | "offline";

export interface AppleAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: AppleAvatarSize;
  /** 상태 텍스트 및 indicator를 표시합니다. */
  status?: AppleAvatarStatus;
  /** 이니셜 배경 표면입니다. */
  tone?: "light" | "dark";
}

const sizeClasses: Record<AppleAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-[17px]",
  xl: "h-16 w-16 text-xl",
};

const indicatorSizeClasses: Record<AppleAvatarSize, string> = {
  sm: "h-2.5 w-2.5 border",
  md: "h-3 w-3 border-2",
  lg: "h-3.5 w-3.5 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<AppleAvatarStatus, string> = {
  active: "bg-[#1d1d1f]",
  away: "bg-[#6e6e73]",
  offline: "bg-[#d2d2d7]",
};

const statusLabels: Record<AppleAvatarStatus, string> = {
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
 * Apple public web의 neutral color hierarchy와 SF Pro Text를 사용하는 profile avatar 확장입니다.
 * 공개 캡처에는 avatar와 presence token이 없으므로, status는 Apple semantic palette를 주장하지 않는 monochrome 지역 표현입니다.
 */
export function AppleAvatar({
  alt,
  className,
  name = "",
  size = "md",
  src,
  status,
  tone = "light",
  ...spanProps
}: AppleAvatarProps) {
  const accessibleName = alt || name || "사용자 프로필";

  return (
    <span {...spanProps} className={joinClasses("relative inline-flex shrink-0 font-['SF_Pro_Text']", sizeClasses[size], className)}>
      {src ? (
        <img alt={accessibleName} className="h-full w-full rounded-full border border-[#d2d2d7] object-cover" src={src} />
      ) : (
        <span
          aria-label={accessibleName}
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#d2d2d7] font-normal tracking-[-0.01em]",
            tone === "dark" ? "bg-black text-white" : "bg-[#f5f5f7] text-[#1d1d1f]",
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

export default AppleAvatar;
