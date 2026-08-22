import type { HTMLAttributes, ReactNode } from "react";

export type FigmaBadgeTone = "neutral" | "dark" | "indigo" | "outline";

export interface FigmaBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 짧은 레이블입니다. */
  children: ReactNode;
  /** 정보 표면의 색상 선택입니다. */
  tone?: FigmaBadgeTone;
  /** 화면 읽기 도구에 제공할 보조 레이블입니다. */
  ariaLabel?: string;
}

const toneClasses: Record<FigmaBadgeTone, string> = {
  neutral: "border-[#ebebeb] bg-white text-black",
  dark: "border-black bg-black text-white",
  indigo: "border-[#4d49fc] bg-[#4d49fc] text-white",
  outline: "border-black bg-transparent text-black",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Figma public chrome의 black/white, #ebebeb separation, #4d49fc alternate emphasis와 figmaMono signpost role을 사용하는 badge 확장입니다.
 * 공개 자료에는 badge와 semantic status colors가 없으므로 tone은 state 의미가 아니라 정보 표면 선택입니다.
 */
export function FigmaBadge({ ariaLabel, children, className, tone = "neutral", ...spanProps }: FigmaBadgeProps) {
  return (
    <span
      {...spanProps}
      aria-label={ariaLabel}
      className={joinClasses(
        "inline-flex min-h-6 items-center rounded-lg border px-2 py-1 font-['figmaMono'] text-xs font-normal leading-4 tracking-[0.03em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default FigmaBadge;
