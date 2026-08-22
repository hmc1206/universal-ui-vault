import type { ReactNode } from "react";

export interface GoodChoiceHeroCardAction {
  /** 여행 탐색 또는 예약 다음 행동을 말하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** Cyan 핵심 행동 또는 외곽선 보조 행동을 선택합니다. */
  variant?: "primary" | "outline";
}

export interface GoodChoiceHeroCardProps {
  /** 짧은 분류 또는 지역 메타데이터입니다. */
  eyebrow?: ReactNode;
  /** 숙소 또는 여행 상품의 핵심 제목입니다. */
  title: ReactNode;
  /** 위치·혜택·이용 조건처럼 비교에 필요한 설명입니다. */
  description?: ReactNode;
  /** 숙소나 여행지 사진을 담는 영역입니다. */
  media?: ReactNode;
  /** 사용자가 이어서 할 수 있는 행동입니다. */
  actions?: GoodChoiceHeroCardAction[];
  /** 카드 바깥 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const actionClasses: Record<NonNullable<GoodChoiceHeroCardAction["variant"]>, string> = {
  primary: "border-[#1D8BFF] bg-[#1D8BFF] text-white hover:brightness-95 active:translate-y-px",
  outline: "border-[#E6E6E6] bg-white text-[#222222] hover:bg-[#E3F0FF] active:translate-y-px",
};

/**
 * 여기어때 공개 숙소 결과의 photo → metadata → name → location → rating → price 위계를 확장한 히어로 카드입니다.
 * 사진 위에 핵심 가격이나 행동을 올리지 않고, 흰 12px 카드와 별도 정보 영역에서 비교·예약 정보를 읽게 합니다.
 */
export function GoodChoiceHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  media,
  title,
}: GoodChoiceHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden rounded-xl bg-white font-[Pretendard,system-ui,sans-serif] text-[#222222]", className)}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="min-h-64 bg-[#E3F0FF] sm:min-h-80">
          {media ?? (
            <div className="flex h-full min-h-64 items-center justify-center p-6 sm:min-h-80">
              <div className="rounded-xl bg-white px-6 py-5 text-center text-base font-semibold leading-6 text-[#49627A]">
                여행지 사진은 이곳에
                <br />
                따로 보여 주세요
              </div>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-8">
          {eyebrow ? <p className="text-sm font-normal leading-5 tracking-[-0.02em] text-[#737373]">{eyebrow}</p> : null}
          <h1 className="mt-2 text-[32px] font-bold leading-[38px] tracking-[-0.04em] text-[#222222]">{title}</h1>
          {description ? <div className="mt-4 text-base font-normal leading-6 tracking-[-0.02em] text-[#737373]">{description}</div> : null}
          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  className={joinClasses(
                    "inline-flex h-11 items-center justify-center rounded-lg border px-4 font-[Pretendard,system-ui,sans-serif] text-base font-semibold leading-6 tracking-[-0.02em] outline-none transition-[background-color,border-color,filter,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#1D8BFF] focus-visible:ring-offset-2",
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
      </div>
    </section>
  );
}

export default GoodChoiceHeroCard;
