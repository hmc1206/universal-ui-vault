import type { HTMLAttributes } from "react";

export type TossAvatarSize = "sm" | "md" | "lg" | "xl";
export type TossAvatarStatus = "online" | "away" | "offline";
export type TossAvatarTone = "blue" | "neutral" | "dark";

export interface TossAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: TossAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: TossAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: TossAvatarTone;
}

const sizeClasses: Record<TossAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<TossAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<TossAvatarStatus, string> = {
  online: "bg-[#3182f6]",
  away: "bg-[#8b95a1]",
  offline: "bg-[#e5e8eb]",
};

const toneClasses: Record<TossAvatarTone, string> = {
  blue: "bg-[#e8f3ff] text-[#1b64da]",
  neutral: "bg-[#f2f4f6] text-[#4e5968]",
  dark: "bg-[#191f28] text-white",
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
 * 토스의 제품 블루·연한 중립 표면·직접적인 상태 레이블을 적용한 독립형 아바타 확장 컴포넌트입니다.
 * 현재 패킷에는 토스 고유 아바타나 상태 점 토큰이 없으므로, 상태 점은 접근성 레이블로 보완한 일반 기능입니다.
 */
export function TossAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "neutral",
  ...divProps
}: TossAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full font-[Toss\ Product\ Sans,system-ui,sans-serif]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img alt={alt ?? name} className="h-full w-full rounded-full border border-[#e5e8eb] object-cover" src={src} />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full font-semibold tracking-[-0.02em]",
            toneClasses[tone],
          )}
        >
          {getInitials(name)}
        </span>
      )}
      {showStatus ? (
        <span
          aria-label={status === "online" ? "온라인" : status === "away" ? "자리 비움" : "오프라인"}
          className={joinClasses("absolute bottom-0 right-0 rounded-full border-white", statusSizeClasses[size], statusClasses[status])}
        />
      ) : null}
    </div>
  );
}

export default TossAvatar;
