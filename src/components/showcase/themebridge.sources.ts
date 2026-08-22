import { getCustomPaletteOption } from "./custom-brand";
import { SHOWCASE_BRANDS } from "./showcase.catalog";
import type { CustomBrandDNA, ShowcaseBrand, ThemeSourceId } from "./showcase.types";

export interface ThemeBridgeSource extends Omit<ShowcaseBrand, "id"> {
  id: ThemeSourceId;
  isCustom: boolean;
}

export function getCustomThemeSource(customBrand: CustomBrandDNA): ThemeBridgeSource {
  const palette = getCustomPaletteOption(customBrand);
  const initials = customBrand.name.trim().slice(0, 2).toUpperCase() || "C";

  return {
    accentClass: palette.accentClass,
    avatarClass: palette.accentClass,
    borderClass: palette.frameClass,
    descriptor: customBrand.descriptor,
    directory: "session/custom-brand",
    exportPrefix: "Custom",
    id: "custom",
    initials,
    isCustom: true,
    name: customBrand.name || "My Brand",
    status: "custom session source",
    surfaceClass: palette.surfaceClass,
    textClass: "text-current",
  };
}

export function getThemeSource(id: ThemeSourceId, customBrand: CustomBrandDNA): ThemeBridgeSource {
  if (id === "custom") {
    return getCustomThemeSource(customBrand);
  }

  const brand = SHOWCASE_BRANDS.find((candidate) => candidate.id === id) ?? SHOWCASE_BRANDS[0];
  return { ...brand, isCustom: false };
}

export function getThemeSourceOptions(customBrand: CustomBrandDNA) {
  return [...SHOWCASE_BRANDS.map((brand) => ({ ...brand, isCustom: false })), getCustomThemeSource(customBrand)];
}
