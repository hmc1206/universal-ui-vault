import { useMemo } from "react";
import { auditCustomBrandAccessibility } from "./accessibility-audit";
import type { AccessibilityAuditLevel, CustomBrandDNA } from "./showcase.types";
import { joinClasses } from "./showcase.utils";

const levelCopy: Record<AccessibilityAuditLevel, { badge: string; label: string; row: string }> = {
  fail: { badge: "bg-[#fff0f1] text-[#b3364d]", label: "수정 필요", row: "border-[#f2c5cd] bg-[#fffafb]" },
  pass: { badge: "bg-[#e9faf2] text-[#16754a]", label: "통과", row: "border-[#c7ead7] bg-[#fbfffc]" },
  review: { badge: "bg-[#fff7de] text-[#946700]", label: "검토", row: "border-[#f0dfac] bg-[#fffdf7]" },
};

function AuditIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 3 4.5 6v5.7c0 4.8 3.1 8.1 7.5 9.3 4.4-1.2 7.5-4.5 7.5-9.3V6L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="m8.6 12 2.2 2.2 4.7-4.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export function AccessibilityAuditPanel({ brand }: { brand: CustomBrandDNA }) {
  const audit = useMemo(() => auditCustomBrandAccessibility(brand), [brand]);
  const percentage = Math.round((audit.passCount / audit.totalCount) * 100);

  return (
    <section aria-labelledby="accessibility-audit-title" className="rounded-2xl border border-[#d9dfe9] bg-[linear-gradient(135deg,_#fbfdff,_#f3f7ff)] p-4 shadow-[0_10px_24px_rgba(37,61,112,0.05)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#315a9f]"><AuditIcon />Accessibility audit</div>
          <h4 className="mt-1 text-base font-bold tracking-[-0.025em] text-[#273143]" id="accessibility-audit-title">색상 대비를 만들기 전에 확인하세요</h4>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-[#657083]">WCAG 대비 공식을 기준으로 body·muted·primary label·focus·status 조합을 계산합니다. 색상 대비 검사는 키보드·스크린 리더 테스트를 대체하지 않습니다.</p>
        </div>
        <div className="rounded-xl border border-[#cdd8ee] bg-white px-3 py-2 text-right"><p className="text-lg font-bold tracking-[-0.04em] text-[#315a9f]">{audit.passCount} / {audit.totalCount}</p><p className="text-[11px] font-bold text-[#69758b]">{percentage}% 기준 통과</p></div>
      </div>

      <div className="mt-4 grid gap-2 lg:grid-cols-2">
        {audit.checks.map((check) => {
          const copy = levelCopy[check.level];
          return (
            <article className={joinClasses("border p-3", copy.row)} key={check.id}>
              <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-[#303948]">{check.label}</p><p className="mt-1 font-mono text-[11px] font-semibold text-[#657083]">{check.foreground} / {check.background}</p></div><span className={joinClasses("shrink-0 px-2 py-1 text-[10px] font-bold", copy.badge)}>{copy.label}</span></div>
              <p className="mt-2 text-xs font-bold text-[#455164]">{check.actualRatio.toFixed(2)}:1 <span className="font-medium text-[#738097]">· 기준 {check.minimumRatio.toFixed(1)}:1</span></p>
              {check.level !== "pass" ? <p className="mt-2 text-xs leading-5 text-[#626e81]">{check.suggestion}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
