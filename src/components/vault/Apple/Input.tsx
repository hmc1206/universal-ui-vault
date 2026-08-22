import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface AppleInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 필드 제목입니다. */
  label?: ReactNode;
  /** 보조 설명입니다. */
  helperText?: ReactNode;
  /** 오류가 있을 때 표시할 직접적인 설명입니다. */
  errorMessage?: ReactNode;
  /** 입력 영역을 감싸는 컨테이너 클래스입니다. */
  containerClassName?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Apple public web의 SF Pro Text, #1d1d1f, #6e6e73, white/fog surface를 사용하는 form-field 확장입니다.
 * 공개 캡처에는 input 및 error/focus 상태가 없으므로, blue focus ring과 neutral invalid border는 접근성 목적의 지역 확장입니다.
 * Apple native semantic color 또는 native control token을 주장하지 않습니다.
 */
export function AppleInput({
  "aria-describedby": ariaDescribedBy,
  className,
  containerClassName,
  disabled,
  errorMessage,
  helperText,
  id,
  label,
  type = "text",
  ...inputProps
}: AppleInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-help` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = Boolean(errorMessage);

  return (
    <label className={joinClasses("block font-['SF_Pro_Text']", containerClassName)} htmlFor={inputId}>
      {label ? <span className="mb-2 block text-[17px] font-normal leading-[22px] tracking-[-0.01em] text-[#1d1d1f]">{label}</span> : null}
      <input
        {...inputProps}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        className={joinClasses(
          "min-h-11 w-full rounded-xl border bg-white px-4 py-[11px] text-[17px] font-normal leading-[22px] tracking-[-0.01em] text-[#1d1d1f] outline-none placeholder:text-[#6e6e73] focus-visible:border-[#0066cc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066cc] disabled:cursor-not-allowed disabled:bg-[#f5f5f7] disabled:text-[#6e6e73]",
          hasError ? "border-[#1d1d1f]" : "border-[#6e6e73]",
          className,
        )}
        disabled={disabled}
        id={inputId}
        type={type}
      />
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

export default AppleInput;
