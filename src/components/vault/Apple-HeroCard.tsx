import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

export interface AppleHeroAction {
  /** 행동을 명확히 설명하는 짧은 레이블입니다. */
  label: string;
  /** 액션이 이동할 주소입니다. */
  href?: string;
  /** 버튼 액션일 때 실행할 함수입니다. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface AppleHeroCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** 카드 상단에 표시할 짧은 제품 또는 카테고리명입니다. */
  eyebrow?: string;
  /** 한 가지 핵심 역량을 명확하게 말하는 제목입니다. */
  title?: ReactNode;
  /** 제목을 보완하는 간결한 설명입니다. */
  description?: ReactNode;
  /** 가장 중요한 행동입니다. */
  primaryAction?: AppleHeroAction;
  /** 보조 행동입니다. */
  secondaryAction?: AppleHeroAction;
  /** 제품 이미지나 데모를 넣을 시각 영역입니다. */
  visual?: ReactNode;
  /** 밝은 또는 어두운 마케팅 표면을 선택합니다. */
  tone?: "light" | "dark";
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" className="h-[0.9em] w-[0.9em] shrink-0" fill="none" viewBox="0 0 16 16">
      <path d="m6 3 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function AppleHeroActionButton({
  action,
  kind,
}: {
  action: AppleHeroAction;
  kind: "primary" | "secondary";
}) {
  const className = joinClasses(
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-[21px] py-[11px] text-[17px] font-normal leading-[22px] tracking-[-0.022em] [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Helvetica_Neue',Arial,sans-serif]",
    kind === "primary" ? "border border-[#0071e3] bg-[#0071e3] text-white" : "border border-[#0066cc] bg-transparent text-[#0066cc]",
  );

  if (action.href) {
    return (
      <a className={className} href={action.href}>
        <span>{action.label}</span>
        <ChevronRight />
      </a>
    );
  }

  return (
    <button className={className} onClick={action.onClick} type="button">
      <span>{action.label}</span>
      <ChevronRight />
    </button>
  );
}

function DefaultVisual({ tone }: { tone: "light" | "dark" }) {
  return (
    <div aria-hidden="true" className="relative flex h-full min-h-[250px] w-full items-center justify-center overflow-hidden sm:min-h-[330px]">
      <div
        className={joinClasses(
          "absolute h-64 w-64 rounded-full blur-3xl sm:h-80 sm:w-80",
          tone === "dark" ? "bg-[#147ce5]/35" : "bg-[#bfdbfe]/65",
        )}
      />
      <div
        className={joinClasses(
          "absolute h-40 w-40 rounded-full blur-2xl sm:h-52 sm:w-52",
          tone === "dark" ? "-right-5 top-4 bg-[#7dd3fc]/30" : "-right-5 top-4 bg-[#e0f2fe]",
        )}
      />
      <div
        className={joinClasses(
          "relative h-[180px] w-[122px] rounded-[26px] border p-1.5 sm:h-[230px] sm:w-[156px] sm:rounded-[32px]",
          tone === "dark" ? "border-white/35 bg-[#5a5a5d]" : "border-[#b7bcc2] bg-[#e7e8ea]",
        )}
      >
        <div
          className={joinClasses(
            "relative h-full overflow-hidden rounded-[20px] sm:rounded-[26px]",
            tone === "dark" ? "bg-gradient-to-br from-[#1d4ed8] via-[#312e81] to-[#09090b]" : "bg-gradient-to-br from-[#bae6fd] via-[#dbeafe] to-[#f8fafc]",
          )}
        >
          <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute -bottom-12 -right-10 h-36 w-36 rounded-full bg-[#7dd3fc]/40 blur-2xl" />
          <div className={joinClasses("absolute left-1/2 top-2 h-4 w-12 -translate-x-1/2 rounded-full", tone === "dark" ? "bg-black/65" : "bg-[#374151]/70")} />
        </div>
      </div>
    </div>
  );
}

/**
 * Apple 공개 웹의 절제된 대형 타이포그래피와 한 가지 분명한 행동을 반영한 히어로 카드입니다.
 * 외부 이미지 없이도 바로 사용할 수 있으며, `visual`을 전달해 제품 미디어로 교체할 수 있습니다.
 */
export function AppleHeroCard({
  className,
  description = "필요한 순간에, 자연스럽게 함께합니다.",
  eyebrow = "새로운 경험",
  primaryAction = { label: "더 알아보기" },
  secondaryAction = { label: "구입하기" },
  title = "더 많은 일을. 더 나답게.",
  tone = "dark",
  visual,
  ...sectionProps
}: AppleHeroCardProps) {
  const isDark = tone === "dark";

  return (
    <section
      {...sectionProps}
      className={joinClasses(
        "relative isolate grid min-h-[560px] overflow-hidden rounded-[28px] [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Helvetica_Neue',Arial,sans-serif] md:min-h-[500px] md:grid-cols-2",
        isDark ? "bg-black text-[#f5f5f7]" : "bg-[#f5f5f7] text-[#1d1d1f]",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col items-center px-6 pb-3 pt-12 text-center sm:px-10 sm:pt-16 md:items-start md:justify-center md:px-12 md:py-14 md:text-left lg:px-16">
        <p className={joinClasses("text-[17px] font-normal leading-[25px] tracking-[-0.022em]", isDark ? "text-[#a1a1a6]" : "text-[#6e6e73]")}>
          {eyebrow}
        </p>
        <h2 className="mt-2 max-w-[580px] text-[40px] font-semibold leading-[44px] tracking-[-0.035em] sm:text-[48px] sm:leading-[52px] md:text-[56px] md:leading-[60px]">
          {title}
        </h2>
        <p className={joinClasses("mt-4 max-w-[430px] text-[17px] font-normal leading-[25px] tracking-[-0.022em]", isDark ? "text-[#d2d2d7]" : "text-[#515154]")}>
          {description}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          {primaryAction ? <AppleHeroActionButton action={primaryAction} kind="primary" /> : null}
          {secondaryAction ? <AppleHeroActionButton action={secondaryAction} kind="secondary" /> : null}
        </div>
      </div>

      <div className="relative min-h-[250px] overflow-hidden md:min-h-full">
        {visual ?? <DefaultVisual tone={tone} />}
      </div>
    </section>
  );
}

export default AppleHeroCard;
