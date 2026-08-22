import type { CSSProperties } from "react";
import { DEFAULT_CUSTOM_BRAND, getCustomCssVariables, getCustomPaletteOption } from "./custom-brand";
import { getThemeSource } from "./themebridge.sources";
import type { ComponentId, CustomBrandDNA, ShowcaseBrandId, ThemeBridge } from "./showcase.types";

interface PaletteSkin {
  accentClass: string;
  controlClass: string;
  frameClass: string;
  surfaceClass: string;
}

interface MaterialSkin {
  controlClass: string;
  frameClass: string;
  label: string;
}

export interface ThemeBridgeSkin {
  controlClass: string;
  frameClass: string;
  label: string;
  materialName: string;
  paletteBadgeClass: string;
  paletteName: string;
  style?: CSSProperties;
  surfaceClass: string;
}

const PALETTE_SKINS: Record<ShowcaseBrandId, PaletteSkin> = {
  "29cm": {
    accentClass: "bg-[#111111] text-white",
    controlClass: "[&_button]:!border-[#111111] [&_button]:!bg-[#111111] [&_button]:!text-white [&_input]:!border-[#111111] [&_input]:focus:!ring-[#111111]/40 [&_select]:!border-[#111111] [&_select]:focus:!ring-[#111111]/40 [&_[role=tab][aria-selected=true]]:!bg-[#111111] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#111111]",
    surfaceClass: "bg-white text-[#111111]",
  },
  ably: {
    accentClass: "bg-[#ff5160] text-white",
    controlClass: "[&_button]:!border-[#ff5160] [&_button]:!bg-[#ff5160] [&_button]:!text-white [&_input]:!border-[#ff5160] [&_input]:focus:!ring-[#ff5160]/40 [&_select]:!border-[#ff5160] [&_select]:focus:!ring-[#ff5160]/40 [&_[role=tab][aria-selected=true]]:!bg-[#ff5160] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#ff5160]",
    surfaceClass: "bg-[#fff2ea] text-[#2a1620]",
  },
  apple: {
    accentClass: "bg-[#0071e3] text-white",
    controlClass: "[&_button]:!border-[#0071e3] [&_button]:!bg-[#0071e3] [&_button]:!text-white [&_input]:!border-[#0071e3] [&_input]:focus:!ring-[#0071e3]/40 [&_select]:!border-[#0071e3] [&_select]:focus:!ring-[#0071e3]/40 [&_[role=tab][aria-selected=true]]:!bg-[#0071e3] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#0071e3]",
    surfaceClass: "bg-[#f5f5f7] text-[#1d1d1f]",
  },
  baemin: {
    accentClass: "bg-[#0cefd3] text-[#111111]",
    controlClass: "[&_button]:!border-[#0cefd3] [&_button]:!bg-[#0cefd3] [&_button]:!text-[#111111] [&_input]:!border-[#0cefd3] [&_input]:focus:!ring-[#0cefd3]/50 [&_select]:!border-[#0cefd3] [&_select]:focus:!ring-[#0cefd3]/50 [&_[role=tab][aria-selected=true]]:!bg-[#0cefd3] [&_[role=tab][aria-selected=true]]:!text-[#111111]",
    frameClass: "border-[#0cefd3]",
    surfaceClass: "bg-[#f8fffc] text-[#222222]",
  },
  figma: {
    accentClass: "bg-[#0d99ff] text-white",
    controlClass: "[&_button]:!border-[#0d99ff] [&_button]:!bg-[#0d99ff] [&_button]:!text-white [&_input]:!border-[#0d99ff] [&_input]:focus:!ring-[#0d99ff]/40 [&_select]:!border-[#0d99ff] [&_select]:focus:!ring-[#0d99ff]/40 [&_[role=tab][aria-selected=true]]:!bg-[#0d99ff] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#0d99ff]",
    surfaceClass: "bg-[#2c2c2c] text-white",
  },
  kakao: {
    accentClass: "bg-[#fae100] text-[#111111]",
    controlClass: "[&_button]:!border-[#fae100] [&_button]:!bg-[#fae100] [&_button]:!text-[#111111] [&_input]:!border-[#fae100] [&_input]:focus:!ring-[#fae100]/55 [&_select]:!border-[#fae100] [&_select]:focus:!ring-[#fae100]/55 [&_[role=tab][aria-selected=true]]:!bg-[#fae100] [&_[role=tab][aria-selected=true]]:!text-[#111111]",
    frameClass: "border-[#fae100]",
    surfaceClass: "bg-[#fffce5] text-[#242424]",
  },
  kakaobank: {
    accentClass: "bg-[#ffe300] text-[#111111]",
    controlClass: "[&_button]:!border-[#ffe300] [&_button]:!bg-[#ffe300] [&_button]:!text-[#111111] [&_input]:!border-[#ffe300] [&_input]:focus:!ring-[#ffe300]/55 [&_select]:!border-[#ffe300] [&_select]:focus:!ring-[#ffe300]/55 [&_[role=tab][aria-selected=true]]:!bg-[#ffe300] [&_[role=tab][aria-selected=true]]:!text-[#111111]",
    frameClass: "border-[#ffe300]",
    surfaceClass: "bg-[#fffce1] text-[#111111]",
  },
  karrot: {
    accentClass: "bg-[#ff6f0f] text-white",
    controlClass: "[&_button]:!border-[#ff6f0f] [&_button]:!bg-[#ff6f0f] [&_button]:!text-white [&_input]:!border-[#ff6f0f] [&_input]:focus:!ring-[#ff6f0f]/45 [&_select]:!border-[#ff6f0f] [&_select]:focus:!ring-[#ff6f0f]/45 [&_[role=tab][aria-selected=true]]:!bg-[#ff6f0f] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#ff6f0f]",
    surfaceClass: "bg-[#fff5f0] text-[#2b1b12]",
  },
  likelion: {
    accentClass: "bg-[#ff6000] text-white",
    controlClass: "[&_button]:!border-[#ff6000] [&_button]:!bg-[#ff6000] [&_button]:!text-white [&_input]:!border-[#ff6000] [&_input]:focus:!ring-[#ff6000]/45 [&_select]:!border-[#ff6000] [&_select]:focus:!ring-[#ff6000]/45 [&_[role=tab][aria-selected=true]]:!bg-[#ff6000] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#ff6000]",
    surfaceClass: "bg-[#fcf4ee] text-[#21160f]",
  },
  musinsa: {
    accentClass: "bg-black text-white",
    controlClass: "[&_button]:!border-black [&_button]:!bg-black [&_button]:!text-white [&_input]:!border-black [&_input]:focus:!ring-black/40 [&_select]:!border-black [&_select]:focus:!ring-black/40 [&_[role=tab][aria-selected=true]]:!bg-black [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-black",
    surfaceClass: "bg-[#f5f5f5] text-black",
  },
  samsung: {
    accentClass: "bg-[#007aff] text-white",
    controlClass: "[&_button]:!border-[#007aff] [&_button]:!bg-[#007aff] [&_button]:!text-white [&_input]:!border-[#007aff] [&_input]:focus:!ring-[#007aff]/40 [&_select]:!border-[#007aff] [&_select]:focus:!ring-[#007aff]/40 [&_[role=tab][aria-selected=true]]:!bg-[#007aff] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#007aff]",
    surfaceClass: "bg-[#f5f7fb] text-[#1428a0]",
  },
  tesla: {
    accentClass: "bg-[#3e6ae1] text-white",
    controlClass: "[&_button]:!border-[#3e6ae1] [&_button]:!bg-[#3e6ae1] [&_button]:!text-white [&_input]:!border-[#3e6ae1] [&_input]:focus:!ring-[#3e6ae1]/40 [&_select]:!border-[#3e6ae1] [&_select]:focus:!ring-[#3e6ae1]/40 [&_[role=tab][aria-selected=true]]:!bg-[#3e6ae1] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#3e6ae1]",
    surfaceClass: "bg-[#f4f4f4] text-[#171a20]",
  },
  toss: {
    accentClass: "bg-[#3182f6] text-white",
    controlClass: "[&_button]:!border-[#3182f6] [&_button]:!bg-[#3182f6] [&_button]:!text-white [&_input]:!border-[#3182f6] [&_input]:focus:!ring-[#3182f6]/40 [&_select]:!border-[#3182f6] [&_select]:focus:!ring-[#3182f6]/40 [&_[role=tab][aria-selected=true]]:!bg-[#3182f6] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#3182f6]",
    surfaceClass: "bg-[#e8f3ff] text-[#191f28]",
  },
  upstage: {
    accentClass: "bg-[#5b52ff] text-white",
    controlClass: "[&_button]:!border-[#5b52ff] [&_button]:!bg-[#5b52ff] [&_button]:!text-white [&_input]:!border-[#5b52ff] [&_input]:focus:!ring-[#5b52ff]/40 [&_select]:!border-[#5b52ff] [&_select]:focus:!ring-[#5b52ff]/40 [&_[role=tab][aria-selected=true]]:!bg-[#5b52ff] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#5b52ff]",
    surfaceClass: "bg-[#f4f3ff] text-[#0a0d14]",
  },
  goodchoice: {
    accentClass: "bg-[#f94239] text-white",
    controlClass: "[&_button]:!border-[#f94239] [&_button]:!bg-[#f94239] [&_button]:!text-white [&_input]:!border-[#f94239] [&_input]:focus:!ring-[#f94239]/40 [&_select]:!border-[#f94239] [&_select]:focus:!ring-[#f94239]/40 [&_[role=tab][aria-selected=true]]:!bg-[#f94239] [&_[role=tab][aria-selected=true]]:!text-white",
    frameClass: "border-[#f94239]",
    surfaceClass: "bg-[#fff3f2] text-[#2b1716]",
  },
};

