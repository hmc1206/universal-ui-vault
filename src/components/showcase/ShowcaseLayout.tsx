import { useState } from "react";
import ComponentViewer, { SHOWCASE_BRANDS, type ShowcaseBrandId, type ThemeBridge } from "./ComponentViewer";

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

function SparkleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="m18 16 .8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

function BrandSelect({ id, label, value, onChange }: { id: string; label: string; value: ShowcaseBrandId; onChange: (value: ShowcaseBrandId) => void }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor={id}>
      {label}
      <select
        className="min-h-11 rounded-xl border border-[#d9d9df] bg-white px-3 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#242429] focus-visible:ring-2 focus-visible:ring-[#242429]/25"
        id={id}
        onChange={(event) => onChange(event.target.value as ShowcaseBrandId)}
        value={value}
      >
        {SHOWCASE_BRANDS.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * 실제 vault 카탈로그에서 브랜드를 선택하는 진입 화면입니다.
 * Brand Mix & Match는 팔레트/타이포그래피 출처와 물성/동작 출처를 독립적으로 선택해 ThemeBridge로 전달합니다.
 */
export function ShowcaseLayout() {
  const [selectedBrandId, setSelectedBrandId] = useState<ShowcaseBrandId | null>(null);
  const [mixEnabled, setMixEnabled] = useState(false);
  const [paletteBrandId, setPaletteBrandId] = useState<ShowcaseBrandId>("29cm");
  const [materialBrandId, setMaterialBrandId] = useState<ShowcaseBrandId>("toss");

  const paletteBrand = SHOWCASE_BRANDS.find((brand) => brand.id === paletteBrandId) ?? SHOWCASE_BRANDS[0];
  const materialBrand = SHOWCASE_BRANDS.find((brand) => brand.id === materialBrandId) ?? SHOWCASE_BRANDS[0];
  const themeBridge: ThemeBridge | undefined = mixEnabled
    ? {
        enabled: true,
        paletteBrandId,
        materialBrandId,
      }
    : undefined;

  if (selectedBrandId) {
    return <ComponentViewer brandId={selectedBrandId} onBack={() => setSelectedBrandId(null)} themeBridge={themeBridge} />;
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8] px-4 py-6 text-[#242429] sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-2xl border border-[#e1e1e6] bg-white px-6 py-8 shadow-[0_22px_50px_rgba(28,28,32,0.06)] sm:px-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e8] bg-[#fafafb] px-3 py-1.5 text-xs font-semibold text-[#5d5d67]">
                <span className="text-[#242429]"><LayersIcon /></span>
                Universal UI Vault · Intelligent Workstation
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">브랜드의 결을 조합하고, 누구에게나 읽히게 만드세요.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#696974] sm:text-lg">
                15개 실제 vault 세트를 브랜드 고유의 정체성으로 비교합니다. Brand Mix &amp; Match는 한 브랜드의 팔레트와 다른 브랜드의 물성을 안전한 미리보기 레이어에서 교차 적용합니다.
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

        <section aria-labelledby="theme-bridge-title" className="mt-8 overflow-hidden rounded-2xl border border-[#d9ddf1] bg-[radial-gradient(circle_at_top_right,_rgba(207,229,255,0.95),_transparent_40%),linear-gradient(135deg,_#fdfdff,_#f2f5ff)] p-5 shadow-[0_20px_48px_rgba(37,61,112,0.08)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#cdd8f4] bg-white/80 px-3 py-1.5 text-xs font-bold text-[#315a9f]">
                <SparkleIcon />
                ThemeBridge
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]" id="theme-bridge-title">Brand Mix &amp; Match</h2>
              <p className="mt-2 text-sm leading-6 text-[#5d6473]">
                스타일 출처는 컬러 팔레트와 타이포그래피의 표면을, 물성 출처는 깊이·반응·모션 강도를 제공합니다. 실제 vault 코드를 변형하지 않고 전시 컨테이너에서만 합성합니다.
              </p>
            </div>
            <button
              aria-pressed={mixEnabled}
              className={joinClasses(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#242429]/30",
                mixEnabled ? "border-[#315a9f] bg-[#315a9f] text-white" : "border-[#cbd0da] bg-white text-[#363942]",
              )}
              onClick={() => setMixEnabled((value) => !value)}
              type="button"
            >
              <span className={joinClasses("h-2.5 w-2.5 rounded-full", mixEnabled ? "bg-[#aee4ff]" : "bg-[#c7ccd6]")} />
              {mixEnabled ? "혼합 테마 적용 중" : "혼합 테마 켜기"}
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.1fr]">
            <BrandSelect id="palette-brand" label="스타일 출처 · 팔레트와 타이포그래피" onChange={setPaletteBrandId} value={paletteBrandId} />
            <BrandSelect id="material-brand" label="물성 출처 · 깊이와 인터랙션" onChange={setMaterialBrandId} value={materialBrandId} />
            <div className="rounded-xl border border-white/85 bg-white/70 px-4 py-3 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#707887]">Current recipe</p>
              <p className="mt-1 text-sm font-bold text-[#272b35]">{paletteBrand.name} style × {materialBrand.name} material</p>
              <p className="mt-1 text-xs leading-5 text-[#697080]">{mixEnabled ? "전시 컨테이너에 조합이 적용됩니다." : "켜면 선택한 조합으로 미리보기합니다."}</p>
            </div>
          </div>
        </section>

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
                  "group flex min-h-[204px] flex-col rounded-xl border p-5 text-left outline-none transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(29,29,34,0.10)] focus-visible:ring-2 focus-visible:ring-[#242429]/35 focus-visible:ring-offset-2",
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
