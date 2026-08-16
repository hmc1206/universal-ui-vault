import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

export interface KarrotHeroAction {
  /** 다음 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 이동할 주소입니다. */
  href?: string;
  /** 버튼 동작일 때 실행할 함수입니다. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface KarrotHeroCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** 가까운 동네를 보여주는 메타데이터입니다. */
  neighborhood?: string;
  /** 한 화면에서 한 가지를 말하는 제목입니다. */
  title?: ReactNode;
  /** 부담 없이 다음 행동을 제안하는 설명입니다. */
  description?: ReactNode;
  /** 이 화면의 유일한 주요 행동입니다. */
  primaryAction?: KarrotHeroAction;
  /** 부담이 적은 보조 행동입니다. */
  secondaryAction?: KarrotHeroAction;
  /** 기본 예시 목록을 대체할 시각 콘텐츠입니다. */
  visual?: ReactNode;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function PlacePinIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M19 10.2c0 5.1-7 10.3-7 10.3s-7-5.2-7-10.3a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10.2" fill="currentColor" r="2" />
    </svg>
  );
}

function HeroAction({ action, primary }: { action: KarrotHeroAction; primary: boolean }) {
  const className = joinClasses(
    "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-semibold tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#ff6f0f] focus-visible:ring-offset-2",
    primary
      ? "border border-[#ff6f0f] bg-[#ff6f0f] text-white hover:border-[#ff9e66] hover:bg-[#ff9e66] active:border-[#ff9e66] active:bg-[#ff9e66]"
      : "border border-[#eaebee] bg-white text-[#212124] hover:bg-[#f7f8fa] active:bg-[#f2f3f6]",
  );

  if (action.href) {
    return (
      <a className={className} href={action.href}>
        <span>{action.label}</span>
        <ArrowRightIcon />
      </a>
    );
  }

  return (
    <button className={className} onClick={action.onClick} type="button">
      <span>{action.label}</span>
      <ArrowRightIcon />
    </button>
  );
}

function DefaultVisual({ neighborhood }: { neighborhood: string }) {
  return (
    <div aria-hidden="true" className="grid h-full min-h-[320px] content-center gap-3 bg-[#f7f8fa] p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-[#eaebee] pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-[#212124]">
          <span className="text-[#ff6f0f]"><PlacePinIcon /></span>
          <span>{neighborhood}</span>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#868b94]">가까운 소식</span>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-[#eaebee] bg-white p-4">
        <div className="h-16 w-16 shrink-0 rounded-md bg-[#e8eaed]" />
        <div className="min-w-0 flex-1">
          <div className="h-4 w-4/5 rounded bg-[#d9dce1]" />
          <div className="mt-2 h-3 w-3/5 rounded bg-[#eaebee]" />
          <div className="mt-3 h-3 w-2/5 rounded bg-[#f1f2f4]" />
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-[#eaebee] bg-white p-4">
        <div className="h-16 w-16 shrink-0 rounded-md bg-[#e8eaed]" />
        <div className="min-w-0 flex-1">
          <div className="h-4 w-3/5 rounded bg-[#d9dce1]" />
          <div className="mt-2 h-3 w-4/5 rounded bg-[#eaebee]" />
          <div className="mt-3 h-3 w-1/3 rounded bg-[#f1f2f4]" />
        </div>
      </div>
    </div>
  );
}

/**
 * 당근의 동네 우선 원칙을 반영한 독립형 랜딩 히어로 카드입니다.
 * 한 가지 오렌지 주요 행동만 사용하고, 동네 이름을 콘텐츠 메타데이터로 항상 드러냅니다.
 */
export function KarrotHeroCard({
  className,
  description = "우리 동네에서 필요한 물건과 이야기를 부담 없이 찾아보세요.",
  neighborhood = "강남구 역삼동",
  primaryAction = { label: "둘러보기" },
  secondaryAction = { label: "동네 바꾸기" },
  title = "가까운 동네에서, 필요한 것을 찾아요",
  visual,
  ...sectionProps
}: KarrotHeroCardProps) {
  return (
    <section
      {...sectionProps}
      className={joinClasses(
        "grid overflow-hidden rounded-lg border border-[#eaebee] bg-white [font-family:-apple-system,BlinkMacSystemFont,'Apple_SD_Gothic_Neo','Segoe_UI',sans-serif] md:min-h-[480px] md:grid-cols-2",
        className,
      )}
    >
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-[#868b94]">
          <span className="text-[#ff6f0f]"><PlacePinIcon /></span>
          <span>{neighborhood}</span>
        </div>
        <h1 className="mt-4 max-w-[560px] text-[34px] font-bold leading-[1.35] tracking-[-0.03em] text-[#212124] sm:text-[42px] lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-[480px] text-base font-normal leading-6 tracking-[-0.02em] text-[#51545a]">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {primaryAction ? <HeroAction action={primaryAction} primary /> : null}
          {secondaryAction ? <HeroAction action={secondaryAction} primary={false} /> : null}
        </div>
      </div>
      <div className="min-h-[320px] border-t border-[#eaebee] md:border-l md:border-t-0">
        {visual ?? <DefaultVisual neighborhood={neighborhood} />}
      </div>
    </section>
  );
}

export default KarrotHeroCard;
