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

export interface CustomBrandDNA {
  accent: string;
  descriptor: string;
  displayFont: string;
  id: "custom";
  ink: string;
  material: "crisp" | "elastic" | "soft";
  name: string;
  radius: string;
  sansFont: string;
  shadow: "ambient" | "sharp" | "soft";
  surface: string;
}

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
