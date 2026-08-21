import { useId, useMemo, useState, type ReactNode } from "react";

export interface TossSelectOption {
  /** 옵션을 구분하는 값입니다. */
  value: string;
  /** 화면에 표시할 옵션 이름입니다. */
  label: ReactNode;
  /** 선택할 수 없는 옵션인지 나타냅니다. */
  disabled?: boolean;
  /** 옵션 아래에 표시할 짧은 설명입니다. */
  description?: string;
}

export interface TossSelectProps {
  /** 선택 필드 위에 표시할 레이블입니다. */
  label?: string;
  /** 현재 선택한 값입니다. */
  value?: string;
  /** 선택이 바뀌었을 때 실행할 함수입니다. */
  onChange?: (value: string, option: TossSelectOption) => void;
  /** 고를 수 있는 옵션입니다. */
  options: TossSelectOption[];
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
 * 토스의 제품 블루·연한 중립 표면·명확한 상태 안내를 활용한 셀렉트 확장 컴포넌트입니다.
 * 공식 패킷에는 셀렉트 고유 기하가 없으므로, 이 파일은 TDS 텍스트 필드와 버튼 상태 원칙을 적용한 명시적 확장입니다.
 */
export function TossSelect({
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
}: TossSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = useId();
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  function handleOptionClick(option: TossSelectOption) {
    if (option.disabled) {
      return;
    }

    onChange?.(option.value, option);
    setIsOpen(false);
  }

  return (
    <div className={joinClasses("relative w-full font-[Toss\ Product\ Sans,system-ui,sans-serif]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-semibold leading-6 tracking-[-0.02em] text-[#191f28]" htmlFor={selectId}>
          {label}
          {required ? <span className="ml-1 text-[#e42939]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <button
        aria-controls={`${selectId}-listbox`}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        className={joinClasses(
          "flex h-12 w-full items-center justify-between gap-3 rounded-lg border bg-white px-4 text-left text-base font-normal leading-6 tracking-[-0.02em] outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          error
            ? "border-[#e42939]"
            : "border-[#e5e8eb] hover:bg-[#f2f4f6] focus-visible:border-[#3182f6] focus-visible:ring-2 focus-visible:ring-[#3182f6]/20",
          disabled && "cursor-not-allowed border-[#e5e8eb] bg-[#f2f4f6] text-[#8b95a1]",
        )}
        disabled={disabled}
        id={selectId}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className={joinClasses("min-w-0 flex-1 truncate", !selectedOption && "text-[#8b95a1]")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span aria-hidden="true" className={joinClasses("shrink-0 text-[#4e5968]", disabled && "text-[#8b95a1]")}>
          <ChevronDownIcon open={isOpen} />
        </span>
      </button>

      <div
        className={joinClasses(
          "absolute left-0 right-0 top-[calc(100%+8px)] z-20 origin-top overflow-hidden rounded-xl border border-[#e5e8eb] bg-white transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
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
                  isSelected ? "bg-[#e8f3ff] text-[#1b64da]" : "text-[#191f28] hover:bg-[#f2f4f6]",
                  option.disabled && "cursor-not-allowed bg-white text-[#8b95a1] hover:bg-white",
                )}
                disabled={option.disabled}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                role="option"
                type="button"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold leading-6 tracking-[-0.02em]">{option.label}</span>
                  {option.description ? <span className="mt-1 block truncate text-sm font-normal leading-5 text-[#8b95a1]">{option.description}</span> : null}
                </span>
                {isSelected ? <span aria-hidden="true" className="shrink-0 text-[#3182f6]"><CheckIcon /></span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#e42939]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#8b95a1]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default TossSelect;
