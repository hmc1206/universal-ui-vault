import type { ReactNode } from "react";

export interface TwentyNineCmHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface TwentyNineCmHeroCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: TwentyNineCmHeroAction[];
  primaryAction?: TwentyNineCmHeroAction;
  secondaryAction?: TwentyNineCmHeroAction;
  media?: ReactNode;
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Action({ action, primary }: { action: TwentyNineCmHeroAction; primary: boolean }) {
  const className = joinClasses("inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition-all duration-300 ease-out", primary ? "rounded-none border border-black bg-black text-white hover:bg-[#ff4800] active:scale-[0.98]" : "rounded-none border border-current bg-white/10 text-current hover:bg-white/20");
  return action.href ? <a className={className} href={action.href}>{action.label}</a> : <button className={className} onClick={action.onClick} type="button">{action.label}</button>;
}

/** 29CM의 정제된 선택을 위한 여백과 선명한 대비를 넓은 콘텐츠 프레임에 담는 hero component입니다. */
export function TwentyNineCmHeroCard({ actions, className, description = "정제된 선택을 위한 여백과 선명한 대비", eyebrow = "EDITORIAL SELECTION", media, primaryAction, secondaryAction, title = "29CM의 다음 장면을 시작하세요.", visual }: TwentyNineCmHeroCardProps) {
  const resolvedActions = actions ?? [primaryAction, secondaryAction].filter(Boolean) as TwentyNineCmHeroAction[];
  const showcase = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-48 overflow-hidden border border-current/20 bg-white/20 p-5">
      <div className="h-full w-3/5 border-2 border-dashed border-[#ff4800] bg-white/60" />
      <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#ff4800]/30" />
      <span className="absolute right-5 top-5 text-xs font-bold tracking-[0.18em]">{String(eyebrow)}</span>
    </div>
  );

  return (
    <section className={joinClasses("relative overflow-hidden p-6 font-sans border-y border-black bg-white border-l-4 border-[#ff4800]", className)}>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#ff4800]">{eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-75">{description}</p>
          {resolvedActions.length ? <div className="mt-6 flex flex-wrap gap-2">{resolvedActions.map((action, index) => <Action action={action} key={`${action.label}-${index}`} primary={index === 0} />)}</div> : null}
        </div>
        <div className="relative">{showcase}</div>
      </div>
    </section>
  );
}

export default TwentyNineCmHeroCard;
