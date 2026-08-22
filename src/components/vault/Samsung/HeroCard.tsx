import type { ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #007aff only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface SamsungHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface SamsungHeroCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: SamsungHeroAction[];
  primaryAction?: SamsungHeroAction;
  secondaryAction?: SamsungHeroAction;
  media?: ReactNode;
  visual?: ReactNode;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Action({ action, primary }: { action: SamsungHeroAction; primary: boolean }) {
  const className = joinClasses("inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition-all duration-300 ease-out", primary ? "relative relative isolate overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.62),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_56%)] before:content-[''] rounded-2xl border border-[#007aff] bg-[#007aff] text-white after:absolute after:inset-0 after:scale-0 after:rounded-full after:bg-white/25 after:transition-transform after:duration-500 hover:after:scale-150 active:scale-[0.98]" : "rounded-2xl border border-current bg-white/10 text-current hover:bg-white/20");
  return action.href ? <a className={className} href={action.href}>{action.label}</a> : <button className={className} onClick={action.onClick} type="button">{action.label}</button>;
}

/** Samsung의 손에 닿는 곳에 중요한 정보를 정돈해 둡니다를 넓은 콘텐츠 프레임에 담는 hero component입니다. */
export function SamsungHeroCard({ actions, className, description = "손에 닿는 곳에 중요한 정보를 정돈해 둡니다", eyebrow = "ONE UI / READY", media, primaryAction, secondaryAction, title = "Samsung의 다음 장면을 시작하세요.", visual }: SamsungHeroCardProps) {
  const resolvedActions = actions ?? [primaryAction, secondaryAction].filter(Boolean) as SamsungHeroAction[];
  const showcase = visual ?? media ?? (
    <div aria-hidden="true" className="relative h-48 overflow-hidden border border-current/20 bg-white/20 p-5">
      <div className="h-full w-3/5 border-2 border-dashed border-[#007aff] bg-white/60" />
      <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#007aff]/30" />
      <span className="absolute right-5 top-5 text-xs font-bold tracking-[0.18em]">{String(eyebrow)}</span>
    </div>
  );

  return (
    <section className={joinClasses("relative overflow-hidden p-6 font-sans rounded-[28px] bg-gradient-to-b from-[#e8f2ff] to-white before:absolute before:inset-x-0 before:top-0 before:h-16 before:rounded-b-[32px] before:bg-[#007aff] before:content-['']", className)}>
      <div className="relative z-10 grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#007aff]">{eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-75">{description}</p>
          {resolvedActions.length ? <div className="mt-6 flex flex-wrap gap-2">{resolvedActions.map((action, index) => <Action action={action} key={`${action.label}-${index}`} primary={index === 0} />)}</div> : null}
        </div>
        <div className="relative rounded-[inherit] border border-white/45 bg-white/18 p-1 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.14)] motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current">{showcase}</div>
      </div>
    </section>
  );
}

export default SamsungHeroCard;
