import type { ReactNode } from "react";

export interface AppleHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface AppleHeroCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: AppleHeroAction[];
  primaryAction?: AppleHeroAction;
  secondaryAction?: AppleHeroAction;
  media?: ReactNode;
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Action({ action, primary }: { action: AppleHeroAction; primary: boolean }) {
  const className = joinClasses("inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition-all duration-500 ease-out", primary ? "rounded-full border-[0.5px] border-white/70 bg-[#0071e3] text-white shadow-[0_10px_30px_rgba(0,113,227,0.18)] hover:brightness-110 active:scale-[0.98]" : "rounded-[22px] border border-current bg-white/10 text-current hover:bg-white/20");
  return action.href ? <a className={className} href={action.href}>{action.label}</a> : <button className={className} onClick={action.onClick} type="button">{action.label}</button>;
}

/** Apple의 정밀한 도구가 일을 방해하지 않고 자연스럽게 이어집니다를 넓은 콘텐츠 프레임에 담는 hero component입니다. */
export function AppleHeroCard({ actions, className, description = "정밀한 도구가 일을 방해하지 않고 자연스럽게 이어집니다", eyebrow = "DESIGNED TO FEEL NATURAL", media, primaryAction, secondaryAction, title = "Apple의 다음 장면을 시작하세요.", visual }: AppleHeroCardProps) {
  const resolvedActions = actions ?? [primaryAction, secondaryAction].filter(Boolean) as AppleHeroAction[];
  const showcase = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-48 overflow-hidden border border-current/20 bg-white/20 p-5">
      <div className="h-full w-3/5 border-2 border-dashed border-[#2997ff] bg-white/60" />
      <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#2997ff]/30" />
      <span className="absolute right-5 top-5 text-xs font-bold tracking-[0.18em]">{String(eyebrow)}</span>
    </div>
  );

  return (
    <section className={joinClasses("relative overflow-hidden p-6 font-['SF_Pro_Display'] rounded-[32px] border-[0.5px] border-white/80 bg-gradient-to-br from-white/90 to-[#dfe8f8]/70 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]", className)}>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#2997ff]">{eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-75">{description}</p>
          {resolvedActions.length ? <div className="mt-6 flex flex-wrap gap-2">{resolvedActions.map((action, index) => <Action action={action} key={`${action.label}-${index}`} primary={index === 0} />)}</div> : null}
        </div>
        <div className="relative">{showcase}</div>
      </div>
    </section>
  );
}

export default AppleHeroCard;
