import type { HTMLAttributes } from "react";

export type KakaoAvatarSize = "sm" | "md" | "lg" | "xl";
export type KakaoAvatarStatus = "online" | "away" | "offline";
export type KakaoAvatarTone = "yellow" | "neutral" | "dark";

export interface KakaoAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: KakaoAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: KakaoAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: KakaoAvatarTone;
}

const sizeClasses: Record<KakaoAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<KakaoAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<KakaoAvatarStatus, string> = {
  online: "bg-[#fae100]",
  away: "bg-[#888888]",
  offline: "bg-[#eeeeee]",
};

const toneClasses: Record<KakaoAvatarTone, string> = {
  yellow: "bg-[#fae100] text-[#333333]",
  neutral: "bg-[#eeeeee] text-[#333333]",
  dark: "bg-[#111111] text-white",
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
 * 카카오 기업 웹의 마케팅 옐로와 중립 테두리를 사용해 사람 또는 팀을 표시하는 독립형 아바타입니다.
 * 상태 점은 검증된 옐로·중립 토큰과 접근성 레이블로 전달하며, 카카오톡 고유 상태 체계로 주장하지 않습니다.
 */
export function KakaoAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "neutral",
  ...divProps
}: KakaoAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full font-[KakaoSmall,system-ui,sans-serif]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img
          alt={alt ?? name}
          className="h-full w-full rounded-full border border-[#dbdbdb] object-cover"
          src={src}
        />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#dbdbdb] font-bold tracking-[-0.02em]",
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

export default KakaoAvatar;
