import type { ReactNode } from "react";

export type FigmaHeroActionTone = "primary" | "indigo" | "outline";

export interface FigmaHeroAction {
  /** 행동을 설명하는 짧고 구체적인 레이블입니다. */
  label: string;
  /** 링크 목적지입니다. */
  href?: string;
  /** 버튼으로 동작시 실행할 함수입니다. */
  onClick?: () => void;
  /** 공개 action 표면입니다. */
  tone?: FigmaHeroActionTone;
}

export interface FigmaHeroCardProps {
  /** figmaMono로 표시할 기술적 또는 협업 맥락 레이블입니다. */
  eyebrow?: ReactNode;
  /** 제품 또는 팀 작업의 대형 제목입니다. */
  title: ReactNode;
  /** 만들기·공유·검토·handoff를 명료하게 설명하는 본문입니다. */
  description?: ReactNode;
  /** 첫 번째 행동입니다. */
  primaryAction?: FigmaHeroAction;
  /** 두 번째 행동입니다. */
  secondaryAction?: FigmaHeroAction;
  /** 사용자 작업물이나 제품 예시를 넣을 시각 콘텐츠입니다. */
  visual?: ReactNode;
  /** 최상위 영역에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function HeroAction({ action }: { action: FigmaHeroAction }) {
  const tone = action.tone ?? "primary";
  const className = joinClasses(
    "inline-flex min-h-[49px] items-center justify-center rounded-lg px-[21px] py-3 font-['figmaSans'] text-base leading-[23px] tracking-[-0.009em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-[#0d99ff]",
    tone === "primary" && "border border-black bg-black font-[330] text-white",
    tone === "indigo" && "border border-[#4d49fc] bg-[#4d49fc] px-5 font-[480] text-white",
    tone === "outline" && "border border-black bg-transparent font-[330] text-black",
  );

  if (action.href) {
    return (
      <a className={className} href={action.href} onClick={action.onClick}>
        {action.label}
      </a>
    );
  }

  return (
    <button className={className} onClick={action.onClick} type="button">
      {action.label}
    </button>
  );
}

function NeutralWorkspacePreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[620px] border border-black bg-white p-4 sm:p-6">
      <div className="absolute -left-2 -top-2 h-4 w-4 border-2 border-dashed border-[#0d99ff] bg-white" />
      <div className="absolute -bottom-2 -right-2 h-4 w-4 border-2 border-dashed border-[#0d99ff] bg-white" />
      <div className="flex h-full flex-col border border-[#ebebeb]">
        <div className="flex h-12 items-center justify-between border-b border-[#ebebeb] px-4">
          <span className="font-['figmaMono'] text-xs tracking-[0.03em] text-black">SHARED FILE</span>
          <span className="h-5 w-5 rounded-full bg-black" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[0.42fr_1fr]">
          <div className="border-r border-[#ebebeb] p-4">
            <div className="h-2 w-12 bg-black" />
            <div className="mt-5 h-2 w-full bg-[#ebebeb]" />
            <div className="mt-3 h-2 w-4/5 bg-[#ebebeb]" />
            <div className="mt-3 h-2 w-3/5 bg-[#ebebeb]" />
          </div>
          <div className="flex items-center justify-center p-5">
            <div className="grid aspect-square w-3/4 grid-cols-2 gap-3 border-2 border-dashed border-[#0d99ff] p-3">
              <div className="bg-black" />
              <div className="border border-black bg-white" />
              <div className="border border-black bg-white" />
              <div className="bg-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Figma public marketing의 white canvas, black chrome, figmaSans 86px hero role,
 * figmaMono technical label, 8px action 및 dashed blue tooling cue를 활용한 hero component입니다.
 * 내부 visual은 사용자 작업이 color를 갖는 자리이며, fallback은 screenshot palette를 interface token으로 승격하지 않는 neutral workspace입니다.
 * motion과 hover는 공개 캡처에서 검증되지 않았으므로 공식 상태로 표현하지 않습니다.
 */
export function FigmaHeroCard({
  className,
  description,
  eyebrow,
  primaryAction,
  secondaryAction,
  title,
  visual,
}: FigmaHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden border border-black bg-white font-['figmaSans']", className)}>
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-14 sm:px-10 md:min-h-[680px] md:grid-cols-[1.05fr_0.95fr] md:px-14 lg:px-20">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-5 font-['figmaMono'] text-[18px] font-normal leading-[1.3] tracking-[0.03em] text-black">{eyebrow}</p> : null}
          <h1 className="text-5xl font-[400] leading-none tracking-[-0.02em] text-black sm:text-6xl md:text-[86px]">{title}</h1>
          {description ? <p className="mt-6 max-w-xl text-base font-[330] leading-[1.42] tracking-[-0.009em] text-black">{description}</p> : null}
          {primaryAction || secondaryAction ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction ? <HeroAction action={primaryAction} /> : null}
              {secondaryAction ? <HeroAction action={secondaryAction} /> : null}
            </div>
          ) : null}
        </div>
        <div className="min-w-0">{visual ?? <NeutralWorkspacePreview />}</div>
      </div>
    </section>
  );
}

export default FigmaHeroCard;
