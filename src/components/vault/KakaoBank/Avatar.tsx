import type { HTMLAttributes } from "react";

export type KakaoBankAvatarSize = "sm" | "md" | "lg" | "xl";
export type KakaoBankAvatarStatus = "active" | "away" | "offline";
export type KakaoBankAvatarTone = "neutral" | "section" | "ink";

export interface KakaoBankAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: KakaoBankAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: KakaoBankAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: KakaoBankAvatarTone;
}

const sizeClasses: Record<KakaoBankAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<KakaoBankAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<KakaoBankAvatarStatus, string> = {
  active: "bg-black",
  away: "bg-[#888888]",
  offline: "bg-[#e6e6e6]",
};

const toneClasses: Record<KakaoBankAvatarTone, string> = {
  neutral: "bg-white text-black",
  section: "bg-[#f7f7f7] text-[#444444]",
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
 * KakaoBank 공개 웹의 흰·#f7f7f7·검정 구조와 #e6e6e6 boundary를 활용한 아바타 확장 컴포넌트입니다.
 * 공개 증거에는 native banking avatar/state-point 계약이 없으므로, 상태 점은 접근성 레이블을 함께 제공하는 일반 기능입니다.
 */
export function KakaoBankAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "neutral",
  ...divProps
}: KakaoBankAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full font-[Pretendard_Variable,Pretendard,system-ui,sans-serif]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img alt={alt ?? name} className="h-full w-full rounded-full border border-[#e6e6e6] object-cover" src={src} />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#e6e6e6] font-semibold tracking-[-0.02em]",
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

export default KakaoBankAvatar;
