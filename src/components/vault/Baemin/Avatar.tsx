import type { HTMLAttributes } from "react";

export type BaeminAvatarSize = "sm" | "md" | "lg" | "xl";
export type BaeminAvatarStatus = "online" | "away" | "offline";
export type BaeminAvatarTone = "mint" | "neutral" | "dark";

export interface BaeminAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: BaeminAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: BaeminAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: BaeminAvatarTone;
}

const sizeClasses: Record<BaeminAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<BaeminAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<BaeminAvatarStatus, string> = {
  online: "bg-[#0cefd3]",
  away: "bg-[#6c6d6f]",
  offline: "bg-[#cccccc]",
};

const toneClasses: Record<BaeminAvatarTone, string> = {
  mint: "bg-[#0cefd3] text-[#222222]",
  neutral: "bg-[#f3f4f5] text-[#232324]",
  dark: "bg-[#232324] text-white",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name: string) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "?";
  }

  const words = trimmedName.split(/\s+/).filter(Boolean);

  if (words.length > 1) {
    return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
  }

  return trimmedName.slice(0, 2).toUpperCase();
}

/**
 * 배달의민족의 밝은 민트와 공개 웹의 중립 테두리를 사용해 사람 또는 팀을 표시하는 독립형 아바타입니다.
 * 온라인 여부는 별도 의미 색상을 추정하지 않고, 민트·중립 토큰과 접근성 레이블로 전달합니다.
 */
export function BaeminAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "neutral",
  ...divProps
}: BaeminAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full font-[BAEMINWORK,system-ui,sans-serif]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img
          alt={alt ?? name}
          className="h-full w-full rounded-full border border-[#a6a7a9] object-cover"
          src={src}
        />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#a6a7a9] font-bold tracking-[-0.02em]",
            toneClasses[tone],
          )}
        >
          {getInitials(name)}
        </span>
      )}
      {showStatus ? (
        <span
          aria-label={status === "online" ? "온라인" : status === "away" ? "자리 비움" : "오프라인"}
          className={joinClasses(
            "absolute bottom-0 right-0 rounded-full border-white",
            statusSizeClasses[size],
            statusClasses[status],
          )}
        />
      ) : null}
    </div>
  );
}

export default BaeminAvatar;
