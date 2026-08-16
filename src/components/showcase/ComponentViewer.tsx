import { useState, type ReactNode } from "react";

export type ShowcaseBrandId = "toss" | "apple" | "linear" | "notion" | "stripe" | "karrot" | "vercel" | "figma";

export interface ComponentViewerProps {
  /** 전시할 브랜드의 식별자입니다. */
  brandId: ShowcaseBrandId;
  /** 카탈로그 화면으로 돌아갈 때 실행할 함수입니다. */
  onBack?: () => void;
}

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

interface BrandTheme {
  name: string;
  descriptor: string;
  initials: string;
  surfaceClass: string;
  primaryButtonClass: string;
  primaryTextClass: string;
  tintClass: string;
  borderClass: string;
  avatarClass: string;
}

interface ShowcaseComponent {
  id: ComponentId;
  number: string;
  title: string;
  description: string;
}

const BRAND_THEMES: Record<ShowcaseBrandId, BrandTheme> = {
  toss: {
    name: "Toss",
    descriptor: "Clear financial utility",
    initials: "T",
    surfaceClass: "bg-[#e8f3ff]",
    primaryButtonClass: "border-[#3182f6] bg-[#3182f6] text-white",
    primaryTextClass: "text-[#3182f6]",
    tintClass: "bg-[#e8f3ff]",
    borderClass: "border-[#cfe5ff]",
    avatarClass: "bg-[#3182f6] text-white",
  },
  apple: {
    name: "Apple",
    descriptor: "Precise and restrained",
    initials: "A",
    surfaceClass: "bg-[#f5f5f7]",
    primaryButtonClass: "border-[#0071e3] bg-[#0071e3] text-white",
    primaryTextClass: "text-[#0066cc]",
    tintClass: "bg-[#f5f5f7]",
    borderClass: "border-[#d2d2d7]",
    avatarClass: "bg-[#1d1d1f] text-white",
  },
  linear: {
    name: "Linear",
    descriptor: "High-performance builder tools",
    initials: "L",
    surfaceClass: "bg-[#171719]",
    primaryButtonClass: "border-[#737ee2] bg-[#5e6ad2] text-white",
    primaryTextClass: "text-[#9da6ff]",
    tintClass: "bg-[#202023]",
    borderClass: "border-[#343438]",
    avatarClass: "bg-[#5e6ad2] text-white",
  },
  notion: {
    name: "Notion",
    descriptor: "Calm workspace building blocks",
    initials: "N",
    surfaceClass: "bg-[#f7f7f5]",
    primaryButtonClass: "border-[#2f3437] bg-[#2f3437] text-white",
    primaryTextClass: "text-[#2f3437]",
    tintClass: "bg-[#efefed]",
    borderClass: "border-[#dededb]",
    avatarClass: "bg-[#2f3437] text-white",
  },
  stripe: {
    name: "Stripe",
    descriptor: "Confident payment infrastructure",
    initials: "S",
    surfaceClass: "bg-[#f6f8ff]",
    primaryButtonClass: "border-[#635bff] bg-[#635bff] text-white",
    primaryTextClass: "text-[#635bff]",
    tintClass: "bg-[#efefff]",
    borderClass: "border-[#dedeff]",
    avatarClass: "bg-[#635bff] text-white",
  },
  karrot: {
    name: "Karrot",
    descriptor: "Warm neighborhood marketplace",
    initials: "K",
    surfaceClass: "bg-[#fff8f4]",
    primaryButtonClass: "border-[#ff6f0f] bg-[#ff6f0f] text-white",
    primaryTextClass: "text-[#e55f00]",
    tintClass: "bg-[#fff5f0]",
    borderClass: "border-[#ffe1d0]",
    avatarClass: "bg-[#ff6f0f] text-white",
  },
  vercel: {
    name: "Vercel",
    descriptor: "Focused deployment workflows",
    initials: "V",
    surfaceClass: "bg-[#f7f7f7]",
    primaryButtonClass: "border-black bg-black text-white",
    primaryTextClass: "text-black",
    tintClass: "bg-[#ededed]",
    borderClass: "border-[#d4d4d4]",
    avatarClass: "bg-black text-white",
  },
  figma: {
    name: "Figma",
    descriptor: "Collaborative creative systems",
    initials: "F",
    surfaceClass: "bg-[#f8f8ff]",
    primaryButtonClass: "border-[#a259ff] bg-[#a259ff] text-white",
    primaryTextClass: "text-[#7c3aed]",
    tintClass: "bg-[#f2eefe]",
    borderClass: "border-[#e6dcff]",
    avatarClass: "bg-[#a259ff] text-white",
  },
};

