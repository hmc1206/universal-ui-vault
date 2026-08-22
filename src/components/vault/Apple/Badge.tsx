import type { HTMLAttributes, ReactNode } from "react";

export type AppleBadgeTone = "neutral" | "link" | "dark" | "light";

export interface AppleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 간결한 레이블입니다. */
  children: ReactNode;
  /** public web surface에 맞는 정보 톤입니다. */
  tone?: AppleBadgeTone;
  /** 화면 읽기 도구에 제공할 보조 레이블입니다. */
  ariaLabel?: string;
}

const toneClasses: Record<AppleBadgeTone, string> = {
  neutral: "border-[#d2d2d7] bg-white text-[#1d1d1f]",
  link: "border-[#0066cc] bg-white text-[#0066cc]",
  dark: "border-black bg-black text-white",
  light: "border-[#f5f5f7] bg-[#f5f5f7] text-[#515154]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Apple public web의 neutral surface와 #0066cc link hierarchy를 활용한 inline badge 확장입니다.
 * 공개 자료에는 badge 또는 semantic status palette가 없으므로, tone은 status 의미를 주장하지 않는 정보 표면 선택입니다.
 */
export function AppleBadge({ ariaLabel, children, className, tone = "neutral", ...spanProps }: AppleBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={ariaLabel}
      className={joinClasses(
        "inline-flex min-h-6 items-center rounded-[980px] border px-2.5 py-1 font-['SF_Pro_Text'] text-xs font-normal leading-4 tracking-[-0.01em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default AppleBadge;
