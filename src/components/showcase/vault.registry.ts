import type { VaultComponentSet, ShowcaseBrandId } from "./showcase.types";

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

export const VAULT_COMPONENTS: Record<ShowcaseBrandId, VaultComponentSet> = {
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