const MATERIAL_SKINS: Record<ShowcaseBrandId, MaterialSkin> = {
  "29cm": { controlClass: "[&_button]:!rounded-none [&_input]:!rounded-none [&_select]:!rounded-none [&_[role=tab]]:!rounded-none [&_button]:!shadow-none [&_button]:!transition-none", frameClass: "rounded-none shadow-[0_12px_28px_rgba(17,17,17,0.16)]", label: "flat editorial edge" },
  ably: { controlClass: "[&_button]:!rounded-3xl [&_input]:!rounded-3xl [&_select]:!rounded-3xl [&_[role=tab]]:!rounded-3xl [&_button]:!shadow-[0_16px_28px_rgba(255,81,96,0.30)] [&_button]:hover:!-translate-y-1 [&_button]:!transition-all", frameClass: "rounded-3xl shadow-[0_24px_44px_rgba(255,81,96,0.28)]", label: "realtime volume" },
  apple: { controlClass: "[&_button]:!rounded-2xl [&_input]:!rounded-2xl [&_select]:!rounded-2xl [&_[role=tab]]:!rounded-2xl [&_button]:!shadow-[0_12px_30px_rgba(29,29,31,0.15)] [&_button]:hover:!-translate-y-0.5 [&_button]:!transition-all", frameClass: "rounded-2xl shadow-[0_20px_48px_rgba(29,29,31,0.16)]", label: "restrained settle" },
  baemin: { controlClass: "[&_button]:!rounded-2xl [&_input]:!rounded-2xl [&_select]:!rounded-2xl [&_[role=tab]]:!rounded-2xl [&_button]:!shadow-[0_8px_0_rgba(34,34,34,0.22)] [&_button]:hover:!-translate-y-1 [&_button]:active:!translate-y-1 [&_button]:!transition-all", frameClass: "rounded-2xl shadow-[0_12px_0_rgba(34,34,34,0.18)]", label: "playful press" },
  figma: { controlClass: "[&_button]:!rounded-lg [&_input]:!rounded-lg [&_select]:!rounded-lg [&_[role=tab]]:!rounded-lg [&_button]:!shadow-[0_12px_26px_rgba(0,0,0,0.30)] [&_button]:hover:!-translate-y-0.5 [&_button]:!transition-all", frameClass: "rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.25)]", label: "tool precision" },
  kakao: { controlClass: "[&_button]:!rounded-2xl [&_input]:!rounded-2xl [&_select]:!rounded-2xl [&_[role=tab]]:!rounded-2xl [&_button]:!shadow-[0_12px_22px_rgba(92,72,0,0.22)] [&_button]:hover:!-translate-y-1 [&_button]:!transition-all", frameClass: "rounded-2xl shadow-[0_18px_34px_rgba(92,72,0,0.22)]", label: "soft bubble pop" },
  kakaobank: { controlClass: "[&_button]:!rounded-2xl [&_input]:!rounded-2xl [&_select]:!rounded-2xl [&_[role=tab]]:!rounded-2xl [&_button]:!shadow-[0_16px_30px_rgba(65,56,0,0.20)] [&_button]:hover:!-translate-y-1 [&_button]:!transition-all", frameClass: "rounded-2xl shadow-[0_22px_40px_rgba(65,56,0,0.18)]", label: "calm financial lift" },
  karrot: { controlClass: "[&_button]:!rounded-3xl [&_input]:!rounded-3xl [&_select]:!rounded-3xl [&_[role=tab]]:!rounded-3xl [&_button]:!shadow-[0_16px_28px_rgba(255,111,15,0.26)] [&_button]:hover:!-translate-y-1 [&_button]:!transition-all", frameClass: "rounded-3xl shadow-[0_22px_38px_rgba(255,111,15,0.24)]", label: "warm neighborhood rise" },
  likelion: { controlClass: "[&_button]:!rounded-xl [&_input]:!rounded-xl [&_select]:!rounded-xl [&_[role=tab]]:!rounded-xl [&_button]:!shadow-[0_14px_26px_rgba(255,96,0,0.24)] [&_button]:hover:!translate-x-1 [&_button]:!transition-all", frameClass: "rounded-xl shadow-[0_20px_36px_rgba(255,96,0,0.22)]", label: "maker energy" },
  musinsa: { controlClass: "[&_button]:!rounded-none [&_input]:!rounded-none [&_select]:!rounded-none [&_[role=tab]]:!rounded-none [&_button]:!shadow-[0_8px_0_rgba(0,0,0,0.28)] [&_button]:hover:!scale-[1.02] [&_button]:!transition-all", frameClass: "rounded-none shadow-[0_14px_30px_rgba(0,0,0,0.22)]", label: "hard contrast snap" },
  samsung: { controlClass: "[&_button]:!rounded-3xl [&_input]:!rounded-3xl [&_select]:!rounded-3xl [&_[role=tab]]:!rounded-3xl [&_button]:!shadow-[0_18px_32px_rgba(0,122,255,0.22)] [&_button]:hover:!-translate-y-0.5 [&_button]:!transition-all", frameClass: "rounded-3xl shadow-[0_24px_42px_rgba(0,122,255,0.20)]", label: "wide product depth" },
  tesla: { controlClass: "[&_button]:!rounded-lg [&_input]:!rounded-lg [&_select]:!rounded-lg [&_[role=tab]]:!rounded-lg [&_button]:!shadow-[0_14px_28px_rgba(23,26,32,0.20)] [&_button]:hover:!-translate-y-0.5 [&_button]:!transition-all", frameClass: "rounded-lg shadow-[0_20px_38px_rgba(23,26,32,0.18)]", label: "product-led settle" },
  toss: { controlClass: "[&_button]:!rounded-3xl [&_input]:!rounded-3xl [&_select]:!rounded-3xl [&_[role=tab]]:!rounded-3xl [&_button]:!shadow-[0_20px_34px_rgba(49,130,246,0.26)] [&_button]:hover:!-translate-y-1 [&_button]:active:!scale-[0.97] [&_button]:!transition-all", frameClass: "rounded-3xl shadow-[0_26px_44px_rgba(49,130,246,0.24)]", label: "elastic soft depth" },
  upstage: { controlClass: "[&_button]:!rounded-lg [&_input]:!rounded-lg [&_select]:!rounded-lg [&_[role=tab]]:!rounded-lg [&_button]:!shadow-[0_18px_34px_rgba(91,82,255,0.28)] [&_button]:hover:!-translate-y-1 [&_button]:!transition-all", frameClass: "rounded-lg shadow-[0_24px_44px_rgba(91,82,255,0.26)]", label: "AI conversion glow" },
  goodchoice: { controlClass: "[&_button]:!rounded-2xl [&_input]:!rounded-2xl [&_select]:!rounded-2xl [&_[role=tab]]:!rounded-2xl [&_button]:!shadow-[0_18px_30px_rgba(249,66,57,0.24)] [&_button]:hover:!-translate-y-1 [&_button]:!transition-all", frameClass: "rounded-2xl shadow-[0_24px_42px_rgba(249,66,57,0.22)]", label: "travel ticket lift" },
};

