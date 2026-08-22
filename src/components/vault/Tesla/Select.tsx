import { useId, type ChangeEvent, type ReactNode } from "react";

export interface TeslaSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TeslaSelectProps {
  /** 선택 필드의 레이블입니다. */
  label?: ReactNode;
  /** 현재 선택값입니다. */
  value?: string;
  /** 선택값과 옵션을 전달합니다. */
  onChange?: (value: string, option: TeslaSelectOption) => void;
  /** 옵션 목록입니다. */
  options: TeslaSelectOption[];
  /** 값이 없을 때 표시할 안내입니다. */
  placeholder?: string;
  /** 레이블 아래의 추가 설명입니다. */
  description?: ReactNode;
  /** 오류 텍스트입니다. */
  error?: ReactNode;
  /** error의 별칭입니다. */
  errorMessage?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3의 4px mode-tab geometry와 #171a20/#5c5e62 copy contrast를 활용한 select 확장입니다.
 * 공개 캡처에는 native/custom select 및 option-menu state가 없으므로, 이 component의 change/error behavior는 공식 Tesla control로 주장하지 않습니다.
 */
export function TeslaSelect({
  className,
  description,
  disabled = false,
  error,
  errorMessage,
  label,
  onChange,
  options,
  placeholder = "옵션을 선택하세요",
  required = false,
  value = "",
}: TeslaSelectProps) {
  const inputId = useId();
  const feedback = error ?? errorMessage ?? description;
  const hasError = Boolean(error ?? errorMessage);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = options.find((option) => option.value === event.target.value) ?? {
      value: event.target.value,
      label: event.target.value,
    };

    onChange?.(event.target.value, selectedOption);
  }

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[#171a20]">
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </span>
      ) : null}
      <span className="relative block rounded-[4px] bg-[#f4f4f4] p-1">
        <select
          aria-describedby={feedback ? `${inputId}-feedback` : undefined}
          aria-invalid={hasError || undefined}
          className={joinClasses(
            "min-h-11 w-full appearance-none rounded-[4px] border border-transparent bg-white px-3 pr-10 text-sm font-medium text-[#171a20] outline-none focus:border-[#393c41] focus:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)] disabled:cursor-not-allowed disabled:opacity-50",
            hasError && "border-[#393c41]",
          )}
          disabled={disabled}
          id={inputId}
          onChange={handleChange}
          required={required}
          value={value}
        >
          <option disabled value="">
            {placeholder}
          </option>
          {options.map((option) => (
            <option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#393c41]">
          ▾
        </span>
      </span>
      {feedback ? (
        <span className={joinClasses("mt-2 block text-xs leading-5", hasError ? "font-medium text-[#393c41]" : "text-[#5c5e62]")} id={`${inputId}-feedback`}>
          {feedback}
        </span>
      ) : null}
    </label>
  );
}

export default TeslaSelect;
