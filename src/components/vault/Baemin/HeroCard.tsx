import type { ReactNode } from "react";

export interface BaeminHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface BaeminHeroCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: BaeminHeroAction[];
  primaryAction?: BaeminHeroAction;
  secondaryAction?: BaeminHeroAction;
  media?: ReactNode;
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Action({ action, primary }: { action: BaeminHeroAction; primary: boolean }) {
  const className = joinClasses("inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition-all duration-200 ease-out", primary ? "rounded-[18px] border-[3px] border-[#222222] bg-[#0cefd3] text-[#222222] shadow-[4px_4px_0_#222222] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none" : "rounded-[28px] border border-current bg-white/10 text-current hover:bg-white/20");
  return action.href ? <a className={className} href={action.href}>{action.label}</a> : <button className={className} onClick={action.onClick} type="button">{action.label}</button>;
}

/** Baemin의 친근하고 시원한 한 끼의 흐름을 바로 시작하세요를 넓은 콘텐츠 프레임에 담는 hero component입니다. */
export function BaeminHeroCard({ actions, className, description = "친근하고 시원한 한 끼의 흐름을 바로 시작하세요", eyebrow = "오늘 뭐 먹지?", media, primaryAction, secondaryAction, title = "Baemin의 다음 장면을 시작하세요.", visual }: BaeminHeroCardProps) {
  const resolvedActions = actions ?? [primaryAction, secondaryAction].filter(Boolean) as BaeminHeroAction[];
  const showcase = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-48 overflow-hidden border border-current/20 bg-white/20 p-5">
      <div className="h-full w-3/5 border-2 border-dashed border-[#222222] bg-white/60" />
      <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#222222]/30" />
      <span className="absolute right-5 top-5 text-xs font-bold tracking-[0.18em]">{String(eyebrow)}</span>
    </div>
  );

  return (
    <section className={joinClasses("relative overflow-hidden p-6 font-sans font-black rounded-[36px] border-[3px] border-[#222222] bg-[#0cefd3] after:absolute after:bottom-4 after:right-5 after:h-10 after:w-16 after:rounded-full after:border-[3px] after:border-[#222222] after:content-['']", className)}>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#222222]">{eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-75">{description}</p>
          {resolvedActions.length ? <div className="mt-6 flex flex-wrap gap-2">{resolvedActions.map((action, index) => <Action action={action} key={`${action.label}-${index}`} primary={index === 0} />)}</div> : null}
        </div>
        <div className="relative">{showcase}</div>
      </div>
    </section>
  );
}

export default BaeminHeroCard;
