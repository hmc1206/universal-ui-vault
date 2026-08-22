import type { HTMLAttributes } from "react";

export type LikelionAvatarSize = "sm" | "md" | "lg" | "xl";
export type LikelionAvatarStatus = "active" | "away" | "offline";
export type LikelionAvatarTone = "warm" | "neutral" | "dark";

export interface LikelionAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: LikelionAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: LikelionAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 기본 이니셜 배경 톤입니다. */
  tone?: LikelionAvatarTone;
}

const sizeClasses: Record<LikelionAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<LikelionAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<LikelionAvatarStatus, string> = {
  active: "bg-[#222222]",
  away: "bg-[#737373]",
  offline: "bg-[#e5e5e5]",
};

const toneClasses: Record<LikelionAvatarTone, string> = {
  warm: "bg-[#fcf4ee] text-[#222222]",
  neutral: "bg-white text-[#737373]",
  dark: "bg-[#222222] text-white",
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
 * 멋쟁이사자처럼 홈페이지의 헤어라인·따뜻한 프로모션 표면을 활용한 독립형 아바타 확장 컴포넌트입니다.
 * 공식 홈 캡처에는 사용자 상태 체계가 없으므로, 상태 점은 접근성 레이블로 보완한 일반 기능입니다.
 */
export function LikelionAvatar({
  alt,
  className,
  name = "",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  tone = "warm",
  ...divProps
}: LikelionAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 rounded-full font-[inherit]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img alt={alt ?? name} className="h-full w-full rounded-full border border-[#e5e5e5] object-cover" src={src} />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center rounded-full border border-[#e5e5e5] font-semibold tracking-[-0.02em]",
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

export default LikelionAvatar;
