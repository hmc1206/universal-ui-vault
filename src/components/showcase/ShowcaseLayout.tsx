import { useState } from "react";
import ComponentViewer, { SHOWCASE_BRANDS, type ShowcaseBrand, type ShowcaseBrandId, type ThemeBridge } from "./ComponentViewer";

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

function GalleryIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" width="7" x="3" y="3" />
      <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" width="7" x="14" y="3" />
      <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" width="7" x="3" y="14" />
      <path d="M14 17.5h7M17.5 14v7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

interface GalleryRecipe {
  id: string;
  paletteBrandId: ShowcaseBrandId;
  materialBrandId: ShowcaseBrandId;
  title: string;
  description: string;
}

const GALLERY_RECIPES: GalleryRecipe[] = [
  {
    id: "29cm-toss",
    paletteBrandId: "29cm",
    materialBrandId: "toss",
    title: "Editorial Soft Utility",
    description: "29CM의 절제된 흑백 편집감에 Toss의 넓고 탄성적인 표면 반응을 결합합니다.",
  },
  {
    id: "apple-ably",
    paletteBrandId: "apple",
    materialBrandId: "ably",
    title: "Calm Signal",
    description: "Apple의 중립적인 정밀도를 Ably의 선명한 볼륨과 빠른 협업 신호로 확장합니다.",
  },
  {
    id: "figma-karrot",
    paletteBrandId: "figma",
    materialBrandId: "karrot",
    title: "Maker Neighborhood",
    description: "Figma의 도구형 대비 위에 Karrot의 따뜻하고 가벼운 부상감을 얹습니다.",
  },
  {
    id: "kakao-tesla",
    paletteBrandId: "kakao",
    materialBrandId: "tesla",
    title: "Bright Product Drive",
    description: "Kakao의 일상적인 옐로우를 Tesla의 제품 중심 깊이와 안정적인 동작으로 조합합니다.",
  },
  {
    id: "upstage-samsung",
    paletteBrandId: "upstage",
    materialBrandId: "samsung",
    title: "AI Product Clarity",
    description: "Upstage의 violet conversion surface에 Samsung의 넓고 단정한 제품 물성을 적용합니다.",
  },
  {
    id: "musinsa-toss",
    paletteBrandId: "musinsa",
    materialBrandId: "toss",
    title: "Mono Elastic Commerce",
    description: "Musinsa의 강한 모노크롬 대비를 Toss의 부드러운 depth와 elastic feedback으로 완화합니다.",
  },
  {
    id: "baemin-apple",
    paletteBrandId: "baemin",
    materialBrandId: "apple",
    title: "Friendly Precision",
    description: "Baemin의 친근한 민트 표면을 Apple의 차분하고 정밀한 rise-and-settle 움직임에 연결합니다.",
  },
  {
    id: "goodchoice-likelion",
    paletteBrandId: "goodchoice",
    materialBrandId: "likelion",
    title: "Travel Builder Energy",
    description: "여기어때의 여행 탐색감에 Likelion의 maker 에너지와 실행형 공간감을 더합니다.",
  },
];

const MATERIAL_PREVIEW_CLASSES: Record<ShowcaseBrandId, string> = {
  "29cm": "rounded-none shadow-[0_10px_22px_rgba(17,17,17,0.14)]",
  ably: "rounded-[24px] shadow-[0_18px_36px_rgba(255,81,96,0.24)]",
  apple: "rounded-[18px] shadow-[0_16px_32px_rgba(29,29,31,0.14)]",
  baemin: "rounded-[20px] shadow-[0_9px_0_rgba(34,34,34,0.16)]",
  figma: "rounded-lg shadow-[0_16px_32px_rgba(0,0,0,0.24)]",
  kakao: "rounded-[18px] shadow-[0_12px_26px_rgba(92,72,0,0.18)]",
  kakaobank: "rounded-[20px] shadow-[0_16px_32px_rgba(65,56,0,0.16)]",
  karrot: "rounded-[22px] shadow-[0_16px_32px_rgba(255,111,15,0.20)]",
  likelion: "rounded-xl shadow-[0_14px_28px_rgba(255,96,0,0.18)]",
  musinsa: "rounded-none shadow-[0_10px_22px_rgba(0,0,0,0.16)]",
  samsung: "rounded-[24px] shadow-[0_18px_36px_rgba(0,122,255,0.18)]",
  tesla: "rounded-lg shadow-[0_16px_32px_rgba(23,26,32,0.16)]",
  toss: "rounded-[28px] shadow-[0_18px_36px_rgba(49,130,246,0.20)]",
  upstage: "rounded-lg shadow-[0_18px_36px_rgba(91,82,255,0.22)]",
  goodchoice: "rounded-[18px] shadow-[0_18px_36px_rgba(249,66,57,0.20)]",
};

