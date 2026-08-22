import { useMemo, useState, type CSSProperties } from "react";
import { AccessibilityAuditPanel } from "./AccessibilityAuditPanel";
import { CUSTOM_COMPONENT_IDS, CUSTOM_FONT_OPTIONS, CUSTOM_MATERIAL_OPTIONS, CUSTOM_PALETTE_OPTIONS, CUSTOM_RADIUS_OPTIONS, CUSTOM_SHADOW_OPTIONS, getComponentOverride, isHexColor } from "./custom-brand";
import type { ComponentId, CustomBrandDNA, CustomComponentOverride, CustomDensity, CustomEasing, CustomGeometryTokens, CustomMotionTokens, CustomSemanticTokens } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

function SlidersIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M4 7h16M4 17h16M9 4v6M15 14v6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function AdjustIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M11 15v6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function SelectField<T extends string>({ id, label, onChange, options, value }: { id: string; label: string; onChange: (value: T) => void; options: Array<{ label: string; value: T }>; value: T }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor={id}>
      {label}
      <select
        className="min-h-11 rounded-xl border border-[#d9d9df] bg-white px-3 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#242429] focus-visible:ring-2 focus-visible:ring-[#242429]/25"
        id={id}
        onChange={(event) => onChange(event.target.value as T)}
        value={value}
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function TextField({ id, label, onChange, suffix, value }: { id: string; label: string; onChange: (value: string) => void; suffix?: string; value: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor={id}>
      {label}
      <span className="relative">
        <input className="min-h-11 w-full rounded-xl border border-[#d9d9df] bg-white px-3 pr-12 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#5d42c7] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/25" id={id} onChange={(event) => onChange(event.target.value)} value={value} />
        {suffix ? <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-xs font-bold text-[#777780]">{suffix}</span> : null}
      </span>
    </label>
  );
}

function ColorTokenField({ id, label, onChange, value }: { id: string; label: string; onChange: (value: string) => void; value: string }) {
  const colorValue = isHexColor(value) ? value : "#000000";
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor={id}>
      {label}
      <span className="flex min-h-11 items-center gap-2 rounded-xl border border-[#d9d9df] bg-white px-2.5 focus-within:border-[#5d42c7] focus-within:ring-2 focus-within:ring-[#5d42c7]/25">
        <input aria-label={`${label} 색상 선택`} className="h-7 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0" onChange={(event) => onChange(event.target.value.toUpperCase())} type="color" value={colorValue} />
        <input className="min-w-0 flex-1 bg-transparent font-mono text-sm font-semibold uppercase text-[#242429] outline-none" id={id} maxLength={7} onChange={(event) => onChange(event.target.value.toUpperCase())} spellCheck={false} value={value} />
      </span>
      {!isHexColor(value) ? <span className="text-xs font-semibold text-red-600">`#RRGGBB` 형식으로 입력하세요.</span> : null}
    </label>
  );
}

function TokenSection({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return (
    <section className="rounded-2xl border border-[#d8d4e7] bg-white/75 p-4 shadow-[0_10px_24px_rgba(47,35,92,0.04)]">
      <div><h4 className="text-base font-bold tracking-[-0.025em] text-[#2d263d]">{title}</h4><p className="mt-1 text-xs leading-5 text-[#6e6879]">{description}</p></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  );
}

const overrideDensityOptions: Array<{ label: string; value: CustomDensity }> = [
  { label: "Compact", value: "compact" },
  { label: "Comfortable", value: "comfortable" },
  { label: "Spacious", value: "spacious" },
];

const easingOptions: Array<{ label: string; value: CustomEasing }> = [
  { label: "Ease out", value: "ease-out" },
  { label: "Ease in-out", value: "ease-in-out" },
  { label: "Linear", value: "linear" },
];

function createPreviewStyle(brand: CustomBrandDNA): CSSProperties & Record<"--preview-primary" | "--preview-primary-soft" | "--preview-surface" | "--preview-ink" | "--preview-border" | "--preview-focus" | "--preview-radius" | "--preview-card-radius", string> {
  return {
    "--preview-border": brand.tokens.border,
    "--preview-card-radius": brand.geometry.cardRadius,
    "--preview-focus": brand.tokens.focusRing,
    "--preview-ink": brand.tokens.ink,
    "--preview-primary": brand.tokens.primary,
    "--preview-primary-soft": brand.tokens.primarySoft,
    "--preview-radius": brand.geometry.controlRadius,
    "--preview-surface": brand.tokens.surface,
  };
}

export interface CustomBrandBuilderProps {
  brand: CustomBrandDNA;
  onChange: (brand: CustomBrandDNA) => void;
  onReset: () => void;
  onSave: () => void;
  saved: boolean;
}

/**
 * 사용자 입력 semantic token과 구성요소별 override를 custom ThemeBridge source로 저장합니다.
 * 생성 vault에는 이 값이 정적인 Tailwind utility로 삽입되고, showcase에는 CSS variable skin으로 적용됩니다.
 */
export function CustomBrandBuilder({ brand, onChange, onReset, onSave, saved }: CustomBrandBuilderProps) {
  const [open, setOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [overrideComponentId, setOverrideComponentId] = useState<ComponentId>("Button");
  const previewStyle = useMemo(() => createPreviewStyle(brand), [brand]);
  const override = getComponentOverride(brand, overrideComponentId);

  function changePalette(accent: string) {
    const preset = CUSTOM_PALETTE_OPTIONS.find((option) => option.accent === accent) ?? CUSTOM_PALETTE_OPTIONS[0];
    const primarySoft = preset.surface;
    onChange({
      ...brand,
      accent: preset.accent,
      ink: preset.ink,
      surface: preset.surface,
      tokens: { ...brand.tokens, ink: preset.ink, primary: preset.accent, primarySoft, surface: preset.surface },
    });
  }

  function patchTokens<Key extends keyof CustomSemanticTokens>(key: Key, value: CustomSemanticTokens[Key]) {
    const tokens = { ...brand.tokens, [key]: value };
    onChange({ ...brand, accent: key === "primary" ? value : brand.accent, ink: key === "ink" ? value : brand.ink, surface: key === "surface" ? value : brand.surface, tokens });
  }

  function patchGeometry<Key extends keyof CustomGeometryTokens>(key: Key, value: CustomGeometryTokens[Key]) {
    const geometry = { ...brand.geometry, [key]: value };
    onChange({ ...brand, geometry, radius: key === "controlRadius" ? value : brand.radius });
  }

  function patchMotion<Key extends keyof CustomMotionTokens>(key: Key, value: CustomMotionTokens[Key]) {
    onChange({ ...brand, motion: { ...brand.motion, [key]: value } });
  }

  function patchOverride(patch: Partial<CustomComponentOverride>) {
    const current: CustomComponentOverride = brand.componentOverrides[overrideComponentId] ?? { density: "comfortable", enabled: false };
    onChange({
      ...brand,
      componentOverrides: { ...brand.componentOverrides, [overrideComponentId]: { ...current, ...patch } },
    });
  }

  return (
    <section aria-labelledby="custom-brand-builder-title" className="mt-5 overflow-hidden rounded-2xl border border-[#d8cef8] bg-[linear-gradient(135deg,_#fbf9ff,_#f3efff)] p-4 shadow-[0_16px_32px_rgba(96,66,180,0.10)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8cef8] bg-white/85 px-3 py-1.5 text-xs font-bold text-[#5d42c7]"><SlidersIcon />Custom brand source</div>
          <h3 className="mt-2 text-lg font-bold tracking-[-0.03em] text-[#292234]" id="custom-brand-builder-title">새 브랜드 DNA 빌더</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#666071]">preset을 시작점으로 사용하거나, semantic palette·상태색·surface·focus·기하·motion·10종 override를 직접 값으로 조절하세요.</p>
        </div>
        <button aria-expanded={open} className={joinClasses("inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35", open ? "border-[#6d55dc] bg-[#6d55dc] text-white" : "border-[#cfc6ef] bg-white text-[#40395a]")} onClick={() => setOpen((value) => !value)} type="button">{open ? "빌더 접기" : "커스텀 브랜드 만들기"}</button>
      </div>

      {open ? (
        <div className="mt-5 grid gap-5 border-t border-[#ddd5f4] pt-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor="custom-brand-name">브랜드 이름<input className="min-h-11 rounded-xl border border-[#d9d9df] bg-white px-3 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#5d42c7] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/25" id="custom-brand-name" maxLength={32} onChange={(event) => onChange({ ...brand, name: event.target.value })} value={brand.name} /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor="custom-brand-descriptor">한 줄 설명<input className="min-h-11 rounded-xl border border-[#d9d9df] bg-white px-3 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#5d42c7] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/25" id="custom-brand-descriptor" maxLength={96} onChange={(event) => onChange({ ...brand, descriptor: event.target.value })} value={brand.descriptor} /></label>
            <SelectField id="custom-brand-palette" label="Quick palette preset" onChange={changePalette} options={CUSTOM_PALETTE_OPTIONS.map((option) => ({ label: option.label, value: option.accent }))} value={brand.tokens.primary} />
            <SelectField id="custom-brand-font" label="Typography" onChange={(sansFont) => onChange({ ...brand, displayFont: sansFont, sansFont })} options={CUSTOM_FONT_OPTIONS} value={brand.sansFont} />
            <SelectField id="custom-brand-radius" label="Quick control radius" onChange={(radius) => patchGeometry("controlRadius", radius)} options={CUSTOM_RADIUS_OPTIONS} value={brand.geometry.controlRadius} />
            <SelectField id="custom-brand-shadow" label="Depth preset" onChange={(shadow) => onChange({ ...brand, shadow })} options={CUSTOM_SHADOW_OPTIONS} value={brand.shadow} />
            <SelectField id="custom-brand-material" label="Interaction preset" onChange={(material) => onChange({ ...brand, material })} options={CUSTOM_MATERIAL_OPTIONS} value={brand.material} />
          </div>

          <aside aria-label="커스텀 브랜드 고급 토큰 미리보기" className="overflow-hidden border-2 bg-[var(--preview-surface)] p-4 text-[var(--preview-ink)] shadow-[0_16px_32px_color-mix(in_srgb,var(--preview-primary)_18%,transparent)]" style={previewStyle}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--preview-ink)]/60">Live custom source</p><h4 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{brand.name || "My Brand"}</h4><p className="mt-2 max-w-xl text-sm leading-6 text-[var(--preview-ink)]/72">{brand.descriptor || "A custom ThemeBridge design DNA"}</p></div>
              <span className="inline-flex min-h-8 items-center rounded-full border border-[var(--preview-border)] bg-white/70 px-3 text-xs font-bold text-[var(--preview-ink)]">{Object.values(brand.componentOverrides).filter((item) => item?.enabled).length} component override</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2"><span className="inline-flex min-h-11 items-center rounded-[var(--preview-radius)] bg-[var(--preview-primary)] px-4 text-sm font-bold text-white shadow-[0_12px_24px_color-mix(in_srgb,var(--preview-primary)_28%,transparent)]">Primary action</span><span className="inline-flex min-h-11 items-center rounded-[var(--preview-radius)] border border-[var(--preview-border)] bg-white/80 px-4 text-sm font-bold">{brand.motion.duration} · {brand.motion.hoverLift} lift</span><span className="inline-flex min-h-11 items-center rounded-[var(--preview-radius)] border border-[var(--preview-border)] bg-[var(--preview-primary-soft)] px-4 text-sm font-bold">Surface token</span></div>
          </aside>

          <AccessibilityAuditPanel brand={brand} />

          <div className="rounded-2xl border border-[#d8d1ef] bg-white/55 p-4">
            <button aria-expanded={advancedOpen} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#c9bdeb] bg-white px-4 text-sm font-bold text-[#493d67] outline-none transition hover:bg-[#f8f5ff] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/30" onClick={() => setAdvancedOpen((value) => !value)} type="button"><AdjustIcon />{advancedOpen ? "고급 토큰 접기" : "고급 토큰 직접 편집"}</button>
            <p className="mt-2 text-xs leading-5 text-[#6f6880]">직접 입력값은 `#RRGGBB`, px/rem, ms 단위의 제한된 형식으로 검증되어 manifest와 생성 코드에 안전하게 반영됩니다.</p>
          </div>

          {advancedOpen ? (
            <div className="grid gap-4">
              <TokenSection description="색상 값은 바로 ThemeBridge custom skin, 생성된 Tailwind source, live preview에 연결됩니다." title="Semantic palette · 직접 HEX 입력">
                <ColorTokenField id="token-primary" label="Primary" onChange={(value) => patchTokens("primary", value)} value={brand.tokens.primary} />
                <ColorTokenField id="token-primary-hover" label="Primary hover" onChange={(value) => patchTokens("primaryHover", value)} value={brand.tokens.primaryHover} />
                <ColorTokenField id="token-primary-soft" label="Primary soft" onChange={(value) => patchTokens("primarySoft", value)} value={brand.tokens.primarySoft} />
                <ColorTokenField id="token-surface" label="Surface" onChange={(value) => patchTokens("surface", value)} value={brand.tokens.surface} />
                <ColorTokenField id="token-surface-elevated" label="Surface elevated" onChange={(value) => patchTokens("surfaceElevated", value)} value={brand.tokens.surfaceElevated} />
                <ColorTokenField id="token-ink" label="Ink" onChange={(value) => patchTokens("ink", value)} value={brand.tokens.ink} />
                <ColorTokenField id="token-muted-ink" label="Muted ink" onChange={(value) => patchTokens("mutedInk", value)} value={brand.tokens.mutedInk} />
                <ColorTokenField id="token-border" label="Border" onChange={(value) => patchTokens("border", value)} value={brand.tokens.border} />
                <ColorTokenField id="token-focus" label="Focus ring" onChange={(value) => patchTokens("focusRing", value)} value={brand.tokens.focusRing} />
                <ColorTokenField id="token-success" label="Success" onChange={(value) => patchTokens("success", value)} value={brand.tokens.success} />
                <ColorTokenField id="token-warning" label="Warning" onChange={(value) => patchTokens("warning", value)} value={brand.tokens.warning} />
                <ColorTokenField id="token-danger" label="Danger" onChange={(value) => patchTokens("danger", value)} value={brand.tokens.danger} />
              </TokenSection>

              <TokenSection description="radius는 card·control·modal에 독립 적용되고, border와 motion은 generated source와 custom skin 양쪽에 반영됩니다." title="Geometry & motion">
                <TextField id="geometry-control-radius" label="Control radius" onChange={(value) => patchGeometry("controlRadius", value)} value={brand.geometry.controlRadius} />
                <TextField id="geometry-card-radius" label="Card radius" onChange={(value) => patchGeometry("cardRadius", value)} value={brand.geometry.cardRadius} />
                <TextField id="geometry-modal-radius" label="Modal radius" onChange={(value) => patchGeometry("modalRadius", value)} value={brand.geometry.modalRadius} />
                <SelectField id="geometry-border-width" label="Border width" onChange={(value) => patchGeometry("borderWidth", value)} options={[{ label: "1px", value: "1px" }, { label: "2px", value: "2px" }, { label: "3px", value: "3px" }, { label: "4px", value: "4px" }]} value={brand.geometry.borderWidth} />
                <TextField id="motion-duration" label="Motion duration" onChange={(value) => patchMotion("duration", value)} value={brand.motion.duration} />
                <SelectField id="motion-easing" label="Easing" onChange={(value) => patchMotion("easing", value)} options={easingOptions} value={brand.motion.easing} />
                <TextField id="motion-hover-lift" label="Hover lift" onChange={(value) => patchMotion("hoverLift", value)} value={brand.motion.hoverLift} />
                <TextField id="motion-press-scale" label="Press scale" onChange={(value) => patchMotion("pressScale", value)} value={brand.motion.pressScale} />
              </TokenSection>

              <section className="rounded-2xl border border-[#d8d4e7] bg-white/75 p-4 shadow-[0_10px_24px_rgba(47,35,92,0.04)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h4 className="text-base font-bold tracking-[-0.025em] text-[#2d263d]">Component override</h4><p className="mt-1 text-xs leading-5 text-[#6e6879]">전역 DNA를 유지하되 특정 구성요소에만 accent·surface·radius·density를 다르게 적용합니다.</p></div><label className="grid gap-1 text-xs font-bold text-[#615a71]">Target component<select className="min-h-10 rounded-lg border border-[#d7d0e6] bg-white px-3 text-sm font-semibold text-[#36303f] outline-none focus:ring-2 focus:ring-[#5d42c7]/25" onChange={(event) => setOverrideComponentId(event.target.value as ComponentId)} value={overrideComponentId}>{CUSTOM_COMPONENT_IDS.map((componentId) => <option key={componentId} value={componentId}>{componentId}</option>)}</select></label></div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e0dbed] bg-[#fbfaff] p-3"><div><p className="text-sm font-bold text-[#373143]">{overrideComponentId} override</p><p className="mt-1 text-xs text-[#726b7d]">비활성 상태면 전역 palette·geometry·density를 상속합니다.</p></div><button aria-pressed={Boolean(override)} className={joinClasses("inline-flex min-h-10 items-center rounded-lg border px-3 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#5d42c7]/30", override ? "border-[#6d55dc] bg-[#6d55dc] text-white" : "border-[#d3cce1] bg-white text-[#554d62]")} onClick={() => patchOverride({ enabled: !override })} type="button">{override ? "Override 활성" : "Override 사용"}</button></div>
                {override ? <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><ColorTokenField id="override-accent" label="Accent override" onChange={(value) => patchOverride({ accent: value })} value={override.accent || brand.tokens.primary} /><ColorTokenField id="override-surface" label="Surface override" onChange={(value) => patchOverride({ surface: value })} value={override.surface || brand.tokens.surface} /><TextField id="override-radius" label="Radius override" onChange={(value) => patchOverride({ radius: value })} value={override.radius || brand.geometry.controlRadius} /><SelectField id="override-density" label="Density" onChange={(value) => patchOverride({ density: value })} options={overrideDensityOptions} value={override.density || "comfortable"} /></div> : null}
              </section>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 border-t border-[#ddd5f4] pt-4"><button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#6d55dc] bg-[#6d55dc] px-4 text-sm font-bold text-white outline-none transition hover:bg-[#5742b8] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35" onClick={onSave} type="button">{saved ? "브라우저에 저장됨" : "이 DNA 저장"}</button><button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#cfc6ef] bg-white px-4 text-sm font-bold text-[#40395a] outline-none transition hover:bg-[#f6f2ff] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35" onClick={onReset} type="button">기본값으로 초기화</button></div>
        </div>
      ) : null}
    </section>
  );
}
