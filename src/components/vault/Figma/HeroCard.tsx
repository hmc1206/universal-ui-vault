import type { ReactNode } from "react";

export interface FigmaHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface FigmaHeroCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: FigmaHeroAction[];
  primaryAction?: FigmaHeroAction;
  secondaryAction?: FigmaHeroAction;
  media?: ReactNode;
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Action({ action, primary }: { action: FigmaHeroAction; primary: boolean }) {
  const className = joinClasses("inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition-all duration-150 ease-out", primary ? "rounded-sm border border-[#5b5b5b] bg-white text-[#2c2c2c] hover:bg-[#e5e5e5] active:translate-y-px" : "rounded-sm border border-current bg-white/10 text-current hover:bg-white/20");
  return action.href ? <a className={className} href={action.href}>{action.label}</a> : <button className={className} onClick={action.onClick} type="button">{action.label}</button>;
}

/** Figma의 정밀한 선택과 협업의 맥락을 같은 캔버스에 남깁니다를 넓은 콘텐츠 프레임에 담는 hero component입니다. */
export function FigmaHeroCard({ actions, className, description = "정밀한 선택과 협업의 맥락을 같은 캔버스에 남깁니다", eyebrow = "CANVAS / 100%", media, primaryAction, secondaryAction, title = "Figma의 다음 장면을 시작하세요.", visual }: FigmaHeroCardProps) {
  const resolvedActions = actions ?? [primaryAction, secondaryAction].filter(Boolean) as FigmaHeroAction[];
  const showcase = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-48 overflow-hidden border border-current/20 bg-white/20 p-5">
      <div className="h-full w-3/5 border-2 border-dashed border-[#0d99ff] bg-white/60" />
      <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#0d99ff]/30" />
      <span className="absolute right-5 top-5 text-xs font-bold tracking-[0.18em]">{String(eyebrow)}</span>
    </div>
  );

  return (
    <section className={joinClasses("relative overflow-hidden p-6 font-['figmaSans'] rounded-sm border border-[#5b5b5b] bg-[#2c2c2c] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px] outline outline-1 outline-dashed outline-[#0d99ff] outline-offset-2", className)}>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#0d99ff]">{eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-75">{description}</p>
          {resolvedActions.length ? <div className="mt-6 flex flex-wrap gap-2">{resolvedActions.map((action, index) => <Action action={action} key={`${action.label}-${index}`} primary={index === 0} />)}</div> : null}
        </div>
        <div className="relative">{showcase}</div>
      </div>
    </section>
  );
}

export default FigmaHeroCard;
