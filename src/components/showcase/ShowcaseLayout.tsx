import { useState } from "react";
import { BrandCatalog } from "./BrandCatalog";
import ComponentViewer from "./ComponentViewer";
import { SHOWCASE_BRANDS } from "./showcase.catalog";
import type { ShowcaseBrandId, ThemeBridge } from "./showcase.types";
import { GALLERY_RECIPES, type GalleryRecipe } from "./themebridge.gallery-data";
import { ThemeBridgePanel } from "./ThemeBridgePanel";

function LayersIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

/**
 * 실제 vault 카탈로그의 진입점입니다.
 * 이 파일은 선택 상태와 ThemeBridge orchestration만 관리하며, 데이터·갤러리·카탈로그 렌더링은 전용 모듈에 위임합니다.
 */
export function ShowcaseLayout() {
  const [selectedBrandId, setSelectedBrandId] = useState<ShowcaseBrandId | null>(null);
  const [mixEnabled, setMixEnabled] = useState(false);
  const [paletteBrandId, setPaletteBrandId] = useState<ShowcaseBrandId>("29cm");
  const [materialBrandId, setMaterialBrandId] = useState<ShowcaseBrandId>("toss");
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  const themeBridge: ThemeBridge | undefined = mixEnabled
    ? { enabled: true, paletteBrandId, materialBrandId }
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

        <ThemeBridgePanel
          activeRecipeId={activeRecipeId}
          materialBrandId={materialBrandId}
          mixEnabled={mixEnabled}
          onApplyRecipe={applyRecipe}
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
