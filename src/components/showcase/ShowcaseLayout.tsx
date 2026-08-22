import { useState } from "react";
import { createCustomBrand, DEFAULT_CUSTOM_BRAND, loadCustomBrandLibrary, resetCustomBrand, saveCustomBrandLibrary } from "./custom-brand";
import { BrandCatalog } from "./BrandCatalog";
import ComponentViewer from "./ComponentViewer";
import { SHOWCASE_BRANDS } from "./showcase.catalog";
import type { CustomBrandDNA, CustomBrandId, CustomBrandLibrary, ShowcaseBrandId, ThemeBridge, ThemeSourceId } from "./showcase.types";
import { GALLERY_RECIPES, type GalleryRecipe } from "./themebridge.gallery-data";
import { ThemeBridgePanel } from "./ThemeBridgePanel";

function LayersIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

/**
 * 실제 vault 카탈로그의 진입점입니다.
 * 이 파일은 multi-DNA library, ThemeBridge orchestration, 카탈로그 선택 상태만 관리합니다.
 */
export function ShowcaseLayout() {
  const [selectedBrandId, setSelectedBrandId] = useState<ShowcaseBrandId | null>(null);
  const [mixEnabled, setMixEnabled] = useState(false);
  const [paletteBrandId, setPaletteBrandId] = useState<ThemeSourceId>("29cm");
  const [materialBrandId, setMaterialBrandId] = useState<ThemeSourceId>("toss");
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);
  const [customBrandLibrary, setCustomBrandLibrary] = useState<CustomBrandLibrary>(() => loadCustomBrandLibrary());
  const [customBrandSaved, setCustomBrandSaved] = useState(false);

  const customBrand = customBrandLibrary.brands.find((brand) => brand.id === customBrandLibrary.activeBrandId) ?? customBrandLibrary.brands[0] ?? DEFAULT_CUSTOM_BRAND;
  const themeBridge: ThemeBridge | undefined = mixEnabled
    ? { customBrand, customBrands: customBrandLibrary.brands, enabled: true, paletteBrandId, materialBrandId }
    : undefined;

  function applyRecipe(recipe: GalleryRecipe) {
    setPaletteBrandId(recipe.paletteBrandId);
    setMaterialBrandId(recipe.materialBrandId);
    setActiveRecipeId(recipe.id);
    setMixEnabled(true);
  }

  function updatePaletteBrand(value: ThemeSourceId) {
    setPaletteBrandId(value);
    setActiveRecipeId(null);
  }

  function updateMaterialBrand(value: ThemeSourceId) {
    setMaterialBrandId(value);
    setActiveRecipeId(null);
  }

  function updateCustomBrand(nextBrand: CustomBrandDNA) {
    setCustomBrandLibrary((library) => ({
      ...library,
      activeBrandId: nextBrand.id,
      brands: library.brands.map((brand) => brand.id === nextBrand.id ? nextBrand : brand),
    }));
    setCustomBrandSaved(false);
  }

  function selectCustomBrand(brandId: CustomBrandId) {
    setCustomBrandLibrary((library) => ({ ...library, activeBrandId: brandId }));
    setCustomBrandSaved(false);
  }

  function createCustomBrandEntry() {
    setCustomBrandLibrary((library) => {
      const source = library.brands.find((brand) => brand.id === library.activeBrandId) ?? DEFAULT_CUSTOM_BRAND;
      const nextBrand = createCustomBrand(library.brands, source);
      return { ...library, activeBrandId: nextBrand.id, brands: [...library.brands, nextBrand] };
    });
    setCustomBrandSaved(false);
  }

  function duplicateCustomBrandEntry(brandId: CustomBrandId) {
    setCustomBrandLibrary((library) => {
      const source = library.brands.find((brand) => brand.id === brandId) ?? customBrand;
      const nextBrand = createCustomBrand(library.brands, source);
      return { ...library, activeBrandId: nextBrand.id, brands: [...library.brands, nextBrand] };
    });
    setCustomBrandSaved(false);
  }

  function deleteCustomBrandEntry(brandId: CustomBrandId) {
    setCustomBrandLibrary((library) => {
      if (library.brands.length === 1) return library;
      const brands = library.brands.filter((brand) => brand.id !== brandId);
      const activeBrandId = library.activeBrandId === brandId ? brands[0].id : library.activeBrandId;
      if (paletteBrandId === brandId) setPaletteBrandId(activeBrandId);
      if (materialBrandId === brandId) setMaterialBrandId(activeBrandId);
      return { ...library, activeBrandId, brands };
    });
    setActiveRecipeId(null);
    setCustomBrandSaved(false);
  }

  function persistCustomBrandLibrary() {
    saveCustomBrandLibrary(customBrandLibrary);
    setCustomBrandSaved(true);
  }

  function restoreCustomBrandLibrary() {
    resetCustomBrand();
    setCustomBrandLibrary({ activeBrandId: DEFAULT_CUSTOM_BRAND.id, brands: [DEFAULT_CUSTOM_BRAND], version: 1 });
    if (paletteBrandId.startsWith("custom:")) setPaletteBrandId("29cm");
    if (materialBrandId.startsWith("custom:")) setMaterialBrandId("toss");
    setActiveRecipeId(null);
    setCustomBrandSaved(false);
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
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e8] bg-[#fafafb] px-3 py-1.5 text-xs font-semibold text-[#5d5d67]"><span className="text-[#242429]"><LayersIcon /></span>Universal UI Vault · Intelligent Workstation</div>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">브랜드의 결을 조합하고, 누구에게나 읽히게 만드세요.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#696974] sm:text-lg">15개 실제 vault 세트를 브랜드 고유의 정체성으로 비교합니다. Brand Mix &amp; Match는 한 브랜드의 팔레트와 다른 브랜드의 물성을 안전한 미리보기 레이어에서 교차 적용합니다.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-6">
              <div className="rounded-xl bg-[#f7f7f8] px-4 py-3"><p className="text-2xl font-bold tracking-[-0.04em]">{SHOWCASE_BRANDS.length}</p><p className="mt-1 text-xs font-medium text-[#777780]">실물 브랜드 전시대</p></div>
              <div className="rounded-xl bg-[#f7f7f8] px-4 py-3"><p className="text-2xl font-bold tracking-[-0.04em]">{GALLERY_RECIPES.length}</p><p className="mt-1 text-xs font-medium text-[#777780]">검증된 조합 recipe</p></div>
            </div>
          </div>
        </header>

        <ThemeBridgePanel
          activeRecipeId={activeRecipeId}
          activeCustomBrandId={customBrandLibrary.activeBrandId}
          customBrands={customBrandLibrary.brands}
          customBrandSaved={customBrandSaved}
          materialBrandId={materialBrandId}
          mixEnabled={mixEnabled}
          onApplyRecipe={applyRecipe}
          onCreateCustomBrand={createCustomBrandEntry}
          onCustomBrandChange={updateCustomBrand}
          onCustomBrandDelete={deleteCustomBrandEntry}
          onCustomBrandDuplicate={duplicateCustomBrandEntry}
          onCustomBrandReset={restoreCustomBrandLibrary}
          onCustomBrandSave={persistCustomBrandLibrary}
          onCustomBrandSelect={selectCustomBrand}
          onMaterialBrandChange={updateMaterialBrand}
          onPaletteBrandChange={updatePaletteBrand}
          onToggleMix={() => setMixEnabled((value) => !value)}
          paletteBrandId={paletteBrandId}
        />
        <BrandCatalog onSelectBrand={setSelectedBrandId} />
      </div>
    </main>
  );
}

export default ShowcaseLayout;
