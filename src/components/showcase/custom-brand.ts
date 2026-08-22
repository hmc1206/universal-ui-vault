import type { CSSProperties } from "react";
import type { ComponentId, CustomBrandDNA, CustomBrandId, CustomBrandLibrary, CustomComponentOverride, CustomDensity, CustomEasing, CustomGeometryTokens, CustomMotionTokens, CustomSemanticTokens } from "./showcase.types";

export const CUSTOM_BRAND_STORAGE_KEY = "universal-ui-vault.custom-brand.v2";
export const CUSTOM_BRAND_LIBRARY_STORAGE_KEY = "universal-ui-vault.custom-brand-library.v1";

export const CUSTOM_COMPONENT_IDS: ComponentId[] = [
  "Button",
  "Input",
  "HeroCard",
  "Toast",
  "Badge",
  "Modal",
  "Select",
  "Avatar",
  "Tabs",
  "Accordion",
];

const DEFAULT_TOKENS: CustomSemanticTokens = {
  border: "#DDD5F4",
  danger: "#DC2626",
  focusRing: "#A78BFA",
  ink: "#17111F",
  mutedInk: "#6B6477",
  primary: "#7C3AED",
  primaryHover: "#6D28D9",
  primarySoft: "#EDE9FE",
  success: "#059669",
  surface: "#F6F1FF",
  surfaceElevated: "#FFFFFF",
  warning: "#D97706",
};

const DEFAULT_GEOMETRY: CustomGeometryTokens = {
  borderWidth: "1px",
  cardRadius: "24px",
  controlRadius: "20px",
  modalRadius: "24px",
};

const DEFAULT_MOTION: CustomMotionTokens = {
  duration: "260ms",
  easing: "ease-out",
  hoverLift: "2px",
  pressScale: "0.98",
};

export const DEFAULT_CUSTOM_BRAND: CustomBrandDNA = {
  accent: DEFAULT_TOKENS.primary,
  componentOverrides: {},
  descriptor: "A custom ThemeBridge design DNA",
  displayFont: "font-sans",
  geometry: DEFAULT_GEOMETRY,
  id: "custom:my-brand",
  ink: DEFAULT_TOKENS.ink,
  material: "soft",
  motion: DEFAULT_MOTION,
  name: "My Brand",
  radius: DEFAULT_GEOMETRY.controlRadius,
  sansFont: "font-sans",
  shadow: "ambient",
  surface: DEFAULT_TOKENS.surface,
  tokens: DEFAULT_TOKENS,
};

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const CSS_SIZE_PATTERN = /^(0|[1-9][0-9]?)(px|rem)$/;
const BORDER_SIZE_PATTERN = /^[1-4]px$/;
const DURATION_PATTERN = /^([1-9][0-9]{1,3})ms$/;
const LIFT_PATTERN = /^(0|[1-8])px$/;
const PRESS_SCALE_PATTERN = /^(0\.(9[0-9]|[1-8][0-9])|1)$/;
const FONT_CLASS_VALUES = ["font-sans", "font-serif", "font-mono"] as const;
const EASING_VALUES: CustomEasing[] = ["ease-out", "ease-in-out", "linear"];
const DENSITY_VALUES: CustomDensity[] = ["compact", "comfortable", "spacious"];

export function isHexColor(value: string) {
  return HEX_COLOR_PATTERN.test(value);
}

export function isCssSize(value: string) {
  return CSS_SIZE_PATTERN.test(value);
}

function sanitizeColor(value: unknown, fallback: string) {
  return typeof value === "string" && isHexColor(value) ? value.toUpperCase() : fallback;
}

function slugifyCustomId(value: unknown) {
  const raw = typeof value === "string" ? value.replace(/^custom:/, "") : "";
  const slug = raw.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 28);
  return `custom:${slug || "my-brand"}` as CustomBrandId;
}

function sanitizeGeometry(input: Partial<CustomGeometryTokens> | undefined): CustomGeometryTokens {
  return {
    borderWidth: typeof input?.borderWidth === "string" && BORDER_SIZE_PATTERN.test(input.borderWidth) ? input.borderWidth : DEFAULT_GEOMETRY.borderWidth,
    cardRadius: typeof input?.cardRadius === "string" && isCssSize(input.cardRadius) ? input.cardRadius : DEFAULT_GEOMETRY.cardRadius,
    controlRadius: typeof input?.controlRadius === "string" && isCssSize(input.controlRadius) ? input.controlRadius : DEFAULT_GEOMETRY.controlRadius,
    modalRadius: typeof input?.modalRadius === "string" && isCssSize(input.modalRadius) ? input.modalRadius : DEFAULT_GEOMETRY.modalRadius,
  };
}

