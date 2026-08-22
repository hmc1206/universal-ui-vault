import { useMemo, useState } from "react";
import { getCustomPaletteOption, getCustomRadiusClass, getCustomShadowClass } from "./custom-brand";
import type { ComponentId, CustomBrandDNA } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

function PreviewButton({ brand, children, onClick, quiet = false }: { brand: CustomBrandDNA; children: string; onClick?: () => void; quiet?: boolean }) {
  const palette = getCustomPaletteOption(brand);
  return (
    <button
      className={joinClasses(
        "inline-flex min-h-11 items-center justify-center px-4 text-sm font-bold outline-none transition motion-reduce:transition-none",
        getCustomRadiusClass(brand.radius),
        brand.material === "elastic" ? "duration-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98]" : brand.material === "crisp" ? "duration-150 hover:-translate-y-px" : "duration-300 hover:-translate-y-px",
        "focus-visible:ring-4 focus-visible:ring-[#7C3AED]/30 focus-visible:ring-offset-2",
        quiet ? joinClasses("border", palette.frameClass, "bg-white text-current hover:bg-white/75") : joinClasses(palette.accentClass, getCustomShadowClass(brand.shadow)),
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function PreviewModal({ brand, onClose }: { brand: CustomBrandDNA; onClose: () => void }) {
  const palette = getCustomPaletteOption(brand);
  return (
    <div aria-label="생성 모달 미리보기" className="absolute inset-0 z-20 grid place-items-center rounded-xl bg-[#17111F]/55 p-4 backdrop-blur-sm" role="dialog">
      <div className={joinClasses("w-full max-w-sm border bg-white p-5 shadow-2xl", getCustomRadiusClass(brand.radius), palette.frameClass)}>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-current/60">Generated Modal</p>
        <h4 className="mt-2 text-lg font-bold tracking-[-0.03em]">변경 사항을 저장할까요?</h4>
        <p className="mt-2 text-sm leading-6 text-current/70">닫기, backdrop, Escape 처리는 생성된 독립 TSX에서 구현됩니다.</p>
        <div className="mt-5 flex justify-end gap-2">
          <PreviewButton brand={brand} onClick={onClose} quiet>취소</PreviewButton>
          <PreviewButton brand={brand} onClick={onClose}>저장</PreviewButton>
        </div>
      </div>
    </div>
  );
}

export function GeneratedVaultPreview({ brand, componentId }: { brand: CustomBrandDNA; componentId: ComponentId }) {
  const [toastVisible, setToastVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("design");
  const [tab, setTab] = useState("overview");
  const [accordionOpen, setAccordionOpen] = useState(true);
  const palette = getCustomPaletteOption(brand);
  const initial = useMemo(() => brand.name.trim().slice(0, 2).toUpperCase() || "MB", [brand.name]);
  const frameClass = joinClasses("relative flex min-h-[220px] w-full items-center justify-center overflow-hidden border p-4", getCustomRadiusClass(brand.radius), palette.frameClass, palette.surfaceClass);

  if (componentId === "Button") {
    return <div className={frameClass}><div className="flex flex-wrap items-center justify-center gap-2"><PreviewButton brand={brand}>계속하기</PreviewButton><PreviewButton brand={brand} quiet>나중에</PreviewButton></div></div>;
  }

  if (componentId === "Input") {
    return <div className={frameClass}><label className="grid w-full max-w-xs gap-2 text-sm font-semibold">이메일<input className={joinClasses("min-h-11 border bg-white px-3 text-sm font-medium outline-none transition focus:border-current focus:ring-4 focus:ring-[#7C3AED]/20", getCustomRadiusClass(brand.radius), palette.frameClass)} placeholder="name@example.com" type="email" /><span className="text-xs font-medium opacity-65">입력에 따른 공간적 깊이를 확인합니다.</span></label></div>;
  }

  if (componentId === "HeroCard") {
    return <div className={frameClass}><article className={joinClasses("relative w-full overflow-hidden border bg-white/75 p-5 backdrop-blur", getCustomRadiusClass(brand.radius), palette.frameClass, getCustomShadowClass(brand.shadow))}><span aria-hidden="true" className={joinClasses("absolute -right-8 -top-10 h-28 w-28 rounded-full opacity-25 blur-2xl", palette.accentClass)} /><p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-60">DNA signal</p><h4 className="mt-2 text-xl font-bold tracking-[-0.04em]">다음 작업을 더 선명하게.</h4><p className="mt-2 text-sm leading-5 opacity-75">비대칭 정보 위계와 재질감은 생성된 HeroCard에서 확장됩니다.</p><div className="mt-4"><PreviewButton brand={brand}>시작하기</PreviewButton></div></article></div>;
  }

  if (componentId === "Toast") {
    return <div className={frameClass}>{toastVisible ? <section className={joinClasses("flex w-full max-w-sm items-start gap-3 border bg-white p-4", getCustomRadiusClass(brand.radius), palette.frameClass, getCustomShadowClass(brand.shadow))} role="status"><span className={joinClasses("grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-black", palette.accentClass)}>✓</span><div className="flex-1"><p className="text-sm font-bold">변경한 내용이 저장되었어요.</p><p className="mt-1 text-xs leading-5 opacity-70">Toast의 close와 duration prop도 코드에 포함됩니다.</p></div><button aria-label="알림 닫기" className="grid h-8 w-8 place-items-center rounded-full text-lg outline-none hover:bg-black/5" onClick={() => setToastVisible(false)} type="button">×</button></section> : <PreviewButton brand={brand} onClick={() => setToastVisible(true)}>다시 표시</PreviewButton>}</div>;
  }

  if (componentId === "Badge") {
    return <div className={frameClass}><div className="flex flex-wrap gap-2"><span className={joinClasses("inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-bold", palette.frameClass, "bg-white/80")}>새 소식</span><span className={joinClasses("inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-bold", palette.accentClass)}>Priority</span></div></div>;
  }

  if (componentId === "Modal") {
    return <div className={frameClass}><PreviewButton brand={brand} onClick={() => setModalOpen(true)}>모달 열기</PreviewButton>{modalOpen ? <PreviewModal brand={brand} onClose={() => setModalOpen(false)} /> : null}</div>;
  }

  if (componentId === "Select") {
    return <div className={frameClass}><label className="grid w-full max-w-xs gap-2 text-sm font-semibold">작업 유형<select className={joinClasses("min-h-11 border bg-white px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-[#7C3AED]/20", getCustomRadiusClass(brand.radius), palette.frameClass)} onChange={(event) => setSelectValue(event.target.value)} value={selectValue}><option value="design">디자인</option><option value="prototype">프로토타입</option><option value="review">검토</option></select><span className="text-xs opacity-65">{selectValue} 선택됨</span></label></div>;
  }

  if (componentId === "Avatar") {
    return <div className={frameClass}><div className="flex items-center gap-3"><span className={joinClasses("relative grid h-14 w-14 place-items-center text-base font-black text-white", getCustomRadiusClass(brand.radius), palette.accentClass, getCustomShadowClass(brand.shadow))}>{initial}<span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" /></span><div><p className="text-sm font-bold">{brand.name || "My Brand"}</p><p className="mt-1 text-xs opacity-65">온라인</p></div></div></div>;
  }

  if (componentId === "Tabs") {
    const tabs = ["overview", "details", "activity"];
    return <div className={frameClass}><div className="w-full"><div className="flex border-b border-current/15" role="tablist">{tabs.map((value) => <button aria-selected={tab === value} className={joinClasses("relative min-h-11 flex-1 px-3 text-sm font-bold outline-none", tab === value ? "text-current" : "opacity-50")} key={value} onClick={() => setTab(value)} role="tab" type="button">{value === "overview" ? "개요" : value === "details" ? "상세" : "활동"}<span className={joinClasses("absolute inset-x-3 bottom-0 h-0.5", palette.accentClass, tab === value ? "" : "scale-x-0")} /></button>)}</div><p className="mt-4 text-sm leading-6 opacity-75">{tab} 패널의 선택 상태입니다.</p></div></div>;
  }

  return <div className={frameClass}><div className={joinClasses("w-full overflow-hidden border bg-white", getCustomRadiusClass(brand.radius), palette.frameClass)}><button aria-expanded={accordionOpen} className="flex min-h-12 w-full items-center justify-between px-4 text-left text-sm font-bold" onClick={() => setAccordionOpen((value) => !value)} type="button">이 구성요소는 어떻게 사용하나요?<span className={joinClasses("text-lg transition", accordionOpen && "rotate-180")}>⌄</span></button>{accordionOpen ? <p className="border-t border-current/10 bg-white/60 px-4 py-3 text-sm leading-6 opacity-75">FAQ와 상세 정보를 단일 또는 복수 공개 상태로 다룰 수 있습니다.</p> : null}</div></div>;
}
