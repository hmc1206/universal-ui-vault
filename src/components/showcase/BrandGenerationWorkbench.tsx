import { useEffect, useMemo, useState } from "react";
import { createBrandGenerationManifest, GENERATED_COMPONENT_DESCRIPTIONS, GENERATED_COMPONENT_IDS, getGeneratedFile, sanitizeGenerationBrief, type BrandGenerationBrief } from "./brand-generator";
import { copyGenerationText, downloadGeneratedFile, downloadGenerationManifest, loadStoredBrandGeneration, saveStoredBrandGeneration, type StoredBrandGeneration } from "./brand-generation-storage";
import { getCustomCssVariables } from "./custom-brand";
import { GeneratedVaultPreview } from "./GeneratedVaultPreview";
import { VaultHandoffPanel } from "./VaultHandoffPanel";
import type { ComponentId, CustomBrandDNA } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

function FileIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M7 3.75h6.4L18 8.35v11.9H7z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M13 3.75v4.7h5" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M9.75 13h4.5M9.75 16h4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m8.25 7.5-4.5 4.5 4.5 4.5M15.75 7.5l4.5 4.5-4.5 4.5M14 4.75 10 19.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m5 12.25 4.15 4.15L19.5 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function Field({ children, hint, label }: { children: React.ReactNode; hint?: string; label: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#34343c]">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-medium leading-5 text-[#777783]">{hint}</span> : null}
    </label>
  );
}

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "accent" | "neutral" | "success" }) {
  return <span className={joinClasses("inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-bold", tone === "accent" ? "border-[#d6caff] bg-[#f5f2ff] text-[#6848cc]" : tone === "success" ? "border-[#b9e9d6] bg-[#effcf6] text-[#137a55]" : "border-[#dfe1e7] bg-white text-[#656874]")}>{children}</span>;
}

export interface BrandGenerationWorkbenchProps {
  brand: CustomBrandDNA;
  onActivateThemeBridge: () => void;
}

/**
 * Browser-only brand registration and source-generation workspace.
 * It deliberately exports reviewable source files instead of writing arbitrary paths in the repository.
 */