const MATERIAL_LABELS: Record<ShowcaseBrandId, string> = {
  "29cm": "flat editorial edge",
  ably: "realtime volume",
  apple: "restrained lift",
  baemin: "playful press",
  figma: "tool precision",
  kakao: "soft bubble pop",
  kakaobank: "calm financial lift",
  karrot: "warm neighborhood rise",
  likelion: "maker energy",
  musinsa: "hard contrast snap",
  samsung: "wide product depth",
  tesla: "product-led settle",
  toss: "elastic soft depth",
  upstage: "AI conversion glow",
  goodchoice: "travel ticket lift",
};

interface MaterialMotionRecipe {
  ambientClass: string;
  chipClass: string;
  label: string;
  orbitClass: string;
}

const MATERIAL_MOTION_RECIPES: Record<ShowcaseBrandId, MaterialMotionRecipe> = {
  "29cm": {
    ambientClass: "animate-[pulse_3.2s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "editorial glide",
    orbitClass: "animate-[pulse_2.4s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  ably: {
    ambientClass: "animate-[pulse_1.15s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:scale-105 transition duration-200 ease-out motion-reduce:transition-none",
    label: "realtime pulse",
    orbitClass: "animate-[bounce_1.2s_infinite] motion-reduce:animate-none",
  },
  apple: {
    ambientClass: "animate-[pulse_3.6s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-0.5 transition-transform duration-500 ease-out motion-reduce:transition-none",
    label: "restrained settle",
    orbitClass: "animate-[pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  baemin: {
    ambientClass: "animate-[bounce_1.8s_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-y-1 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "playful press",
    orbitClass: "animate-[bounce_1.1s_infinite] motion-reduce:animate-none",
  },
  figma: {
    ambientClass: "animate-[spin_10s_linear_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "tool orbit",
    orbitClass: "animate-[spin_5s_linear_infinite] motion-reduce:animate-none",
  },
  kakao: {
    ambientClass: "animate-[pulse_1.8s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:rotate-2 transition duration-200 ease-out motion-reduce:transition-none",
    label: "bubble pop",
    orbitClass: "animate-[bounce_1.6s_infinite] motion-reduce:animate-none",
  },
  kakaobank: {
    ambientClass: "animate-[pulse_2.5s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "calm lift",
    orbitClass: "animate-[pulse_2.1s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  karrot: {
    ambientClass: "animate-[pulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:rotate-1 transition duration-200 ease-out motion-reduce:transition-none",
    label: "warm rise",
    orbitClass: "animate-[bounce_1.4s_infinite] motion-reduce:animate-none",
  },
  likelion: {
    ambientClass: "animate-[pulse_1.3s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "maker signal",
    orbitClass: "animate-[spin_6s_linear_infinite] motion-reduce:animate-none",
  },
  musinsa: {
    ambientClass: "animate-[pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:scale-105 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "contrast snap",
    orbitClass: "animate-[pulse_1.9s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  samsung: {
    ambientClass: "animate-[pulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "wide depth",
    orbitClass: "animate-[pulse_2.2s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  tesla: {
    ambientClass: "animate-[pulse_3s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "product settle",
    orbitClass: "animate-[pulse_2.5s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  toss: {
    ambientClass: "animate-[pulse_1.25s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:scale-105 transition duration-200 ease-out motion-reduce:transition-none",
    label: "elastic depth",
    orbitClass: "animate-[bounce_1.15s_infinite] motion-reduce:animate-none",
  },
  upstage: {
    ambientClass: "animate-[pulse_1.7s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-200 ease-out motion-reduce:transition-none",
    label: "conversion glow",
    orbitClass: "animate-[pulse_1.35s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  goodchoice: {
    ambientClass: "animate-[pulse_1.55s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:rotate-1 transition duration-200 ease-out motion-reduce:transition-none",
    label: "ticket lift",
    orbitClass: "animate-[bounce_1.45s_infinite] motion-reduce:animate-none",
  },
};

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

