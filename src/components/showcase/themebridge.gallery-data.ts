import type { ShowcaseBrandId } from "./showcase.types";

export interface GalleryRecipe {
  id: string;
  paletteBrandId: ShowcaseBrandId;
  materialBrandId: ShowcaseBrandId;
  title: string;
  description: string;
}

export const GALLERY_RECIPES: GalleryRecipe[] = [
  {
    id: "29cm-toss",
    paletteBrandId: "29cm",
    materialBrandId: "toss",
    title: "Editorial Soft Utility",
    description: "29CM의 절제된 흑백 편집감에 Toss의 넓고 탄성적인 표면 반응을 결합합니다.",
  },
  {
    id: "apple-ably",
    paletteBrandId: "apple",
    materialBrandId: "ably",
    title: "Calm Signal",
    description: "Apple의 중립적인 정밀도를 Ably의 선명한 볼륨과 빠른 협업 신호로 확장합니다.",
  },
  {
    id: "figma-karrot",
    paletteBrandId: "figma",
    materialBrandId: "karrot",
    title: "Maker Neighborhood",
    description: "Figma의 도구형 대비 위에 Karrot의 따뜻하고 가벼운 부상감을 얹습니다.",
  },
  {
    id: "kakao-tesla",
    paletteBrandId: "kakao",
    materialBrandId: "tesla",
    title: "Bright Product Drive",
    description: "Kakao의 일상적인 옐로우를 Tesla의 제품 중심 깊이와 안정적인 동작으로 조합합니다.",
  },
  {
    id: "upstage-samsung",
    paletteBrandId: "upstage",
    materialBrandId: "samsung",
    title: "AI Product Clarity",
    description: "Upstage의 violet conversion surface에 Samsung의 넓고 단정한 제품 물성을 적용합니다.",
  },
  {
    id: "musinsa-toss",
    paletteBrandId: "musinsa",
    materialBrandId: "toss",
    title: "Mono Elastic Commerce",
    description: "Musinsa의 강한 모노크롬 대비를 Toss의 부드러운 depth와 elastic feedback으로 완화합니다.",
  },
  {
    id: "baemin-apple",
    paletteBrandId: "baemin",
    materialBrandId: "apple",
    title: "Friendly Precision",
    description: "Baemin의 친근한 민트 표면을 Apple의 차분하고 정밀한 rise-and-settle 움직임에 연결합니다.",
  },
  {
    id: "goodchoice-likelion",
    paletteBrandId: "goodchoice",
    materialBrandId: "likelion",
    title: "Travel Builder Energy",
    description: "여기어때의 여행 탐색감에 Likelion의 maker 에너지와 실행형 공간감을 더합니다.",
  },
];

export const MATERIAL_PREVIEW_CLASSES: Record<ShowcaseBrandId, string> = {
  "29cm": "rounded-none shadow-[0_10px_22px_rgba(17,17,17,0.14)]",
  ably: "rounded-[24px] shadow-[0_18px_36px_rgba(255,81,96,0.24)]",
  apple: "rounded-[18px] shadow-[0_16px_32px_rgba(29,29,31,0.14)]",
  baemin: "rounded-[20px] shadow-[0_9px_0_rgba(34,34,34,0.16)]",
  figma: "rounded-lg shadow-[0_16px_32px_rgba(0,0,0,0.24)]",
  kakao: "rounded-[18px] shadow-[0_12px_26px_rgba(92,72,0,0.18)]",
  kakaobank: "rounded-[20px] shadow-[0_16px_32px_rgba(65,56,0,0.16)]",
  karrot: "rounded-[22px] shadow-[0_16px_32px_rgba(255,111,15,0.20)]",
  likelion: "rounded-xl shadow-[0_14px_28px_rgba(255,96,0,0.18)]",
  musinsa: "rounded-none shadow-[0_10px_22px_rgba(0,0,0,0.16)]",
  samsung: "rounded-[24px] shadow-[0_18px_36px_rgba(0,122,255,0.18)]",
  tesla: "rounded-lg shadow-[0_16px_32px_rgba(23,26,32,0.16)]",
  toss: "rounded-[28px] shadow-[0_18px_36px_rgba(49,130,246,0.20)]",
  upstage: "rounded-lg shadow-[0_18px_36px_rgba(91,82,255,0.22)]",
  goodchoice: "rounded-[18px] shadow-[0_18px_36px_rgba(249,66,57,0.20)]",
};