export function BrandGenerationWorkbench({ brand, onActivateThemeBridge }: BrandGenerationWorkbenchProps) {
  const [open, setOpen] = useState(false);
  const [storedGeneration, setStoredGeneration] = useState<StoredBrandGeneration>(() => loadStoredBrandGeneration(brand));
  const [selectedComponentId, setSelectedComponentId] = useState<ComponentId>("Button");
  const [copied, setCopied] = useState(false);
  const { brief, manifest } = storedGeneration;

  useEffect(() => {
    saveStoredBrandGeneration(storedGeneration, brand);
  }, [brand, storedGeneration]);

  const sanitizedBrief = useMemo(() => sanitizeGenerationBrief(brief, brand), [brief, brand]);
  const selectedFile = manifest ? getGeneratedFile(manifest, selectedComponentId) : null;
  const isStale = manifest ? JSON.stringify(manifest.dna) !== JSON.stringify(brand) : false;

  function updateBrief<Key extends keyof BrandGenerationBrief>(key: Key, value: BrandGenerationBrief[Key]) {
    setStoredGeneration((current) => ({ ...current, brief: { ...current.brief, [key]: value } }));
  }

  function generateSources() {
    const nextManifest = createBrandGenerationManifest(brand, sanitizedBrief);
    setStoredGeneration({ brief: sanitizedBrief, manifest: nextManifest });
    setSelectedComponentId("Button");
    setCopied(false);
  }

  async function copySelectedSource() {
    if (!selectedFile) return;
    const didCopy = await copyGenerationText(selectedFile.content);
    setCopied(didCopy);
    if (didCopy) window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section aria-labelledby="brand-generation-title" className="mt-5 overflow-hidden rounded-2xl border border-[#cfdbff] bg-[radial-gradient(circle_at_top_right,_rgba(214,232,255,0.95),_transparent_42%),linear-gradient(135deg,_#fbfdff,_#f2f6ff)] p-4 shadow-[0_18px_42px_rgba(58,91,171,0.10)] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c9d9ff] bg-white/85 px-3 py-1.5 text-xs font-bold text-[#315a9f]">
            <CodeIcon />
            Custom vault generator
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-[-0.04em] text-[#1e2c49]" id="brand-generation-title">DNA를 검토 가능한 10종 TSX로 전환하세요.</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5e6b83]">위 DNA는 ThemeBridge source로 즉시 등록되고, 이 워크벤치는 같은 DNA를 <strong>독립형 React·TypeScript·Tailwind 컴포넌트 10개</strong>의 전체 소스로 변환합니다. 생성 결과는 browser session에 보관되며, 직접 검토·복사·다운로드할 수 있습니다.</p>
        </div>
        <button aria-expanded={open} className={joinClasses("inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#315a9f]/35", open ? "border-[#315a9f] bg-[#315a9f] text-white" : "border-[#bfcdef] bg-white text-[#315a9f]")} onClick={() => setOpen((value) => !value)} type="button">
          <FileIcon />
          {open ? "워크벤치 접기" : "10종 코드 만들기"}
        </button>
      </div>

      {open ? (
        <div className="mt-5 border-t border-[#d7e1fa] pt-5">
          <ol className="grid gap-3 md:grid-cols-3" aria-label="코드 생성 워크플로">
            <li className="rounded-xl border border-white/85 bg-white/70 p-3"><StatusPill tone="accent">01 · Source boundary</StatusPill><p className="mt-2 text-sm font-bold text-[#273554]">근거와 권리 범위 기록</p><p className="mt-1 text-xs leading-5 text-[#69758a]">관찰된 값과 로컬 확장을 분리합니다.</p></li>
            <li className="rounded-xl border border-white/85 bg-white/70 p-3"><StatusPill tone="accent">02 · Vault contract</StatusPill><p className="mt-2 text-sm font-bold text-[#273554]">10개 독립 TSX 생성</p><p className="mt-1 text-xs leading-5 text-[#69758a]">React와 Tailwind 유틸리티만 포함합니다.</p></li>
            <li className="rounded-xl border border-white/85 bg-white/70 p-3"><StatusPill tone="accent">03 · Review &amp; handoff</StatusPill><p className="mt-2 text-sm font-bold text-[#273554]">검토 후 내보내기</p><p className="mt-1 text-xs leading-5 text-[#69758a]">repo 쓰기는 사용자 검토 뒤 별도 작업으로 처리합니다.</p></li>
          </ol>

          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            <Field hint="소문자 영문·숫자·하이픈만 사용합니다. 생성 경로는 src/components/vault/[slug]/입니다." label="Vault folder slug">
              <input className="min-h-11 rounded-xl border border-[#cfd8eb] bg-white px-3 text-sm font-medium text-[#242b3d] outline-none transition focus:border-[#315a9f] focus:ring-2 focus:ring-[#315a9f]/20" maxLength={32} onChange={(event) => updateBrief("slug", event.target.value)} value={brief.slug} />
            </Field>
            <Field hint="공개 URL을 기록하면 추후 디자인 판단을 재검토할 수 있습니다. 비워 두어도 생성할 수 있습니다." label="Reference URL">
              <input className="min-h-11 rounded-xl border border-[#cfd8eb] bg-white px-3 text-sm font-medium text-[#242b3d] outline-none transition focus:border-[#315a9f] focus:ring-2 focus:ring-[#315a9f]/20" inputMode="url" onChange={(event) => updateBrief("referenceUrl", event.target.value)} placeholder="https://example.com/design" value={brief.referenceUrl} />
            </Field>
            <Field hint="공식 화면에서 관찰한 사항과 사용자가 직접 정의한 확장을 구분해 적습니다." label="Observed evidence / local extensions">
              <textarea className="min-h-28 resize-y rounded-xl border border-[#cfd8eb] bg-white p-3 text-sm leading-6 text-[#242b3d] outline-none transition focus:border-[#315a9f] focus:ring-2 focus:ring-[#315a9f]/20" maxLength={480} onChange={(event) => updateBrief("evidenceNote", event.target.value)} value={brief.evidenceNote} />
            </Field>
            <Field hint="폰트·로고·상표·이미지 사용권을 확인하고, 권리 없는 자산은 생성 결과에 추가하지 마세요." label="License &amp; trademark boundary">
              <textarea className="min-h-28 resize-y rounded-xl border border-[#cfd8eb] bg-white p-3 text-sm leading-6 text-[#242b3d] outline-none transition focus:border-[#315a9f] focus:ring-2 focus:ring-[#315a9f]/20" maxLength={320} onChange={(event) => updateBrief("licenseNote", event.target.value)} value={brief.licenseNote} />
            </Field>
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#c9d9ff] bg-white/75 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2"><StatusPill>{brand.name || "My Brand"}</StatusPill><StatusPill>{sanitizedBrief.slug}</StatusPill><StatusPill>{brand.material} material</StatusPill><StatusPill>{brand.radius} radius</StatusPill></div>
              <p className="mt-2 text-sm leading-6 text-[#5f6b80]">생성 파일은 <code className="rounded bg-[#eef3ff] px-1.5 py-0.5 text-[#315a9f]">src/components/vault/{sanitizedBrief.slug}/</code> 기준으로 명시됩니다.</p>
            </div>
            <button className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#315a9f] bg-[#315a9f] px-4 text-sm font-bold text-white outline-none transition hover:bg-[#294d89] focus-visible:ring-2 focus-visible:ring-[#315a9f]/35" onClick={generateSources} type="button"><CodeIcon />{manifest ? "DNA로 10종 다시 생성" : "전체 10종 코드 생성"}</button>
          </div>

          {manifest ? (
            <div className="mt-6 border-t border-[#d7e1fa] pt-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2"><StatusPill tone="success"><CheckIcon />10 / 10 files ready</StatusPill>{isStale ? <StatusPill tone="accent">DNA가 변경됨 · 다시 생성 필요</StatusPill> : <StatusPill>현재 DNA와 일치</StatusPill>}</div>
                  <h4 className="mt-3 text-lg font-bold tracking-[-0.035em] text-[#25324f]">{manifest.brand.displayName} custom vault</h4>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-[#65718a]">각 파일은 default와 named export를 함께 제공하고, CSS import·inline style·외부 UI library 없이 사용할 수 있도록 작성됩니다. JSON manifest에는 10개 전체 소스가 포함됩니다.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#c7d3eb] bg-white px-3 text-sm font-bold text-[#315a9f] outline-none transition hover:bg-[#f5f8ff] focus-visible:ring-2 focus-visible:ring-[#315a9f]/30" onClick={() => downloadGenerationManifest(manifest)} type="button"><FileIcon />Manifest JSON</button>
                  <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#315a9f] bg-[#315a9f] px-3 text-sm font-bold text-white outline-none transition hover:bg-[#294d89] focus-visible:ring-2 focus-visible:ring-[#315a9f]/35" onClick={onActivateThemeBridge} type="button"><CheckIcon />ThemeBridge에 적용</button>
                </div>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="생성 컴포넌트 파일">
                {GENERATED_COMPONENT_IDS.map((componentId) => <button aria-selected={selectedComponentId === componentId} className={joinClasses("inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-xs font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#315a9f]/35", selectedComponentId === componentId ? "border-[#315a9f] bg-[#315a9f] text-white" : "border-[#cbd5ea] bg-white text-[#58637a] hover:bg-[#f6f8fe]")} key={componentId} onClick={() => { setSelectedComponentId(componentId); setCopied(false); }} role="tab" type="button"><FileIcon />{componentId}</button>)}
              </div>

              {selectedFile ? (
                <div className="mt-4 grid gap-4 2xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
                  <article className="overflow-hidden rounded-xl border border-[#cbd5ea] bg-[#111827] shadow-[0_18px_36px_rgba(37,57,98,0.16)]">
                    <div className="flex flex-col gap-3 border-b border-white/10 bg-[#18243a] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0"><p className="truncate font-mono text-xs font-semibold text-[#bcd2ff]">{selectedFile.path}</p><p className="mt-1 text-xs text-[#96a4bd]">{GENERATED_COMPONENT_DESCRIPTIONS[selectedComponentId]}</p></div>
                      <div className="flex shrink-0 gap-2"><button className="inline-flex min-h-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 text-xs font-bold text-white outline-none transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60" onClick={copySelectedSource} type="button">{copied ? "복사됨" : "전체 소스 복사"}</button><button className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#7fa8f5] bg-[#315a9f] px-3 text-xs font-bold text-white outline-none transition hover:bg-[#3f6eb9] focus-visible:ring-2 focus-visible:ring-white/60" onClick={() => downloadGeneratedFile(selectedFile)} type="button">TSX 다운로드</button></div>
                    </div>
                    <pre className="max-h-[620px] overflow-auto p-4 text-left text-[11px] leading-5 text-[#d5e1f7]"><code>{selectedFile.content}</code></pre>
                  </article>
                  <aside className="rounded-xl border border-[#cbd5ea] bg-white p-4 shadow-[0_12px_28px_rgba(37,57,98,0.08)]">
                    <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#66738a]">Live DNA preview</p><h5 className="mt-1 text-base font-bold text-[#263451]">{selectedComponentId}</h5></div><StatusPill tone="accent">session source</StatusPill></div>
                    <div className="mt-4" style={getCustomCssVariables(brand, selectedComponentId)}><GeneratedVaultPreview brand={brand} componentId={selectedComponentId} /></div>
                    <p className="mt-3 text-xs leading-5 text-[#6d788c]">이 프리뷰는 현재 저장된 DNA에서 안전하게 스캔되는 Tailwind 선택지로 렌더링됩니다. 오른쪽 소스는 독립 TSX로 내보낼 전체 구현입니다.</p>
                  </aside>
                </div>
              ) : null}

              <div className="mt-4 grid gap-3 md:grid-cols-2"><aside className="rounded-xl border border-[#dbe2f0] bg-white/75 p-3"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#647189]">Observed / extension note</p><p className="mt-2 text-sm leading-6 text-[#4d596d]">{manifest.evidence.observedNote}</p>{manifest.evidence.referenceUrl ? <a className="mt-2 inline-flex text-sm font-bold text-[#315a9f] underline underline-offset-2" href={manifest.evidence.referenceUrl} rel="noreferrer" target="_blank">참조 URL 열기</a> : null}</aside><aside className="rounded-xl border border-[#dbe2f0] bg-white/75 p-3"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#647189]">Rights boundary</p><p className="mt-2 text-sm leading-6 text-[#4d596d]">{manifest.evidence.licenseNote}</p></aside></div>
              <VaultHandoffPanel brand={brand} manifest={manifest} stale={isStale} />
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
