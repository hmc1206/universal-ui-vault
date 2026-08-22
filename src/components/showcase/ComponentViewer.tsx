import { useState } from "react";
import { getCustomPaletteOption, DEFAULT_CUSTOM_BRAND } from "./custom-brand";
import { BRAND_TOKEN_VALUES, getComponentImportSnippet, getTailwindConfigSnippet, SHOWCASE_BRANDS, SHOWCASE_COMPONENTS, THEME_BRIDGE_TYPOGRAPHY_CLASSES } from "./showcase.catalog";
import { ComponentComparison } from "./showcase.preview";
import { getThemeBridgeSkin } from "./themebridge.skin";
import { getThemeSource } from "./themebridge.sources";
import type { ComponentId, ComponentViewerProps } from "./showcase.types";
import { copyToClipboard, joinClasses } from "./showcase.utils";
import { VAULT_COMPONENTS } from "./vault.registry";

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function ComponentViewer({ brandId, onBack, themeBridge }: ComponentViewerProps) {
  const [copiedComponentId, setCopiedComponentId] = useState<ComponentId | null>(null);
  const [tokenCopied, setTokenCopied] = useState(false);
  const [seniorMode, setSeniorMode] = useState(false);
  const [splitView, setSplitView] = useState(false);
  const matchedBrand = SHOWCASE_BRANDS.find((item) => item.id === brandId);
  const components = VAULT_COMPONENTS[brandId];

  if (!matchedBrand) {
    return null;
  }

  const brand = matchedBrand;
  const isThemeBridgeEnabled = Boolean(themeBridge?.enabled);
  const paletteBrandId = isThemeBridgeEnabled ? themeBridge!.paletteBrandId : brand.id;
  const materialBrandId = isThemeBridgeEnabled ? themeBridge!.materialBrandId : brand.id;
  const customBrand = themeBridge?.customBrand ?? DEFAULT_CUSTOM_BRAND;
  const customPalette = getCustomPaletteOption(customBrand);
  const themeSkin = isThemeBridgeEnabled ? getThemeBridgeSkin(themeBridge!) : undefined;
  const paletteTokens = paletteBrandId === "custom"
    ? { paletteBorderClass: customPalette.frameClass, paletteButtonClass: customPalette.accentClass, paletteInkClass: "text-current", paletteSurfaceClass: customPalette.surfaceClass }
    : BRAND_TOKEN_VALUES[paletteBrandId];
  const materialTokens = materialBrandId === "custom"
    ? { materialClass: themeSkin?.frameClass ?? "rounded-[20px] shadow-[0_14px_28px_rgba(124,58,237,0.28)]" }
    : BRAND_TOKEN_VALUES[materialBrandId];
  const paletteBrand = isThemeBridgeEnabled ? getThemeSource(paletteBrandId, customBrand) : brand;
  const materialBrand = isThemeBridgeEnabled ? getThemeSource(materialBrandId, customBrand) : brand;
  const bridgeTypographyClass = paletteBrandId === "custom" ? customBrand.sansFont : THEME_BRIDGE_TYPOGRAPHY_CLASSES[paletteBrandId];

  async function handleCopy(componentId: ComponentId) {
    try {
      await copyToClipboard(getComponentImportSnippet(brand, componentId));
      setCopiedComponentId(componentId);
      window.setTimeout(() => setCopiedComponentId(null), 1800);
    } catch {
      setCopiedComponentId(null);
    }
  }

  async function handleCopyTokens() {
    try {
      await copyToClipboard(getTailwindConfigSnippet(brand));
      setTokenCopied(true);
      window.setTimeout(() => setTokenCopied(false), 1800);
    } catch {
      setTokenCopied(false);
    }
  }

  return (
    <section className={joinClasses("min-h-screen px-4 py-6 sm:px-6 lg:px-10", paletteTokens.paletteSurfaceClass, paletteTokens.paletteInkClass, bridgeTypographyClass)}>
      <div className="mx-auto max-w-7xl">
        <header className={joinClasses("rounded-2xl border bg-white/80 p-5 backdrop-blur-xl shadow-[0_18px_48px_rgba(29,29,34,0.10)] sm:p-7", paletteTokens.paletteBorderClass)}>
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex items-start gap-4">
              {onBack ? (
                <button
                  aria-label="브랜드 목록으로 돌아가기"
                  className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#dedee3] bg-white text-[#55555e] transition hover:bg-[#f0f0f2] focus-visible:ring-2 focus-visible:ring-[#55555e]/30"
                  onClick={onBack}
                  type="button"
                >
                  <ArrowLeftIcon />
                </button>
              ) : null}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={joinClasses("inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold", brand.avatarClass)}>{brand.initials}</span>
                  <p className="text-sm font-semibold text-[#6b6b75]">{brand.name} intelligent component catalog</p>
                </div>
                <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">10개의 실제 구성요소</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5e616a]">{brand.descriptor}의 실제 vault 구현을 렌더링합니다. ThemeBridge는 전시용 skin layer로 실제 preview 자식의 팔레트·shape·shadow·motion을 강하게 덮어쓰되, vault 소스 파일은 바꾸지 않습니다.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {isThemeBridgeEnabled ? (
                <button
                  aria-pressed={splitView}
                  className={joinClasses("inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#242429]/30", splitView ? "border-[#5b52ff] bg-[#5b52ff] text-white" : "border-[#cfd2d9] bg-white text-[#30323a]")}
                  onClick={() => {
                    setSplitView((value) => !value);
                    setSeniorMode(false);
                  }}
                  type="button"
                >
                  {splitView ? "Split View 켜짐" : "원본 · 혼합 Split View"}
                </button>
              ) : null}
              <button
                aria-pressed={seniorMode}
                className={joinClasses("inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#242429]/30", seniorMode ? "border-black bg-black text-white" : "border-[#cfd2d9] bg-white text-[#30323a]")}
                onClick={() => {
                  setSeniorMode((value) => !value);
                  setSplitView(false);
                }}
                type="button"
              >
                {seniorMode ? "Accessibility Simulation 켜짐" : "Accessibility Simulation"}
              </button>
              <button
                className={joinClasses("inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#242429]/30", paletteTokens.paletteButtonClass)}
                onClick={handleCopyTokens}
                type="button"
              >
                {tokenCopied ? "Tailwind Config 복사됨" : "Copy Tailwind Config"}
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className={joinClasses("rounded-xl border px-4 py-3 text-sm", isThemeBridgeEnabled ? "border-white/75 bg-white/70" : "border-[#e8e8ec] bg-[#fafafb]")}>
              <p className="font-bold">{isThemeBridgeEnabled ? "ThemeBridge 활성" : "브랜드 고유 테마"}</p>
              <p className="mt-1 text-xs leading-5 text-[#60646d]">
                {isThemeBridgeEnabled ? `${paletteBrand.name} 팔레트가 button·input·select·tab의 색상을, ${materialBrand.name} 물성이 shape·shadow·hover response를 실제 preview 자식 요소에 강제 적용합니다.` : `${brand.name} vault의 원래 토큰과 2026 접근성 확장 레이어를 사용합니다.`}
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e8f7f0] px-3 py-1.5 text-xs font-semibold text-[#197a50]">
              <CheckIcon />
              {brand.status}
            </span>
          </div>
        </header>

        {seniorMode ? (
          <aside aria-live="polite" className="mt-5 rounded-2xl border-2 border-yellow-300 bg-black px-5 py-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <p className="text-base font-bold text-yellow-300">시니어 모드 비교가 활성화되었습니다.</p>
            <p className="mt-1 text-sm leading-6">각 카드에서 원본 vault와 시니어 모드를 비교합니다. 시니어 모드는 텍스트를 150%로 확대하고, button/input/select hit area를 최소 48px로 키우며, yellow-on-black 고대비 경계를 표시합니다.</p>
          </aside>
        ) : null}

        {isThemeBridgeEnabled && splitView ? (
          <aside aria-live="polite" className="mt-5 rounded-2xl border-2 border-[#5b52ff] bg-[#f4f3ff] px-5 py-4 text-[#19182d] shadow-[0_18px_40px_rgba(91,82,255,0.16)]">
            <p className="text-base font-bold text-[#4a43d6]">원본 · 혼합 Split View가 활성화되었습니다.</p>
            <p className="mt-1 text-sm leading-6">각 카드의 왼쪽은 {brand.name} 원본 vault, 오른쪽은 {paletteBrand.name}의 palette와 {materialBrand.name}의 material을 강제 적용한 결과입니다. button·input·select·tab의 accent와 radius·shadow·hover response 차이를 바로 비교할 수 있습니다.</p>
          </aside>
        ) : null}

        <div className={joinClasses("mt-6 grid gap-4", seniorMode || splitView ? "xl:grid-cols-1" : "md:grid-cols-2 xl:grid-cols-3")}>
          {SHOWCASE_COMPONENTS.map((component) => (
            <article className={joinClasses("flex min-h-[310px] flex-col overflow-hidden rounded-2xl border bg-white/82 backdrop-blur-xl transition-[transform,box-shadow] duration-200", paletteTokens.paletteBorderClass, materialTokens.materialClass)} key={component.id}>
              <div className="flex items-start justify-between gap-4 border-b border-[#eeeeF1] px-5 py-4">
                <div>
                  <p className={joinClasses("text-xs font-bold", paletteTokens.paletteInkClass)}>{component.number}</p>
                  <h2 className="mt-1 text-lg font-bold tracking-[-0.03em]">{component.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#62656d]">{component.description}</p>
                </div>
                <button
                  className="shrink-0 rounded-lg border border-[#dedee3] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#454750] transition hover:bg-[#f3f3f5] focus-visible:ring-2 focus-visible:ring-[#55555e]/30"
                  onClick={() => handleCopy(component.id)}
                  type="button"
                >
                  {copiedComponentId === component.id ? "복사됨" : "코드 복사"}
                </button>
              </div>
              <div className={joinClasses("flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-5", paletteTokens.paletteSurfaceClass)}>
                <ComponentComparison
                  brand={brand}
                  component={component}
                  components={components}
                  seniorMode={seniorMode}
                  splitView={isThemeBridgeEnabled && splitView}
                  themeBridge={isThemeBridgeEnabled ? themeBridge : undefined}
                />
              </div>
              <div className="border-t border-[#eeeeF1] px-5 py-3">
                <code className="text-[11px] text-[#62656d]">vault/{brand.directory}/{component.id}.tsx</code>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComponentViewer;
