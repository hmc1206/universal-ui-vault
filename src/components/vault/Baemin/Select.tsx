import { useId, useMemo, useState, type ReactNode } from "react";

export interface BaeminSelectOption {
  /** 옵션을 구분하는 값입니다. */
  value: string;
  /** 화면에 표시할 옵션 이름입니다. */
  label: ReactNode;
  /** 선택할 수 없는 옵션인지 나타냅니다. */
  disabled?: boolean;
  /** 옵션 아래에 표시할 짧은 안내입니다. */
  description?: string;
}

export interface BaeminSelectProps {
  /** 선택 필드 위에 표시할 레이블입니다. */
  label?: string;
  /** 레이블 뒤에 표시할 선택 안내입니다. */
  optionalLabel?: string;
  /** 현재 선택한 값입니다. */
  value?: string;
  /** 선택이 바뀌었을 때 실행할 함수입니다. */
  onChange?: (value: string, option: BaeminSelectOption) => void;
  /** 고를 수 있는 옵션입니다. */
  options: BaeminSelectOption[];
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
    <svg aria-hidden="true" className={joinClasses("h-5 w-5 transition-transform duration-200 ease-out", open && "rotate-180")} fill="none" viewBox="0 0 24 24">
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
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
 * 배달의민족 공개 웹의 가족 사이트 셀렉터에서 확인한 50px·8px 컨트롤 기하를 기반으로 한 독립형 커스텀 셀렉트입니다.
 * 펼침과 옵션 호버는 공개 캡처에 남지 않은 상태이므로 민트 포커스와 짧은 지역 전환으로만 절제해 구현합니다.
 */
export function BaeminSelect({
  className,
  description,
  disabled = false,
  error,
  label,
  onChange,
  optionalLabel = "선택",
  options,
  placeholder = "선택해 주세요",
  required = false,
  value,
}: BaeminSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = useId();
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  function handleOptionClick(option: BaeminSelectOption) {
    if (option.disabled) {
      return;
    }

    onChange?.(option.value, option);
    setIsOpen(false);
  }

  return (
    <div className={joinClasses("relative w-full font-[BAEMINWORK,system-ui,sans-serif]", className)}>
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label className="text-sm font-bold tracking-[-0.02em] text-[#232324]" htmlFor={selectId}>
            {label}
            {required ? <span className="ml-1 text-[#232324]">*</span> : null}
          </label>
          {!required && optionalLabel ? <span className="text-xs font-normal text-[#6c6d6f]">{optionalLabel}</span> : null}
        </div>
      ) : null}

      <button
        aria-controls={`${selectId}-listbox`}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        className={joinClasses(
          "flex h-[50px] w-full items-center justify-between gap-3 rounded-lg border bg-white px-4 text-left text-sm font-normal tracking-[-0.02em] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-out",
          error
            ? "border-2 border-[#232324] bg-[#fafafa] text-[#232324]"
            : "border-[#a6a7a9] text-[#6c6d6f] hover:border-[#6c6d6f] focus-visible:border-[#0cefd3] focus-visible:ring-2 focus-visible:ring-[#0cefd3]/30",
          disabled && "cursor-not-allowed border-[#cccccc] bg-[#f3f4f5] text-[#cccccc]",
        )}
        disabled={disabled}
        id={selectId}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className={joinClasses("min-w-0 flex-1 truncate", !selectedOption && "text-[#9b9c9f]")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span aria-hidden="true" className={joinClasses("shrink-0 text-[#6c6d6f]", disabled && "text-[#cccccc]")}>
          <ChevronDownIcon open={isOpen} />
        </span>
      </button>

      <div
        className={joinClasses(
          "absolute left-0 right-0 top-[calc(100%+8px)] z-20 origin-top overflow-hidden rounded-lg border border-[#a6a7a9] bg-white transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
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
                  "flex w-full items-center gap-3 px-4 py-3 text-left outline-none transition-colors duration-200",
                  isSelected ? "bg-[#0cefd3] text-[#222222]" : "text-[#232324] hover:bg-[#f3f4f5]",
                  option.disabled && "cursor-not-allowed bg-white text-[#cccccc] hover:bg-white",
                )}
                disabled={option.disabled}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                role="option"
                type="button"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold tracking-[-0.02em]">{option.label}</span>
                  {option.description ? <span className="mt-1 block truncate text-xs font-normal text-[#6c6d6f]">{option.description}</span> : null}
                </span>
                {isSelected ? <span aria-hidden="true" className="shrink-0 text-[#222222]"><CheckIcon /></span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-[13px] font-normal leading-5 tracking-[-0.02em] text-[#232324]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-[13px] font-normal leading-5 tracking-[-0.02em] text-[#6c6d6f]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default BaeminSelect;
