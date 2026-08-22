import type { ReactNode } from "react";

export interface LikelionHeroCardAction {
  /** 다음 학습 행동을 말하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** 계정 필 또는 검색 주목 행동을 선택합니다. */
  variant?: "account" | "search";
}

export interface LikelionHeroCardProps {
  /** 작은 맥락 레이블입니다. */
  eyebrow?: ReactNode;
  /** 실습 또는 학습 과제를 명확히 말하는 제목입니다. */
  title: ReactNode;
  /** 다음에 무엇을 할지 설명하는 짧은 안내입니다. */
  description?: ReactNode;
  /** 프로모션 시각물을 담는 영역입니다. */
  media?: ReactNode;
  /** 사용자가 이어서 할 수 있는 행동입니다. */
  actions?: LikelionHeroCardAction[];
  /** 카드 바깥 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const actionClasses: Record<NonNullable<LikelionHeroCardAction["variant"]>, string> = {
  account: "border-[#d4d4d4] bg-transparent text-[#222222] hover:bg-white/60 active:bg-white/60",
  search: "border-[#ff6000] bg-transparent text-[#ff6000] hover:bg-white/60 active:bg-white/60",
};

/**
 * 멋쟁이사자처럼 홈페이지에서 관측된 #fcf4ee, 16px 반경, 40px 패딩, 310px 프로모션 타일을 확장한 히어로 카드입니다.
 * 주황색은 일반 CTA가 아니라 과정 탐색·주목 행동을 표시할 때만 사용합니다.
 */
export function LikelionHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  media,
  title,
}: LikelionHeroCardProps) {
  return (
    <section className={joinClasses("min-h-[310px] overflow-hidden rounded-2xl bg-[#fcf4ee] p-10 font-[inherit] text-[#222222]", className)}>
      <div className="grid min-h-[230px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-12">
        <div className="min-w-0">
          {eyebrow ? <p className="mb-3 text-base font-normal leading-6 tracking-[-0.02em] text-[#737373]">{eyebrow}</p> : null}
          <h1 className="text-[32px] font-bold leading-[48px] tracking-[-0.04em] text-[#222222]">{title}</h1>
          {description ? <div className="mt-4 max-w-xl text-base font-normal leading-6 tracking-[-0.02em] text-[#737373]">{description}</div> : null}
          {actions.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  className={joinClasses(
                    "inline-flex h-[43px] items-center justify-center rounded-full border px-4 font-[inherit] text-base font-normal leading-6 tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 active:scale-[0.98]",
                    actionClasses[action.variant ?? "account"],
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

        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-[#e5e5e5] bg-white/60 p-6">
          {media ?? (
            <div className="text-center text-xl font-semibold leading-[30px] tracking-[-0.03em] text-[#222222]">
              아이디어를
              <br />
              직접 만들어 보세요
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LikelionHeroCard;
