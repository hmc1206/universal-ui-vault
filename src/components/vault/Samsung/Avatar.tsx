import type { HTMLAttributes } from "react";

export type SamsungAvatarSize = "sm" | "md" | "lg" | "xl";
export type SamsungAvatarStatus = "online" | "away" | "offline";
export type SamsungAvatarTone = "neutral" | "dark" | "light";

export interface SamsungAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: SamsungAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: SamsungAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: SamsungAvatarTone;
}

const sizeClasses: Record<SamsungAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<SamsungAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<SamsungAvatarStatus, string> = {
  online: "bg-[#000000]",
  away: "bg-[#707070]",
  offline: "bg-[#dddddd]",
};

const toneClasses: Record<SamsungAvatarTone, string> = {
  neutral: "bg-[#f7f7f7] text-[#000000]",
  dark: "bg-[#000000] text-[#ffffff]",
  light: "bg-[#ffffff] text-[#000000]",
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
 * 삼성 공개 웹에서 관측된 흰색·회색·검정 표면과 1px 테두리를 활용한 독립형 아바타입니다.
 * 현재 패킷에는 삼성 고유의 사용자 상태 체계가 없으므로, 상태 점은 텍스트 접근성 레이블로 보완한 중립 기능입니다.
 */
export function SamsungAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "neutral",
  ...divProps
}: SamsungAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full font-[SamsungOneKorean,sans-serif]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img alt={alt ?? name} className="h-full w-full rounded-full border border-[#dddddd] object-cover" src={src} />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#dddddd] font-bold tracking-[-0.02em]",
            toneClasses[tone],
          )}
        >
          {getInitials(name)}
        </span>
      )}
      {showStatus ? (
        <span
          aria-label={status === "online" ? "온라인" : status === "away" ? "자리 비움" : "오프라인"}
          className={joinClasses("absolute bottom-0 right-0 rounded-full border-[#ffffff]", statusSizeClasses[size], statusClasses[status])}
        />
      ) : null}
    </div>
  );
}

export default SamsungAvatar;
