import type { ReactNode } from "react";

export interface SamsungHeroCardAction {
  /** 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** 블랙 채움 또는 외곽선 CTA를 선택합니다. */
  variant?: "contained" | "outlined";
}

export interface SamsungHeroCardProps {
  /** 작은 분류 레이블입니다. */
  eyebrow?: ReactNode;
  /** 제품 또는 서비스의 핵심 제목입니다. */
  title: ReactNode;
  /** 제목을 보완하는 구체적인 한두 문장입니다. */
  description?: ReactNode;
  /** 제품 시각물을 담는 영역입니다. */
  media?: ReactNode;
  /** 제공하는 행동 목록입니다. */
  actions?: SamsungHeroCardAction[];
  /** 카드 바깥 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const actionClasses: Record<NonNullable<SamsungHeroCardAction["variant"]>, string> = {
  contained: "border-[#000000] bg-[#000000] text-[#ffffff] hover:bg-[#333333] active:bg-[#000000]",
  outlined: "border-[#000000] bg-transparent text-[#000000] hover:bg-[#f7f7f7] active:bg-[#eeeeee]",
};

/**
 * 삼성전자 AI 제품 페이지에서 관측된 흰색 20px 미디어 표면과 Sharp Sans 24px 제목 역할을 반영한 히어로 카드입니다.
 * 카드 자체의 그림자는 현재 증거에 없으므로 사용하지 않습니다.
 */
export function SamsungHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  media,
  title,
}: SamsungHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden bg-[#f7f7f7] font-[SamsungOneKorean,sans-serif] text-[#000000]", className)}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8 lg:py-14">
        <div className="order-2 min-w-0 lg:order-1">
          {eyebrow ? <p className="mb-3 text-sm font-bold leading-5 tracking-[-0.02em] text-[#707070]">{eyebrow}</p> : null}
          <h1 className="font-[SamsungSharpSans,Samsung\ Sharp\ Sans,sans-serif] text-3xl font-bold leading-10 tracking-[-0.04em] text-[#000000] sm:text-[40px] sm:leading-[1.15]">
            {title}
          </h1>
          {description ? (
            <div className="mt-5 max-w-xl text-base font-normal leading-[1.45] tracking-[-0.02em] text-[#707070]">
              {description}
            </div>
          ) : null}
          {actions.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  className={joinClasses(
                    "inline-flex h-10 items-center justify-center rounded-[20px] border px-6 pb-[9px] pt-2.5 font-[SamsungOneKorean,sans-serif] text-sm font-bold leading-[19px] tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2 active:scale-[0.98]",
                    actionClasses[action.variant ?? "contained"],
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

        <div className="order-1 min-h-64 overflow-hidden rounded-[20px] bg-[#ffffff] lg:order-2 lg:min-h-[330px]">
          {media ?? (
            <div className="flex h-full min-h-64 items-center justify-center p-8 lg:min-h-[330px]">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border border-[#dddddd] bg-[#f7f7f7] font-[SamsungSharpSans,Samsung\ Sharp\ Sans,sans-serif] text-2xl font-bold tracking-[-0.04em] text-[#000000]">
                Samsung
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SamsungHeroCard;
