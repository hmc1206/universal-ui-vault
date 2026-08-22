import type { ReactNode } from "react";

export interface MusinsaHeroCardAction {
  /** 관찰 가능한 다음 탐색 행동을 말하는 레이블입니다. */
  label: string;
  /** 행동을 실행할 함수입니다. */
  onClick?: () => void;
}

export interface MusinsaHeroCardProps {
  /** 정사각형 제품/에디토리얼 미디어 영역입니다. */
  media?: ReactNode;
  /** 제품 또는 콘텐츠를 직접적으로 식별하는 제목입니다. */
  title: ReactNode;
  /** 브랜드, 카테고리, 짧은 설명처럼 보조 정보를 표시합니다. */
  description?: ReactNode;
  /** 이미지 아래에 추가로 보여줄 정보입니다. */
  metadata?: ReactNode;
  /** 사용자가 이어서 할 수 있는 유틸리티 행동입니다. */
  actions?: MusinsaHeroCardAction[];
  /** 최상위 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * MUSINSA STANDARD storefront의 Product-image Link(312px, square, 0px radius, 0px padding)와 14px/400 supporting text를 확장한 히어로 카드입니다.
 * 이는 native commerce purchase card가 아니며, 사진과 정보 밀도를 확인하기 위한 storefront 콘텐츠 프레임입니다.
 */
export function MusinsaHeroCard({
  actions = [],
  className,
  description,
  media,
  metadata,
  title,
}: MusinsaHeroCardProps) {
  return (
    <article className={joinClasses("w-full max-w-[312px] font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif] text-black", className)}>
      <div className="aspect-square w-full overflow-hidden rounded-none bg-[#f7f7f7]">
        {media ?? <span className="flex h-full w-full items-center justify-center text-sm font-normal leading-[21px] text-[#666666]">이미지 영역</span>}
      </div>
      <div className="border-b border-[#ebebeb] py-4">
        <h1 className="text-sm font-normal leading-[21px] text-black">{title}</h1>
        {description ? <div className="mt-1 text-sm font-normal leading-[21px] text-[#666666]">{description}</div> : null}
        {metadata ? <div className="mt-2 text-xs font-normal leading-4 text-[#666666]">{metadata}</div> : null}
        {actions.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1">
            {actions.map((action) => (
              <button
                className="inline-flex h-7 items-center justify-center rounded-none bg-transparent p-1 text-sm font-normal leading-[21px] text-black outline-none transition-[opacity,transform] hover:opacity-70 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
    </article>
  );
}

export default MusinsaHeroCard;