function sanitizeMotion(input: Partial<CustomMotionTokens> | undefined): CustomMotionTokens {
  return {
    duration: typeof input?.duration === "string" && DURATION_PATTERN.test(input.duration) ? input.duration : DEFAULT_MOTION.duration,
    easing: EASING_VALUES.includes(input?.easing as CustomEasing) ? input!.easing as CustomEasing : DEFAULT_MOTION.easing,
    hoverLift: typeof input?.hoverLift === "string" && LIFT_PATTERN.test(input.hoverLift) ? input.hoverLift : DEFAULT_MOTION.hoverLift,
    pressScale: typeof input?.pressScale === "string" && PRESS_SCALE_PATTERN.test(input.pressScale) ? input.pressScale : DEFAULT_MOTION.pressScale,
  };
}

function sanitizeOverrides(input: Partial<Record<ComponentId, CustomComponentOverride>> | undefined): CustomBrandDNA["componentOverrides"] {
  const overrides: CustomBrandDNA["componentOverrides"] = {};

  for (const componentId of CUSTOM_COMPONENT_IDS) {
    const candidate = input?.[componentId];
    if (!candidate) continue;

    overrides[componentId] = {
      accent: sanitizeColor(candidate.accent, ""),
      density: DENSITY_VALUES.includes(candidate.density as CustomDensity) ? candidate.density : "comfortable",
      enabled: Boolean(candidate.enabled),
      radius: typeof candidate.radius === "string" && isCssSize(candidate.radius) ? candidate.radius : "",
      surface: sanitizeColor(candidate.surface, ""),
    };
  }

  return overrides;
}

export function sanitizeCustomBrand(input: Partial<CustomBrandDNA>): CustomBrandDNA {
  const name = input.name?.trim().slice(0, 32) || DEFAULT_CUSTOM_BRAND.name;
  const descriptor = input.descriptor?.trim().slice(0, 96) || DEFAULT_CUSTOM_BRAND.descriptor;
  const geometry = sanitizeGeometry(input.geometry ?? { controlRadius: input.radius });
  const motion = sanitizeMotion(input.motion);
  const inputTokens: Partial<CustomSemanticTokens> = input.tokens ?? {};
  const primary = sanitizeColor(inputTokens.primary, sanitizeColor(input.accent, DEFAULT_TOKENS.primary));
  const ink = sanitizeColor(inputTokens.ink, sanitizeColor(input.ink, DEFAULT_TOKENS.ink));
  const surface = sanitizeColor(inputTokens.surface, sanitizeColor(input.surface, DEFAULT_TOKENS.surface));
  const tokens: CustomSemanticTokens = {
    border: sanitizeColor(inputTokens.border, DEFAULT_TOKENS.border),
    danger: sanitizeColor(inputTokens.danger, DEFAULT_TOKENS.danger),
    focusRing: sanitizeColor(inputTokens.focusRing, DEFAULT_TOKENS.focusRing),
    ink,
    mutedInk: sanitizeColor(inputTokens.mutedInk, DEFAULT_TOKENS.mutedInk),
    primary,
    primaryHover: sanitizeColor(inputTokens.primaryHover, DEFAULT_TOKENS.primaryHover),
    primarySoft: sanitizeColor(inputTokens.primarySoft, DEFAULT_TOKENS.primarySoft),
    success: sanitizeColor(inputTokens.success, DEFAULT_TOKENS.success),
    surface,
    surfaceElevated: sanitizeColor(inputTokens.surfaceElevated, DEFAULT_TOKENS.surfaceElevated),
    warning: sanitizeColor(inputTokens.warning, DEFAULT_TOKENS.warning),
  };

  return {
    accent: primary,
    componentOverrides: sanitizeOverrides(input.componentOverrides),
    descriptor,
    displayFont: FONT_CLASS_VALUES.includes(input.displayFont as (typeof FONT_CLASS_VALUES)[number]) ? input.displayFont! : DEFAULT_CUSTOM_BRAND.displayFont,
    geometry,
    id: slugifyCustomId(input.id),
    ink,
    material: input.material === "crisp" || input.material === "elastic" || input.material === "soft" ? input.material : DEFAULT_CUSTOM_BRAND.material,
    motion,
    name,
    radius: geometry.controlRadius,
    sansFont: FONT_CLASS_VALUES.includes(input.sansFont as (typeof FONT_CLASS_VALUES)[number]) ? input.sansFont! : DEFAULT_CUSTOM_BRAND.sansFont,
    shadow: input.shadow === "ambient" || input.shadow === "sharp" || input.shadow === "soft" ? input.shadow : DEFAULT_CUSTOM_BRAND.shadow,
    surface,
    tokens,
  };
}

