import { useState } from "react";
import ComponentViewer, { type ShowcaseBrandId } from "./ComponentViewer";

interface ShowcaseBrand {
  id: ShowcaseBrandId;
  name: string;
  descriptor: string;
  initials: string;
  accentClass: string;
  surfaceClass: string;
  borderClass: string;
  textClass: string;
  status: string;
}

const SHOWCASE_BRANDS: ShowcaseBrand[] = [
  {
    id: "toss",
    name: "Toss",
    descriptor: "Clear finance, kind utility",
    initials: "T",
    accentClass: "bg-[#3182f6]",
    surfaceClass: "bg-[#e8f3ff]",
    borderClass: "border-[#cfe5ff]",
    textClass: "text-[#1f6fd9]",
    status: "Input ready",
  },
  {
    id: "apple",
    name: "Apple",
    descriptor: "Precise, restrained, familiar",
    initials: "A",
    accentClass: "bg-[#1d1d1f]",
    surfaceClass: "bg-[#f5f5f7]",
    borderClass: "border-[#d2d2d7]",
    textClass: "text-[#1d1d1f]",
    status: "3 components ready",
  },
  {
    id: "linear",
    name: "Linear",
    descriptor: "Builder-grade performance",
    initials: "L",
    accentClass: "bg-[#5e6ad2]",
    surfaceClass: "bg-[#202023]",
    borderClass: "border-[#343438]",
    textClass: "text-[#c2c8ff]",
    status: "Button ready",
  },
  {
    id: "notion",
    name: "Notion",
    descriptor: "Composable workspace clarity",
    initials: "N",
    accentClass: "bg-[#2f3437]",
    surfaceClass: "bg-[#f7f7f5]",
    borderClass: "border-[#dededb]",
    textClass: "text-[#2f3437]",
    status: "Preview scaffold",
  },
  {
    id: "stripe",
    name: "Stripe",
    descriptor: "Confident payment primitives",
    initials: "S",
    accentClass: "bg-[#635bff]",
    surfaceClass: "bg-[#f0efff]",
    borderClass: "border-[#dedeff]",
    textClass: "text-[#635bff]",
    status: "Payment card ready",
  },
  {
    id: "karrot",
    name: "Karrot",
    descriptor: "Warm neighborhood interactions",
    initials: "K",
    accentClass: "bg-[#ff6f0f]",
    surfaceClass: "bg-[#fff5f0]",
    borderClass: "border-[#ffe1d0]",
    textClass: "text-[#e55f00]",
    status: "10 components ready",
  },
  {
    id: "vercel",
    name: "Vercel",
    descriptor: "Focused delivery systems",
    initials: "V",
    accentClass: "bg-black",
    surfaceClass: "bg-[#f2f2f2]",
    borderClass: "border-[#d4d4d4]",
    textClass: "text-black",
    status: "Preview scaffold",
  },
  {
    id: "figma",
    name: "Figma",
    descriptor: "Collaborative creative tools",
    initials: "F",
    accentClass: "bg-[#a259ff]",
    surfaceClass: "bg-[#f2eefe]",
    borderClass: "border-[#e6dcff]",
    textClass: "text-[#7c3aed]",
    status: "Preview scaffold",
  },
];

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
 * 브랜드 카드 그리드에서 회사를 선택하고, 선택한 brandId를 ComponentViewer에 전달하는 쇼케이스의 메인 화면입니다.
 * 별도의 전역 상태 없이 한 개의 useState로 카탈로그와 전시대 사이를 부드럽게 전환합니다.
 */
export function ShowcaseLayout() {
  const [selectedBrandId, setSelectedBrandId] = useState<ShowcaseBrandId | null>(null);

  if (selectedBrandId) {
    return (
      <div className="transition-opacity duration-300 ease-out motion-reduce:transition-none">
        <ComponentViewer brandId={selectedBrandId} onBack={() => setSelectedBrandId(null)} />
      </div>
    );
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
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">디자인 DNA를 직접 살펴보세요.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#696974] sm:text-lg">
                브랜드를 선택하면 Button부터 Accordion까지 10개의 전시대에서 시각적 결을 확인하고, 연결할 vault 코드 경로를 바로 복사할 수 있어요.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-6">
              <div className="rounded-xl bg-[#f7f7f8] px-4 py-3">
                <p className="text-2xl font-bold tracking-[-0.04em]">{SHOWCASE_BRANDS.length}</p>
                <p className="mt-1 text-xs font-medium text-[#777780]">브랜드 전시대</p>
              </div>
              <div className="rounded-xl bg-[#f7f7f8] px-4 py-3">
                <p className="text-2xl font-bold tracking-[-0.04em]">10</p>
                <p className="mt-1 text-xs font-medium text-[#777780]">핵심 컴포넌트</p>
              </div>
            </div>
          </div>
        </header>

        <section aria-labelledby="brand-catalog-title" className="mt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#6b6b75]">Brand catalog</p>
              <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em]" id="brand-catalog-title">어느 브랜드부터 볼까요?</h2>
            </div>
            <p className="text-sm text-[#777780]">카드를 누르면 전시대가 열립니다.</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SHOWCASE_BRANDS.map((brand) => (
              <button
                aria-label={`${brand.name} 컴포넌트 전시대 열기`}
                className={joinClasses(
                  "group flex min-h-[200px] flex-col rounded-xl border p-5 text-left outline-none transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#242429]/35 focus-visible:ring-offset-2",
                  brand.surfaceClass,
                  brand.borderClass,
                )}
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={joinClasses("inline-flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold text-white", brand.accentClass)}>{brand.initials}</span>
                  <span className={joinClasses("rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold", brand.textClass)}>{brand.status}</span>
                </div>
                <div className="mt-auto pt-8">
                  <p className="text-xl font-bold tracking-[-0.04em]">{brand.name}</p>
                  <p className="mt-2 text-sm leading-5 text-[#6b6b75]">{brand.descriptor}</p>
                  <span className={joinClasses("mt-5 inline-flex items-center gap-1.5 text-sm font-semibold", brand.textClass)}>
                    전시대 열기
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
