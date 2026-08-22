import { useState } from "react";
import ComponentViewer, { SHOWCASE_BRANDS, type ShowcaseBrandId } from "./ComponentViewer";

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

/**
 * 실제 vault 카탈로그에서 브랜드를 선택하고 해당 brandId를 ComponentViewer에 전달하는 쇼케이스 진입 화면입니다.
 * 모든 카드 정보는 ComponentViewer가 export하는 단일 SHOWCASE_BRANDS 데이터에서 읽으므로,
 * 브랜드 추가 시 전시대 선택과 실물 컴포넌트 매핑의 기준이 분리되지 않습니다.
 */
export function ShowcaseLayout() {
  const [selectedBrandId, setSelectedBrandId] = useState<ShowcaseBrandId | null>(null);

  if (selectedBrandId) {
    return <ComponentViewer brandId={selectedBrandId} onBack={() => setSelectedBrandId(null)} />;
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8] px-4 py-6 text-[#242429] sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-2xl border border-[#e1e1e6] bg-white px-6 py-8 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e8] bg-[#fafafb] px-3 py-1.5 text-xs font-semibold text-[#5d5d67]">
                <span className="text-[#242429]"><LayersIcon /></span>
                Universal UI Vault
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">실물 컴포넌트로 브랜드의 결을 비교하세요.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#696974] sm:text-lg">
                아래 카탈로그는 각 vault 폴더의 10개 실물 컴포넌트에 연결됩니다. 브랜드를 고르면 Button부터 Accordion까지 실제 TSX 구현을 같은 전시 환경에서 확인하고 import 경로를 복사할 수 있어요.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-6">
              <div className="rounded-xl bg-[#f7f7f8] px-4 py-3">
                <p className="text-2xl font-bold tracking-[-0.04em]">{SHOWCASE_BRANDS.length}</p>
                <p className="mt-1 text-xs font-medium text-[#777780]">실물 브랜드 전시대</p>
              </div>
              <div className="rounded-xl bg-[#f7f7f8] px-4 py-3">
                <p className="text-2xl font-bold tracking-[-0.04em]">10</p>
                <p className="mt-1 text-xs font-medium text-[#777780]">브랜드별 핵심 컴포넌트</p>
              </div>
            </div>
          </div>
        </header>

        <section aria-labelledby="brand-catalog-title" className="mt-8">
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
                  "group flex min-h-[204px] flex-col rounded-xl border p-5 text-left outline-none transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#242429]/35 focus-visible:ring-offset-2",
                  brand.surfaceClass,
                  brand.borderClass,
                )}
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
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
      </div>
    </main>
  );
}

export default ShowcaseLayout;
