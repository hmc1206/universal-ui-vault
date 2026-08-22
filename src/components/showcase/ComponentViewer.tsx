import { useState, type ChangeEvent, type ComponentType } from "react";
import TwentyNineCmButton from "../vault/29cm/Button";
import TwentyNineCmInput from "../vault/29cm/Input";
import TwentyNineCmHeroCard from "../vault/29cm/HeroCard";
import TwentyNineCmToast from "../vault/29cm/Toast";
import TwentyNineCmBadge from "../vault/29cm/Badge";
import TwentyNineCmModal from "../vault/29cm/Modal";
import TwentyNineCmSelect from "../vault/29cm/Select";
import TwentyNineCmAvatar from "../vault/29cm/Avatar";
import TwentyNineCmTabs from "../vault/29cm/Tabs";
import TwentyNineCmAccordion from "../vault/29cm/Accordion";
import AblyButton from "../vault/Ably/Button";
import AblyInput from "../vault/Ably/Input";
import AblyHeroCard from "../vault/Ably/HeroCard";
import AblyToast from "../vault/Ably/Toast";
import AblyBadge from "../vault/Ably/Badge";
import AblyModal from "../vault/Ably/Modal";
import AblySelect from "../vault/Ably/Select";
import AblyAvatar from "../vault/Ably/Avatar";
import AblyTabs from "../vault/Ably/Tabs";
import AblyAccordion from "../vault/Ably/Accordion";
import AppleButton from "../vault/Apple/Button";
import AppleInput from "../vault/Apple/Input";
import AppleHeroCard from "../vault/Apple/HeroCard";
import AppleToast from "../vault/Apple/Toast";
import AppleBadge from "../vault/Apple/Badge";
import AppleModal from "../vault/Apple/Modal";
import AppleSelect from "../vault/Apple/Select";
import AppleAvatar from "../vault/Apple/Avatar";
import AppleTabs from "../vault/Apple/Tabs";
import AppleAccordion from "../vault/Apple/Accordion";
import BaeminButton from "../vault/Baemin/Button";
import BaeminInput from "../vault/Baemin/Input";
import BaeminHeroCard from "../vault/Baemin/HeroCard";
import BaeminToast from "../vault/Baemin/Toast";
import BaeminBadge from "../vault/Baemin/Badge";
import BaeminModal from "../vault/Baemin/Modal";
import BaeminSelect from "../vault/Baemin/Select";
import BaeminAvatar from "../vault/Baemin/Avatar";
import BaeminTabs from "../vault/Baemin/Tabs";
import BaeminAccordion from "../vault/Baemin/Accordion";
import FigmaButton from "../vault/Figma/Button";
import FigmaInput from "../vault/Figma/Input";
import FigmaHeroCard from "../vault/Figma/HeroCard";
import FigmaToast from "../vault/Figma/Toast";
import FigmaBadge from "../vault/Figma/Badge";
import FigmaModal from "../vault/Figma/Modal";
import FigmaSelect from "../vault/Figma/Select";
import FigmaAvatar from "../vault/Figma/Avatar";
import FigmaTabs from "../vault/Figma/Tabs";
import FigmaAccordion from "../vault/Figma/Accordion";
import KakaoButton from "../vault/Kakao/Button";
import KakaoInput from "../vault/Kakao/Input";
import KakaoHeroCard from "../vault/Kakao/HeroCard";
import KakaoToast from "../vault/Kakao/Toast";
import KakaoBadge from "../vault/Kakao/Badge";
import KakaoModal from "../vault/Kakao/Modal";
import KakaoSelect from "../vault/Kakao/Select";
import KakaoAvatar from "../vault/Kakao/Avatar";
import KakaoTabs from "../vault/Kakao/Tabs";
import KakaoAccordion from "../vault/Kakao/Accordion";
import KakaoBankButton from "../vault/KakaoBank/Button";
import KakaoBankInput from "../vault/KakaoBank/Input";
import KakaoBankHeroCard from "../vault/KakaoBank/HeroCard";
import KakaoBankToast from "../vault/KakaoBank/Toast";
import KakaoBankBadge from "../vault/KakaoBank/Badge";
import KakaoBankModal from "../vault/KakaoBank/Modal";
import KakaoBankSelect from "../vault/KakaoBank/Select";
import KakaoBankAvatar from "../vault/KakaoBank/Avatar";
import KakaoBankTabs from "../vault/KakaoBank/Tabs";
import KakaoBankAccordion from "../vault/KakaoBank/Accordion";
import KarrotButton from "../vault/Karrot/Button";
import KarrotInput from "../vault/Karrot/Input";
import KarrotHeroCard from "../vault/Karrot/HeroCard";
import KarrotToast from "../vault/Karrot/Toast";
import KarrotBadge from "../vault/Karrot/Badge";
import KarrotModal from "../vault/Karrot/Modal";
import KarrotSelect from "../vault/Karrot/Select";
import KarrotAvatar from "../vault/Karrot/Avatar";
import KarrotTabs from "../vault/Karrot/Tabs";
import KarrotAccordion from "../vault/Karrot/Accordion";
import LikelionButton from "../vault/Likelion/Button";
import LikelionInput from "../vault/Likelion/Input";
import LikelionHeroCard from "../vault/Likelion/HeroCard";
import LikelionToast from "../vault/Likelion/Toast";
import LikelionBadge from "../vault/Likelion/Badge";
import LikelionModal from "../vault/Likelion/Modal";
import LikelionSelect from "../vault/Likelion/Select";
import LikelionAvatar from "../vault/Likelion/Avatar";
import LikelionTabs from "../vault/Likelion/Tabs";
import LikelionAccordion from "../vault/Likelion/Accordion";
import MusinsaButton from "../vault/Musinsa/Button";
import MusinsaInput from "../vault/Musinsa/Input";
import MusinsaHeroCard from "../vault/Musinsa/HeroCard";
import MusinsaToast from "../vault/Musinsa/Toast";
import MusinsaBadge from "../vault/Musinsa/Badge";
import MusinsaModal from "../vault/Musinsa/Modal";
import MusinsaSelect from "../vault/Musinsa/Select";
import MusinsaAvatar from "../vault/Musinsa/Avatar";
import MusinsaTabs from "../vault/Musinsa/Tabs";
import MusinsaAccordion from "../vault/Musinsa/Accordion";
import SamsungButton from "../vault/Samsung/Button";
import SamsungInput from "../vault/Samsung/Input";
import SamsungHeroCard from "../vault/Samsung/HeroCard";
import SamsungToast from "../vault/Samsung/Toast";
import SamsungBadge from "../vault/Samsung/Badge";
import SamsungModal from "../vault/Samsung/Modal";
import SamsungSelect from "../vault/Samsung/Select";
import SamsungAvatar from "../vault/Samsung/Avatar";
import SamsungTabs from "../vault/Samsung/Tabs";
import SamsungAccordion from "../vault/Samsung/Accordion";
import TeslaButton from "../vault/Tesla/Button";
import TeslaInput from "../vault/Tesla/Input";
import TeslaHeroCard from "../vault/Tesla/HeroCard";
import TeslaToast from "../vault/Tesla/Toast";
import TeslaBadge from "../vault/Tesla/Badge";
import TeslaModal from "../vault/Tesla/Modal";
import TeslaSelect from "../vault/Tesla/Select";
import TeslaAvatar from "../vault/Tesla/Avatar";
import TeslaTabs from "../vault/Tesla/Tabs";
import TeslaAccordion from "../vault/Tesla/Accordion";
import TossButton from "../vault/Toss/Button";
import TossInput from "../vault/Toss/Input";
import TossHeroCard from "../vault/Toss/HeroCard";
import TossToast from "../vault/Toss/Toast";
import TossBadge from "../vault/Toss/Badge";
import TossModal from "../vault/Toss/Modal";
import TossSelect from "../vault/Toss/Select";
import TossAvatar from "../vault/Toss/Avatar";
import TossTabs from "../vault/Toss/Tabs";
import TossAccordion from "../vault/Toss/Accordion";
import UpstageButton from "../vault/Upstage/Button";
import UpstageInput from "../vault/Upstage/Input";
import UpstageHeroCard from "../vault/Upstage/HeroCard";
import UpstageToast from "../vault/Upstage/Toast";
import UpstageBadge from "../vault/Upstage/Badge";
import UpstageModal from "../vault/Upstage/Modal";
import UpstageSelect from "../vault/Upstage/Select";
import UpstageAvatar from "../vault/Upstage/Avatar";
import UpstageTabs from "../vault/Upstage/Tabs";
import UpstageAccordion from "../vault/Upstage/Accordion";
import GoodChoiceButton from "../vault/여기어때/Button";
import GoodChoiceInput from "../vault/여기어때/Input";
import GoodChoiceHeroCard from "../vault/여기어때/HeroCard";
import GoodChoiceToast from "../vault/여기어때/Toast";
import GoodChoiceBadge from "../vault/여기어때/Badge";
import GoodChoiceModal from "../vault/여기어때/Modal";
import GoodChoiceSelect from "../vault/여기어때/Select";
import GoodChoiceAvatar from "../vault/여기어때/Avatar";
import GoodChoiceTabs from "../vault/여기어때/Tabs";
import GoodChoiceAccordion from "../vault/여기어때/Accordion";

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