const SHOWCASE_COMPONENTS: ShowcaseComponent[] = [
  { id: "Button", number: "01", title: "Button", description: "핵심 행동을 명확히 전달하는 버튼" },
  { id: "Input", number: "02", title: "Input", description: "입력과 피드백을 위한 필드" },
  { id: "HeroCard", number: "03", title: "Hero Card", description: "브랜드의 첫인상을 만드는 핵심 카드" },
  { id: "Toast", number: "04", title: "Toast", description: "짧고 분명한 상태 안내" },
  { id: "Badge", number: "05", title: "Badge", description: "상태와 카테고리를 구분하는 태그" },
  { id: "Modal", number: "06", title: "Modal", description: "중요한 결정을 돕는 대화상자" },
  { id: "Select", number: "07", title: "Select", description: "옵션을 고르는 선택 컨트롤" },
  { id: "Avatar", number: "08", title: "Avatar", description: "사람과 팀을 보여주는 프로필" },
  { id: "Tabs", number: "09", title: "Tabs", description: "정보 영역을 전환하는 탭" },
  { id: "Accordion", number: "10", title: "Accordion", description: "필요한 정보만 펼쳐 보는 메뉴" },
];

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className={joinClasses("h-4 w-4 transition-transform duration-200", open && "rotate-180")} fill="none" viewBox="0 0 24 24">
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
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

function PreviewTabs({ theme }: { theme: BrandTheme }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Details", "Activity"];

  return (
    <div className="w-full">
      <div className={joinClasses("flex border-b", theme.borderClass)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              className={joinClasses(
                "-mb-px border-b-2 px-3 py-2 text-xs font-semibold transition-colors duration-200",
                isActive ? joinClasses("border-current", theme.primaryTextClass) : "border-transparent text-[#8c8c95]",
              )}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          );
        })}
      </div>
      <p className="pt-4 text-sm text-[#66666f]">{activeTab} 내용을 확인하고 있어요.</p>
    </div>
  );
}

