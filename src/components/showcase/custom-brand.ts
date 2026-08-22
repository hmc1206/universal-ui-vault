import type { CustomBrandDNA } from "./showcase.types";

export const CUSTOM_BRAND_STORAGE_KEY = "universal-ui-vault.custom-brand.v1";

export const DEFAULT_CUSTOM_BRAND: CustomBrandDNA = {
  accent: "#7C3AED",
  descriptor: "A custom ThemeBridge design DNA",
  displayFont: "ui-sans-serif",
  id: "custom",
  ink: "#17111F",
  material: "soft",
  name: "My Brand",
  radius: "20px",
  sansFont: "ui-sans-serif",
  shadow: "ambient",
  surface: "#F6F1FF",
};

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const CSS_SIZE_PATTERN = /^(0|[1-9][0-9]?)(px|rem)$/;
const FONT_CLASS_VALUES = ["font-sans", "font-serif", "font-mono"] as const;

export function isHexColor(value: string) {
  return HEX_COLOR_PATTERN.test(value);
}

export function isCssSize(value: string) {
  return CSS_SIZE_PATTERN.test(value);
}

export function sanitizeCustomBrand(input: Partial<CustomBrandDNA>): CustomBrandDNA {
  const name = input.name?.trim().slice(0, 32) || DEFAULT_CUSTOM_BRAND.name;
  const descriptor = input.descriptor?.trim().slice(0, 96) || DEFAULT_CUSTOM_BRAND.descriptor;

  return {
    accent: isHexColor(input.accent ?? "") ? input.accent! : DEFAULT_CUSTOM_BRAND.accent,
    descriptor,
    displayFont: FONT_CLASS_VALUES.includes(input.displayFont as (typeof FONT_CLASS_VALUES)[number]) ? input.displayFont! : DEFAULT_CUSTOM_BRAND.displayFont,
    id: "custom",
    ink: isHexColor(input.ink ?? "") ? input.ink! : DEFAULT_CUSTOM_BRAND.ink,
    material: input.material === "crisp" || input.material === "elastic" || input.material === "soft" ? input.material : DEFAULT_CUSTOM_BRAND.material,
    name,
    radius: isCssSize(input.radius ?? "") ? input.radius! : DEFAULT_CUSTOM_BRAND.radius,
    sansFont: FONT_CLASS_VALUES.includes(input.sansFont as (typeof FONT_CLASS_VALUES)[number]) ? input.sansFont! : DEFAULT_CUSTOM_BRAND.sansFont,
    shadow: input.shadow === "ambient" || input.shadow === "sharp" || input.shadow === "soft" ? input.shadow : DEFAULT_CUSTOM_BRAND.shadow,
    surface: isHexColor(input.surface ?? "") ? input.surface! : DEFAULT_CUSTOM_BRAND.surface,
  };
}

export function loadCustomBrand(): CustomBrandDNA {
  if (typeof window === "undefined") {
    return DEFAULT_CUSTOM_BRAND;
  }

  try {
    const serialized = window.localStorage.getItem(CUSTOM_BRAND_STORAGE_KEY);
    return serialized ? sanitizeCustomBrand(JSON.parse(serialized) as Partial<CustomBrandDNA>) : DEFAULT_CUSTOM_BRAND;
  } catch {
    return DEFAULT_CUSTOM_BRAND;
  }
}

export function saveCustomBrand(brand: CustomBrandDNA) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CUSTOM_BRAND_STORAGE_KEY, JSON.stringify(sanitizeCustomBrand(brand)));
  }
}

export function resetCustomBrand() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CUSTOM_BRAND_STORAGE_KEY);
  }
}

export interface CustomPaletteOption {
  accent: string;
  accentClass: string;
  controlClass: string;
  frameClass: string;
  ink: string;
  label: string;
  radiusClass: string;
  shadowClass: string;
  surface: string;
  surfaceClass: string;
}

