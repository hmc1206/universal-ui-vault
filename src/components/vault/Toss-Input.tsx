import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface TossInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 위에 표시할 제목입니다. */
  label?: string;
  /** 레이블 뒤에 가볍게 표시할 안내입니다. */
  optionalLabel?: string;
  /** 입력을 도와주는 짧은 설명입니다. */
  hint?: string;
  /** 다시 확인이 필요한 경우 표시할 문구입니다. */
  error?: string;
  /** 입력 내용 왼쪽에 표시할 아이콘입니다. */
  leadingIcon?: ReactNode;
  /** 입력 내용 오른쪽에 표시할 아이콘입니다. */
  trailingIcon?: ReactNode;
  /** 현재 입력값을 지우는 버튼을 표시합니다. `onClear`와 함께 사용하세요. */
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
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 16 16">
      <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * 토스의 차분하고 다정한 입력 경험을 담은 독립형 입력 컴포넌트입니다.
 * 모든 시각 표현은 Tailwind CSS 유틸리티 클래스로만 구성되어 있습니다.
 */
export const TossInput = forwardRef<HTMLInputElement, TossInputProps>(function TossInput(
  {
    className,
    clearable = false,
    containerClassName,
    disabled,
    error,
    hint,
    id,
    label,
    leadingIcon,
    onClear,
    optionalLabel = "선택",
    required,
    trailingIcon,
    value,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], hintId, errorId].filter(Boolean).join(" ") || undefined;
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const showClearButton = clearable && hasValue && Boolean(onClear) && !disabled;

  return (
    <div className={joinClasses("w-full", containerClassName)}>
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label className="text-sm font-semibold tracking-[-0.02em] text-[#333d4b]" htmlFor={inputId}>
            {label}
            {required ? <span className="ml-0.5 text-[#3182f6]">*</span> : null}
          </label>
          {!required && optionalLabel ? <span className="text-xs font-medium text-[#8b95a1]">{optionalLabel}</span> : null}
        </div>
      ) : null}

      <div
        className={joinClasses(
          "group relative flex h-12 w-full items-center rounded-lg border bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out",
          error
            ? "border-[#f6a6a1] bg-[#fffafa] focus-within:border-[#e65a4f] focus-within:ring-4 focus-within:ring-[#e65a4f]/10"
            : "border-[#e5e8eb] hover:border-[#c9d1d9] focus-within:border-[#3182f6] focus-within:bg-[#fbfdff] focus-within:shadow-[0_0_0_3px_rgba(49,130,246,0.12)]",
          disabled && "cursor-not-allowed border-[#edf0f2] bg-[#f7f8fa] shadow-none",
        )}
      >
        {leadingIcon ? (
          <span
            aria-hidden="true"
            className={joinClasses(
              "flex shrink-0 items-center justify-center pl-3.5 transition-colors duration-200",
              error ? "text-[#e65a4f]" : "text-[#8b95a1] group-focus-within:text-[#3182f6]",
              disabled && "text-[#b0b8c1]",
            )}
          >
            {leadingIcon}
          </span>
        ) : null}

        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : inputProps["aria-invalid"]}
          className={joinClasses(
            "h-full min-w-0 flex-1 rounded-lg border-0 bg-transparent px-3.5 text-[15px] font-medium tracking-[-0.02em] text-[#191f28] outline-none placeholder:font-normal placeholder:text-[#b0b8c1] disabled:cursor-not-allowed disabled:text-[#8b95a1]",
            leadingIcon && "pl-2.5",
            (trailingIcon || showClearButton) && "pr-2.5",
            className,
          )}
          disabled={disabled}
          id={inputId}
          ref={ref}
          required={required}
          value={value}
        />

        {showClearButton ? (
          <button
            aria-label="입력한 내용 지우기"
            className="mr-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#8b95a1] outline-none transition-[background-color,color,transform] duration-150 hover:bg-[#eef2f6] hover:text-[#4e5968] focus-visible:bg-[#e8f3ff] focus-visible:text-[#3182f6] focus-visible:ring-2 focus-visible:ring-[#3182f6]/30 active:scale-90"
            onClick={onClear}
            type="button"
          >
            <ClearIcon />
          </button>
        ) : trailingIcon ? (
          <span
            aria-hidden="true"
            className={joinClasses(
              "flex shrink-0 items-center justify-center pr-3.5 transition-colors duration-200",
              error ? "text-[#e65a4f]" : "text-[#8b95a1] group-focus-within:text-[#3182f6]",
              disabled && "text-[#b0b8c1]",
            )}
          >
            {trailingIcon}
          </span>
        ) : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-xs font-medium tracking-[-0.015em] text-[#e65a4f]" id={errorId}>
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs font-medium tracking-[-0.015em] text-[#8b95a1]" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
});

TossInput.displayName = "TossInput";

export default TossInput;
