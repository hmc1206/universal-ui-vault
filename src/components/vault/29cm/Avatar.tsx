import type { HTMLAttributes } from "react";

export type TwentyNineCmAvatarSize = "sm" | "md" | "lg" | "xl";
export type TwentyNineCmAvatarStatus = "active" | "away" | "offline";
export type TwentyNineCmAvatarShape = "square" | "round";

export interface TwentyNineCmAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 주소입니다. */
  src?: string;
  /** 이미지 대체 텍스트입니다. */
  alt?: string;
  /** 이미지가 없을 때 이니셜을 만들 이름입니다. */
  name?: string;
  /** 아바타 크기입니다. */
  size?: TwentyNineCmAvatarSize;
  /** 상태 점의 종류입니다. */
  status?: TwentyNineCmAvatarStatus;
  /** 상태 점을 표시할지 결정합니다. */
  showStatus?: boolean;
  /** 제품 카드형 4px 또는 갤러리 제어형 full-round 기하를 선택합니다. */
  shape?: TwentyNineCmAvatarShape;
}

const sizeClasses: Record<TwentyNineCmAvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusSizeClasses: Record<TwentyNineCmAvatarSize, string> = {
  sm: "h-3 w-3 border-2",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
  xl: "h-4 w-4 border-2",
};

const statusClasses: Record<TwentyNineCmAvatarStatus, string> = {
  active: "bg-black",
  away: "bg-[#5d5d5d]",
  offline: "bg-[#dddddd]",
};

const shapeClasses: Record<TwentyNineCmAvatarShape, string> = {
  square: "rounded",
  round: "rounded-full",
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
 * 29CM의 흑백·#dddddd outline·4px 제품 기하를 우선 적용한 아바타 확장 컴포넌트입니다.
 * 공개 자료에는 avatar/state-point 고유 계약이 없으므로, full-round는 관측된 갤러리 컨트롤 기하가 필요한 경우에만 선택합니다.
 */
export function TwentyNineCmAvatar({
  alt,
  className,
  name = "",
  shape = "square",
  showStatus = false,
  size = "md",
  src,
  status = "offline",
  ...divProps
}: TwentyNineCmAvatarProps) {
  const accessibleName = (alt ?? name) || "사용자 프로필";

  return (
    <div
      {...divProps}
      aria-label={accessibleName}
      className={joinClasses("relative inline-flex shrink-0 font-[Pretendard_Variable,Pretendard,system-ui,sans-serif]", sizeClasses[size], className)}
      role="img"
    >
      {src ? (
        <img alt={alt ?? name} className={joinClasses("h-full w-full border border-[#dddddd] object-cover", shapeClasses[shape])} src={src} />
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "inline-flex h-full w-full items-center justify-center border border-[#dddddd] bg-white font-bold tracking-[-0.02em] text-black",
            shapeClasses[shape],
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

export default TwentyNineCmAvatar;