export const CUSTOM_PALETTE_OPTIONS: CustomPaletteOption[] = [
  { accent: "#7C3AED", accentClass: "bg-[#7C3AED] text-white", controlClass: "[&_button]:!border-[#7C3AED] [&_button]:!bg-[#7C3AED] [&_button]:!text-white [&_input]:!border-[#7C3AED] [&_input]:focus:!ring-[#7C3AED]/40 [&_select]:!border-[#7C3AED] [&_select]:focus:!ring-[#7C3AED]/40 [&_[role=tab][aria-selected=true]]:!bg-[#7C3AED] [&_[role=tab][aria-selected=true]]:!text-white", frameClass: "border-[#7C3AED]", ink: "#17111F", label: "Violet signal", radiusClass: "rounded-[20px]", shadowClass: "shadow-[0_14px_28px_rgba(124,58,237,0.28)]", surface: "#F6F1FF", surfaceClass: "bg-[#F6F1FF] text-[#17111F]" },
  { accent: "#0F766E", accentClass: "bg-[#0F766E] text-white", controlClass: "[&_button]:!border-[#0F766E] [&_button]:!bg-[#0F766E] [&_button]:!text-white [&_input]:!border-[#0F766E] [&_input]:focus:!ring-[#0F766E]/40 [&_select]:!border-[#0F766E] [&_select]:focus:!ring-[#0F766E]/40 [&_[role=tab][aria-selected=true]]:!bg-[#0F766E] [&_[role=tab][aria-selected=true]]:!text-white", frameClass: "border-[#0F766E]", ink: "#0B2926", label: "Deep teal", radiusClass: "rounded-[20px]", shadowClass: "shadow-[0_14px_28px_rgba(15,118,110,0.26)]", surface: "#ECFDF5", surfaceClass: "bg-[#ECFDF5] text-[#0B2926]" },
  { accent: "#DB2777", accentClass: "bg-[#DB2777] text-white", controlClass: "[&_button]:!border-[#DB2777] [&_button]:!bg-[#DB2777] [&_button]:!text-white [&_input]:!border-[#DB2777] [&_input]:focus:!ring-[#DB2777]/40 [&_select]:!border-[#DB2777] [&_select]:focus:!ring-[#DB2777]/40 [&_[role=tab][aria-selected=true]]:!bg-[#DB2777] [&_[role=tab][aria-selected=true]]:!text-white", frameClass: "border-[#DB2777]", ink: "#34102A", label: "Magenta pulse", radiusClass: "rounded-[20px]", shadowClass: "shadow-[0_14px_28px_rgba(219,39,119,0.26)]", surface: "#FFF1F8", surfaceClass: "bg-[#FFF1F8] text-[#34102A]" },
  { accent: "#EA580C", accentClass: "bg-[#EA580C] text-white", controlClass: "[&_button]:!border-[#EA580C] [&_button]:!bg-[#EA580C] [&_button]:!text-white [&_input]:!border-[#EA580C] [&_input]:focus:!ring-[#EA580C]/40 [&_select]:!border-[#EA580C] [&_select]:focus:!ring-[#EA580C]/40 [&_[role=tab][aria-selected=true]]:!bg-[#EA580C] [&_[role=tab][aria-selected=true]]:!text-white", frameClass: "border-[#EA580C]", ink: "#32190A", label: "Warm orange", radiusClass: "rounded-[20px]", shadowClass: "shadow-[0_14px_28px_rgba(234,88,12,0.26)]", surface: "#FFF7ED", surfaceClass: "bg-[#FFF7ED] text-[#32190A]" },
  { accent: "#1D4ED8", accentClass: "bg-[#1D4ED8] text-white", controlClass: "[&_button]:!border-[#1D4ED8] [&_button]:!bg-[#1D4ED8] [&_button]:!text-white [&_input]:!border-[#1D4ED8] [&_input]:focus:!ring-[#1D4ED8]/40 [&_select]:!border-[#1D4ED8] [&_select]:focus:!ring-[#1D4ED8]/40 [&_[role=tab][aria-selected=true]]:!bg-[#1D4ED8] [&_[role=tab][aria-selected=true]]:!text-white", frameClass: "border-[#1D4ED8]", ink: "#111B37", label: "Cobalt system", radiusClass: "rounded-[20px]", shadowClass: "shadow-[0_14px_28px_rgba(29,78,216,0.26)]", surface: "#EFF6FF", surfaceClass: "bg-[#EFF6FF] text-[#111B37]" },
];

export const CUSTOM_FONT_OPTIONS: Array<{ label: string; value: CustomBrandDNA["sansFont"] }> = [
  { label: "UI sans", value: "font-sans" },
  { label: "Editorial serif", value: "font-serif" },
  { label: "Technical mono", value: "font-mono" },
];

export const CUSTOM_RADIUS_OPTIONS: Array<{ label: string; value: CustomBrandDNA["radius"] }> = [
  { label: "Crisp · 8px", value: "8px" },
  { label: "Balanced · 14px", value: "14px" },
  { label: "Soft · 20px", value: "20px" },
  { label: "Pill · 28px", value: "28px" },
];

export const CUSTOM_SHADOW_OPTIONS: Array<{ label: string; value: CustomBrandDNA["shadow"] }> = [
  { label: "Ambient depth", value: "ambient" },
  { label: "Soft elevation", value: "soft" },
  { label: "Sharp offset", value: "sharp" },
];

export const CUSTOM_MATERIAL_OPTIONS: Array<{ label: string; value: CustomBrandDNA["material"] }> = [
  { label: "Soft settle", value: "soft" },
  { label: "Elastic lift", value: "elastic" },
  { label: "Crisp snap", value: "crisp" },
];

export function getCustomPaletteOption(brand: CustomBrandDNA) {
  return CUSTOM_PALETTE_OPTIONS.find((option) => option.accent === brand.accent) ?? CUSTOM_PALETTE_OPTIONS[0];
}

export function getCustomRadiusClass(radius: CustomBrandDNA["radius"]) {
  return radius === "8px" ? "rounded-lg" : radius === "14px" ? "rounded-[14px]" : radius === "28px" ? "rounded-[28px]" : "rounded-[20px]";
}

export function getCustomShadowClass(shadow: CustomBrandDNA["shadow"]) {
  return shadow === "sharp"
    ? "shadow-[0_8px_0_rgba(23,17,31,0.24)]"
    : shadow === "soft"
      ? "shadow-[0_20px_38px_rgba(124,58,237,0.20)]"
      : "shadow-[0_14px_28px_rgba(124,58,237,0.28)]";
}
