import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface StripeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 상단에 표시할 레이블입니다. */
  label?: string;
  /** 레이블 뒤에 표시할 선택 안내 문구입니다. */
  optionalLabel?: string;
  /** 입력 필드 하단에 표시할 보조 설명입니다. */
  hint?: string;
  /** 유효성 검사 오류 문구입니다. 오류가 있으면 보라색 포커스 대신 오류 상태를 표시합니다. */
  error?: string;
  /** 입력값 왼쪽에 표시할 아이콘 또는 접두 요소입니다. */
  leadingIcon?: ReactNode;
  /** 입력값 오른쪽에 표시할 아이콘 또는 접미 요소입니다. */
  trailingIcon?: ReactNode;
  /** 최상위 필드 컨테이너에 추가할 Tailwind 클래스입니다. */
  containerClassName?: string;
}

function joinClasses(...classes: Array<string | number | bigint | boolean | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Stripe 결제 UI의 정밀한 보더와 부드러운 보라색 포커스 글로우를 재현한 입력 컴포넌트입니다.
 * 컴포넌트 내부의 모든 시각 스타일은 Tailwind CSS 클래스로만 구성되어 있습니다.
 */
export const StripeInput = forwardRef<HTMLInputElement, StripeInputProps>(function StripeInput(
  {
    className,
    containerClassName,
    disabled,
    error,
    hint,
    id,
    label,
    leadingIcon,
    optionalLabel,
    required,
    trailingIcon,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full", containerClassName)}>
      {label ? (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <label className="text-[13px] font-medium leading-5 text-[#30313d]" htmlFor={inputId}>
            {label}
            {required ? <span className="ml-0.5 text-[#635bff]">*</span> : null}
          </label>
          {optionalLabel ? <span className="text-xs leading-5 text-[#8c8c9a]">{optionalLabel}</span> : null}
        </div>
      ) : null}

      <div
        className={joinClasses(
          "group relative flex h-11 w-full items-center overflow-hidden rounded-[7px] border bg-white shadow-[0_1px_2px_rgba(37,38,60,0.04)] transition-[border-color,box-shadow] duration-200 ease-out",
          error
            ? "border-[#df1b41] focus-within:border-[#df1b41] focus-within:ring-4 focus-within:ring-[#df1b41]/10"
            : "border-[#d8d8e3] hover:border-[#bcbcc9] focus-within:border-[#635bff] focus-within:shadow-[0_0_0_1px_rgba(99,91,255,0.16),0_4px_12px_rgba(99,91,255,0.12)] focus-within:ring-4 focus-within:ring-[#635bff]/10",
          disabled && "cursor-not-allowed border-[#e6e6ed] bg-[#f7f7f9] shadow-none",
        )}
      >
        {leadingIcon ? (
          <span
            aria-hidden="true"
            className={joinClasses(
              "flex shrink-0 items-center justify-center pl-3.5 transition-colors duration-200",
              error ? "text-[#df1b41]" : "text-[#858593] group-focus-within:text-[#635bff]",
              disabled && "text-[#adadb8]",
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
            "h-full min-w-0 flex-1 border-0 bg-transparent px-3.5 text-sm font-normal text-[#25252f] outline-none placeholder:text-[#9a9aa7] disabled:cursor-not-allowed disabled:text-[#858593]",
            leadingIcon && "pl-2.5",
            trailingIcon && "pr-2.5",
            className,
          )}
          disabled={disabled}
          id={inputId}
          ref={ref}
          required={required}
        />

        {trailingIcon ? (
          <span
            aria-hidden="true"
            className={joinClasses(
              "flex shrink-0 items-center justify-center pr-3.5 transition-colors duration-200",
              error ? "text-[#df1b41]" : "text-[#858593] group-focus-within:text-[#635bff]",
              disabled && "text-[#adadb8]",
            )}
          >
            {trailingIcon}
          </span>
        ) : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-1.5 text-xs font-medium leading-5 text-[#c11335]" id={errorId}>
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs leading-5 text-[#727280]" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
});

StripeInput.displayName = "StripeInput";

export default StripeInput;
