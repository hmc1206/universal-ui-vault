import type { ReactNode } from "react";

export interface UpstageHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface UpstageHeroCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: UpstageHeroAction[];
  primaryAction?: UpstageHeroAction;
  secondaryAction?: UpstageHeroAction;
  media?: ReactNode;
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Action({ action, primary }: { action: UpstageHeroAction; primary: boolean }) {
  const className = joinClasses("inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition-all duration-500 ease-out", primary ? "rounded-xl border border-[#5b52ff] bg-[#5b52ff] text-white shadow-[0_0_0_1px_rgba(91,82,255,0.14)] hover:brightness-110 active:scale-[0.98]" : "rounded-xl border border-current bg-white/10 text-current hover:bg-white/20");
  return action.href ? <a className={className} href={action.href}>{action.label}</a> : <button className={className} onClick={action.onClick} type="button">{action.label}</button>;
}

/** Upstage의 데이터와 모델의 다음 단계를 한눈에 이어가는 AI 워크플로를 넓은 콘텐츠 프레임에 담는 hero component입니다. */
export function UpstageHeroCard({ actions, className, description = "데이터와 모델의 다음 단계를 한눈에 이어가는 AI 워크플로", eyebrow = "MODEL / FLOW", media, primaryAction, secondaryAction, title = "Upstage의 다음 장면을 시작하세요.", visual }: UpstageHeroCardProps) {
  const resolvedActions = actions ?? [primaryAction, secondaryAction].filter(Boolean) as UpstageHeroAction[];
  const showcase = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-48 overflow-hidden border border-current/20 bg-white/20 p-5">
      <div className="h-full w-3/5 border-2 border-dashed border-[#5b52ff] bg-white/60" />
      <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#5b52ff]/30" />
      <span className="absolute right-5 top-5 text-xs font-bold tracking-[0.18em]">{String(eyebrow)}</span>
    </div>
  );

  return (
    <section className={joinClasses("relative overflow-hidden p-6 font-sans rounded-2xl bg-gradient-to-br from-[#0a0d14] via-[#282052] to-[#5b52ff] text-white before:absolute before:inset-[1px] before:rounded-[inherit] before:bg-white/5 before:content-['']", className)}>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#5b52ff]">{eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-75">{description}</p>
          {resolvedActions.length ? <div className="mt-6 flex flex-wrap gap-2">{resolvedActions.map((action, index) => <Action action={action} key={`${action.label}-${index}`} primary={index === 0} />)}</div> : null}
        </div>
        <div className="relative">{showcase}</div>
      </div>
    </section>
  );
}

export default UpstageHeroCard;
