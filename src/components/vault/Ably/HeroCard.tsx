import type { ReactNode } from "react";

export interface AblyHeroCardAction {
  /** 방문자가 다음으로 할 수 있는 행동을 말하는 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** ABLY Team primary 또는 soft action을 선택합니다. */
  variant?: "primary" | "soft";
}

export interface AblyHeroCardProps {
  /** 스토리의 짧은 분류입니다. */
  eyebrow?: ReactNode;
  /** 회사/브랜드 스토리를 설명하는 대형 제목입니다. */
  title: ReactNode;
  /** 제목 아래에 표시할 설명입니다. */
  description?: ReactNode;
  /** 사진, 일러스트, 영상 등을 담는 미디어 영역입니다. */
  media?: ReactNode;
  /** 방문자가 이어서 할 수 있는 행동입니다. */
  actions?: AblyHeroCardAction[];
  /** pale peach 또는 white story surface를 선택합니다. */
  tone?: "peach" | "white";
  /** 카드 바깥 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const toneClasses: Record<NonNullable<AblyHeroCardProps["tone"]>, string> = {
  peach: "bg-[#fff2ea]",
  white: "bg-white",
};

const actionClasses: Record<NonNullable<AblyHeroCardAction["variant"]>, string> = {
  primary: "h-14 w-40 rounded-xl bg-[#ff5160] px-6 text-lg font-semibold leading-6 text-white hover:brightness-95 active:translate-y-px",
  soft: "h-12 min-w-[160px] rounded-xl bg-[#fff2ea] px-6 text-base font-semibold leading-5 text-[#ff5160] hover:bg-[#ffe6dc] active:translate-y-px",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * ABLY Team의 48px editorial heading, pale peach surface, 12px story card, 0 4px 48px rgba(0,0,0,.08) shadow를 적용한 히어로 카드입니다.
 * 이는 Consumer native commerce 카드가 아니라 회사/미션 스토리 표면에만 맞춘 컴포넌트입니다.
 */
export function AblyHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  media,
  title,
  tone = "peach",
}: AblyHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden rounded-xl font-[Pretendard,system-ui,sans-serif] text-[#1f1f1f] shadow-[0_4px_48px_rgba(0,0,0,0.08)]", toneClasses[tone], className)}>
      <div className="grid min-h-[440px] gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:p-16">
        <div className="min-w-0">
          {eyebrow ? <p className="mb-4 text-base font-semibold leading-5 tracking-[-0.3px] text-[#ff5160]">{eyebrow}</p> : null}
          <h1 className="max-w-3xl text-[40px] font-semibold leading-[56px] tracking-[-0.3px] sm:text-[48px] sm:leading-[64px]">
            {title}
          </h1>
          {description ? <div className="mt-6 max-w-xl text-base font-normal leading-6 tracking-[-0.3px] text-[#757575]">{description}</div> : null}
          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  className={joinClasses(
                    "inline-flex items-center justify-center border border-transparent font-[Pretendard,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[filter,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f]",
                    actionClasses[action.variant ?? "primary"],
                  )}
                  key={action.label}
                  onClick={action.onClick}
                  type="button"
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-xl bg-white p-6 sm:min-h-80 lg:min-h-96">
          {media ?? <span className="text-center text-base font-normal leading-6 tracking-[-0.3px] text-[#757575]">미션을 보여주는 이미지나<br />스토리 미디어를 배치하세요</span>}
        </div>
      </div>
    </section>
  );
}

export default AblyHeroCard;
