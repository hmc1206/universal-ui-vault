import type { ReactNode } from "react";

export interface UpstageHeroCardAction {
  /** 문서 또는 워크플로의 다음 단계를 말하는 직접적인 행동 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
  /** observed public filled 또는 outlined action을 선택합니다. */
  variant?: "primary" | "secondary";
}

export interface UpstageHeroCardProps {
  /** Espeak public marketing-display context에서만 사용할 큰 제목입니다. */
  title: ReactNode;
  /** 문서, 검토, 배포 환경을 명확히 설명하는 설명입니다. */
  description: ReactNode;
  /** 오른쪽 또는 아래에 배치할 workflow/product visual입니다. */
  visual?: ReactNode;
  /** 문서 작업 흐름의 핵심 지점을 보조로 표시합니다. */
  eyebrow?: ReactNode;
  /** 공개 conversion action 목록입니다. */
  actions?: UpstageHeroCardAction[];
  /** 컴포넌트 외곽에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const actionClasses: Record<NonNullable<UpstageHeroCardAction["variant"]>, string> = {
  primary: "border border-[#5B52FF] bg-[#5B52FF] text-white hover:brightness-95",
  secondary: "border border-[#5B52FF] bg-white text-[#5B52FF] hover:bg-[#f7f7ff]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 업스테이지 public home의 Espeak display treatment, Geist content, #5B52FF conversion action, 8px geometry를 반영한 marketing hero입니다.
 * Espeak은 이 title 노드에만 한정하며, 인증 제품 UI 또는 일반 본문 토큰으로 사용하지 않습니다.
 */
export function UpstageHeroCard({
  actions = [],
  className,
  description,
  eyebrow,
  title,
  visual,
}: UpstageHeroCardProps) {
  return (
    <section className={joinClasses("overflow-hidden rounded-lg border border-[#CDD0D5] bg-white p-6 font-[Geist] text-[#0A0D14] sm:p-8 lg:p-10", className)}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
        <div>
          {eyebrow ? <div className="mb-4 text-base font-medium leading-6 text-[#5B52FF]">{eyebrow}</div> : null}
          <h1 className="max-w-3xl font-[Espeak] text-5xl font-semibold leading-[1.1] tracking-[-0.04em] text-[#0A0D14] sm:text-[64px] sm:leading-[70.4px]">
            {title}
          </h1>
          <div className="mt-6 max-w-2xl text-lg font-normal leading-[28.8px] text-[#52525B]">{description}</div>
          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  className={joinClasses(
                    "inline-flex h-12 items-center justify-center rounded-lg px-[18px] font-[Geist] text-base font-medium leading-6 outline-none transition-[filter,background-color,transform] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0D14]",
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
        <div className="min-h-64 rounded-lg border border-[#CDD0D5] bg-[#f7f7f8] p-6 text-[#525866]">
          {visual ?? (
            <div className="flex h-full min-h-52 flex-col justify-between">
              <span className="text-sm font-medium leading-5 text-[#0A0D14]">Document workflow</span>
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded bg-[#CDD0D5]" />
                <div className="h-3 w-full rounded bg-[#CDD0D5]" />
                <div className="h-3 w-4/5 rounded bg-[#CDD0D5]" />
              </div>
              <span className="text-sm font-normal leading-5">검토와 배포 맥락을 한 화면에서 확인합니다.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UpstageHeroCard;
