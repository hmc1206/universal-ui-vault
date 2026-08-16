import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export type KakaoInputVariant = "search" | "outlined";

export interface KakaoInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  /** 검색 컨트롤 또는 일반 외곽선 필드를 선택합니다. */
  variant?: KakaoInputVariant;
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
 * 카카오 기업 웹의 36px 검색 컨트롤과 18px 반경을 반영한 독립형 입력 컴포넌트입니다.
 * 공식 명세에 오류 의미색이 없으므로 오류는 검증된 진한 전경색과 구체적인 안내 텍스트로 구분합니다.
 */
export const KakaoInput = forwardRef<HTMLInputElement, KakaoInputProps>(function KakaoInput(
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
    <div className={joinClasses("w-full font-[KakaoSmall,system-ui,sans-serif]", containerClassName)}>
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label className="text-sm font-bold tracking-[-0.02em] text-[#333333]" htmlFor={inputId}>
            {label}
            {required ? <span className="ml-1 text-[#333333]">*</span> : null}
          </label>
          {!required && optionalLabel ? <span className="text-xs font-normal text-[#888888]">{optionalLabel}</span> : null}
        </div>
      ) : null}

      <div
        className={joinClasses(
          "group relative flex w-full items-center border bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out",
          variant === "search" ? "h-9 rounded-[18px]" : "h-12 rounded-xl",
          error
            ? "border-2 border-[#333333] bg-[#fafafa]"
            : "border-[#dbdbdb] hover:border-[#888888] focus-within:border-[#fae100] focus-within:ring-2 focus-within:ring-[#fae100]/40",
          disabled && "cursor-not-allowed border-[#dbdbdb] bg-[#eeeeee]",
          readOnly && !disabled && "bg-[#f7f7f7]",
        )}
      >
        {prefix ? (
          <span aria-hidden="true" className={joinClasses("flex shrink-0 items-center pl-4 text-[#888888]", disabled && "text-[#bbbbbb]")}>
            {prefix}
          </span>
        ) : null}

        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : inputProps["aria-invalid"]}
          className={joinClasses(
            "h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-normal tracking-[-0.02em] text-[#333333] outline-none placeholder:text-[#aaaaaa] disabled:cursor-not-allowed disabled:text-[#888888] read-only:cursor-default",
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
            className="mr-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#888888] outline-none transition-[background-color,color] duration-200 hover:bg-[#eeeeee] hover:text-[#333333] focus-visible:ring-2 focus-visible:ring-[#fae100]/60"
            onClick={onClear}
            type="button"
          >
            <ClearIcon />
          </button>
        ) : suffix ? (
          <span aria-hidden="true" className={joinClasses("flex shrink-0 items-center pr-4 text-[#888888]", disabled && "text-[#bbbbbb]")}>
            {suffix}
          </span>
        ) : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-[13px] font-normal leading-5 tracking-[-0.02em] text-[#333333]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-[13px] font-normal leading-5 tracking-[-0.02em] text-[#888888]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
});

KakaoInput.displayName = "KakaoInput";

export default KakaoInput;
