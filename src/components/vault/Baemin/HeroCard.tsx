import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

export interface BaeminHeroAction {
  /** 다음 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 링크로 이동할 때 사용할 주소입니다. */
  href?: string;
  /** 버튼 동작일 때 실행할 함수입니다. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface BaeminHeroCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** 카드 위에 표시할 짧은 분류입니다. */
  eyebrow?: string;
  /** 한 화면에서 한 가지를 말하는 제목입니다. */
  title?: ReactNode;
  /** 빠르고 이해하기 쉬운 맥락을 전달하는 설명입니다. */
  description?: ReactNode;
  /** 대표 행동입니다. */
  primaryAction?: BaeminHeroAction;
  /** 보조 행동입니다. */
  secondaryAction?: BaeminHeroAction;
  /** 기본 시각 구성을 대체할 콘텐츠입니다. */
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

function SparkIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
      <path d="M12 2.8c.9 5 3.2 7.3 8.2 8.2-5 1-7.3 3.2-8.2 8.2-1-5-3.2-7.3-8.2-8.2 5-.9 7.3-3.2 8.2-8.2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function HeroAction({ action, primary }: { action: BaeminHeroAction; primary: boolean }) {
  const className = joinClasses(
    "inline-flex h-[52px] items-center justify-center gap-2 rounded-lg px-[22px] font-[BAEMINWORK,system-ui,sans-serif] text-base font-bold leading-[1.4] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#0cefd3] focus-visible:ring-offset-2",
    primary
      ? "border border-[#0cefd3] bg-[#0cefd3] text-[#222222] hover:border-[#62f4e2] hover:bg-[#62f4e2]"
      : "border border-[#a6a7a9] bg-white text-[#232324] hover:bg-[#f3f4f5]",
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

function DefaultVisual() {
  return (
    <div aria-hidden="true" className="relative grid h-full min-h-[320px] place-items-center overflow-hidden bg-[#f6f6f6] p-8">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[20px] border-[#0cefd3]" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#0cefd3]" />
      <div className="relative w-full max-w-[320px] rounded-2xl border border-[#e1e1e1] bg-white p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0cefd3] text-[#222222]"><SparkIcon /></span>
          <span className="rounded-full bg-[#f3f4f5] px-3 py-1.5 text-xs font-bold text-[#6c6d6f]">빠르게 고르기</span>
        </div>
        <div className="mt-8 h-5 w-3/4 rounded bg-[#222222]" />
        <div className="mt-3 h-4 w-full rounded bg-[#e6e6e6]" />
        <div className="mt-2 h-4 w-2/3 rounded bg-[#eeeeee]" />
        <div className="mt-8 h-[54px] rounded-xl bg-[#0cefd3]" />
      </div>
    </div>
  );
}

/**
 * 배달의민족 2.0의 밝은 민트와 명료한 제품 커뮤니케이션을 담은 독립형 히어로 카드입니다.
 * WORK 글꼴이 프로젝트에 적법하게 로드된 경우 우선 적용되며, 이 파일은 글꼴 파일을 포함하거나 대체하지 않습니다.
 */
export function BaeminHeroCard({
  className,
  description = "지금 필요한 한 끼를 쉽고 빠르게 골라보세요.",
  eyebrow = "오늘의 한 끼",
  primaryAction = { label: "메뉴 보러 가기" },
  secondaryAction = { label: "내 주변 보기" },
  title = "먹고 싶은 마음, 바로 이어가요.",
  visual,
  ...sectionProps
}: BaeminHeroCardProps) {
  return (
    <section
      {...sectionProps}
      className={joinClasses(
        "grid overflow-hidden rounded-2xl border border-[#e1e1e1] bg-white font-[BAEMINWORK,system-ui,sans-serif] md:min-h-[520px] md:grid-cols-2",
        className,
      )}
    >
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <p className="text-sm font-bold tracking-[-0.02em] text-[#232324]">{eyebrow}</p>
        <h1 className="mt-4 max-w-[640px] text-[42px] font-extrabold leading-[1.4] tracking-[-0.04em] text-[#222222] sm:text-5xl lg:text-[60px]">
          {title}
        </h1>
        <p className="mt-5 max-w-[480px] text-base font-normal leading-6 tracking-[-0.02em] text-[#6c6d6f]">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {primaryAction ? <HeroAction action={primaryAction} primary /> : null}
          {secondaryAction ? <HeroAction action={secondaryAction} primary={false} /> : null}
        </div>
      </div>
      <div className="min-h-[320px] border-t border-[#e1e1e1] md:border-l md:border-t-0">
        {visual ?? <DefaultVisual />}
      </div>
    </section>
  );
}

export default BaeminHeroCard;
