import { useMemo, useState } from "react";
import type { BrandGenerationManifest } from "./brand-generator";
import type { CustomBrandDNA, VaultHandoffItem, VaultHandoffQueue } from "./showcase.types";

const HANDOFF_STORAGE_KEY = "universal-ui-vault.handoff-queue.v1";

function loadQueue(): VaultHandoffQueue {
  if (typeof window === "undefined") return { items: [], version: 1 };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(HANDOFF_STORAGE_KEY) ?? "{}") as Partial<VaultHandoffQueue>;
    return { items: Array.isArray(parsed.items) ? parsed.items : [], version: 1 };
  } catch {
    return { items: [], version: 1 };
  }
}

function saveQueue(queue: VaultHandoffQueue) {
  if (typeof window !== "undefined") window.localStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(queue));
}

function downloadHandoff(manifest: BrandGenerationManifest, item: VaultHandoffItem) {
  if (typeof window === "undefined") return;
  const content = JSON.stringify({ handoff: item, manifest }, null, 2);
  const url = window.URL.createObjectURL(new Blob([content], { type: "application/json;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${manifest.brand.slug}-approved-vault-handoff.json`;
  anchor.click();
  window.setTimeout(() => window.URL.revokeObjectURL(url), 0);
}

export function VaultHandoffPanel({ brand, manifest, stale }: { brand: CustomBrandDNA; manifest: BrandGenerationManifest; stale: boolean }) {
  const [queue, setQueue] = useState<VaultHandoffQueue>(() => loadQueue());
  const manifestId = useMemo(() => `${brand.id}:${manifest.generatedAt}`, [brand.id, manifest.generatedAt]);
  const queued = queue.items.find((item) => item.manifestId === manifestId);

  function approve() {
    if (stale || queued) return;
    const item: VaultHandoffItem = { approvedAt: new Date().toISOString(), brandId: brand.id, manifestId, slug: manifest.brand.slug, status: "approved" };
    const next = { items: [item, ...queue.items].slice(0, 12), version: 1 as const };
    setQueue(next);
    saveQueue(next);
  }

  function remove(manifestKey: string) {
    const next = { items: queue.items.filter((item) => item.manifestId !== manifestKey), version: 1 as const };
    setQueue(next);
    saveQueue(next);
  }

  return (
    <section className="mt-5 rounded-xl border border-[#c9d9ff] bg-[#f8fbff] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#315a9f]">Approval-based vault handoff</p><h5 className="mt-1 text-base font-bold text-[#243655]">승인된 manifest만 실제 vault 반영 후보가 됩니다.</h5><p className="mt-1 max-w-2xl text-xs leading-5 text-[#60708a]">이 브라우저 버튼은 저장소에 파일을 쓰거나 GitHub에 push하지 않습니다. DNA·근거·권리 경계·10개 전체 source를 검토한 뒤 handoff package만 명시적으로 승인합니다.</p></div><button className={stale ? "min-h-10 rounded-lg border border-[#e4c7c7] bg-[#fff7f7] px-3 text-sm font-bold text-[#a33c3c]" : queued ? "min-h-10 rounded-lg border border-[#9ed9c0] bg-[#effcf6] px-3 text-sm font-bold text-[#177653]" : "min-h-10 rounded-lg border border-[#315a9f] bg-[#315a9f] px-3 text-sm font-bold text-white"} disabled={stale || Boolean(queued)} onClick={approve} type="button">{stale ? "재생성 후 승인" : queued ? "승인 큐에 추가됨" : "이 10종 manifest 승인"}</button></div>
      {queued ? <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-[#b9e9d6] bg-white p-3 text-xs"><span className="font-bold text-[#177653]">승인됨 · {new Date(queued.approvedAt).toLocaleString("ko-KR")}</span><button className="rounded-md border border-[#c7d3eb] bg-white px-2 py-1 font-bold text-[#315a9f]" onClick={() => downloadHandoff(manifest, queued)} type="button">Handoff JSON 다운로드</button><button className="rounded-md border border-[#e4c7c7] bg-white px-2 py-1 font-bold text-[#a33c3c]" onClick={() => remove(queued.manifestId)} type="button">승인 취소</button></div> : null}
      {queue.items.length ? <p className="mt-3 text-xs text-[#60708a]">현재 브라우저 승인 큐: {queue.items.length}개 · 다음 실제 vault 반영 작업에서 승인된 item만 선택할 수 있습니다.</p> : null}
    </section>
  );
}