function makeUniqueId(existing: CustomBrandDNA[], requestedId: CustomBrandId) {
  if (!existing.some((brand) => brand.id === requestedId)) return requestedId;
  const base = requestedId.replace(/^custom:/, "");
  let index = 2;
  let candidate = `custom:${base}-${index}` as CustomBrandId;
  while (existing.some((brand) => brand.id === candidate)) {
    index += 1;
    candidate = `custom:${base}-${index}` as CustomBrandId;
  }
  return candidate;
}

export function createCustomBrand(existing: CustomBrandDNA[], source: CustomBrandDNA = DEFAULT_CUSTOM_BRAND): CustomBrandDNA {
  const name = `${source.name || "My Brand"} copy`;
  const requestedId = slugifyCustomId(name);
  return sanitizeCustomBrand({
    ...source,
    componentOverrides: structuredClone(source.componentOverrides),
    geometry: { ...source.geometry },
    id: makeUniqueId(existing, requestedId),
    name,
    motion: { ...source.motion },
    tokens: { ...source.tokens },
  });
}

function sanitizeLibrary(input: Partial<CustomBrandLibrary>): CustomBrandLibrary {
  const rawBrands = Array.isArray(input.brands) ? input.brands : [];
  const brands: CustomBrandDNA[] = [];
  for (const rawBrand of rawBrands) {
    const sanitized = sanitizeCustomBrand(rawBrand);
    const id = makeUniqueId(brands, sanitized.id);
    brands.push(id === sanitized.id ? sanitized : { ...sanitized, id });
  }

  if (!brands.length) brands.push(DEFAULT_CUSTOM_BRAND);
  const requestedActiveId = slugifyCustomId(input.activeBrandId);
  const activeBrandId = brands.some((brand) => brand.id === requestedActiveId) ? requestedActiveId : brands[0].id;
  return { activeBrandId, brands, version: 1 };
}

export function loadCustomBrandLibrary(): CustomBrandLibrary {
  if (typeof window === "undefined") return { activeBrandId: DEFAULT_CUSTOM_BRAND.id, brands: [DEFAULT_CUSTOM_BRAND], version: 1 };

  try {
    const current = window.localStorage.getItem(CUSTOM_BRAND_LIBRARY_STORAGE_KEY);
    if (current) return sanitizeLibrary(JSON.parse(current) as Partial<CustomBrandLibrary>);

    const legacy = window.localStorage.getItem(CUSTOM_BRAND_STORAGE_KEY) ?? window.localStorage.getItem("universal-ui-vault.custom-brand.v1");
    if (legacy) {
      const migrated = sanitizeCustomBrand(JSON.parse(legacy) as Partial<CustomBrandDNA>);
      return { activeBrandId: migrated.id, brands: [migrated], version: 1 };
    }
  } catch {
    // Invalid browser storage is intentionally replaced by the safe starter library.
  }

  return { activeBrandId: DEFAULT_CUSTOM_BRAND.id, brands: [DEFAULT_CUSTOM_BRAND], version: 1 };
}

export function saveCustomBrandLibrary(library: CustomBrandLibrary) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CUSTOM_BRAND_LIBRARY_STORAGE_KEY, JSON.stringify(sanitizeLibrary(library)));
  }
}

/** @deprecated Use loadCustomBrandLibrary; retained for generation and preview modules that require the active DNA. */
export function loadCustomBrand(): CustomBrandDNA {
  const library = loadCustomBrandLibrary();
  return library.brands.find((brand) => brand.id === library.activeBrandId) ?? library.brands[0];
}

/** @deprecated Use saveCustomBrandLibrary; retained for compatibility with the existing custom builder contract. */
export function saveCustomBrand(brand: CustomBrandDNA) {
  const library = loadCustomBrandLibrary();
  const sanitized = sanitizeCustomBrand(brand);
  const brands = library.brands.some((candidate) => candidate.id === sanitized.id)
    ? library.brands.map((candidate) => candidate.id === sanitized.id ? sanitized : candidate)
    : [...library.brands, sanitized];
  saveCustomBrandLibrary({ activeBrandId: sanitized.id, brands, version: 1 });
}

export function resetCustomBrand() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CUSTOM_BRAND_LIBRARY_STORAGE_KEY);
    window.localStorage.removeItem(CUSTOM_BRAND_STORAGE_KEY);
    window.localStorage.removeItem("universal-ui-vault.custom-brand.v1");
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