export const MATERIAL_LABELS: Record<ShowcaseBrandId, string> = {
  "29cm": "flat editorial edge",
  ably: "realtime volume",
  apple: "restrained lift",
  baemin: "playful press",
  figma: "tool precision",
  kakao: "soft bubble pop",
  kakaobank: "calm financial lift",
  karrot: "warm neighborhood rise",
  likelion: "maker energy",
  musinsa: "hard contrast snap",
  samsung: "wide product depth",
  tesla: "product-led settle",
  toss: "elastic soft depth",
  upstage: "AI conversion glow",
  goodchoice: "travel ticket lift",
};

export interface MaterialMotionRecipe {
  ambientClass: string;
  chipClass: string;
  label: string;
  orbitClass: string;
}

export const MATERIAL_MOTION_RECIPES: Record<ShowcaseBrandId, MaterialMotionRecipe> = {
  "29cm": {
    ambientClass: "animate-[pulse_3.2s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "editorial glide",
    orbitClass: "animate-[pulse_2.4s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  ably: {
    ambientClass: "animate-[pulse_1.15s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:scale-105 transition duration-200 ease-out motion-reduce:transition-none",
    label: "realtime pulse",
    orbitClass: "animate-[bounce_1.2s_infinite] motion-reduce:animate-none",
  },
  apple: {
    ambientClass: "animate-[pulse_3.6s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-0.5 transition-transform duration-500 ease-out motion-reduce:transition-none",
    label: "restrained settle",
    orbitClass: "animate-[pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  baemin: {
    ambientClass: "animate-[bounce_1.8s_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-y-1 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "playful press",
    orbitClass: "animate-[bounce_1.1s_infinite] motion-reduce:animate-none",
  },
  figma: {
    ambientClass: "animate-[spin_10s_linear_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "tool orbit",
    orbitClass: "animate-[spin_5s_linear_infinite] motion-reduce:animate-none",
  },
  kakao: {
    ambientClass: "animate-[pulse_1.8s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:rotate-2 transition duration-200 ease-out motion-reduce:transition-none",
    label: "bubble pop",
    orbitClass: "animate-[bounce_1.6s_infinite] motion-reduce:animate-none",
  },
  kakaobank: {
    ambientClass: "animate-[pulse_2.5s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "calm lift",
    orbitClass: "animate-[pulse_2.1s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  karrot: {
    ambientClass: "animate-[pulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:rotate-1 transition duration-200 ease-out motion-reduce:transition-none",
    label: "warm rise",
    orbitClass: "animate-[bounce_1.4s_infinite] motion-reduce:animate-none",
  },
  likelion: {
    ambientClass: "animate-[pulse_1.3s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "maker signal",
    orbitClass: "animate-[spin_6s_linear_infinite] motion-reduce:animate-none",
  },
  musinsa: {
    ambientClass: "animate-[pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:scale-105 transition-transform duration-150 ease-out motion-reduce:transition-none",
    label: "contrast snap",
    orbitClass: "animate-[pulse_1.9s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  samsung: {
    ambientClass: "animate-[pulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "wide depth",
    orbitClass: "animate-[pulse_2.2s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  tesla: {
    ambientClass: "animate-[pulse_3s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
    label: "product settle",
    orbitClass: "animate-[pulse_2.5s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  toss: {
    ambientClass: "animate-[pulse_1.25s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:scale-105 transition duration-200 ease-out motion-reduce:transition-none",
    label: "elastic depth",
    orbitClass: "animate-[bounce_1.15s_infinite] motion-reduce:animate-none",
  },
  upstage: {
    ambientClass: "animate-[pulse_1.7s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:translate-x-1 transition-transform duration-200 ease-out motion-reduce:transition-none",
    label: "conversion glow",
    orbitClass: "animate-[pulse_1.35s_ease-in-out_infinite] motion-reduce:animate-none",
  },
  goodchoice: {
    ambientClass: "animate-[pulse_1.55s_ease-in-out_infinite] motion-reduce:animate-none",
    chipClass: "group-hover:-translate-y-1 group-hover:rotate-1 transition duration-200 ease-out motion-reduce:transition-none",
    label: "ticket lift",
    orbitClass: "animate-[bounce_1.45s_infinite] motion-reduce:animate-none",
  },
};
