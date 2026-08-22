import type { ReactNode } from "react";

export interface AppleHeroAction {
  /** 사용자에게 보이는 짧은 행동 레이블입니다. */
  label: string;
  /** 링크 목적지입니다. */
  href?: string;
  /** 버튼 동작이 필요할 때 실행할 함수입니다. */
  onClick?: () => void;
}

export interface AppleHeroCardProps {
  /** 작은 맥락 레이블입니다. */
  eyebrow?: ReactNode;
  /** 대형 제품 또는 기능 제목입니다. */
  title: ReactNode;
  /** 제목을 보조하는 짧은 설명입니다. */
  description?: ReactNode;
  /** 검증된 primary marketing action입니다. */
  primaryAction?: AppleHeroAction;
  /** 검증된 outline marketing action입니다. */
  secondaryAction?: AppleHeroAction;
  /** 제품 이미지를 제공할 때 사용할 주소입니다. */
  imageSrc?: string;
  /** 제품 이미지의 대체 텍스트입니다. */
  imageAlt?: string;
  /** 밝은 fog 또는 몰입형 dark 표면을 선택합니다. */
  surface?: "fog" | "dark";
  /** 최상위 영역에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function HeroActionLink({
  action,
  dark,
  primary,
}: {
  action: AppleHeroAction;
  dark: boolean;
  primary: boolean;
}) {
  const classes = joinClasses(
    "inline-flex min-h-11 items-center justify-center rounded-[980px] px-[21px] py-[11px] font-['SF_Pro_Text'] text-[17px] font-normal leading-[22px] tracking-[-0.01em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    primary
      ? "border border-[#0071e3] bg-[#0071e3] text-white focus-visible:outline-[#0071e3]"
      : dark
        ? "border border-[#2997ff] bg-transparent text-[#2997ff] focus-visible:outline-[#2997ff]"
        : "border border-[#0066cc] bg-transparent text-[#0066cc] focus-visible:outline-[#0066cc]",
  );

  if (action.href) {
    return (
      <a className={classes} href={action.href} onClick={action.onClick}>
        {action.label}
      </a>
    );
  }

  return (
    <button className={classes} onClick={action.onClick} type="button">
      {action.label}
    </button>
  );
}

/**
 * apple.com public marketing의 content-first composition, SF Pro Display 56px hierarchy,
 * #f5f5f7/#000 surface 및 distinct 44px pill action을 적용한 hero component입니다.
 * hover와 motion은 캡처에 없으므로 공식 Apple interaction으로 표현하지 않습니다.
 * focus-visible outline은 접근성을 위한 지역 확장입니다.
 */
export function AppleHeroCard({
  className,
  description,
  eyebrow,
  imageAlt = "제품 이미지",
  imageSrc,
  primaryAction,
  secondaryAction,
  surface = "fog",
  title,
}: AppleHeroCardProps) {
  const isDark = surface === "dark";
  const textColor = isDark ? "text-white" : "text-[#1d1d1f]";
  const mutedColor = isDark ? "text-[#f5f5f7]" : "text-[#515154]";

  return (
    <section
      className={joinClasses(
        "overflow-hidden rounded-none font-['SF_Pro_Text'] sm:rounded-2xl",
        isDark ? "bg-black" : "bg-[#f5f5f7]",
        className,
      )}
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 py-14 sm:px-10 md:min-h-[560px] md:grid-cols-2 md:px-14 md:py-16 lg:px-20">
        <div className="relative z-10 max-w-xl">
          {eyebrow ? <p className={joinClasses("mb-3 text-sm font-normal leading-[18px] tracking-[-0.01em]", mutedColor)}>{eyebrow}</p> : null}
          <h1 className={joinClasses("font-['SF_Pro_Display'] text-[42px] font-semibold leading-[1.07] tracking-[-0.025em] sm:text-[56px] sm:leading-[60px]", textColor)}>
            {title}
          </h1>
          {description ? (
            <p className={joinClasses("mt-5 max-w-lg text-[17px] font-normal leading-[25px] tracking-[-0.022em]", mutedColor)}>{description}</p>
          ) : null}
          {primaryAction || secondaryAction ? (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {primaryAction ? <HeroActionLink action={primaryAction} dark={isDark} primary /> : null}
              {secondaryAction ? <HeroActionLink action={secondaryAction} dark={isDark} primary={false} /> : null}
            </div>
          ) : null}
        </div>
        <div className="relative flex min-h-64 items-center justify-center overflow-hidden md:min-h-[400px]">
          {imageSrc ? (
            <img alt={imageAlt} className="h-full max-h-[440px] w-full object-contain" src={imageSrc} />
          ) : (
            <div
              aria-hidden="true"
              className={joinClasses(
                "relative aspect-[4/5] w-[min(72vw,330px)] rounded-[2.75rem] border p-3",
                isDark ? "border-white/25 bg-[#1d1d1f]" : "border-[#6e6e73]/30 bg-white",
              )}
            >
              <div className={joinClasses("h-full w-full rounded-[2.1rem]", isDark ? "bg-gradient-to-br from-[#515154] to-black" : "bg-gradient-to-br from-white to-[#d2d2d7]")} />
              <div className={joinClasses("absolute left-1/2 top-5 h-1.5 w-16 -translate-x-1/2 rounded-full", isDark ? "bg-black" : "bg-[#1d1d1f]")} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AppleHeroCard;
