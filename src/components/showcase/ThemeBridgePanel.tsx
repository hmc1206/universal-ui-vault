import { useState } from "react";
import { BrandGenerationWorkbench } from "./BrandGenerationWorkbench";
import { CustomBrandBuilder } from "./CustomBrandBuilder";
import { SHOWCASE_BRANDS } from "./showcase.catalog";
import { GALLERY_RECIPES, MATERIAL_LABELS, MATERIAL_MOTION_RECIPES, MATERIAL_PREVIEW_CLASSES, type GalleryRecipe } from "./themebridge.gallery-data";
import { getThemeSource, getThemeSourceOptions, type ThemeBridgeSource } from "./themebridge.sources";
import type { CustomBrandDNA, ShowcaseBrand, ThemeSourceId } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

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

function BrandSelect({ id, label, onChange, sources, value }: { id: string; label: string; onChange: (value: ThemeSourceId) => void; sources: ThemeBridgeSource[]; value: ThemeSourceId }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor={id}>
      {label}
      <select
        className="min-h-11 rounded-xl border border-[#d9d9df] bg-white px-3 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#242429] focus-visible:ring-2 focus-visible:ring-[#242429]/25"
        id={id}
        onChange={(event) => onChange(event.target.value as ThemeSourceId)}
        value={value}
      >
        {sources.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.isCustom ? `${brand.name} · custom` : brand.name}
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

export interface ThemeBridgePanelProps {
  activeRecipeId: string | null;
  materialBrandId: ThemeSourceId;
  mixEnabled: boolean;
  onApplyRecipe: (recipe: GalleryRecipe) => void;
  customBrand: CustomBrandDNA;
  customBrandSaved: boolean;
  onCustomBrandChange: (brand: CustomBrandDNA) => void;
  onCustomBrandReset: () => void;
  onCustomBrandSave: () => void;
  onMaterialBrandChange: (brandId: ThemeSourceId) => void;
  onPaletteBrandChange: (brandId: ThemeSourceId) => void;
  onToggleMix: () => void;
  paletteBrandId: ThemeSourceId;
}

export function ThemeBridgePanel({
  activeRecipeId,
  customBrand,
  customBrandSaved,
  materialBrandId,
  mixEnabled,
  onApplyRecipe,
  onCustomBrandChange,
  onCustomBrandReset,
  onCustomBrandSave,
  onMaterialBrandChange,
  onPaletteBrandChange,
  onToggleMix,
  paletteBrandId,
}: ThemeBridgePanelProps) {
  const sources = getThemeSourceOptions(customBrand);
  const paletteBrand = getThemeSource(paletteBrandId, customBrand);
  const materialBrand = getThemeSource(materialBrandId, customBrand);

  return (
    <>
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
            onClick={onToggleMix}
            type="button"
          >
            <span className={joinClasses("h-2.5 w-2.5 rounded-full", mixEnabled ? "bg-[#aee4ff]" : "bg-[#c7ccd6]")} />
            {mixEnabled ? "혼합 테마 적용 중" : "혼합 테마 켜기"}
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.1fr]">
          <BrandSelect id="palette-brand" label="스타일 출처 · 팔레트와 타이포그래피" onChange={onPaletteBrandChange} sources={sources} value={paletteBrandId} />
          <BrandSelect id="material-brand" label="물성 출처 · 깊이와 인터랙션" onChange={onMaterialBrandChange} sources={sources} value={materialBrandId} />
          <div className="rounded-xl border border-white/85 bg-white/70 px-4 py-3 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#707887]">Current recipe</p>
            <p className="mt-1 text-sm font-bold text-[#272b35]">{paletteBrand.name} style × {materialBrand.name} material</p>
            <p className="mt-1 text-xs leading-5 text-[#697080]">{mixEnabled ? "전시 컨테이너에 조합이 적용됩니다." : "켜면 선택한 조합으로 미리보기합니다."}</p>
          </div>
        </div>
      </section>

      <CustomBrandBuilder brand={customBrand} onChange={onCustomBrandChange} onReset={onCustomBrandReset} onSave={onCustomBrandSave} saved={customBrandSaved} />
      <BrandGenerationWorkbench
        brand={customBrand}
        onActivateThemeBridge={() => {
          onPaletteBrandChange("custom");
          onMaterialBrandChange("custom");
          if (!mixEnabled) onToggleMix();
        }}
      />

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
                onApply={() => onApplyRecipe(recipe)}
                paletteBrand={recipePaletteBrand}
                recipe={recipe}
                selected={activeRecipeId === recipe.id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