function PreviewAccordion({ theme }: { theme: BrandTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={joinClasses("w-full overflow-hidden rounded-lg border", theme.borderClass)}>
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#242429]"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>이 구성요소는 어떻게 사용하나요?</span>
        <ChevronDownIcon open={open} />
      </button>
      <div className={joinClasses("grid transition-[grid-template-rows] duration-200", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-6 text-[#66666f]">필요한 순간에만 내용을 열어 보도록 설계된 전시용 예시입니다.</p>
        </div>
      </div>
    </div>
  );
}

function ComponentPreview({ componentId, theme }: { componentId: ComponentId; theme: BrandTheme }) {
  if (componentId === "Button") {
    // Vault replacement point 01/10: import the brand Button component from src/components/vault/[brandId]/Button.tsx here.
    return (
      <button className={joinClasses("h-10 rounded-lg px-4 text-sm font-semibold", theme.primaryButtonClass)} type="button">
        계속하기
      </button>
    );
  }

  if (componentId === "Input") {
    // Vault replacement point 02/10: import the brand Input component from src/components/vault/[brandId]/Input.tsx here.
    return (
      <div className="w-full max-w-xs">
        <label className="mb-2 block text-xs font-semibold text-[#4d4d56]" htmlFor={`preview-${theme.name}-input`}>
          이메일
        </label>
        <input
          className={joinClasses("h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:border-current focus:ring-2", theme.borderClass, theme.primaryTextClass)}
          id={`preview-${theme.name}-input`}
          placeholder="name@example.com"
          type="email"
        />
      </div>
    );
  }

  if (componentId === "HeroCard") {
    // Vault replacement point 03/10: import the brand HeroCard component from src/components/vault/[brandId]/HeroCard.tsx here.
    return (
      <div className={joinClasses("w-full rounded-xl border p-5", theme.tintClass, theme.borderClass)}>
        <p className={joinClasses("text-xs font-semibold", theme.primaryTextClass)}>{theme.name}</p>
        <p className="mt-2 text-lg font-bold tracking-[-0.03em] text-[#242429]">한 가지 중요한 일을 더 쉽게.</p>
        <p className="mt-2 text-sm leading-5 text-[#66666f]">브랜드의 인상을 담는 대표 카드 영역입니다.</p>
      </div>
    );
  }

  if (componentId === "Toast") {
    // Vault replacement point 04/10: import the brand Toast component from src/components/vault/[brandId]/Toast.tsx here.
    return (
      <div className="flex w-full max-w-sm items-center gap-3 rounded-lg bg-[#202024] px-4 py-3 text-sm text-white">
        <span className={joinClasses("h-2 w-2 shrink-0 rounded-full", theme.primaryButtonClass)} />
        <span className="min-w-0 flex-1">변경한 내용이 저장되었어요.</span>
        <button className="text-xs font-semibold text-white/80" type="button">닫기</button>
      </div>
    );
  }

  if (componentId === "Badge") {
    // Vault replacement point 05/10: import the brand Badge component from src/components/vault/[brandId]/Badge.tsx here.
    return (
      <div className="flex flex-wrap gap-2">
        <span className={joinClasses("rounded-full px-3 py-1 text-xs font-semibold", theme.tintClass, theme.primaryTextClass)}>새 소식</span>
        <span className="rounded-full bg-[#f0f0f2] px-3 py-1 text-xs font-semibold text-[#5c5c65]">추천</span>
        <span className="rounded-full bg-[#e9f8ef] px-3 py-1 text-xs font-semibold text-[#197a50]">완료</span>
      </div>
    );
  }

  if (componentId === "Modal") {
    // Vault replacement point 06/10: import the brand Modal component from src/components/vault/[brandId]/Modal.tsx here.
    return (
      <div className="w-full max-w-sm rounded-xl border border-[#dedee3] bg-white p-4">
        <p className="text-sm font-bold text-[#242429]">변경 사항을 저장할까요?</p>
        <p className="mt-2 text-sm leading-5 text-[#66666f]">나중에도 언제든 다시 수정할 수 있어요.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-lg px-3 py-2 text-xs font-semibold text-[#5c5c65]" type="button">나중에</button>
          <button className={joinClasses("rounded-lg px-3 py-2 text-xs font-semibold", theme.primaryButtonClass)} type="button">저장하기</button>
        </div>
      </div>
    );
  }

  if (componentId === "Select") {
    // Vault replacement point 07/10: import the brand Select component from src/components/vault/[brandId]/Select.tsx here.
    return (
      <div className={joinClasses("flex h-10 w-full max-w-xs items-center justify-between rounded-lg border bg-white px-3 text-sm text-[#33333a]", theme.borderClass)}>
        <span>기본 옵션</span>
        <ChevronDownIcon open={false} />
      </div>
    );
  }

  if (componentId === "Avatar") {
    // Vault replacement point 08/10: import the brand Avatar component from src/components/vault/[brandId]/Avatar.tsx here.
    return (
      <div className="flex items-center gap-3">
        <span className={joinClasses("relative inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold", theme.avatarClass)}>
          {theme.initials}
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#1aa174]" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#242429]">Alex Kim</p>
          <p className="mt-1 text-xs text-[#777780]">온라인</p>
        </div>
      </div>
    );
  }

  if (componentId === "Tabs") {
    // Vault replacement point 09/10: import the brand Tabs component from src/components/vault/[brandId]/Tabs.tsx here.
    return <PreviewTabs theme={theme} />;
  }

  // Vault replacement point 10/10: import the brand Accordion component from src/components/vault/[brandId]/Accordion.tsx here.
  return <PreviewAccordion theme={theme} />;
}

function getComponentImportSnippet(brandId: ShowcaseBrandId, componentId: ComponentId) {
  const theme = BRAND_THEMES[brandId];
  const exportedName = `${theme.name.replace(/\s/g, "")}${componentId}`;

  return `// Vault file\n// src/components/vault/${brandId}/${componentId}.tsx\n\nimport ${exportedName} from "@/components/vault/${brandId}/${componentId}";\n\nexport function Example() {\n  return <${exportedName} />;\n}`;
}

/**
 * 선택한 브랜드의 Button부터 Accordion까지 10개 구성요소를 한 번에 살펴보는 전시 화면입니다.
 * 현재는 무의존성 프리뷰를 렌더링하며, 각 전시 카드의 명시적 교체 지점에 실제 vault 컴포넌트를 연결할 수 있습니다.
 */
export function ComponentViewer({ brandId, onBack }: ComponentViewerProps) {
  const [copiedComponentId, setCopiedComponentId] = useState<ComponentId | null>(null);
  const theme = BRAND_THEMES[brandId];
  const hasFullVaultSet = brandId === "karrot";

  async function handleCopy(componentId: ComponentId) {
    const snippet = getComponentImportSnippet(brandId, componentId);

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
                <span className={joinClasses("inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold", theme.avatarClass)}>{theme.initials}</span>
                <p className="text-sm font-semibold text-[#6b6b75]">{theme.name} component catalog</p>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">10개의 핵심 구성요소</h1>
              <p className="mt-2 text-sm leading-6 text-[#6b6b75]">{theme.descriptor}의 결을 살린 전시용 프리뷰입니다.</p>
            </div>
          </div>
          <span className={joinClasses("inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold", hasFullVaultSet ? "bg-[#e8f7f0] text-[#197a50]" : "bg-[#efeff1] text-[#66666f]")}>
            {hasFullVaultSet ? "10개 vault 컴포넌트 준비됨" : "프리뷰 전시대 준비됨"}
          </span>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SHOWCASE_COMPONENTS.map((component) => (
            <article className="flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-[#e1e1e6] bg-white" key={component.id}>
              <div className="flex items-start justify-between gap-4 border-b border-[#eeeeF1] px-5 py-4">
                <div>
                  <p className={joinClasses("text-xs font-bold", theme.primaryTextClass)}>{component.number}</p>
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
              <div className={joinClasses("flex flex-1 items-center justify-center p-5", theme.surfaceClass)}>
                <ComponentPreview componentId={component.id} theme={theme} />
              </div>
              <div className="border-t border-[#eeeeF1] px-5 py-3">
                <code className="text-[11px] text-[#7a7a84]">vault/{brandId}/{component.id}.tsx</code>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComponentViewer;
