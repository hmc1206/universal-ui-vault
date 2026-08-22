import type { ComponentType } from "react";

export type ShowcaseBrandId =
  | "29cm"
  | "ably"
  | "apple"
  | "baemin"
  | "figma"
  | "kakao"
  | "kakaobank"
  | "karrot"
  | "likelion"
  | "musinsa"
  | "samsung"
  | "tesla"
  | "toss"
  | "upstage"
  | "goodchoice";

export type ThemeSourceId = ShowcaseBrandId | "custom";

export type ComponentId =
  | "Button"
  | "Input"
  | "HeroCard"
  | "Toast"
  | "Badge"
  | "Modal"
  | "Select"
  | "Avatar"
  | "Tabs"
  | "Accordion";

export type CustomDensity = "compact" | "comfortable" | "spacious";
export type CustomEasing = "ease-out" | "ease-in-out" | "linear";

export interface CustomSemanticTokens {
  border: string;
  danger: string;
  focusRing: string;
  ink: string;
  mutedInk: string;
  primary: string;
  primaryHover: string;
  primarySoft: string;
  success: string;
  surface: string;
  surfaceElevated: string;
  warning: string;
}

export interface CustomGeometryTokens {
  borderWidth: string;
  cardRadius: string;
  controlRadius: string;
  modalRadius: string;
}

export interface CustomMotionTokens {
  duration: string;
  easing: CustomEasing;
  hoverLift: string;
  pressScale: string;
}

export interface CustomComponentOverride {
  accent?: string;
  density?: CustomDensity;
  enabled: boolean;
  radius?: string;
  surface?: string;
}

export interface CustomBrandDNA {
  /** 기존 ThemeBridge와의 호환성을 위한 primary 별칭입니다. */
  accent: string;
  componentOverrides: Partial<Record<ComponentId, CustomComponentOverride>>;
  descriptor: string;
  displayFont: string;
  geometry: CustomGeometryTokens;
  id: "custom";
  /** 기존 ThemeBridge와의 호환성을 위한 semantic ink 별칭입니다. */
  ink: string;
  material: "crisp" | "elastic" | "soft";
  motion: CustomMotionTokens;
  name: string;
  /** 기존 ThemeBridge와의 호환성을 위한 control radius 별칭입니다. */
  radius: string;
  sansFont: string;
  shadow: "ambient" | "sharp" | "soft";
  /** 기존 ThemeBridge와의 호환성을 위한 semantic surface 별칭입니다. */
  surface: string;
  tokens: CustomSemanticTokens;
}

export type VaultComponent = ComponentType<any>;

export interface VaultComponentSet {
  Button: VaultComponent;
  Input: VaultComponent;
  HeroCard: VaultComponent;
  Toast: VaultComponent;
  Badge: VaultComponent;
  Modal: VaultComponent;
  Select: VaultComponent;
  Avatar: VaultComponent;
  Tabs: VaultComponent;
  Accordion: VaultComponent;
}

export interface ShowcaseBrand {
  id: ShowcaseBrandId;
  name: string;
  directory: string;
  exportPrefix: string;
  descriptor: string;
  initials: string;
  accentClass: string;
  surfaceClass: string;
  borderClass: string;
  textClass: string;
  avatarClass: string;
  status: string;
}

export interface ThemeBridge {
  /** paletteBrandId의 색상·타이포그래피 표면과 materialBrandId의 깊이·반응을 전시 전용 skin layer에 합성합니다. */
  customBrand?: CustomBrandDNA;
  enabled: boolean;
  paletteBrandId: ThemeSourceId;
  materialBrandId: ThemeSourceId;
}

export interface ComponentViewerProps {
  /** 전시할 실제 vault 브랜드의 식별자입니다. */
  brandId: ShowcaseBrandId;
  /** 카탈로그 화면으로 돌아갈 때 실행할 함수입니다. */
  onBack?: () => void;
  /** 실제 vault 코드를 수정하지 않는 선택적 전시 테마 조합입니다. */
  themeBridge?: ThemeBridge;
}

export interface ShowcaseComponent {
  id: ComponentId;
  number: string;
  title: string;
  description: string;
}

export interface BrandTokenSet {
  colors: {
    primary: string;
    surface: string;
    ink: string;
    contrast: string;
  };
  typography: {
    sans: string;
    display: string;
  };
  radius: string;
  shadow: string;
  animation: string;
  paletteSurfaceClass: string;
  paletteBorderClass: string;
  paletteInkClass: string;
  paletteButtonClass: string;
  materialClass: string;
}