const CUSTOM_VARIABLE_CLASSES = {
  accentClass: "bg-[var(--vault-primary,#7C3AED)] text-white",
  controlClass: "[&_button]:!border-[var(--vault-primary,#7C3AED)] [&_button]:!bg-[var(--vault-primary,#7C3AED)] [&_button]:!text-white [&_button]:hover:!bg-[var(--vault-primary-hover,#6D28D9)] [&_input]:!border-[var(--vault-border,#DDD5F4)] [&_input]:focus:!border-[var(--vault-primary,#7C3AED)] [&_input]:focus:!ring-[var(--vault-focus,#A78BFA)] [&_select]:!border-[var(--vault-border,#DDD5F4)] [&_select]:focus:!border-[var(--vault-primary,#7C3AED)] [&_[role=tab][aria-selected=true]]:!bg-[var(--vault-primary,#7C3AED)] [&_[role=tab][aria-selected=true]]:!text-white",
  frameClass: "border-[var(--vault-border,#DDD5F4)]",
  radiusClass: "rounded-[var(--vault-control-radius,20px)]",
  shadowClass: "shadow-[0_14px_28px_color-mix(in_srgb,var(--vault-primary,#7C3AED)_28%,transparent)]",
  surfaceClass: "bg-[var(--vault-surface,#F6F1FF)] text-[var(--vault-ink,#17111F)]",
};

export const CUSTOM_PALETTE_OPTIONS: CustomPaletteOption[] = [
  { accent: "#7C3AED", ink: "#17111F", label: "Violet signal", surface: "#F6F1FF", ...CUSTOM_VARIABLE_CLASSES },
  { accent: "#0F766E", ink: "#0B2926", label: "Deep teal", surface: "#ECFDF5", ...CUSTOM_VARIABLE_CLASSES },
  { accent: "#DB2777", ink: "#34102A", label: "Magenta pulse", surface: "#FFF1F8", ...CUSTOM_VARIABLE_CLASSES },
  { accent: "#EA580C", ink: "#32190A", label: "Warm orange", surface: "#FFF7ED", ...CUSTOM_VARIABLE_CLASSES },
  { accent: "#1D4ED8", ink: "#111B37", label: "Cobalt system", surface: "#EFF6FF", ...CUSTOM_VARIABLE_CLASSES },
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

export function getComponentOverride(brand: CustomBrandDNA, componentId: ComponentId) {
  const override = brand.componentOverrides[componentId];
  return override?.enabled ? override : undefined;
}

export function resolveComponentTokens(brand: CustomBrandDNA, componentId: ComponentId) {
  const override = getComponentOverride(brand, componentId);
  return {
    accent: isHexColor(override?.accent ?? "") ? override!.accent! : brand.tokens.primary,
    density: override?.density ?? "comfortable",
    radius: isCssSize(override?.radius ?? "") ? override!.radius! : brand.geometry.controlRadius,
    surface: isHexColor(override?.surface ?? "") ? override!.surface! : brand.tokens.surface,
  };
}

export function getCustomPaletteOption(brand: CustomBrandDNA) {
  return CUSTOM_PALETTE_OPTIONS.find((option) => option.accent === brand.tokens.primary) ?? {
    accent: brand.tokens.primary,
    ink: brand.tokens.ink,
    label: "Custom palette",
    surface: brand.tokens.surface,
    ...CUSTOM_VARIABLE_CLASSES,
  };
}

export function getCustomCssVariables(brand: CustomBrandDNA, componentId?: ComponentId): CSSProperties & Record<`--${string}`, string> {
  const componentTokens = componentId ? resolveComponentTokens(brand, componentId) : { accent: brand.tokens.primary, radius: brand.geometry.controlRadius, surface: brand.tokens.surface };
  return {
    "--vault-border": brand.tokens.border,
    "--vault-border-width": brand.geometry.borderWidth,
    "--vault-card-radius": brand.geometry.cardRadius,
    "--vault-control-radius": componentTokens.radius,
    "--vault-danger": brand.tokens.danger,
    "--vault-duration": brand.motion.duration,
    "--vault-easing": brand.motion.easing,
    "--vault-focus": brand.tokens.focusRing,
    "--vault-hover-lift": brand.motion.hoverLift,
    "--vault-ink": brand.tokens.ink,
    "--vault-modal-radius": brand.geometry.modalRadius,
    "--vault-muted": brand.tokens.mutedInk,
    "--vault-press-scale": brand.motion.pressScale,
    "--vault-primary": componentTokens.accent,
    "--vault-primary-hover": brand.tokens.primaryHover,
    "--vault-primary-soft": brand.tokens.primarySoft,
    "--vault-success": brand.tokens.success,
    "--vault-surface": componentTokens.surface,
    "--vault-surface-elevated": brand.tokens.surfaceElevated,
    "--vault-warning": brand.tokens.warning,
  };
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
