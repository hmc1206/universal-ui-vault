import { useId, useMemo, useState } from "react";

export interface AblySelectOption {
  /** 옵션을 구분하는 값입니다. */
  value: string;
  /** 화면에 표시할 옵션 이름입니다. */
  label: string;
  /** 선택할 수 없는 옵션인지 나타냅니다. */
  disabled?: boolean;
  /** 옵션 아래에 표시할 짧은 설명입니다. */
  description?: string;
}

export type AblySelectSurface = "team" | "seller";

export interface AblySelectProps {
  /** 선택 필드 위에 표시할 레이블입니다. */
  label?: string;
  /** 현재 선택한 값입니다. */
  value?: string;
  /** 선택이 바뀌었을 때 실행할 함수입니다. */
  onChange?: (value: string, option: AblySelectOption) => void;
  /** 고를 수 있는 옵션입니다. */
  options: AblySelectOption[];
  /** 값이 없을 때 표시할 안내입니다. */
  placeholder?: string;
  /** 입력을 돕는 짧은 설명입니다. */
  description?: string;
  /** 다시 확인이 필요한 경우 표시할 안내입니다. */
  error?: string;
  /** 선택 필드를 비활성화합니다. */
  disabled?: boolean;
  /** 필수 선택 항목을 표시합니다. */
  required?: boolean;
  /** Team(Pretendard) 또는 Seller(Noto Sans KR) 정보 표면을 선택합니다. */
  surface?: AblySelectSurface;
  /** 최상위 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const surfaceClasses: Record<AblySelectSurface, { font: string; field: string; label: string; description: string }> = {
  team: {
    font: "font-[Pretendard,system-ui,sans-serif]",
    field: "rounded-xl border-[#e5e7eb] bg-white text-[#1f1f1f]",
    label: "text-[#1f1f1f]",
    description: "text-[#757575]",
  },
  seller: {
    font: "font-[Noto_Sans_KR,system-ui,sans-serif]",
    field: "rounded-none border-[#e5e7eb] bg-white text-[#1f1f1f]",
    label: "text-[#1f1f1f]",
    description: "text-[#5b5b5b]",
  },
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className={joinClasses("h-5 w-5 transition-transform", open && "rotate-180")} fill="none" viewBox="0 0 24 24">
      <path d="m7 10 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" transform="rotate(90 12 12)" />
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

/**
 * ABLY Team(Pretendard)과 Seller Square(Noto Sans Korean)의 별도 정보 표면을 구분한 셀렉트 확장입니다.
 * 공개 자료에는 consumer native filter/select가 없으므로, 옵션 목록·check·focus는 재사용을 위한 지역 확장입니다.
 */
export function AblySelect({
  className,
  description,
  disabled = false,
  error,
  label,
  onChange,
  options,
  placeholder = "선택하세요",
  required = false,
  surface = "team",
  value,
}: AblySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = useId();
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const surfaceStyle = surfaceClasses[surface];

  function handleOptionClick(option: AblySelectOption) {
    if (option.disabled) {
      return;
    }

    onChange?.(option.value, option);
    setIsOpen(false);
  }

  return (
    <div className={joinClasses("relative w-full", surfaceStyle.font, className)}>
      {label ? (
        <label className={joinClasses("mb-2 block text-base font-semibold leading-5 tracking-[-0.3px]", surfaceStyle.label)} htmlFor={selectId}>
          {label}
          {required ? <span className="ml-1 text-[#ff5160]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <button
        aria-controls={`${selectId}-listbox`}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        className={joinClasses(
          "flex h-12 w-full items-center justify-between gap-3 border px-4 text-left text-base font-normal leading-6 tracking-[-0.02em] outline-none transition-colors",
          surfaceStyle.field,
          error ? "border-[#1f1f1f]" : "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5160]",
          disabled && "cursor-not-allowed bg-[#f7f7f7] text-[#777777]",
        )}
        disabled={disabled}
        id={selectId}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className={joinClasses("min-w-0 flex-1 truncate", !selectedOption && "text-[#777777]")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span aria-hidden="true" className="shrink-0 text-[#777777]">
          <ChevronDownIcon open={isOpen} />
        </span>
      </button>

      <div
        className={joinClasses(
          "absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden border border-[#e5e7eb] bg-white transition-[opacity,transform] motion-reduce:transition-none",
          surface === "team" && "rounded-xl",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div aria-label={label ?? "옵션"} className="max-h-64 overflow-y-auto py-2" id={`${selectId}-listbox`} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                aria-selected={isSelected}
                className={joinClasses(
                  "flex w-full items-center gap-3 px-4 py-3 text-left outline-none transition-colors",
                  isSelected ? "bg-[#fff2ea] text-[#ff5160]" : "text-[#1f1f1f] hover:bg-[#f7f7f7]",
                  option.disabled && "cursor-not-allowed bg-white text-[#777777] hover:bg-white",
                )}
                disabled={option.disabled}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                role="option"
                type="button"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-normal leading-6 tracking-[-0.02em]">{option.label}</span>
                  {option.description ? <span className={joinClasses("mt-1 block truncate text-sm font-normal leading-5", isSelected ? "text-[#ff5160]" : surfaceStyle.description)}>{option.description}</span> : null}
                </span>
                {isSelected ? <span aria-hidden="true" className="shrink-0 text-[#ff5160]"><CheckIcon /></span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#1f1f1f]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className={joinClasses("mt-2 text-sm font-normal leading-5 tracking-[-0.02em]", surfaceStyle.description)} id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default AblySelect;