function getCustomPaletteSkin(customBrand: CustomBrandDNA): PaletteSkin {
  const palette = getCustomPaletteOption(customBrand);
  return {
    accentClass: palette.accentClass,
    controlClass: palette.controlClass,
    frameClass: palette.frameClass,
    surfaceClass: palette.surfaceClass,
  };
}

function getCustomMaterialSkin(customBrand: CustomBrandDNA): MaterialSkin {
  return {
    controlClass: "[&_button]:!rounded-[var(--vault-control-radius,20px)] [&_input]:!rounded-[var(--vault-control-radius,20px)] [&_select]:!rounded-[var(--vault-control-radius,20px)] [&_[role=tab]]:!rounded-[var(--vault-control-radius,20px)] [&_button]:!shadow-[0_14px_28px_color-mix(in_srgb,var(--vault-primary,#7C3AED)_28%,transparent)] [&_button]:hover:!translate-y-[calc(var(--vault-hover-lift,2px)*-1)] [&_button]:active:!scale-[var(--vault-press-scale,0.98)] [&_button]:!duration-[var(--vault-duration,260ms)] [&_button]:!ease-[var(--vault-easing,ease-out)]",
    frameClass: "rounded-[var(--vault-card-radius,24px)] shadow-[0_18px_36px_color-mix(in_srgb,var(--vault-primary,#7C3AED)_20%,transparent)]",
    label: `${customBrand.material} ${customBrand.shadow} advanced custom material`,
  };
}

