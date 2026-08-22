import { useId, useMemo, useState } from "react";

export interface UpstageSelectOption {
  /** 옵션을 구분하는 값입니다. */
  value: string;
  /** 화면에 표시할 옵션 이름입니다. */
  label: string;
  /** 선택할 수 없는 옵션인지 나타냅니다. */
  disabled?: boolean;
  /** 옵션 아래에 표시할 짧은 설명입니다. */
  description?: string;
}

export interface UpstageSelectProps {
  /** 선택 필드 위에 표시할 레이블입니다. */
  label?: string;
  /** 현재 선택한 값입니다. */
  value?: string;
  /** 선택이 바뀌었을 때 실행할 함수입니다. */
  onChange?: (value: string, option: UpstageSelectOption) => void;
  /** 고를 수 있는 옵션입니다. */
  options: UpstageSelectOption[];
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
 * 업스테이지 public API-pricing tab의 white, #0A0D14, #E2E4E9, 8px, 18px/500 geometry를 활용한 셀렉트 확장입니다.
 * 공개 자료에는 menu/selected behavior가 없으므로, 옵션 목록과 체크 표시는 요청된 재사용을 위한 지역 확장입니다.
 */
export function UpstageSelect({
  className,
  description,
  disabled = false,
  error,
  label,
  onChange,
  options,
  placeholder = "모델을 선택하세요",
  required = false,
  value,
}: UpstageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = useId();
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  function handleOptionClick(option: UpstageSelectOption) {
    if (option.disabled) {
      return;
    }

    onChange?.(option.value, option);
    setIsOpen(false);
  }

  return (
    <div className={joinClasses("relative w-full font-[Geist]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-medium leading-6 text-[#0A0D14]" htmlFor={selectId}>
          {label}
          {required ? <span className="ml-1 text-[#5B52FF]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <button
        aria-controls={`${selectId}-listbox`}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        className={joinClasses(
          "flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-[#E2E4E9] bg-white px-4 text-left text-base font-medium leading-6 text-[#0A0D14] outline-none transition-colors",
          error ? "border-[#0A0D14]" : "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B52FF]",
          disabled && "cursor-not-allowed bg-[#f7f7f8] text-[#52525B]",
        )}
        disabled={disabled}
        id={selectId}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className={joinClasses("min-w-0 flex-1 truncate", !selectedOption && "font-normal text-[#52525B]")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span aria-hidden="true" className="shrink-0 text-[#52525B]">
          <ChevronDownIcon open={isOpen} />
        </span>
      </button>

      <div
        className={joinClasses(
          "absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-lg border border-[#E2E4E9] bg-white transition-[opacity,transform] motion-reduce:transition-none",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div aria-label={label ?? "옵션"} className="max-h-64 overflow-y-auto p-2" id={`${selectId}-listbox`} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                aria-selected={isSelected}
                className={joinClasses(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left outline-none transition-colors",
                  isSelected ? "border border-[#E2E4E9] bg-white text-[#0A0D14]" : "text-[#52525B] hover:bg-[#f7f7f8]",
                  option.disabled && "cursor-not-allowed bg-white text-[#52525B] hover:bg-white",
                )}
                disabled={option.disabled}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                role="option"
                type="button"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-medium leading-6">{option.label}</span>
                  {option.description ? <span className="mt-1 block truncate text-sm font-normal leading-5 text-[#525866]">{option.description}</span> : null}
                </span>
                {isSelected ? <span aria-hidden="true" className="shrink-0 text-[#5B52FF]"><CheckIcon /></span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 text-[#0A0D14]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 text-[#52525B]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default UpstageSelect;
