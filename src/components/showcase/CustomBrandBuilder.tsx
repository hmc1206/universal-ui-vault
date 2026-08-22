import { useState } from "react";
import { CUSTOM_FONT_OPTIONS, CUSTOM_MATERIAL_OPTIONS, CUSTOM_PALETTE_OPTIONS, CUSTOM_RADIUS_OPTIONS, CUSTOM_SHADOW_OPTIONS, getCustomPaletteOption } from "./custom-brand";
import type { CustomBrandDNA } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

function SlidersIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M4 7h16M4 17h16M9 4v6M15 14v6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
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

export interface CustomBrandBuilderProps {
  brand: CustomBrandDNA;
  onChange: (brand: CustomBrandDNA) => void;
  onReset: () => void;
  onSave: () => void;
  saved: boolean;
}

/**
 * 브라우저 세션의 custom ThemeBridge source를 정의하는 빌더입니다.
 * 값은 static Tailwind class로 매핑되는 안전한 palette·material option으로 제한합니다.
 */
export function CustomBrandBuilder({ brand, onChange, onReset, onSave, saved }: CustomBrandBuilderProps) {
  const [open, setOpen] = useState(false);
  const palette = getCustomPaletteOption(brand);

  function changePalette(accent: string) {
    const nextPalette = CUSTOM_PALETTE_OPTIONS.find((option) => option.accent === accent) ?? CUSTOM_PALETTE_OPTIONS[0];
    onChange({ ...brand, accent: nextPalette.accent, ink: nextPalette.ink, surface: nextPalette.surface });
  }

  return (
    <section aria-labelledby="custom-brand-builder-title" className="mt-5 overflow-hidden rounded-2xl border border-[#d8cef8] bg-[linear-gradient(135deg,_#fbf9ff,_#f3efff)] p-4 shadow-[0_16px_32px_rgba(96,66,180,0.10)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8cef8] bg-white/85 px-3 py-1.5 text-xs font-bold text-[#5d42c7]">
            <SlidersIcon />
            Custom brand source
          </div>
          <h3 className="mt-2 text-lg font-bold tracking-[-0.03em] text-[#292234]" id="custom-brand-builder-title">새 브랜드 DNA 빌더</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#666071]">이름, static palette, 곡률, 그림자, 모션 물성을 저장하면 ThemeBridge의 스타일·물성 출처에 즉시 나타납니다. 실제 vault 파일과는 분리된 browser session 설정입니다.</p>
        </div>
        <button
          aria-expanded={open}
          className={joinClasses("inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35", open ? "border-[#6d55dc] bg-[#6d55dc] text-white" : "border-[#cfc6ef] bg-white text-[#40395a]")}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? "빌더 접기" : "커스텀 브랜드 만들기"}
        </button>
      </div>

      {open ? (
        <div className="mt-5 grid gap-5 border-t border-[#ddd5f4] pt-5 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor="custom-brand-name">
              브랜드 이름
              <input
                className="min-h-11 rounded-xl border border-[#d9d9df] bg-white px-3 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#5d42c7] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/25"
                id="custom-brand-name"
                maxLength={32}
                onChange={(event) => onChange({ ...brand, name: event.target.value })}
                value={brand.name}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#34343c]" htmlFor="custom-brand-descriptor">
              한 줄 설명
              <input
                className="min-h-11 rounded-xl border border-[#d9d9df] bg-white px-3 text-sm font-medium text-[#242429] outline-none transition focus-visible:border-[#5d42c7] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/25"
                id="custom-brand-descriptor"
                maxLength={96}
                onChange={(event) => onChange({ ...brand, descriptor: event.target.value })}
                value={brand.descriptor}
              />
            </label>
            <SelectField id="custom-brand-palette" label="Palette" onChange={changePalette} options={CUSTOM_PALETTE_OPTIONS.map((option) => ({ label: option.label, value: option.accent }))} value={brand.accent} />
            <SelectField id="custom-brand-font" label="Typography" onChange={(sansFont) => onChange({ ...brand, displayFont: sansFont, sansFont })} options={CUSTOM_FONT_OPTIONS} value={brand.sansFont} />
            <SelectField id="custom-brand-radius" label="Control radius" onChange={(radius) => onChange({ ...brand, radius })} options={CUSTOM_RADIUS_OPTIONS} value={brand.radius} />
            <SelectField id="custom-brand-shadow" label="Depth" onChange={(shadow) => onChange({ ...brand, shadow })} options={CUSTOM_SHADOW_OPTIONS} value={brand.shadow} />
            <SelectField id="custom-brand-material" label="Interaction" onChange={(material) => onChange({ ...brand, material })} options={CUSTOM_MATERIAL_OPTIONS} value={brand.material} />
          </div>

          <aside className={joinClasses("rounded-2xl border-2 p-4", palette.frameClass, palette.surfaceClass)} aria-label="커스텀 브랜드 미리보기">
            <p className="text-xs font-bold uppercase tracking-[0.12em] opacity-70">Live custom source</p>
            <h4 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{brand.name || "My Brand"}</h4>
            <p className="mt-2 text-sm leading-6 opacity-80">{brand.descriptor || "A custom ThemeBridge design DNA"}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className={joinClasses("inline-flex min-h-10 items-center rounded-xl px-4 text-sm font-bold", palette.accentClass, palette.radiusClass, palette.shadowClass)}>Primary action</span>
              <span className={joinClasses("inline-flex min-h-10 items-center rounded-xl border-2 px-4 text-sm font-bold", palette.frameClass, palette.radiusClass)}>{brand.material} response</span>
            </div>
            <p className="mt-5 text-xs leading-5 opacity-75">Style source는 이 palette와 text rhythm을, material source는 radius·shadow·response를 ThemeBridge preview에 적용합니다.</p>
          </aside>

          <div className="flex flex-wrap gap-3 border-t border-[#ddd5f4] pt-4 sm:col-span-2">
            <button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#6d55dc] bg-[#6d55dc] px-4 text-sm font-bold text-white outline-none transition hover:bg-[#5742b8] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35" onClick={onSave} type="button">
              {saved ? "브라우저에 저장됨" : "이 DNA 저장"}
            </button>
            <button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#cfc6ef] bg-white px-4 text-sm font-bold text-[#40395a] outline-none transition hover:bg-[#f6f2ff] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35" onClick={onReset} type="button">
              기본값으로 초기화
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
