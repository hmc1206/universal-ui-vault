import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

export interface FigmaSelectOption {
  /** 실제 선택 값입니다. */
  value: string;
  /** 사용자에게 보이는 옵션 레이블입니다. */
  label: string;
  /** 선택할 수 없는 옵션인지 나타냅니다. */
  disabled?: boolean;
}

export interface FigmaSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  /** 선택할 옵션 목록입니다. */
  options: FigmaSelectOption[];
  /** 필드 제목입니다. */
  label?: ReactNode;
  /** 선택을 보조하는 설명입니다. */
  helperText?: ReactNode;
  /** 오류를 직접 설명하는 문구입니다. */
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
 * Figma public page의 figmaSans, black/white chrome, #ebebeb separation과 dashed #0d99ff focus treatment을 사용하는 select 확장입니다.
 * capture에는 dropdown option hover/check/editor state가 없으므로 native select behavior를 유지하고 custom selection UI를 주장하지 않습니다.
 * invalid presentation은 local web extension입니다.
 */
export function FigmaSelect({
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
}: FigmaSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-help` : undefined;
  const errorId = errorMessage ? `${selectId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = Boolean(errorMessage);

  return (
    <label className={joinClasses("block font-['figmaSans']", containerClassName)} htmlFor={selectId}>
      {label ? <span className="mb-2 block text-base font-[330] leading-[23px] tracking-[-0.009em] text-black">{label}</span> : null}
      <span className="relative block">
        <select
          {...selectProps}
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          className={joinClasses(
            "min-h-[49px] w-full appearance-none rounded-lg border bg-white py-3 pl-4 pr-12 text-base font-[330] leading-[23px] tracking-[-0.009em] text-black outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-[#0d99ff] disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-black/50",
            hasError ? "border-black" : "border-[#ebebeb]",
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
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </span>
      {helperText ? (
        <span className="mt-2 block text-sm font-[330] leading-5 tracking-[-0.009em] text-black/65" id={helperId}>
          {helperText}
        </span>
      ) : null}
      {errorMessage ? (
        <span className="mt-2 block text-sm font-[400] leading-5 tracking-[-0.009em] text-black" id={errorId} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </label>
  );
}

export default FigmaSelect;
