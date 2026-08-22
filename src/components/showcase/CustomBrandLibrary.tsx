import { getCustomCssVariables } from "./custom-brand";
import type { CustomBrandDNA, CustomBrandId } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

function CollectionIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M5 5.5h10.5A2.5 2.5 0 0 1 18 8v10.5A2.5 2.5 0 0 1 15.5 21H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M7 3h10.5A2.5 2.5 0 0 1 20 5.5V16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export interface CustomBrandLibraryProps {
  activeBrandId: CustomBrandId;
  brands: CustomBrandDNA[];
  onCreate: () => void;
  onDelete: (brandId: CustomBrandId) => void;
  onDuplicate: (brandId: CustomBrandId) => void;
  onSelect: (brandId: CustomBrandId) => void;
}

/** Browser-session library for independently editable custom DNA sources. */
export function CustomBrandLibrary({ activeBrandId, brands, onCreate, onDelete, onDuplicate, onSelect }: CustomBrandLibraryProps) {
  return (
    <section aria-labelledby="custom-brand-library-title" className="mt-5 rounded-2xl border border-[#d8cef8] bg-white/80 p-4 shadow-[0_12px_24px_rgba(96,66,180,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5d42c7]"><CollectionIcon />Custom DNA library</div>
          <h3 className="mt-1 text-base font-bold tracking-[-0.025em] text-[#292234]" id="custom-brand-library-title">여러 브랜드 DNA를 보관하고 비교하세요</h3>
          <p className="mt-1 text-xs leading-5 text-[#6e6879]">선택한 DNA만 아래 에디터·코드 생성기·ThemeBridge source에 연결됩니다. 저장은 브라우저에만 이뤄집니다.</p>
        </div>
        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#6d55dc] bg-[#6d55dc] px-3 text-sm font-bold text-white outline-none transition hover:bg-[#5742b8] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35" onClick={onCreate} type="button"><PlusIcon />새 DNA</button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((brand) => {
          const selected = brand.id === activeBrandId;
          return (
            <article className={joinClasses("min-w-0 border p-3 transition", selected ? "border-[#6d55dc] bg-[#f8f5ff] shadow-[0_8px_18px_rgba(96,66,180,0.12)]" : "border-[#e2ddec] bg-white")} key={brand.id} style={getCustomCssVariables(brand)}>
              <button aria-pressed={selected} className="w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#5d42c7]/35" onClick={() => onSelect(brand.id)} type="button">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--vault-border)] bg-[var(--vault-primary)] text-sm font-bold text-white">{brand.name.slice(0, 2).toUpperCase() || "DNA"}</span>
                  <span className={joinClasses("rounded-full px-2 py-1 text-[10px] font-bold", selected ? "bg-[#6d55dc] text-white" : "bg-[#f3f1f6] text-[#726a80]")}>{selected ? "편집 중" : "라이브러리"}</span>
                </div>
                <p className="mt-3 truncate text-sm font-bold text-[#312a3e]">{brand.name}</p>
                <p className="mt-1 min-h-10 text-xs leading-5 text-[#706878]">{brand.descriptor}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold text-[#625a70]"><span className="border border-[var(--vault-border)] bg-[var(--vault-surface)] px-2 py-1">{brand.tokens.primary}</span><span className="border border-[#ddd8e5] bg-white px-2 py-1">{Object.values(brand.componentOverrides).filter((item) => item?.enabled).length} override</span></div>
              </button>
              <div className="mt-3 flex gap-2 border-t border-[#e6e1ed] pt-3">
                <button className="min-h-9 flex-1 rounded-lg border border-[#d6cfdf] bg-white px-2 text-xs font-bold text-[#534b60] outline-none transition hover:border-[#9d90b6] focus-visible:ring-2 focus-visible:ring-[#5d42c7]/30" onClick={() => onDuplicate(brand.id)} type="button">복제</button>
                <button aria-label={`${brand.name} DNA 삭제`} className="min-h-9 rounded-lg border border-[#edd6dd] bg-[#fffafb] px-2.5 text-xs font-bold text-[#a74759] outline-none transition hover:bg-[#fff1f3] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:ring-2 focus-visible:ring-[#a74759]/25" disabled={brands.length === 1} onClick={() => onDelete(brand.id)} type="button">삭제</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
