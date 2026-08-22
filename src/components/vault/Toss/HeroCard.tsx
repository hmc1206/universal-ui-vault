import type { ReactNode } from "react";

export interface TossHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface TossHeroCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: TossHeroAction[];
  primaryAction?: TossHeroAction;
  secondaryAction?: TossHeroAction;
  media?: ReactNode;
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Action({ action, primary }: { action: TossHeroAction; primary: boolean }) {
  const className = joinClasses("inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition-all duration-300 ease-out", primary ? "rounded-3xl border border-[#3182f6] bg-[#3182f6] text-white shadow-[0_8px_16px_rgba(49,130,246,0.22)] hover:scale-[1.03] active:scale-[0.96]" : "rounded-3xl border border-current bg-white/10 text-current hover:bg-white/20");
  return action.href ? <a className={className} href={action.href}>{action.label}</a> : <button className={className} onClick={action.onClick} type="button">{action.label}</button>;
}

/** Toss의 복잡한 일도 넓고 부드러운 흐름으로 바로 시작합니다를 넓은 콘텐츠 프레임에 담는 hero component입니다. */
export function TossHeroCard({ actions, className, description = "복잡한 일도 넓고 부드러운 흐름으로 바로 시작합니다", eyebrow = "EASY MONEY FLOW", media, primaryAction, secondaryAction, title = "Toss의 다음 장면을 시작하세요.", visual }: TossHeroCardProps) {
  const resolvedActions = actions ?? [primaryAction, secondaryAction].filter(Boolean) as TossHeroAction[];
  const showcase = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-48 overflow-hidden border border-current/20 bg-white/20 p-5">
      <div className="h-full w-3/5 border-2 border-dashed border-[#3182f6] bg-white/60" />
      <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#3182f6]/30" />
      <span className="absolute right-5 top-5 text-xs font-bold tracking-[0.18em]">{String(eyebrow)}</span>
    </div>
  );

  return (
    <section className={joinClasses("relative overflow-hidden p-6 font-sans rounded-[40px] bg-gradient-to-br from-[#e8f3ff] to-white shadow-[0_20px_50px_rgba(49,130,246,0.12)]", className)}>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#3182f6]">{eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-75">{description}</p>
          {resolvedActions.length ? <div className="mt-6 flex flex-wrap gap-2">{resolvedActions.map((action, index) => <Action action={action} key={`${action.label}-${index}`} primary={index === 0} />)}</div> : null}
        </div>
        <div className="relative">{showcase}</div>
      </div>
    </section>
  );
}

export default TossHeroCard;
