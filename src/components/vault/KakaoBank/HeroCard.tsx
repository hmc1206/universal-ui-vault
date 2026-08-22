import type { ReactNode } from "react";

export interface KakaoBankHeroCardAction {
  /** 서비스 안내의 다음 행동을 말하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** 공개 Corporate Action 또는 Resource Download 기하를 선택합니다. */
  variant?: "corporate" | "resource";
}

export interface KakaoBankHeroCardProps {
  /** 작은 서비스 분류 또는 맥락입니다. */
  eyebrow?: ReactNode;
  /** 서비스 카테고리를 직접적으로 말하는 대형 제목입니다. */
  title: ReactNode;
  /** 누구에게 어떤 정보를 제공하는지 설명하는 본문입니다. */
  description?: ReactNode;
  /** 제품 또는 서비스 이미지를 담는 별도 시각 영역입니다. */
  media?: ReactNode;
  /** 사용자가 이어서 할 수 있는 행동입니다. */
  actions?: KakaoBankHeroCardAction[];
  /** 공식 identity 맥락에서만 표시할 Yellow 마커입니다. */
  showIdentityMarker?: boolean;
  /** 카드 바깥 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<KakaoBankHeroCardAction["variant"]>, string> = {
  corporate: "h-[42px] rounded-md bg-black px-[18px] text-[15px] font-semibold leading-5 text-white hover:brightness-95 active:translate-y-px",
  resource: "h-[43px] rounded-md bg-black pl-5 pr-4 text-base font-normal leading-6 text-white hover:brightness-95 active:translate-y-px",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * KakaoBank 공개 웹의 흰 캔버스·#f7f7f7 section·검정 우선 타이포그래피·대형 Korean hierarchy를 적용한 히어로 카드입니다.
 * #FFE300 마커는 보호된 공식 identity 맥락에서만 선택적으로 표시하며, Yellow CTA나 native banking UI를 만들지 않습니다.
 */
export function KakaoBankHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  media,
  showIdentityMarker = false,
  title,
}: KakaoBankHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden bg-[#f7f7f7] font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] text-black", className)}>
      <div className="grid min-h-[420px] items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:px-16 lg:py-24">
        <div className="min-w-0">
          {showIdentityMarker ? <span aria-hidden="true" className="mb-6 block h-3 w-3 bg-[#FFE300]" /> : null}
          {eyebrow ? <p className="mb-4 text-base font-normal leading-6 tracking-[-0.02em] text-[#444444]">{eyebrow}</p> : null}
          <h1 className="max-w-4xl text-[42px] font-bold leading-[52.08px] tracking-[-0.84px] text-black sm:text-[56px] sm:leading-[68px] lg:text-[90px] lg:font-extrabold lg:leading-[117px] lg:tracking-[-0.9px]">
            {title}
          </h1>
          {description ? <div className="mt-6 max-w-2xl text-base font-normal leading-6 tracking-[-0.02em] text-[#444444]">{description}</div> : null}
          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  className={joinClasses(
                    "inline-flex items-center justify-center border border-transparent font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] tracking-[-0.02em] outline-none transition-[filter,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                    actionClasses[action.variant ?? "corporate"],
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

        <div className="flex min-h-64 items-center justify-center bg-white p-8 sm:min-h-80 lg:min-h-96">
          {media ?? <span className="text-center text-base font-normal leading-6 text-[#888888]">서비스 이미지는<br />이곳에 별도로 배치하세요</span>}
        </div>
      </div>
    </section>
  );
}

export default KakaoBankHeroCard;
