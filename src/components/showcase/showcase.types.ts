import type { ComponentType } from "react";

export type ShowcaseBrandId = "29cm" | "ably" | "apple" | "baemin" | "figma" | "kakao" | "kakaobank" | "karrot" | "likelion" | "musinsa" | "samsung" | "tesla" | "toss" | "upstage" | "goodchoice";
export type CustomBrandId = `custom:${string}`;
export type ThemeSourceId = ShowcaseBrandId | CustomBrandId;
export type ComponentId = "Button" | "Input" | "HeroCard" | "Toast" | "Badge" | "Modal" | "Select" | "Avatar" | "Tabs" | "Accordion";
export type CustomDensity = "compact" | "comfortable" | "spacious";
export type CustomEasing = "ease-out" | "ease-in-out" | "linear";
export type CustomColorMode = "light" | "dark";
export type ToneScaleStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface CustomSemanticTokens { border: string; danger: string; focusRing: string; ink: string; mutedInk: string; primary: string; primaryHover: string; primarySoft: string; success: string; surface: string; surfaceElevated: string; warning: string; }
export type CustomToneScale = Record<ToneScaleStep, string>;
export interface CustomGeometryTokens { borderWidth: string; cardRadius: string; controlRadius: string; modalRadius: string; }
export interface CustomMotionTokens { duration: string; easing: CustomEasing; hoverLift: string; pressScale: string; }
export interface CustomComponentStates { disabledOpacity?: string; focusRing?: string; hoverAccent?: string; hoverLift?: string; pressedScale?: string; }
export interface CustomComponentOverride { accent?: string; density?: CustomDensity; enabled: boolean; radius?: string; states?: CustomComponentStates; surface?: string; }

export interface CustomBrandDNA {
  accent: string;
  activeColorMode?: CustomColorMode;
  colorModes?: Record<CustomColorMode, CustomSemanticTokens>;
  componentOverrides: Partial<Record<ComponentId, CustomComponentOverride>>;
  descriptor: string;
  displayFont: string;
  geometry: CustomGeometryTokens;
  id: CustomBrandId;
  ink: string;
  material: "crisp" | "elastic" | "soft";
  motion: CustomMotionTokens;
  name: string;
  radius: string;
  sansFont: string;
  shadow: "ambient" | "sharp" | "soft";
  surface: string;
  toneScale?: CustomToneScale;
  tokens: CustomSemanticTokens;
}
export interface CustomBrandLibrary { activeBrandId: CustomBrandId; brands: CustomBrandDNA[]; version: 1; }
export type AccessibilityAuditLevel = "pass" | "review" | "fail";
export interface AccessibilityAuditCheck { actualRatio: number; background: string; category: "focus" | "status" | "text"; foreground: string; id: string; label: string; level: AccessibilityAuditLevel; minimumRatio: number; suggestion: string; }
export interface AccessibilityAuditResult { checks: AccessibilityAuditCheck[]; passCount: number; totalCount: number; }

export interface VaultHandoffItem { approvedAt: string; brandId: CustomBrandId; manifestId: string; slug: string; status: "approved" | "ready"; }
export interface VaultHandoffQueue { items: VaultHandoffItem[]; version: 1; }
export type VaultComponent = ComponentType<any>;
export interface VaultComponentSet { Button: VaultComponent; Input: VaultComponent; HeroCard: VaultComponent; Toast: VaultComponent; Badge: VaultComponent; Modal: VaultComponent; Select: VaultComponent; Avatar: VaultComponent; Tabs: VaultComponent; Accordion: VaultComponent; }
export interface ShowcaseBrand { id: ShowcaseBrandId; name: string; directory: string; exportPrefix: string; descriptor: string; initials: string; accentClass: string; surfaceClass: string; borderClass: string; textClass: string; avatarClass: string; status: string; }
export interface ThemeBridge { customBrand?: CustomBrandDNA; customBrands?: CustomBrandDNA[]; enabled: boolean; paletteBrandId: ThemeSourceId; materialBrandId: ThemeSourceId; }
export interface ComponentViewerProps { brandId: ShowcaseBrandId; onBack?: () => void; themeBridge?: ThemeBridge; }
export interface ShowcaseComponent { id: ComponentId; number: string; title: string; description: string; }
export interface BrandTokenSet {
  animation: string;
  colors: { contrast: string; ink: string; primary: string; surface: string; };
  materialClass: string;
  paletteBorderClass: string;
  paletteButtonClass: string;
  paletteInkClass: string;
  paletteSurfaceClass: string;
  radius: string;
  shadow: string;
  typography: { display: string; sans: string; };
}
