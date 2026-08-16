import type { HTMLAttributes } from "react";

export type KarrotAvatarSize = "sm" | "md" | "lg" | "xl";
export type KarrotAvatarStatus = "online" | "offline" | "away";
export type KarrotAvatarTone = "neutral" | "carrot";

export interface KarrotAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: KarrotAvatarSize;
  /** 온라인 상태 점을 표시합니다. */
  status?: KarrotAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: KarrotAvatarTone;
}

const sizeClasses: Record<KarrotAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<KarrotAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<KarrotAvatarStatus, string> = {
  online: "bg-[#1aa174]",
  offline: "bg-[#b8bdc6]",
  away: "bg-[#ff9e66]",
};

const toneClasses: Record<KarrotAvatarTone, string> = {
  neutral: "bg-[#f2f3f6] text-[#51545a]",
  carrot: "bg-[#fff5f0] text-[#e55f00]",
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
 * 당근의 콘텐츠 중심 화면에 맞춘 독립형 사용자 아바타입니다.
 * 이미지가 없으면 이니셜을 표시하고, 온라인 상태는 작고 차분한 점으로만 전달합니다.
 */
export function KarrotAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "neutral",
  ...divProps
}: KarrotAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img
          alt={alt ?? name}
          className="h-full w-full rounded-full border border-[#eaebee] object-cover"
          src={src}
        />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#eaebee] font-semibold tracking-[-0.02em]",
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

export default KarrotAvatar;
