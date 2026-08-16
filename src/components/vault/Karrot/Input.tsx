import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export type KarrotInputVariant = "outlined" | "underlined";

export interface KarrotInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력값을 설명하는 레이블입니다. */
  label?: string;
  /** 레이블 뒤에 표시할 선택 안내입니다. */
  optionalLabel?: string;
  /** 입력 전 도움말 또는 입력 후 안내입니다. */
  description?: string;
  /** 다시 확인이 필요한 항목의 구체적인 안내입니다. */
  error?: string;
  /** 입력칸 왼쪽에 표시할 요소입니다. */
  prefix?: ReactNode;
  /** 입력칸 오른쪽에 표시할 요소입니다. */
  suffix?: ReactNode;
  /** 테두리형 또는 밑줄형 입력칸을 선택합니다. */
  variant?: KarrotInputVariant;
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
 * 당근 SEED의 단일 행 텍스트 필드 상태를 담은 독립형 입력 컴포넌트입니다.
 * 레이블, 설명, 필수 표시, 읽기 전용, 비활성, 오류 상태를 한 파일에서 지원합니다.
 */
export const KarrotInput = forwardRef<HTMLInputElement, KarrotInputProps>(function KarrotInput(
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
    variant = "outlined",
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
    <div className={joinClasses("w-full", containerClassName)}>
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label className="text-sm font-semibold tracking-[-0.02em] text-[#212124]" htmlFor={inputId}>
            {label}
            {required ? <span className="ml-1 text-[#fa2314]">*</span> : null}
          </label>
          {!required && optionalLabel ? <span className="text-xs font-medium text-[#868b94]">{optionalLabel}</span> : null}
        </div>
      ) : null}

      <div
        className={joinClasses(
          "group relative flex h-12 w-full items-center bg-white transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
          variant === "outlined" ? "rounded-lg border" : "border-b-2",
          error
            ? "border-[#fa342c] bg-[#fffafa] focus-within:border-[#fa342c]"
            : "border-[#d9dce1] hover:border-[#b8bdc6] focus-within:border-[#ff6f0f]",
          !error && variant === "outlined" && "focus-within:ring-2 focus-within:ring-[#ff6f0f]/20",
          disabled && "cursor-not-allowed border-[#eaebee] bg-[#f7f8fa]",
          readOnly && !disabled && "bg-[#f7f8fa]",
        )}
      >
        {prefix ? (
          <span aria-hidden="true" className={joinClasses("flex shrink-0 items-center pl-4 text-[#868b94]", disabled && "text-[#b8bdc6]")}>
            {prefix}
          </span>
        ) : null}

        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : inputProps["aria-invalid"]}
          className={joinClasses(
            "h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-[15px] font-normal tracking-[-0.02em] text-[#212124] outline-none placeholder:text-[#aeb3bb] disabled:cursor-not-allowed disabled:text-[#868b94] read-only:cursor-default",
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
            className="mr-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#868b94] outline-none transition-[background-color,color] duration-150 hover:bg-[#f2f3f6] hover:text-[#212124] focus-visible:ring-2 focus-visible:ring-[#ff6f0f]/30"
            onClick={onClear}
            type="button"
          >
            <ClearIcon />
          </button>
        ) : suffix ? (
          <span aria-hidden="true" className={joinClasses("flex shrink-0 items-center pr-4 text-[#868b94]", disabled && "text-[#b8bdc6]")}>
            {suffix}
          </span>
        ) : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-[13px] font-normal leading-5 tracking-[-0.02em] text-[#fa342c]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-[13px] font-normal leading-5 tracking-[-0.02em] text-[#868b94]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
});

KarrotInput.displayName = "KarrotInput";

export default KarrotInput;