type ComponentId =
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

type VaultComponent = ComponentType<any>;

interface VaultComponentSet {
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
  /** paletteBrandId의 색상·타이포그래피 표면과 materialBrandId의 깊이·반응을 전시 컨테이너에만 합성합니다. */
  enabled: boolean;
  paletteBrandId: ShowcaseBrandId;
  materialBrandId: ShowcaseBrandId;
}

export interface ComponentViewerProps {
  /** 전시할 실제 vault 브랜드의 식별자입니다. */
  brandId: ShowcaseBrandId;
  /** 카탈로그 화면으로 돌아갈 때 실행할 함수입니다. */
  onBack?: () => void;
  /** 실제 vault 코드를 수정하지 않는 선택적 전시 테마 조합입니다. */
  themeBridge?: ThemeBridge;
}

interface ShowcaseComponent {
  id: ComponentId;
  number: string;
  title: string;
  description: string;
}

export const SHOWCASE_BRANDS: ShowcaseBrand[] = [
  {
    id: "29cm",
    name: "29CM",
    directory: "29cm",
    exportPrefix: "TwentyNineCm",
    descriptor: "Editorial commerce with bold utility",
    initials: "29",
    accentClass: "bg-[#ff4800]",
    surfaceClass: "bg-[#fff6f2]",
    borderClass: "border-[#ffd8c5]",
    textClass: "text-[#e13e00]",
    avatarClass: "bg-[#ff4800] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "ably",
    name: "Ably",
    directory: "Ably",
    exportPrefix: "Ably",
    descriptor: "Realtime collaboration infrastructure",
    initials: "A",
    accentClass: "bg-[#ff5160]",
    surfaceClass: "bg-[#fff2ea]",
    borderClass: "border-[#ffd9d4]",
    textClass: "text-[#d83f4d]",
    avatarClass: "bg-[#ff5160] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "apple",
    name: "Apple",
    directory: "Apple",
    exportPrefix: "Apple",
    descriptor: "Precise, restrained, familiar",
    initials: "A",
    accentClass: "bg-[#1d1d1f]",
    surfaceClass: "bg-[#f5f5f7]",
    borderClass: "border-[#d2d2d7]",
    textClass: "text-[#1d1d1f]",
    avatarClass: "bg-[#1d1d1f] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "baemin",
    name: "Baemin",
    directory: "Baemin",
    exportPrefix: "Baemin",
    descriptor: "Friendly delivery and local discovery",
    initials: "B",
    accentClass: "bg-[#222222]",
    surfaceClass: "bg-[#f6f6f6]",
    borderClass: "border-[#c9c9c9]",
    textClass: "text-[#222222]",
    avatarClass: "bg-[#222222] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "figma",
    name: "Figma",
    directory: "Figma",
    exportPrefix: "Figma",
    descriptor: "Collaborative creative systems",
    initials: "F",
    accentClass: "bg-black",
    surfaceClass: "bg-[#f7f7f7]",
    borderClass: "border-[#ebebeb]",
    textClass: "text-black",
    avatarClass: "bg-black text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "kakao",
    name: "Kakao",
    directory: "Kakao",
    exportPrefix: "Kakao",
    descriptor: "Playful everyday connections",
    initials: "K",
    accentClass: "bg-[#fae100] !text-[#111111]",
    surfaceClass: "bg-[#fffce5]",
    borderClass: "border-[#f3d900]",
    textClass: "text-[#242424]",
    avatarClass: "bg-[#fae100] text-[#111111]",
    status: "10개 실물 연결됨",
  },
  {
    id: "kakaobank",
    name: "KakaoBank",
    directory: "KakaoBank",
    exportPrefix: "KakaoBank",
    descriptor: "Simple, approachable digital finance",
    initials: "KB",
    accentClass: "bg-[#FFE300] !text-[#111111]",
    surfaceClass: "bg-[#fffce1]",
    borderClass: "border-[#f1df58]",
    textClass: "text-[#5f5700]",
    avatarClass: "bg-[#FFE300] text-[#111111]",
    status: "10개 실물 연결됨",
  },
  {
    id: "karrot",
    name: "Karrot",
    directory: "Karrot",
    exportPrefix: "Karrot",
    descriptor: "Warm neighborhood marketplace",
    initials: "K",
    accentClass: "bg-[#ff6f0f]",
    surfaceClass: "bg-[#fff5f0]",
    borderClass: "border-[#ffe1d0]",
    textClass: "text-[#e55f00]",
    avatarClass: "bg-[#ff6f0f] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "likelion",
    name: "Likelion",
    directory: "Likelion",
    exportPrefix: "Likelion",
    descriptor: "Maker learning and community energy",
    initials: "L",
    accentClass: "bg-[#ff6000]",
    surfaceClass: "bg-[#fcf4ee]",
    borderClass: "border-[#fed5bb]",
    textClass: "text-[#d94d00]",
    avatarClass: "bg-[#ff6000] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "musinsa",
    name: "Musinsa",
    directory: "Musinsa",
    exportPrefix: "Musinsa",
    descriptor: "Direct fashion commerce utility",
    initials: "M",
    accentClass: "bg-black",
    surfaceClass: "bg-[#f5f5f5]",
    borderClass: "border-[#dddddd]",
    textClass: "text-black",
    avatarClass: "bg-black text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "samsung",
    name: "Samsung",
    directory: "Samsung",
    exportPrefix: "Samsung",
    descriptor: "Confident global product utility",
    initials: "S",
    accentClass: "bg-[#007aff]",
    surfaceClass: "bg-[#f7f7f7]",
    borderClass: "border-[#eeeeee]",
    textClass: "text-[#007aff]",
    avatarClass: "bg-[#007aff] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "tesla",
    name: "Tesla",
    directory: "Tesla",
    exportPrefix: "Tesla",
    descriptor: "Product-led sustainable energy marketing",
    initials: "T",
    accentClass: "bg-[#3e6ae1]",
    surfaceClass: "bg-[#f4f4f4]",
    borderClass: "border-[#d0d1d2]",
    textClass: "text-[#171a20]",
    avatarClass: "bg-[#3e6ae1] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "toss",
    name: "Toss",
    directory: "Toss",
    exportPrefix: "Toss",
    descriptor: "Clear financial utility",
    initials: "T",
    accentClass: "bg-[#3182f6]",
    surfaceClass: "bg-[#e8f3ff]",
    borderClass: "border-[#cfe5ff]",
    textClass: "text-[#1f6fd9]",
    avatarClass: "bg-[#3182f6] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "upstage",
    name: "Upstage",
    directory: "Upstage",
    exportPrefix: "Upstage",
    descriptor: "Focused AI workflow conversion",
    initials: "U",
    accentClass: "bg-[#5B52FF]",
    surfaceClass: "bg-[#f4f3ff]",
    borderClass: "border-[#dcd9ff]",
    textClass: "text-[#4a43d6]",
    avatarClass: "bg-[#5B52FF] text-white",
    status: "10개 실물 연결됨",
  },
  {
    id: "goodchoice",
    name: "여기어때",
    directory: "여기어때",
    exportPrefix: "GoodChoice",
    descriptor: "Direct travel and stay discovery",
    initials: "여",
    accentClass: "bg-[#F94239]",
    surfaceClass: "bg-[#fff3f2]",
    borderClass: "border-[#ffd5d1]",
    textClass: "text-[#d8342e]",
    avatarClass: "bg-[#F94239] text-white",
    status: "10개 실물 연결됨",
  },
];


