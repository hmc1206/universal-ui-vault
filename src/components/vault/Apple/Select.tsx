import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

export interface AppleSelectOption {
  /** 실제 선택 값입니다. */
  value: string;
  /** 사용자에게 보이는 옵션 레이블입니다. */
  label: ReactNode;
  /** 선택할 수 없는 옵션인지 나타냅니다. */
  disabled?: boolean;
}

export interface AppleSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  /** 선택할 옵션 목록입니다. */
  options: AppleSelectOption[];
  /** 필드 제목입니다. */
  label?: ReactNode;
  /** 필드의 보조 설명입니다. */
  helperText?: ReactNode;
  /** 오류가 있을 때 표시할 직접적인 설명입니다. */
  errorMessage?: ReactNode;
  /** 빈 선택지의 안내 레이블입니다. */
  placeholder?: string;
  /** 입력 영역을 감싸는 컨테이너 클래스입니다. */
  containerClassName?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Apple public web의 SF Pro Text, white/fog surface, #1d1d1f/#6e6e73 hierarchy를 활용한 select 확장입니다.
 * 공개 캡처에는 form select과 option hover/check 상태가 없으므로 native select 동작을 유지하며 custom state를 주장하지 않습니다.
 * focus ring 및 invalid border는 접근성을 위한 지역 확장입니다.
 */
export function AppleSelect({
  "aria-describedby": ariaDescribedBy,
  className,
  containerClassName,
  disabled,
  errorMessage,
  helperText,
  id,
  label,
  options,
  placeholder,
  ...selectProps
}: AppleSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-help` : undefined;
  const errorId = errorMessage ? `${selectId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = Boolean(errorMessage);

  return (
    <label className={joinClasses("block font-['SF_Pro_Text']", containerClassName)} htmlFor={selectId}>
      {label ? <span className="mb-2 block text-[17px] font-normal leading-[22px] tracking-[-0.01em] text-[#1d1d1f]">{label}</span> : null}
      <span className="relative block">
        <select
          {...selectProps}
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          className={joinClasses(
            "min-h-11 w-full appearance-none rounded-xl border bg-white py-[11px] pl-4 pr-11 text-[17px] font-normal leading-[22px] tracking-[-0.01em] text-[#1d1d1f] outline-none focus-visible:border-[#0066cc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066cc] disabled:cursor-not-allowed disabled:bg-[#f5f5f7] disabled:text-[#6e6e73]",
            hasError ? "border-[#1d1d1f]" : "border-[#6e6e73]",
            className,
          )}
          disabled={disabled}
          id={selectId}
        >
          {placeholder ? (
            <option disabled value="">
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#515154]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      </span>
      {helperText ? (
        <span className="mt-2 block text-sm font-normal leading-[18px] tracking-[-0.01em] text-[#6e6e73]" id={helperId}>
          {helperText}
        </span>
      ) : null}
      {errorMessage ? (
        <span className="mt-2 block text-sm font-normal leading-[18px] tracking-[-0.01em] text-[#1d1d1f]" id={errorId} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </label>
  );
}

export default AppleSelect;
