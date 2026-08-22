import { useId, useMemo, useState, type ReactNode } from "react";

export interface GoodChoiceSelectOption {
  /** 옵션을 구분하는 값입니다. */
  value: string;
  /** 화면에 표시할 옵션 이름입니다. */
  label: ReactNode;
  /** 선택할 수 없는 옵션인지 나타냅니다. */
  disabled?: boolean;
  /** 옵션 아래에 표시할 짧은 설명입니다. */
  description?: string;
}

export interface GoodChoiceSelectProps {
  /** 선택 필드 위에 표시할 레이블입니다. */
  label?: string;
  /** 현재 선택한 값입니다. */
  value?: string;
  /** 선택이 바뀌었을 때 실행할 함수입니다. */
  onChange?: (value: string, option: GoodChoiceSelectOption) => void;
  /** 고를 수 있는 옵션입니다. */
  options: GoodChoiceSelectOption[];
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
  /** 최상위 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className={joinClasses("h-5 w-5 transition-transform duration-150 ease-out", open && "rotate-180")} fill="none" viewBox="0 0 24 24">
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
 * 여기어때 Search Bar의 흰 12px 표면과 product filter의 compact 선택 흐름을 연결한 셀렉트 확장 컴포넌트입니다.
 * 공개 자료에 셀렉트 자체의 고유 기하가 없으므로, Cyan 선택 표면과 명확한 레이블은 재사용을 위한 지역 확장입니다.
 */
export function GoodChoiceSelect({
  className,
  description,
  disabled = false,
  error,
  label,
  onChange,
  options,
  placeholder = "선택해 주세요",
  required = false,
  value,
}: GoodChoiceSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = useId();
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  function handleOptionClick(option: GoodChoiceSelectOption) {
    if (option.disabled) {
      return;
    }

    onChange?.(option.value, option);
    setIsOpen(false);
  }

  return (
    <div className={joinClasses("relative w-full font-[Pretendard,system-ui,sans-serif]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-semibold leading-6 tracking-[-0.02em] text-[#222222]" htmlFor={selectId}>
          {label}
          {required ? <span className="ml-1 text-[#F94239]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <button
        aria-controls={`${selectId}-listbox`}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        className={joinClasses(
          "flex h-12 w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 text-left text-base font-normal leading-6 tracking-[-0.02em] outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          error
            ? "border-[#F94239]"
            : "border-[#E6E6E6] hover:bg-[#E3F0FF] focus-visible:border-[#1D8BFF] focus-visible:ring-2 focus-visible:ring-[#E3F0FF]",
          disabled && "cursor-not-allowed border-[#E6E6E6] bg-[#E6E6E6] text-[#737373]",
        )}
        disabled={disabled}
        id={selectId}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className={joinClasses("min-w-0 flex-1 truncate", !selectedOption && "text-[#737373]")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span aria-hidden="true" className={joinClasses("shrink-0 text-[#737373]", disabled && "text-[#737373]")}>
          <ChevronDownIcon open={isOpen} />
        </span>
      </button>

      <div
        className={joinClasses(
          "absolute left-0 right-0 top-[calc(100%+8px)] z-20 origin-top overflow-hidden rounded-xl border border-[#E6E6E6] bg-white shadow-lg transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
          isOpen ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0",
        )}
      >
        <div aria-label={label ?? "옵션"} className="max-h-64 overflow-y-auto py-1" id={`${selectId}-listbox`} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                aria-selected={isSelected}
                className={joinClasses(
                  "flex w-full items-center gap-3 px-4 py-3 text-left outline-none transition-colors duration-150",
                  isSelected ? "bg-[#E3F0FF] text-[#222222]" : "text-[#222222] hover:bg-[#E3F0FF]",
                  option.disabled && "cursor-not-allowed bg-white text-[#737373] hover:bg-white",
                )}
                disabled={option.disabled}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                role="option"
                type="button"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold leading-6 tracking-[-0.02em]">{option.label}</span>
                  {option.description ? <span className="mt-1 block truncate text-sm font-normal leading-5 text-[#737373]">{option.description}</span> : null}
                </span>
                {isSelected ? <span aria-hidden="true" className="shrink-0 text-[#1D8BFF]"><CheckIcon /></span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#F94239]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#737373]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default GoodChoiceSelect;