interface BrandTokenSet {
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

const BRAND_TOKEN_VALUES: Record<ShowcaseBrandId, BrandTokenSet> = {
  "29cm": { colors: { primary: "#111111", surface: "#FFFFFF", ink: "#111111", contrast: "#FF4800" }, typography: { sans: "Pretendard, sans-serif", display: "Pretendard, sans-serif" }, radius: "0px", shadow: "0 12px 30px rgba(17,17,17,0.12)", animation: "cubic-bezier(0.2, 0.8, 0.2, 1)", paletteSurfaceClass: "bg-white", paletteBorderClass: "border-[#111111]", paletteInkClass: "text-[#111111]", paletteButtonClass: "bg-[#111111] text-white", materialClass: "shadow-[0_8px_20px_rgba(17,17,17,0.10)] hover:translate-y-0" },
  ably: { colors: { primary: "#FF5160", surface: "#FFF2EA", ink: "#2A1620", contrast: "#FF5160" }, typography: { sans: "Inter, sans-serif", display: "Inter, sans-serif" }, radius: "24px", shadow: "0 18px 42px rgba(255,81,96,0.24)", animation: "cubic-bezier(0.22, 1, 0.36, 1)", paletteSurfaceClass: "bg-[#fff2ea]", paletteBorderClass: "border-[#ffb6b5]", paletteInkClass: "text-[#3f1721]", paletteButtonClass: "bg-[#ff5160] text-white", materialClass: "shadow-[0_18px_40px_rgba(255,81,96,0.24)] hover:-translate-y-1" },
  apple: { colors: { primary: "#0071E3", surface: "#F5F5F7", ink: "#1D1D1F", contrast: "#0071E3" }, typography: { sans: "SF Pro Text, sans-serif", display: "SF Pro Display, sans-serif" }, radius: "18px", shadow: "0 18px 48px rgba(29,29,31,0.12)", animation: "cubic-bezier(0.16, 1, 0.3, 1)", paletteSurfaceClass: "bg-[#f5f5f7]", paletteBorderClass: "border-[#d2d2d7]", paletteInkClass: "text-[#1d1d1f]", paletteButtonClass: "bg-[#0071e3] text-white", materialClass: "shadow-[0_18px_48px_rgba(29,29,31,0.12)] hover:-translate-y-0.5" },
  baemin: { colors: { primary: "#0CEFD3", surface: "#F8FFFC", ink: "#222222", contrast: "#0CEFD3" }, typography: { sans: "BM Hanna, sans-serif", display: "BM Hanna, sans-serif" }, radius: "20px", shadow: "0 14px 0 rgba(34,34,34,0.16)", animation: "cubic-bezier(0.34, 1.56, 0.64, 1)", paletteSurfaceClass: "bg-[#f8fffc]", paletteBorderClass: "border-[#0cefd3]", paletteInkClass: "text-[#222222]", paletteButtonClass: "bg-[#0cefd3] text-[#111111]", materialClass: "shadow-[0_10px_0_rgba(34,34,34,0.16)] hover:-translate-y-1 active:translate-y-0" },
  figma: { colors: { primary: "#0D99FF", surface: "#2C2C2C", ink: "#111111", contrast: "#0D99FF" }, typography: { sans: "figmaSans, sans-serif", display: "figmaSans, sans-serif" }, radius: "8px", shadow: "0 16px 36px rgba(0,0,0,0.22)", animation: "cubic-bezier(0.2, 0, 0, 1)", paletteSurfaceClass: "bg-[#2c2c2c]", paletteBorderClass: "border-[#0d99ff]", paletteInkClass: "text-white", paletteButtonClass: "bg-[#0d99ff] text-white", materialClass: "shadow-[0_16px_36px_rgba(0,0,0,0.22)] hover:-translate-y-0.5" },
  kakao: { colors: { primary: "#FAE100", surface: "#FFFCE5", ink: "#242424", contrast: "#FAE100" }, typography: { sans: "Apple SD Gothic Neo, sans-serif", display: "Apple SD Gothic Neo, sans-serif" }, radius: "18px", shadow: "0 12px 28px rgba(92,72,0,0.18)", animation: "cubic-bezier(0.34, 1.56, 0.64, 1)", paletteSurfaceClass: "bg-[#fffce5]", paletteBorderClass: "border-[#f3d900]", paletteInkClass: "text-[#242424]", paletteButtonClass: "bg-[#fae100] text-[#111111]", materialClass: "shadow-[0_12px_28px_rgba(92,72,0,0.18)] hover:-translate-y-1" },
  kakaobank: { colors: { primary: "#FFE300", surface: "#FFFCE1", ink: "#111111", contrast: "#FFE300" }, typography: { sans: "Pretendard, sans-serif", display: "Pretendard, sans-serif" }, radius: "20px", shadow: "0 18px 38px rgba(65,56,0,0.14)", animation: "cubic-bezier(0.22, 1, 0.36, 1)", paletteSurfaceClass: "bg-[#fffce1]", paletteBorderClass: "border-[#f1df58]", paletteInkClass: "text-[#111111]", paletteButtonClass: "bg-[#ffe300] text-[#111111]", materialClass: "shadow-[0_18px_38px_rgba(65,56,0,0.14)] hover:-translate-y-1" },
  karrot: { colors: { primary: "#FF6F0F", surface: "#FFF5F0", ink: "#2B1B12", contrast: "#FF6F0F" }, typography: { sans: "Pretendard, sans-serif", display: "Pretendard, sans-serif" }, radius: "22px", shadow: "0 16px 34px rgba(255,111,15,0.20)", animation: "cubic-bezier(0.22, 1, 0.36, 1)", paletteSurfaceClass: "bg-[#fff5f0]", paletteBorderClass: "border-[#ffe1d0]", paletteInkClass: "text-[#2b1b12]", paletteButtonClass: "bg-[#ff6f0f] text-white", materialClass: "shadow-[0_16px_34px_rgba(255,111,15,0.20)] hover:-translate-y-1" },
  likelion: { colors: { primary: "#FF6000", surface: "#FCF4EE", ink: "#21160F", contrast: "#FF6000" }, typography: { sans: "Pretendard, sans-serif", display: "ui-monospace, monospace" }, radius: "12px", shadow: "0 14px 30px rgba(255,96,0,0.18)", animation: "cubic-bezier(0.2, 0.9, 0.2, 1)", paletteSurfaceClass: "bg-[#fcf4ee]", paletteBorderClass: "border-[#fed5bb]", paletteInkClass: "text-[#21160f]", paletteButtonClass: "bg-[#ff6000] text-white", materialClass: "shadow-[0_14px_30px_rgba(255,96,0,0.18)] hover:-translate-y-1" },
  musinsa: { colors: { primary: "#000000", surface: "#F5F5F5", ink: "#000000", contrast: "#000000" }, typography: { sans: "Pretendard, sans-serif", display: "Pretendard, sans-serif" }, radius: "0px", shadow: "0 10px 26px rgba(0,0,0,0.16)", animation: "cubic-bezier(0.2, 0.8, 0.2, 1)", paletteSurfaceClass: "bg-[#f5f5f5]", paletteBorderClass: "border-black", paletteInkClass: "text-black", paletteButtonClass: "bg-black text-white", materialClass: "shadow-[0_10px_26px_rgba(0,0,0,0.16)] hover:-translate-y-0.5" },
  samsung: { colors: { primary: "#007AFF", surface: "#F5F7FB", ink: "#1428A0", contrast: "#007AFF" }, typography: { sans: "SamsungOne, sans-serif", display: "SamsungSharpSans, sans-serif" }, radius: "24px", shadow: "0 18px 42px rgba(0,122,255,0.18)", animation: "cubic-bezier(0.2, 0.8, 0.2, 1)", paletteSurfaceClass: "bg-[#f5f7fb]", paletteBorderClass: "border-[#a7cfff]", paletteInkClass: "text-[#1428a0]", paletteButtonClass: "bg-[#007aff] text-white", materialClass: "shadow-[0_18px_42px_rgba(0,122,255,0.18)] hover:-translate-y-0.5" },
  tesla: { colors: { primary: "#3E6AE1", surface: "#F4F4F4", ink: "#171A20", contrast: "#3E6AE1" }, typography: { sans: "system-ui, sans-serif", display: "system-ui, sans-serif" }, radius: "8px", shadow: "0 16px 38px rgba(23,26,32,0.16)", animation: "cubic-bezier(0.2, 0.8, 0.2, 1)", paletteSurfaceClass: "bg-[#f4f4f4]", paletteBorderClass: "border-[#aeb2b8]", paletteInkClass: "text-[#171a20]", paletteButtonClass: "bg-[#3e6ae1] text-white", materialClass: "shadow-[0_16px_38px_rgba(23,26,32,0.16)] hover:-translate-y-0.5" },
  toss: { colors: { primary: "#3182F6", surface: "#E8F3FF", ink: "#191F28", contrast: "#3182F6" }, typography: { sans: "Pretendard, sans-serif", display: "Pretendard, sans-serif" }, radius: "28px", shadow: "0 18px 42px rgba(49,130,246,0.20)", animation: "cubic-bezier(0.22, 1.2, 0.36, 1)", paletteSurfaceClass: "bg-[#e8f3ff]", paletteBorderClass: "border-[#cfe5ff]", paletteInkClass: "text-[#191f28]", paletteButtonClass: "bg-[#3182f6] text-white", materialClass: "shadow-[0_18px_42px_rgba(49,130,246,0.20)] hover:-translate-y-1 active:scale-[0.985]" },
  upstage: { colors: { primary: "#5B52FF", surface: "#F4F3FF", ink: "#0A0D14", contrast: "#5B52FF" }, typography: { sans: "Geist, sans-serif", display: "Espeak, sans-serif" }, radius: "8px", shadow: "0 18px 44px rgba(91,82,255,0.22)", animation: "cubic-bezier(0.22, 1, 0.36, 1)", paletteSurfaceClass: "bg-[#f4f3ff]", paletteBorderClass: "border-[#dcd9ff]", paletteInkClass: "text-[#0a0d14]", paletteButtonClass: "bg-[#5b52ff] text-white", materialClass: "shadow-[0_18px_44px_rgba(91,82,255,0.22)] hover:-translate-y-1" },
  goodchoice: { colors: { primary: "#F94239", surface: "#FFF3F2", ink: "#2B1716", contrast: "#F94239" }, typography: { sans: "Pretendard, sans-serif", display: "Pretendard, sans-serif" }, radius: "18px", shadow: "0 18px 40px rgba(249,66,57,0.20)", animation: "cubic-bezier(0.22, 1, 0.36, 1)", paletteSurfaceClass: "bg-[#fff3f2]", paletteBorderClass: "border-[#ffd5d1]", paletteInkClass: "text-[#2b1716]", paletteButtonClass: "bg-[#f94239] text-white", materialClass: "shadow-[0_18px_40px_rgba(249,66,57,0.20)] hover:-translate-y-1" },
};

const THEME_BRIDGE_TYPOGRAPHY_CLASSES: Record<ShowcaseBrandId, string> = {
  "29cm": "tracking-[-0.025em]",
  ably: "tracking-[-0.035em]",
  apple: "tracking-[-0.04em]",
  baemin: "tracking-[-0.02em]",
  figma: "tracking-[-0.02em]",
  kakao: "tracking-[-0.02em]",
  kakaobank: "tracking-[-0.025em]",
  karrot: "tracking-[-0.025em]",
  likelion: "font-mono tracking-[-0.02em]",
  musinsa: "tracking-[-0.04em]",
  samsung: "tracking-[-0.03em]",
  tesla: "tracking-[0.01em]",
  toss: "tracking-[-0.035em]",
  upstage: "tracking-[-0.03em]",
  goodchoice: "tracking-[-0.02em]",
};

function getTailwindConfigSnippet(brand: ShowcaseBrand) {
  const tokens = BRAND_TOKEN_VALUES[brand.id];
  const theme = {
    theme: {
      extend: {
        colors: {
          brand: tokens.colors.primary,
          "brand-surface": tokens.colors.surface,
          "brand-ink": tokens.colors.ink,
          "brand-contrast": tokens.colors.contrast,
        },
        fontFamily: {
          brand: [tokens.typography.sans],
          "brand-display": [tokens.typography.display],
        },
        borderRadius: {
          brand: tokens.radius,
        },
        boxShadow: {
          brand: tokens.shadow,
        },
        transitionTimingFunction: {
          brand: tokens.animation,
        },
      },
    },
  };

  return `// ${brand.name} vault theme tokens\nexport const ${brand.exportPrefix}TailwindTheme = ${JSON.stringify(theme, null, 2)} as const;`;
}

const VAULT_COMPONENTS: Record<ShowcaseBrandId, VaultComponentSet> = {
  "29cm": {
    Button: TwentyNineCmButton,
    Input: TwentyNineCmInput,
    HeroCard: TwentyNineCmHeroCard,
    Toast: TwentyNineCmToast,
    Badge: TwentyNineCmBadge,
    Modal: TwentyNineCmModal,
    Select: TwentyNineCmSelect,
    Avatar: TwentyNineCmAvatar,
    Tabs: TwentyNineCmTabs,
    Accordion: TwentyNineCmAccordion,
  },
  ably: {
    Button: AblyButton,
    Input: AblyInput,
    HeroCard: AblyHeroCard,
    Toast: AblyToast,
    Badge: AblyBadge,
    Modal: AblyModal,
    Select: AblySelect,
    Avatar: AblyAvatar,
    Tabs: AblyTabs,
    Accordion: AblyAccordion,
  },
  apple: {
    Button: AppleButton,
    Input: AppleInput,
    HeroCard: AppleHeroCard,
    Toast: AppleToast,
    Badge: AppleBadge,
    Modal: AppleModal,
    Select: AppleSelect,
    Avatar: AppleAvatar,
    Tabs: AppleTabs,
    Accordion: AppleAccordion,
  },
  baemin: {
    Button: BaeminButton,
    Input: BaeminInput,
    HeroCard: BaeminHeroCard,
    Toast: BaeminToast,
    Badge: BaeminBadge,
    Modal: BaeminModal,
    Select: BaeminSelect,
    Avatar: BaeminAvatar,
    Tabs: BaeminTabs,
    Accordion: BaeminAccordion,
  },
  figma: {
    Button: FigmaButton,
    Input: FigmaInput,
    HeroCard: FigmaHeroCard,
    Toast: FigmaToast,
    Badge: FigmaBadge,
    Modal: FigmaModal,
    Select: FigmaSelect,
    Avatar: FigmaAvatar,
    Tabs: FigmaTabs,
    Accordion: FigmaAccordion,
  },
  kakao: {
    Button: KakaoButton,
    Input: KakaoInput,
    HeroCard: KakaoHeroCard,
    Toast: KakaoToast,
    Badge: KakaoBadge,
    Modal: KakaoModal,
    Select: KakaoSelect,
    Avatar: KakaoAvatar,
    Tabs: KakaoTabs,
    Accordion: KakaoAccordion,
  },
  kakaobank: {
    Button: KakaoBankButton,
    Input: KakaoBankInput,
    HeroCard: KakaoBankHeroCard,
    Toast: KakaoBankToast,
    Badge: KakaoBankBadge,
    Modal: KakaoBankModal,
    Select: KakaoBankSelect,
    Avatar: KakaoBankAvatar,
    Tabs: KakaoBankTabs,
    Accordion: KakaoBankAccordion,
  },
  karrot: {
    Button: KarrotButton,
    Input: KarrotInput,
    HeroCard: KarrotHeroCard,
    Toast: KarrotToast,
    Badge: KarrotBadge,
    Modal: KarrotModal,
    Select: KarrotSelect,
    Avatar: KarrotAvatar,
    Tabs: KarrotTabs,
    Accordion: KarrotAccordion,
  },
  likelion: {
    Button: LikelionButton,
    Input: LikelionInput,
    HeroCard: LikelionHeroCard,
    Toast: LikelionToast,
    Badge: LikelionBadge,
    Modal: LikelionModal,
    Select: LikelionSelect,
    Avatar: LikelionAvatar,
    Tabs: LikelionTabs,
    Accordion: LikelionAccordion,
  },
  musinsa: {
    Button: MusinsaButton,
    Input: MusinsaInput,
    HeroCard: MusinsaHeroCard,
    Toast: MusinsaToast,
    Badge: MusinsaBadge,
    Modal: MusinsaModal,
    Select: MusinsaSelect,
    Avatar: MusinsaAvatar,
    Tabs: MusinsaTabs,
    Accordion: MusinsaAccordion,
  },
  samsung: {
    Button: SamsungButton,
    Input: SamsungInput,
    HeroCard: SamsungHeroCard,
    Toast: SamsungToast,
    Badge: SamsungBadge,
    Modal: SamsungModal,
    Select: SamsungSelect,
    Avatar: SamsungAvatar,
    Tabs: SamsungTabs,
    Accordion: SamsungAccordion,
  },
  tesla: {
    Button: TeslaButton,
    Input: TeslaInput,
    HeroCard: TeslaHeroCard,
    Toast: TeslaToast,
    Badge: TeslaBadge,
    Modal: TeslaModal,
    Select: TeslaSelect,
    Avatar: TeslaAvatar,
    Tabs: TeslaTabs,
    Accordion: TeslaAccordion,
  },
  toss: {
    Button: TossButton,
    Input: TossInput,
    HeroCard: TossHeroCard,
    Toast: TossToast,
    Badge: TossBadge,
    Modal: TossModal,
    Select: TossSelect,
    Avatar: TossAvatar,
    Tabs: TossTabs,
    Accordion: TossAccordion,
  },
  upstage: {
    Button: UpstageButton,
    Input: UpstageInput,
    HeroCard: UpstageHeroCard,
    Toast: UpstageToast,
    Badge: UpstageBadge,
    Modal: UpstageModal,
    Select: UpstageSelect,
    Avatar: UpstageAvatar,
    Tabs: UpstageTabs,
    Accordion: UpstageAccordion,
  },
  goodchoice: {
    Button: GoodChoiceButton,
    Input: GoodChoiceInput,
    HeroCard: GoodChoiceHeroCard,
    Toast: GoodChoiceToast,
    Badge: GoodChoiceBadge,
    Modal: GoodChoiceModal,
    Select: GoodChoiceSelect,
    Avatar: GoodChoiceAvatar,
    Tabs: GoodChoiceTabs,
    Accordion: GoodChoiceAccordion,
  },
};

const SHOWCASE_COMPONENTS: ShowcaseComponent[] = [
  { id: "Button", number: "01", title: "Button", description: "핵심 행동을 명확히 전달하는 실제 버튼" },
  { id: "Input", number: "02", title: "Input", description: "입력과 피드백을 위한 실제 필드" },
  { id: "HeroCard", number: "03", title: "Hero Card", description: "브랜드의 첫인상을 만드는 실제 콘텐츠 영역" },
  { id: "Toast", number: "04", title: "Toast", description: "짧고 분명한 상태 안내" },
  { id: "Badge", number: "05", title: "Badge", description: "상태와 카테고리를 구분하는 태그" },
  { id: "Modal", number: "06", title: "Modal", description: "중요한 결정을 돕는 실제 대화상자" },
  { id: "Select", number: "07", title: "Select", description: "옵션을 고르는 실제 선택 컨트롤" },
  { id: "Avatar", number: "08", title: "Avatar", description: "사람과 팀을 보여주는 프로필" },
  { id: "Tabs", number: "09", title: "Tabs", description: "정보 영역을 전환하는 실제 탭" },
  { id: "Accordion", number: "10", title: "Accordion", description: "필요한 정보만 펼쳐 보는 실제 메뉴" },
];

const ACTION_PAIR_HERO_BRANDS = new Set<ShowcaseBrandId>(["apple", "baemin", "figma", "kakao", "karrot"]);
const VISIBLE_TOAST_BRANDS = new Set<ShowcaseBrandId>(["baemin", "kakao", "karrot"]);
const NATIVE_FORM_BRANDS = new Set<ShowcaseBrandId>(["apple", "figma"]);
const NATIVE_MODAL_BRANDS = new Set<ShowcaseBrandId>(["apple", "figma"]);

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function noOp() {
  return undefined;
}

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

function PreviewLaunchButton({ brand, label, onClick }: { brand: ShowcaseBrand; label: string; onClick: () => void }) {
  return (
    <button
      className={joinClasses("inline-flex min-h-10 items-center justify-center rounded-lg border px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#242429]/35 focus-visible:ring-offset-2", brand.avatarClass)}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function VaultModalPreview({ brand, components }: { brand: ShowcaseBrand; components: VaultComponentSet }) {
  const [open, setOpen] = useState(false);
  const Modal = components.Modal;
  const isNativeModal = NATIVE_MODAL_BRANDS.has(brand.id);
  const footer = (
    <div className="flex justify-end gap-2">
      <button className="rounded-lg px-3 py-2 text-sm font-semibold text-[#55555e]" onClick={() => setOpen(false)} type="button">
        나중에
      </button>
      <button className={joinClasses("rounded-lg px-3 py-2 text-sm font-semibold", brand.avatarClass)} onClick={() => setOpen(false)} type="button">
        저장하기
      </button>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <PreviewLaunchButton brand={brand} label="실제 모달 열기" onClick={() => setOpen(true)} />
      <p className="text-center text-xs leading-5 text-[#777780]">열기 버튼을 누르면 해당 vault의 실제 모달이 화면에 표시됩니다.</p>
      {isNativeModal ? (
        <Modal
          closeOnBackdrop
          description="이 변경은 언제든 다시 조정할 수 있습니다."
          footer={footer}
          onClose={() => setOpen(false)}
          open={open}
          title="변경 사항을 저장할까요?"
        >
          팀이 다음 검토를 시작하기 전에 현재 구성을 저장합니다.
        </Modal>
      ) : (
        <Modal
          actions={[
            { label: "나중에", onClick: () => setOpen(false) },
            { label: "저장하기", onClick: () => setOpen(false) },
          ]}
          closeOnBackdrop
          description="이 변경은 언제든 다시 조정할 수 있습니다."
          dismissible
          onClose={() => setOpen(false)}
          open={open}
          title="변경 사항을 저장할까요?"
        >
          팀이 다음 검토를 시작하기 전에 현재 구성을 저장합니다.
        </Modal>
      )}
    </div>
  );
}

function VaultTabsPreview({ components }: { components: VaultComponentSet }) {
  const [activeTab, setActiveTab] = useState("overview");
  const Tabs = components.Tabs;

  return (
    <div className="w-full">
      <Tabs
        ariaLabel="전시 탭"
        className="w-full"
        layout="fill"
        onChange={setActiveTab}
        tabs={[
          { value: "overview", label: "개요" },
          { value: "details", label: "상세" },
          { value: "activity", label: "활동" },
        ]}
        value={activeTab}
      />
      <p className="mt-4 text-sm leading-6 text-[#66666f]">{activeTab === "overview" ? "개요" : activeTab === "details" ? "상세" : "활동"} 탭의 실제 선택 상태를 확인하고 있어요.</p>
    </div>
  );
}

function VaultSelectPreview({ brandId, components }: { brandId: ShowcaseBrandId; components: VaultComponentSet }) {
  const [value, setValue] = useState("design");
  const Select = components.Select;
  const options = [
    { value: "design", label: "디자인" },
    { value: "prototype", label: "프로토타입" },
    { value: "review", label: "검토" },
  ];

  if (NATIVE_FORM_BRANDS.has(brandId)) {
    return (
      <div className="w-full max-w-xs">
        <Select
          label="작업 유형"
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setValue(event.target.value)}
          options={options}
          value={value}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs">
      <Select label="작업 유형" onChange={(nextValue: string) => setValue(nextValue)} options={options} value={value} />
    </div>
  );
}

function VaultToastPreview({ brand, components }: { brand: ShowcaseBrand; components: VaultComponentSet }) {
  const Toast = components.Toast;
  const sharedClassName = "!static !w-full !max-w-sm";

  if (VISIBLE_TOAST_BRANDS.has(brand.id)) {
    return <Toast className={sharedClassName} dismissible duration={0} message="변경한 내용이 저장되었어요." onDismiss={noOp} variant="success" visible />;
  }

  if (NATIVE_FORM_BRANDS.has(brand.id)) {
    return <Toast className={sharedClassName} description="팀원에게 바로 공유할 수 있어요." onClose={noOp} title="변경한 내용이 저장되었어요." tone="success" />;
  }

  return <Toast className={sharedClassName} description="팀원에게 바로 공유할 수 있어요." duration={0} onClose={noOp} open status="success" title="변경한 내용이 저장되었어요." />;
}

function VaultHeroPreview({ brand, components }: { brand: ShowcaseBrand; components: VaultComponentSet }) {
  const HeroCard = components.HeroCard;
  const title = `${brand.name}로 팀의 다음 작업을 이어가세요.`;
  const description = "만들고, 검토하고, 공유하는 흐름을 한 화면에서 분명하게 연결합니다.";

  if (ACTION_PAIR_HERO_BRANDS.has(brand.id)) {
    return (
      <HeroCard
        description={description}
        eyebrow="TEAM WORKFLOW"
        primaryAction={{ label: "시작하기", onClick: noOp }}
        secondaryAction={{ label: "자세히 보기", onClick: noOp }}
        title={title}
      />
    );
  }

  return <HeroCard actions={[{ label: "시작하기", onClick: noOp }]} description={description} eyebrow="TEAM WORKFLOW" title={title} />;
}

function ComponentPreview({ brand, componentId, components }: { brand: ShowcaseBrand; componentId: ComponentId; components: VaultComponentSet }) {
  if (componentId === "Button") {
    const Button = components.Button;
    return <Button type="button">계속하기</Button>;
  }

  if (componentId === "Input") {
    const Input = components.Input;
    return (
      <div className="w-full max-w-xs">
        <Input label="이메일" placeholder="name@example.com" type="email" />
      </div>
    );
  }

  if (componentId === "HeroCard") {
    return <VaultHeroPreview brand={brand} components={components} />;
  }

  if (componentId === "Toast") {
    return <VaultToastPreview brand={brand} components={components} />;
  }

  if (componentId === "Badge") {
    const Badge = components.Badge;
    return <Badge>새 소식</Badge>;
  }

  if (componentId === "Modal") {
    return <VaultModalPreview brand={brand} components={components} />;
  }

  if (componentId === "Select") {
    return <VaultSelectPreview brandId={brand.id} components={components} />;
  }

  if (componentId === "Avatar") {
    const Avatar = components.Avatar;
    const isNativeAvatar = NATIVE_FORM_BRANDS.has(brand.id);

    return (
      <div className="flex items-center gap-3">
        {isNativeAvatar ? <Avatar name="Alex Kim" size="lg" status="active" /> : <Avatar name="Alex Kim" showStatus size="lg" status="active" />}
        <div>
          <p className="text-sm font-semibold text-[#242429]">Alex Kim</p>
          <p className="mt-1 text-xs text-[#777780]">활동 중</p>
        </div>
      </div>
    );
  }

  if (componentId === "Tabs") {
    return <VaultTabsPreview components={components} />;
  }

  const Accordion = components.Accordion;
  return (
    <div className="w-full">
      <Accordion
        defaultOpenValues={["usage"]}
        items={[
          {
            value: "usage",
            title: "이 구성요소는 어떻게 사용하나요?",
            content: "실제 vault 컴포넌트의 펼침 상태와 정보 위계를 이 전시 카드에서 바로 확인할 수 있습니다.",
          },
          {
            value: "team",
            title: "팀과 공유하려면 어떻게 하나요?",
            content: "각 카드 아래의 코드 복사 버튼으로 해당 브랜드와 컴포넌트의 import 경로를 가져갈 수 있습니다.",
          },
        ]}
      />
    </div>
  );
}

function getComponentImportSnippet(brand: ShowcaseBrand, componentId: ComponentId) {
  const exportedName = `${brand.exportPrefix}${componentId}`;

  return `// Vault file\n// src/components/vault/${brand.directory}/${componentId}.tsx\n\nimport ${exportedName} from "@/components/vault/${brand.directory}/${componentId}";\n\nexport function Example() {\n  return <${exportedName} />;\n}`;
}

function PreviewPane({ label, seniorMode, children }: { label: string; seniorMode: boolean; children: React.ReactNode }) {
  return (
    <section
      aria-label={label}
      className={joinClasses(
        "relative flex min-h-[238px] w-full items-center justify-center overflow-auto rounded-xl border p-4",
        seniorMode
          ? "border-yellow-300 bg-black text-white shadow-[inset_0_0_0_2px_#ffffff] [&_button]:!min-h-12 [&_button]:!border-2 [&_button]:!border-yellow-300 [&_button]:!bg-yellow-300 [&_button]:!px-4 [&_button]:!text-[1.5em] [&_button]:!text-black [&_input]:!min-h-12 [&_input]:!border-2 [&_input]:!border-yellow-300 [&_input]:!bg-black [&_input]:!text-[1.5em] [&_input]:!text-white [&_select]:!min-h-12 [&_select]:!border-2 [&_select]:!border-yellow-300 [&_select]:!bg-black [&_select]:!text-[1.5em] [&_select]:!text-white [&_p]:!text-[1.5em] [&_span]:!text-[1.5em] [&_h1]:!text-[1.5em] [&_h2]:!text-[1.5em] [&_h3]:!text-[1.5em]"
          : "border-[#ececf0] bg-white",
      )}
    >
      <span className={joinClasses("absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-bold", seniorMode ? "bg-yellow-300 text-black" : "bg-[#f1f2f5] text-[#63636d]")}>{label}</span>
      <div className={joinClasses("w-full pt-6", seniorMode ? "min-w-[310px]" : "")}>{children}</div>
    </section>
  );
}

function ComponentComparison({ brand, component, components, seniorMode }: { brand: ShowcaseBrand; component: ShowcaseComponent; components: VaultComponentSet; seniorMode: boolean }) {
  const preview = <ComponentPreview brand={brand} componentId={component.id} components={components} />;

  if (!seniorMode) {
    return <PreviewPane label="일반 모드" seniorMode={false}>{preview}</PreviewPane>;
  }

  return (
    <div className="grid w-full gap-3 xl:grid-cols-2">
      <PreviewPane label="일반 모드" seniorMode={false}><ComponentPreview brand={brand} componentId={component.id} components={components} /></PreviewPane>
      <PreviewPane label="시니어 모드 · 150% 텍스트" seniorMode><ComponentPreview brand={brand} componentId={component.id} components={components} /></PreviewPane>
    </div>
  );
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.className = "fixed -left-[9999px] top-0 opacity-0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

/**
 * 선택한 실제 vault 브랜드의 Button부터 Accordion까지 10개 구성요소를 렌더링하는 지능형 전시 화면입니다.
 * ThemeBridge는 컨테이너 레이어에서만 팔레트와 물성을 합성하며, VAULT_COMPONENTS의 실제 코드는 변형하지 않습니다.
 */
export function ComponentViewer({ brandId, onBack, themeBridge }: ComponentViewerProps) {
  const [copiedComponentId, setCopiedComponentId] = useState<ComponentId | null>(null);
  const [tokenCopied, setTokenCopied] = useState(false);
  const [seniorMode, setSeniorMode] = useState(false);
  const matchedBrand = SHOWCASE_BRANDS.find((item) => item.id === brandId);
  const components = VAULT_COMPONENTS[brandId];

  if (!matchedBrand) {
    return null;
  }

  const brand = matchedBrand;
  const isThemeBridgeEnabled = Boolean(themeBridge?.enabled);
  const paletteTokens = BRAND_TOKEN_VALUES[isThemeBridgeEnabled ? themeBridge!.paletteBrandId : brand.id];
  const materialTokens = BRAND_TOKEN_VALUES[isThemeBridgeEnabled ? themeBridge!.materialBrandId : brand.id];
  const paletteBrandId = isThemeBridgeEnabled ? themeBridge!.paletteBrandId : brand.id;
  const materialBrandId = isThemeBridgeEnabled ? themeBridge!.materialBrandId : brand.id;
  const paletteBrand = SHOWCASE_BRANDS.find((item) => item.id === paletteBrandId) ?? brand;
  const materialBrand = SHOWCASE_BRANDS.find((item) => item.id === materialBrandId) ?? brand;
  const bridgeTypographyClass = THEME_BRIDGE_TYPOGRAPHY_CLASSES[paletteBrandId];

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
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5e616a]">{brand.descriptor}의 실제 vault 구현을 렌더링하고 있습니다. 테마 합성과 시니어 보기는 전시 컨테이너에만 적용됩니다.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                aria-pressed={seniorMode}
                className={joinClasses("inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#242429]/30", seniorMode ? "border-black bg-black text-white" : "border-[#cfd2d9] bg-white text-[#30323a]")}
                onClick={() => setSeniorMode((value) => !value)}
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
                {isThemeBridgeEnabled ? `${paletteBrand.name}의 팔레트·타이포그래피 × ${materialBrand.name}의 그림자·반응을 실제 컴포넌트 주변 컨테이너에 합성합니다.` : `${brand.name} vault의 원래 토큰과 2026 접근성 확장 레이어를 사용합니다.`}
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
            <p className="mt-1 text-sm leading-6">각 카드에서 일반 모드와 시니어 모드를 나란히 비교합니다. 시니어 모드는 텍스트를 150%로 확대하고, button/input/select hit area를 최소 48px로 키우며, yellow-on-black 고대비 경계를 표시합니다.</p>
          </aside>
        ) : null}

        <div className={joinClasses("mt-6 grid gap-4", seniorMode ? "xl:grid-cols-1" : "md:grid-cols-2 xl:grid-cols-3")}>
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
                <ComponentComparison brand={brand} component={component} components={components} seniorMode={seniorMode} />
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
