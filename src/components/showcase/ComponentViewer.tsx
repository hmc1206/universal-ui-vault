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

export interface ComponentViewerProps {
  /** 전시할 실제 vault 브랜드의 식별자입니다. */
  brandId: ShowcaseBrandId;
  /** 카탈로그 화면으로 돌아갈 때 실행할 함수입니다. */
  onBack?: () => void;
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

/**
 * 선택한 실제 vault 브랜드의 Button부터 Accordion까지 10개 구성요소를 렌더링하는 전시 화면입니다.
 * VAULT_COMPONENTS는 모든 실물 default export를 명시적으로 매핑하고, 선택된 brandId에 따라 정확한 한 세트만 전시에 사용합니다.
 * 기존 placeholder는 유지하지 않으며, control API 차이는 Hero, Toast, Select, Modal, Avatar의 작은 어댑터에서만 처리합니다.
 */
export function ComponentViewer({ brandId, onBack }: ComponentViewerProps) {
  const [copiedComponentId, setCopiedComponentId] = useState<ComponentId | null>(null);
  const matchedBrand = SHOWCASE_BRANDS.find((item) => item.id === brandId);
  const components = VAULT_COMPONENTS[brandId];

  if (!matchedBrand) {
    return null;
  }

  const brand = matchedBrand;

  async function handleCopy(componentId: ComponentId) {
    const snippet = getComponentImportSnippet(brand, componentId);

    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedComponentId(componentId);
      window.setTimeout(() => setCopiedComponentId(null), 1800);
    } catch {
      setCopiedComponentId(null);
    }
  }

  return (
    <section className="min-h-screen bg-[#f7f7f8] px-4 py-6 text-[#242429] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-[#e4e4e8] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            {onBack ? (
              <button
                aria-label="브랜드 목록으로 돌아가기"
                className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#dedee3] bg-white text-[#55555e] transition-colors duration-200 hover:bg-[#f0f0f2] focus-visible:ring-2 focus-visible:ring-[#55555e]/30"
                onClick={onBack}
                type="button"
              >
                <ArrowLeftIcon />
              </button>
            ) : null}
            <div>
              <div className="flex items-center gap-2">
                <span className={joinClasses("inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold", brand.avatarClass)}>{brand.initials}</span>
                <p className="text-sm font-semibold text-[#6b6b75]">{brand.name} component catalog</p>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">10개의 실제 구성요소</h1>
              <p className="mt-2 text-sm leading-6 text-[#6b6b75]">{brand.descriptor}의 실물 vault 구현을 렌더링하고 있습니다.</p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e8f7f0] px-3 py-1.5 text-xs font-semibold text-[#197a50]">
            <CheckIcon />
            {brand.status}
          </span>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SHOWCASE_COMPONENTS.map((component) => (
            <article className="flex min-h-[310px] flex-col overflow-hidden rounded-xl border border-[#e1e1e6] bg-white" key={component.id}>
              <div className="flex items-start justify-between gap-4 border-b border-[#eeeeF1] px-5 py-4">
                <div>
                  <p className={joinClasses("text-xs font-bold", brand.textClass)}>{component.number}</p>
                  <h2 className="mt-1 text-lg font-bold tracking-[-0.03em]">{component.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#777780]">{component.description}</p>
                </div>
                <button
                  className="shrink-0 rounded-lg border border-[#dedee3] px-2.5 py-1.5 text-xs font-semibold text-[#5c5c65] transition-colors duration-200 hover:bg-[#f3f3f5] focus-visible:ring-2 focus-visible:ring-[#55555e]/30"
                  onClick={() => handleCopy(component.id)}
                  type="button"
                >
                  {copiedComponentId === component.id ? "복사됨" : "코드 복사"}
                </button>
              </div>
              <div className={joinClasses("flex flex-1 items-center justify-center overflow-hidden p-5", brand.surfaceClass)}>
                <ComponentPreview brand={brand} componentId={component.id} components={components} />
              </div>
              <div className="border-t border-[#eeeeF1] px-5 py-3">
                <code className="text-[11px] text-[#7a7a84]">vault/{brand.directory}/{component.id}.tsx</code>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComponentViewer;
