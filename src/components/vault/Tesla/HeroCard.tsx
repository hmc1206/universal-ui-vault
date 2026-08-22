import type { ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #3e6ae1 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface TeslaHeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "contrast";
}

export interface TeslaHeroCardProps {
  /** 제품 위에 놓이는 짧은 맥락입니다. */
  eyebrow?: ReactNode;
  /** 관측된 Model 3 display hierarchy에 맞춘 제품 제목입니다. */
  title?: ReactNode;
  /** 제목을 보완하는 제품 중심의 설명입니다. */
  description?: ReactNode;
  /** primary와 contrast CTA를 함께 제공하는 선택 행동입니다. */
  actions?: TeslaHeroAction[];
  /** 카드 오른쪽에 배치할 제품 시각 콘텐츠입니다. */
  media?: ReactNode;
  /** media의 별칭입니다. */
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function HeroActionButton({ action, index }: { action: TeslaHeroAction; index: number }) {
  const isPrimary = action.variant ?? (index === 0 ? "primary" : "contrast");
  const className = joinClasses(
    "inline-flex min-h-10 items-center justify-center rounded-[4px] border-[3px] border-transparent px-4 text-sm font-medium leading-[1.2] outline-none",
    isPrimary === "primary"
      ? "bg-[#3e6ae1] text-white active:bg-[#3e6ae0] focus-visible:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.05)]"
      : "bg-white text-[#393c41] active:bg-[#f4f4f4] focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]",
  );

  if (action.href) {
    return (
      <a className={className} href={action.href}>
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

/**
 * Tesla Model 3 공개 마케팅의 image-led product hierarchy를 참조한 hero card입니다.
 * 48px/500 display, white paired CTA, #3e6ae1 primary CTA와 8px filled card 면을 관측값으로 사용합니다.
 * 반응형 layout과 action wiring은 재사용을 위한 local web extension이며, 차량·account·in-car UI의 복제로 해석하지 않습니다.
 */
export function TeslaHeroCard({
  actions = [
    { label: "주문하기", variant: "primary" },
    { label: "자세히 보기", variant: "contrast" },
  ],
  className,
  description = "전기 구동과 에너지 기술이 해결하는 구체적인 문제를 제품 중심으로 살펴보세요.",
  eyebrow = "MODEL 3",
  media,
  title = "지속 가능한 에너지의 다음 장면",
  visual,
}: TeslaHeroCardProps) {
  const resolvedVisual = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-64 relative isolate overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.62),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_56%)] before:content-[''] rounded-[8px] bg-[#f4f4f4] p-6 sm:h-72">
      <div className="absolute inset-x-8 bottom-8 h-24 rounded-t-[999px] border-x-[18px] border-t-[18px] border-[#171a20]" />
      <div className="absolute bottom-[58px] left-[34%] h-3 w-24 rounded-full bg-[#3e6ae1]" />
      <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-[#3e6ae1]" />
      <div className="absolute left-6 top-6 text-[10px] font-medium tracking-[0.18em] text-[#5c5e62]">PRODUCT FOCUS</div>
    </div>
  );

  return (
    <section className={joinClasses("overflow-hidden rounded-[8px] bg-[#171a20] font-sans text-white", className)}>
      <div className="relative z-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-[380px] flex-col justify-end p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-medium tracking-[0.14em] text-white/75">{eyebrow}</p>
          <h1 className="mt-4 max-w-xl text-4xl font-medium leading-[1.16] tracking-[-0.04em] sm:text-[48px] sm:leading-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/80">{description}</p>
          {actions.length ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {actions.map((action, index) => (
                <HeroActionButton action={action} index={index} key={`${action.label}-${index}`} />
              ))}
            </div>
          ) : null}
        </div>
        <div className="rounded-[inherit] border border-white/45 bg-white/72 p-4 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.14)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current sm:p-6 lg:p-8">{resolvedVisual}</div>
      </div>
    </section>
  );
}

export default TeslaHeroCard;
