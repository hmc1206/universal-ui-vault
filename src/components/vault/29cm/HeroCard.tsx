import type { ReactNode } from "react";

export interface TwentyNineCmHeroCardAction {
  /** 에디토리얼 또는 상품 탐색 행동을 말하는 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** Ghost Outline 또는 미디어 위 Carousel Control을 선택합니다. */
  variant?: "ghost" | "carousel";
}

export interface TwentyNineCmHeroCardProps {
  /** 작은 에디토리얼 메타데이터입니다. */
  eyebrow?: ReactNode;
  /** 29Magazine의 관측된 밀도를 따르는 스토리 제목입니다. */
  title: ReactNode;
  /** 큐레이션 맥락을 설명하는 본문입니다. */
  description?: ReactNode;
  /** 에디토리얼 사진이나 영상의 별도 미디어 영역입니다. */
  media?: ReactNode;
  /** 사용자가 이어서 할 수 있는 행동입니다. */
  actions?: TwentyNineCmHeroCardAction[];
  /** 카드 바깥 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<TwentyNineCmHeroCardAction["variant"]>, string> = {
  ghost: "h-[52px] rounded border border-[#dddddd] bg-white pl-5 pr-4 text-sm font-bold leading-5 text-black hover:brightness-95 active:translate-y-px",
  carousel: "h-[52px] w-[52px] rounded-full border border-transparent bg-black/50 p-3.5 text-base font-normal leading-6 text-white hover:bg-black/60 active:scale-[0.96]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 29CM 29Magazine·Showcase의 에디토리얼 미디어와 23px/600 스토리 제목을 확장한 히어로 카드입니다.
 * 에디토리얼 항목은 관측값처럼 square-edge로 유지하고, 사진 위에는 핵심 구매 정보나 텍스트를 얹지 않습니다.
 */
export function TwentyNineCmHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  media,
  title,
}: TwentyNineCmHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden bg-white font-[Pretendard_Variable,Pretendard,system-ui,sans-serif] text-black", className)}>
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="relative min-h-72 bg-[#f4f4f4] sm:min-h-96">
          {media ?? (
            <div className="flex h-full min-h-72 items-center justify-center p-8 sm:min-h-96">
              <span className="text-center text-sm font-bold leading-5 text-[#5d5d5d]">에디토리얼 이미지를<br />이곳에 배치하세요</span>
            </div>
          )}
          {actions.filter((action) => action.variant === "carousel").length > 0 ? (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {actions.filter((action) => action.variant === "carousel").map((action) => (
                <button
                  aria-label={action.label}
                  className={actionClasses.carousel}
                  key={action.label}
                  onClick={action.onClick}
                  type="button"
                >
                  <span aria-hidden="true">{action.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-h-72 flex-col justify-center p-8 sm:p-12">
          {eyebrow ? <p className="text-xs font-bold leading-4 tracking-[-0.02em] text-[#5d5d5d]">{eyebrow}</p> : null}
          <h1 className="mt-3 text-[23px] font-semibold leading-[29.9px] tracking-[-0.03em] text-black">{title}</h1>
          {description ? <div className="mt-4 text-base font-normal leading-6 tracking-[-0.02em] text-[#303033]">{description}</div> : null}
          {actions.some((action) => (action.variant ?? "ghost") === "ghost") ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.filter((action) => (action.variant ?? "ghost") === "ghost").map((action) => (
                <button
                  className={actionClasses.ghost}
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

export default TwentyNineCmHeroCard;
