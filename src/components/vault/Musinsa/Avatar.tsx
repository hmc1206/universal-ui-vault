import type { HTMLAttributes } from "react";

export type MusinsaAvatarSize = "sm" | "md" | "lg" | "xl";
export type MusinsaAvatarStatus = "active" | "away" | "offline";
export type MusinsaAvatarTone = "white" | "muted" | "ink";

export interface MusinsaAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: MusinsaAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: MusinsaAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: MusinsaAvatarTone;
}

const sizeClasses: Record<MusinsaAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<MusinsaAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<MusinsaAvatarStatus, string> = {
  active: "bg-black",
  away: "bg-[#666666]",
  offline: "bg-[#ebebeb]",
};

const toneClasses: Record<MusinsaAvatarTone, string> = {
  white: "bg-white text-black",
  muted: "bg-[#f7f7f7] text-[#666666]",
  ink: "bg-black text-white",
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
 * 무신사 storefront의 black/white/#ebebeb flat structure와 Pretendard를 활용한 아바타 확장입니다.
 * 공개 근거에는 profile/status-point 계약이 없으므로, 상태 점은 접근성 레이블을 함께 제공하는 일반 기능입니다.
 */
export function MusinsaAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "white",
  ...divProps
}: MusinsaAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img alt={alt ?? name} className="h-full w-full rounded-full border border-[#ebebeb] object-cover" src={src} />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#ebebeb] font-normal",
            toneClasses[tone],
          )}
        >
          {getInitials(name)}
        </span>
      )}
      {showStatus ? (
        <span
          aria-label={status === "active" ? "활동 중" : status === "away" ? "자리 비움" : "오프라인"}
          className={joinClasses("absolute bottom-0 right-0 rounded-full border-white", statusSizeClasses[size], statusClasses[status])}
        />
      ) : null}
    </div>
  );
}

export default MusinsaAvatar;
