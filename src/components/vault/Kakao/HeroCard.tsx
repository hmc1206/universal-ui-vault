import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

export interface KakaoHeroAction {
  /** 다음 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 링크로 이동할 때 사용할 주소입니다. */
  href?: string;
  /** 버튼 동작일 때 실행할 함수입니다. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface KakaoHeroCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** 카드 위에 표시할 짧은 분류입니다. */
  eyebrow?: string;
  /** 한 화면에서 한 가지를 말하는 제목입니다. */
  title?: ReactNode;
  /** 일상적인 행동을 바탕으로 맥락을 전달하는 설명입니다. */
  description?: ReactNode;
  /** 대표 행동입니다. */
  primaryAction?: KakaoHeroAction;
  /** 보조 행동입니다. */
  secondaryAction?: KakaoHeroAction;
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

function LinkIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
      <path d="M10.5 13.5a4.2 4.2 0 0 0 5.94 0l2.22-2.22a4.2 4.2 0 1 0-5.94-5.94L11.45 6.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M13.5 10.5a4.2 4.2 0 0 0-5.94 0l-2.22 2.22a4.2 4.2 0 1 0 5.94 5.94l1.27-1.27" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function HeroAction({ action, primary }: { action: KakaoHeroAction; primary: boolean }) {
  const className = joinClasses(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 font-[KakaoSmall,system-ui,sans-serif] text-base font-bold leading-[1.4] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#fae100] focus-visible:ring-offset-2",
    primary
      ? "border border-[#fae100] bg-[#fae100] text-[#333333] hover:border-[#f3d900] hover:bg-[#f3d900]"
      : "border border-[#dbdbdb] bg-white text-[#333333] hover:bg-[#eeeeee]",
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
    <div aria-hidden="true" className="relative grid h-full min-h-[320px] place-items-center overflow-hidden bg-[#111111] p-8">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#fae100]" />
      <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border-[24px] border-[#fae100]" />
      <div className="relative w-full max-w-[320px] rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fae100] text-[#333333]"><LinkIcon /></span>
          <span className="rounded-full bg-[#eeeeee] px-3 py-1.5 text-xs font-bold text-[#333333]">가까운 연결</span>
        </div>
        <div className="mt-8 h-5 w-3/4 rounded bg-[#333333]" />
        <div className="mt-3 h-4 w-full rounded bg-[#e6e6e6]" />
        <div className="mt-2 h-4 w-2/3 rounded bg-[#eeeeee]" />
        <div className="mt-8 h-11 rounded-full bg-[#fae100]" />
      </div>
    </div>
  );
}

/**
 * 카카오 기업 마케팅의 옐로·다크 표면과 KakaoBig 중심의 연결 메시지를 담은 독립형 히어로 카드입니다.
 * 카카오 로그인 규제 컴포넌트와 다른 기업 마케팅 표면이므로 로그인 옐로 #fee500과 기호는 사용하지 않습니다.
 */
export function KakaoHeroCard({
  className,
  description = "말하고, 찾고, 필요한 일을 이어가는 순간을 더 가깝게 만듭니다.",
  eyebrow = "오늘의 연결",
  primaryAction = { label: "서비스 살펴보기" },
  secondaryAction = { label: "더 알아보기" },
  title = "필요한 순간을, 더 가까이.",
  visual,
  ...sectionProps
}: KakaoHeroCardProps) {
  return (
    <section
      {...sectionProps}
      className={joinClasses(
        "grid overflow-hidden rounded-2xl border border-[#dbdbdb] bg-white md:min-h-[520px] md:grid-cols-2",
        className,
      )}
    >
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <p className="font-[KakaoBig,system-ui,sans-serif] text-sm font-normal tracking-[-0.02em] text-[#333333]">{eyebrow}</p>
        <h1 className="mt-4 max-w-[640px] font-[KakaoBig,system-ui,sans-serif] text-[42px] font-bold leading-[1.23] tracking-[-0.04em] text-[#111111] sm:text-5xl lg:text-[54px]">
          {title}
        </h1>
        <p className="mt-5 max-w-[480px] font-[KakaoSmall,system-ui,sans-serif] text-sm font-normal leading-6 tracking-[-0.02em] text-[#555555]">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {primaryAction ? <HeroAction action={primaryAction} primary /> : null}
          {secondaryAction ? <HeroAction action={secondaryAction} primary={false} /> : null}
        </div>
      </div>
      <div className="min-h-[320px] border-t border-[#dbdbdb] md:border-l md:border-t-0">
        {visual ?? <DefaultVisual />}
      </div>
    </section>
  );
}

export default KakaoHeroCard;
