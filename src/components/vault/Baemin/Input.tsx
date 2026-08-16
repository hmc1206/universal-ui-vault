import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface BaeminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력값을 설명하는 레이블입니다. */
  label?: string;
  /** 레이블 뒤에 표시할 선택 안내입니다. */
  optionalLabel?: string;
  /** 입력을 돕는 설명입니다. */
  description?: string;
  /** 다시 확인할 내용을 구체적으로 안내합니다. */
  error?: string;
  /** 입력칸 왼쪽에 표시할 요소입니다. */
  prefix?: ReactNode;
  /** 입력칸 오른쪽에 표시할 요소입니다. */
  suffix?: ReactNode;
  /** 값 지우기 버튼을 표시합니다. `onClear`와 함께 사용하세요. */
  clearable?: boolean;
  /** 지우기 버튼을 눌렀을 때 실행할 함수입니다. */
  onClear?: () => void;
  /** 최상위 컨테이너에 추가할 Tailwind 클래스입니다. */
  containerClassName?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ClearIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
      <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * 배달의민족의 밝은 민트 포커스와 Woowa 공개 웹의 50px·8px 컨트롤 기하를 반영한 독립형 입력 컴포넌트입니다.
 * 공식 명세에 오류용 별도 색상이 없으므로 오류는 검증된 진한 전경색과 명시적인 텍스트 안내로 구분합니다.
 */
export const BaeminInput = forwardRef<HTMLInputElement, BaeminInputProps>(function BaeminInput(
  {
    className,
    clearable = false,
    containerClassName,
    description,
    disabled,
    error,
    id,
    label,
    onClear,
    optionalLabel = "선택",
    prefix,
    readOnly,
    required,
    suffix,
    value,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const showClearButton = clearable && hasValue && Boolean(onClear) && !disabled && !readOnly;

  return (
    <div className={joinClasses("w-full font-[BAEMINWORK,system-ui,sans-serif]", containerClassName)}>
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label className="text-sm font-bold tracking-[-0.02em] text-[#232324]" htmlFor={inputId}>
            {label}
            {required ? <span className="ml-1 text-[#232324]">*</span> : null}
          </label>
          {!required && optionalLabel ? <span className="text-xs font-normal text-[#6c6d6f]">{optionalLabel}</span> : null}
        </div>
      ) : null}

      <div
        className={joinClasses(
          "group relative flex h-[50px] w-full items-center rounded-lg border bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out",
          error
            ? "border-2 border-[#232324] bg-[#fafafa]"
            : "border-[#a6a7a9] hover:border-[#6c6d6f] focus-within:border-[#0cefd3] focus-within:ring-2 focus-within:ring-[#0cefd3]/30",
          disabled && "cursor-not-allowed border-[#cccccc] bg-[#f3f4f5]",
          readOnly && !disabled && "bg-[#f6f6f6]",
        )}
      >
        {prefix ? (
          <span aria-hidden="true" className={joinClasses("flex shrink-0 items-center pl-4 text-[#6c6d6f]", disabled && "text-[#cccccc]")}>
            {prefix}
          </span>
        ) : null}

        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : inputProps["aria-invalid"]}
          className={joinClasses(
            "h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-normal tracking-[-0.02em] text-[#232324] outline-none placeholder:text-[#9b9c9f] disabled:cursor-not-allowed disabled:text-[#cccccc] read-only:cursor-default",
            prefix && "pl-3",
            (suffix || showClearButton) && "pr-3",
            className,
          )}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          ref={ref}
          required={required}
          value={value}
        />

        {showClearButton ? (
          <button
            aria-label="입력한 내용 지우기"
            className="mr-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#6c6d6f] outline-none transition-[background-color,color] duration-200 hover:bg-[#f3f4f5] hover:text-[#232324] focus-visible:ring-2 focus-visible:ring-[#0cefd3]/40"
            onClick={onClear}
            type="button"
          >
            <ClearIcon />
          </button>
        ) : suffix ? (
          <span aria-hidden="true" className={joinClasses("flex shrink-0 items-center pr-4 text-[#6c6d6f]", disabled && "text-[#cccccc]")}>
            {suffix}
          </span>
        ) : null}
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
});

BaeminInput.displayName = "BaeminInput";

export default BaeminInput;