export function getThemeBridgeSkin(themeBridge: ThemeBridge, componentId?: ComponentId): ThemeBridgeSkin {
  const customBrand = themeBridge.customBrand ?? DEFAULT_CUSTOM_BRAND;
  const palette = themeBridge.paletteBrandId === "custom" ? getCustomPaletteSkin(customBrand) : PALETTE_SKINS[themeBridge.paletteBrandId];
  const material = themeBridge.materialBrandId === "custom" ? getCustomMaterialSkin(customBrand) : MATERIAL_SKINS[themeBridge.materialBrandId];
  const paletteBrand = getThemeSource(themeBridge.paletteBrandId, customBrand);
  const materialBrand = getThemeSource(themeBridge.materialBrandId, customBrand);

  return {
    controlClass: `${palette.controlClass} ${material.controlClass}`,
    frameClass: `${palette.frameClass} ${material.frameClass}`,
    label: `${paletteBrand.name} palette × ${material.label}`,
    materialName: materialBrand.name,
    paletteBadgeClass: palette.accentClass,
    paletteName: paletteBrand.name,
    style: themeBridge.paletteBrandId === "custom" || themeBridge.materialBrandId === "custom" ? getCustomCssVariables(customBrand, componentId) : undefined,
    surfaceClass: palette.surfaceClass,
  };
}
