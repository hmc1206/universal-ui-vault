import { useState, type ChangeEvent } from "react";
import { ACTION_PAIR_HERO_BRANDS, NATIVE_FORM_BRANDS, NATIVE_MODAL_BRANDS, VISIBLE_TOAST_BRANDS } from "./showcase.catalog";
import { getThemeBridgeSkin, type ThemeBridgeSkin } from "./themebridge.skin";
import type { ComponentId, ShowcaseBrand, ShowcaseBrandId, ShowcaseComponent, ThemeBridge, VaultComponentSet } from "./showcase.types";
import { joinClasses, noOp } from "./showcase.utils";

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

function PreviewPane({ children, label, seniorMode, skin }: { children: React.ReactNode; label: string; seniorMode: boolean; skin?: ThemeBridgeSkin }) {
  return (
    <section
      aria-label={label}
      className={joinClasses(
        "relative flex min-h-[238px] w-full items-center justify-center overflow-auto rounded-xl border p-4",
        seniorMode
          ? "border-yellow-300 bg-black text-white shadow-[inset_0_0_0_2px_#ffffff] [&_button]:!min-h-12 [&_button]:!border-2 [&_button]:!border-yellow-300 [&_button]:!bg-yellow-300 [&_button]:!px-4 [&_button]:!text-[1.5em] [&_button]:!text-black [&_input]:!min-h-12 [&_input]:!border-2 [&_input]:!border-yellow-300 [&_input]:!bg-black [&_input]:!text-[1.5em] [&_input]:!text-white [&_select]:!min-h-12 [&_select]:!border-2 [&_select]:!border-yellow-300 [&_select]:!bg-black [&_select]:!text-[1.5em] [&_select]:!text-white [&_p]:!text-[1.5em] [&_span]:!text-[1.5em] [&_h1]:!text-[1.5em] [&_h2]:!text-[1.5em] [&_h3]:!text-[1.5em]"
          : skin
            ? joinClasses("border-2", skin.frameClass, skin.surfaceClass)
            : "border-[#ececf0] bg-white",
      )}
      style={skin?.style}
    >
      <span className={joinClasses("absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[10px] font-bold", seniorMode ? "bg-yellow-300 text-black" : skin ? skin.paletteBadgeClass : "bg-[#f1f2f5] text-[#63636d]")}>{label}</span>
      <div className={joinClasses("w-full pt-6", seniorMode ? "min-w-[310px]" : "", skin?.controlClass)}>{children}</div>
    </section>
  );
}

export function ComponentComparison({ brand, component, components, seniorMode, splitView = false, themeBridge }: { brand: ShowcaseBrand; component: ShowcaseComponent; components: VaultComponentSet; seniorMode: boolean; splitView?: boolean; themeBridge?: ThemeBridge }) {
  const originalPane = (
    <PreviewPane label="원본 vault" seniorMode={false}>
      <ComponentPreview brand={brand} componentId={component.id} components={components} />
    </PreviewPane>
  );

  if (themeBridge?.enabled) {
    const skin = getThemeBridgeSkin(themeBridge, component.id);
    const mixedPane = (
      <PreviewPane label={`혼합 skin · ${skin.label}`} seniorMode={false} skin={skin}>
        <ComponentPreview brand={brand} componentId={component.id} components={components} />
      </PreviewPane>
    );

    if (splitView) {
      return <div className="grid w-full gap-3 2xl:grid-cols-2">{originalPane}{mixedPane}</div>;
    }

    return mixedPane;
  }

  if (!seniorMode) {
    return originalPane;
  }

  return (
    <div className="grid w-full gap-3 xl:grid-cols-2">
      {originalPane}
      <PreviewPane label="시니어 모드 · 150% 텍스트" seniorMode><ComponentPreview brand={brand} componentId={component.id} components={components} /></PreviewPane>
    </div>
  );
}
