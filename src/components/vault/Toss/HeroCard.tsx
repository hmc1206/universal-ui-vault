import type { ReactNode } from "react";

export interface TossHeroCardAction {
  /** 행동을 직접 설명하는 짧은 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** 행동의 시각적 우선순위입니다. */
  variant?: "primary" | "weak";
}

export interface TossHeroCardProps {
  /** 작은 맥락 레이블입니다. */
  eyebrow?: ReactNode;
  /** 사람이 바로 이해할 수 있는 핵심 제목입니다. */
  title: ReactNode;
  /** 가치를 먼저 설명하는 짧은 안내입니다. */
  description?: ReactNode;
  /** 제품 시각물을 담는 영역입니다. */
  media?: ReactNode;
  /** 사용자가 이어서 할 수 있는 행동입니다. */
  actions?: TossHeroCardAction[];
  /** 카드 바깥 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const actionClasses: Record<NonNullable<TossHeroCardAction["variant"]>, string> = {
  primary: "border-[#3182f6] bg-[#3182f6] text-white hover:border-[#2272eb] hover:bg-[#2272eb] active:bg-[#2272eb]",
  weak: "border-[#e8f3ff] bg-[#e8f3ff] text-[#1b64da] hover:bg-[#dcecff] active:bg-[#dcecff]",
};

/**
 * 토스의 큰 읽기 위계·연한 중립 표면·기능적인 블루 행동을 담은 히어로 카드 확장 컴포넌트입니다.
 * 현재 패킷은 카드 기하를 공식 토큰으로 제공하지 않으므로, 이 파일은 TDS 타이포그래피와 버튼 토큰을 활용한 명시적 확장입니다.
 */
export function TossHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  media,
  title,
}: TossHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden rounded-3xl bg-[#f2f4f6] font-[Toss\ Product\ Sans,system-ui,sans-serif] text-[#191f28]", className)}>
      <div className="grid items-center gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12 lg:px-12 lg:py-14">
        <div className="order-2 min-w-0 lg:order-1">
          {eyebrow ? <p className="mb-3 text-sm font-semibold leading-5 tracking-[-0.02em] text-[#3182f6]">{eyebrow}</p> : null}
          <h1 className="text-3xl font-bold leading-[1.35] tracking-[-0.04em] sm:text-4xl sm:leading-[1.4]">{title}</h1>
          {description ? <div className="mt-5 max-w-xl text-base font-normal leading-6 tracking-[-0.02em] text-[#4e5968]">{description}</div> : null}
          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  className={joinClasses(
                    "inline-flex h-12 items-center justify-center rounded-[14px] border px-5 font-[Toss\ Product\ Sans,system-ui,sans-serif] text-base font-semibold leading-6 tracking-[-0.02em] outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#3182f6] focus-visible:ring-offset-2 active:scale-[0.98]",
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

        <div className="order-1 flex min-h-64 items-center justify-center rounded-2xl bg-white p-6 sm:min-h-80 lg:order-2">
          {media ?? (
            <div className="flex h-48 w-full max-w-xs items-center justify-center rounded-2xl bg-[#e8f3ff] p-6 text-center text-lg font-semibold leading-7 tracking-[-0.03em] text-[#1b64da]">
              필요한 정보를
              <br />
              한눈에 볼 수 있어요
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TossHeroCard;
