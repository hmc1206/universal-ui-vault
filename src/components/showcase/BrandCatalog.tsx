import { SHOWCASE_BRANDS } from "./showcase.catalog";
import type { ShowcaseBrandId } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function BrandCatalog({ onSelectBrand }: { onSelectBrand: (brandId: ShowcaseBrandId) => void }) {
  return (
    <section aria-labelledby="brand-catalog-title" className="mt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#6b6b75]">Live vault catalog</p>
          <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em]" id="brand-catalog-title">어느 브랜드 전시대를 열까요?</h2>
        </div>
        <p className="text-sm text-[#777780]">모든 카드는 10개 실물 vault 파일에 연결됩니다.</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SHOWCASE_BRANDS.map((brand) => (
          <button
            aria-label={`${brand.name} 컴포넌트 전시대 열기`}
            className={joinClasses(
              "group flex min-h-[204px] flex-col rounded-xl border p-5 text-left outline-none transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(29,29,34,0.10)] focus-visible:ring-2 focus-visible:ring-[#242429]/35 focus-visible:ring-offset-2",
              brand.surfaceClass,
              brand.borderClass,
            )}
            key={brand.id}
            onClick={() => onSelectBrand(brand.id)}
            type="button"
          >
            <div className="flex items-start justify-between gap-4">
              <span className={joinClasses("inline-flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold text-white", brand.accentClass)}>{brand.initials}</span>
              <span className={joinClasses("rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold", brand.textClass)}>{brand.status}</span>
            </div>
            <div className="mt-auto pt-8">
              <p className="text-xl font-bold tracking-[-0.04em]">{brand.name}</p>
              <p className="mt-2 text-sm leading-5 text-[#6b6b75]">{brand.descriptor}</p>
              <span className={joinClasses("mt-5 inline-flex items-center gap-1.5 text-sm font-semibold", brand.textClass)}>
                실물 전시대 열기
                <ArrowRightIcon />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
