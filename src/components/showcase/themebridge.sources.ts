import { DEFAULT_CUSTOM_BRAND, getCustomPaletteOption } from "./custom-brand";
import { SHOWCASE_BRANDS } from "./showcase.catalog";
import type { CustomBrandDNA, ThemeSourceId } from "./showcase.types";

export interface ThemeBridgeSource {
  accentClass: string;
  avatarClass: string;
  borderClass: string;
  descriptor: string;
  directory: string;
  exportPrefix: string;
  id: ThemeSourceId;
  initials: string;
  isCustom: boolean;
  name: string;
  status: string;
  surfaceClass: string;
  textClass: string;
}

export function isCustomThemeSourceId(id: ThemeSourceId) {
  return id.startsWith("custom:");
}

export function getCustomThemeSource(customBrand: CustomBrandDNA): ThemeBridgeSource {
  const palette = getCustomPaletteOption(customBrand);
  const initials = customBrand.name.trim().slice(0, 2).toUpperCase() || "C";

  return {
    accentClass: palette.accentClass,
    avatarClass: palette.accentClass,
    borderClass: palette.frameClass,
    descriptor: customBrand.descriptor,
    directory: `session/${customBrand.id.replace("custom:", "")}`,
    exportPrefix: "Custom",
    id: customBrand.id,
    initials,
    isCustom: true,
    name: customBrand.name || "My Brand",
    status: "custom browser source",
    surfaceClass: palette.surfaceClass,
    textClass: "text-current",
  };
}

export function getCustomBrandBySourceId(id: ThemeSourceId, customBrands: CustomBrandDNA[]) {
  return customBrands.find((brand) => brand.id === id) ?? customBrands[0] ?? DEFAULT_CUSTOM_BRAND;
}

export function getThemeSource(id: ThemeSourceId, customBrands: CustomBrandDNA[]): ThemeBridgeSource {
  if (isCustomThemeSourceId(id)) {
    return getCustomThemeSource(getCustomBrandBySourceId(id, customBrands));
  }

  const brand = SHOWCASE_BRANDS.find((candidate) => candidate.id === id) ?? SHOWCASE_BRANDS[0];
  return { ...brand, isCustom: false };
}

export function getThemeSourceOptions(customBrands: CustomBrandDNA[]) {
  return [...SHOWCASE_BRANDS.map((brand) => ({ ...brand, isCustom: false })), ...customBrands.map(getCustomThemeSource)];
}