function GalleryRecipeCard({ recipe, paletteBrand, materialBrand, selected, onApply }: { recipe: GalleryRecipe; paletteBrand: ShowcaseBrand; materialBrand: ShowcaseBrand; selected: boolean; onApply: () => void }) {
  const [isMotionPlaying, setIsMotionPlaying] = useState(true);
  const motionRecipe = MATERIAL_MOTION_RECIPES[materialBrand.id];
  const motionClass = isMotionPlaying ? motionRecipe.ambientClass : "animate-none";
  const orbitClass = isMotionPlaying ? motionRecipe.orbitClass : "animate-none";

  return (
    <article
      className={joinClasses(
        "group overflow-hidden rounded-2xl border bg-white p-4 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#242429]/30 motion-reduce:transition-none",
        selected ? "border-[#315a9f] shadow-[0_18px_36px_rgba(49,90,159,0.18)]" : "border-[#dfe2e9] shadow-[0_10px_24px_rgba(29,29,34,0.06)]",
      )}
    >
      <div className={joinClasses("relative min-h-40 overflow-hidden border p-4", paletteBrand.surfaceClass, paletteBrand.borderClass, MATERIAL_PREVIEW_CLASSES[materialBrand.id])}>
        <div className={joinClasses("absolute -right-7 -top-8 h-24 w-24 rounded-full bg-white/75 blur-2xl", motionClass)} />
        <div className={joinClasses("absolute -bottom-10 left-4 h-20 w-20 rounded-full bg-white/60 blur-xl", orbitClass)} />
        <span aria-hidden="true" className={joinClasses("absolute right-6 top-10 h-3 w-3 rounded-full border-2 border-white/90 bg-white/80 shadow-sm", orbitClass)} />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-3">
            <span className={joinClasses("inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold", paletteBrand.avatarClass)}>{paletteBrand.initials}</span>
            <span className="rounded-full border border-white/80 bg-white/75 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#45454e] backdrop-blur">{MATERIAL_LABELS[materialBrand.id]}</span>
          </div>
          <div>
            <div className={joinClasses("h-2.5 w-16 rounded-full", paletteBrand.accentClass, motionRecipe.chipClass)} />
            <div className={joinClasses("mt-2 h-2 w-24 rounded-full bg-current/20", paletteBrand.textClass)} />
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className={joinClasses("inline-flex min-h-9 items-center rounded-lg px-3 text-xs font-bold", paletteBrand.avatarClass, motionRecipe.chipClass)}>Preview</span>
              <button
                aria-label={`${recipe.title} 모션 ${isMotionPlaying ? "일시 정지" : "재생"}`}
                aria-pressed={isMotionPlaying}
                className="inline-flex min-h-9 items-center rounded-lg border border-white/90 bg-white/75 px-2.5 text-[11px] font-bold text-[#3c3c45] outline-none backdrop-blur transition hover:bg-white focus-visible:ring-2 focus-visible:ring-[#242429]/35 focus-visible:ring-offset-2"
                onClick={() => setIsMotionPlaying((value) => !value)}
                type="button"
              >
                {isMotionPlaying ? "정지" : "재생"}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-3 flex items-center gap-1.5 rounded-full border border-white/85 bg-white/75 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#4c4c56] backdrop-blur">
          <span className={joinClasses("h-1.5 w-1.5 rounded-full", isMotionPlaying ? "bg-[#20a779] animate-pulse motion-reduce:animate-none" : "bg-[#91919a]")} />
          {isMotionPlaying ? `live · ${motionRecipe.label}` : "preview paused"}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#73737d]">{paletteBrand.name} style × {materialBrand.name} material</p>
        <h3 className="mt-1 text-lg font-bold tracking-[-0.035em] text-[#22222a]">{recipe.title}</h3>
        <p className="mt-2 min-h-12 text-sm leading-5 text-[#666671]">{recipe.description}</p>
        <button
          aria-pressed={selected}
          className={joinClasses(
            "mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border px-3 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#242429]/35",
            selected ? "border-[#315a9f] bg-[#315a9f] text-white" : "border-[#d5d8df] bg-[#fafafb] text-[#35353f] hover:border-[#777b86] hover:bg-white",
          )}
          onClick={onApply}
          type="button"
        >
          <SparkleIcon />
          {selected ? "현재 조합" : "이 조합 적용"}
        </button>
      </div>
    </article>
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
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  const paletteBrand = SHOWCASE_BRANDS.find((brand) => brand.id === paletteBrandId) ?? SHOWCASE_BRANDS[0];
  const materialBrand = SHOWCASE_BRANDS.find((brand) => brand.id === materialBrandId) ?? SHOWCASE_BRANDS[0];
  const themeBridge: ThemeBridge | undefined = mixEnabled
    ? {
        enabled: true,
        paletteBrandId,
        materialBrandId,
      }
    : undefined;

  function applyRecipe(recipe: GalleryRecipe) {
    setPaletteBrandId(recipe.paletteBrandId);
    setMaterialBrandId(recipe.materialBrandId);
    setActiveRecipeId(recipe.id);
    setMixEnabled(true);
  }

  function updatePaletteBrand(value: ShowcaseBrandId) {
    setPaletteBrandId(value);
    setActiveRecipeId(null);
  }

  function updateMaterialBrand(value: ShowcaseBrandId) {
    setMaterialBrandId(value);
    setActiveRecipeId(null);
  }

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
                <p className="text-2xl font-bold tracking-[-0.04em]">{GALLERY_RECIPES.length}</p>
                <p className="mt-1 text-xs font-medium text-[#777780]">검증된 조합 recipe</p>
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
            <BrandSelect id="palette-brand" label="스타일 출처 · 팔레트와 타이포그래피" onChange={updatePaletteBrand} value={paletteBrandId} />
            <BrandSelect id="material-brand" label="물성 출처 · 깊이와 인터랙션" onChange={updateMaterialBrand} value={materialBrandId} />
            <div className="rounded-xl border border-white/85 bg-white/70 px-4 py-3 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#707887]">Current recipe</p>
              <p className="mt-1 text-sm font-bold text-[#272b35]">{paletteBrand.name} style × {materialBrand.name} material</p>
              <p className="mt-1 text-xs leading-5 text-[#697080]">{mixEnabled ? "전시 컨테이너에 조합이 적용됩니다." : "켜면 선택한 조합으로 미리보기합니다."}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="mix-gallery-title" className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f6472]">
                <GalleryIcon />
                ThemeBridge gallery
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em]" id="mix-gallery-title">조합을 먼저 보고, 한 번에 적용하세요.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6c6f7b]">카드의 왼쪽 visual은 스타일 출처의 색·텍스트 성격을, 표면의 곡률·그림자·떠오름은 물성 출처를 시각화합니다. 적용 버튼은 위 ThemeBridge recipe를 즉시 바꿉니다.</p>
            </div>
            <p className="text-sm font-semibold text-[#5f6472]">{activeRecipeId ? "선택한 recipe가 ThemeBridge에 적용되어 있습니다." : "8개의 추천 recipe를 비교할 수 있습니다."}</p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {GALLERY_RECIPES.map((recipe) => {
              const recipePaletteBrand = SHOWCASE_BRANDS.find((brand) => brand.id === recipe.paletteBrandId) ?? SHOWCASE_BRANDS[0];
              const recipeMaterialBrand = SHOWCASE_BRANDS.find((brand) => brand.id === recipe.materialBrandId) ?? SHOWCASE_BRANDS[0];

              return (
                <GalleryRecipeCard
                  key={recipe.id}
                  materialBrand={recipeMaterialBrand}
                  onApply={() => applyRecipe(recipe)}
                  paletteBrand={recipePaletteBrand}
                  recipe={recipe}
                  selected={activeRecipeId === recipe.id}
                />
              );
            })}
          </div>
        </section>

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
