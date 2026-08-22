import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface FigmaInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력 필드 제목입니다. */
  label?: ReactNode;
  /** 입력을 보조하는 설명입니다. */
  helperText?: ReactNode;
  /** 오류를 직접 설명하는 문구입니다. */
  errorMessage?: ReactNode;
  /** 입력 영역을 감싸는 컨테이너 클래스입니다. */
  containerClassName?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Figma public page의 white canvas, black chrome, #ebebeb border, figmaSans와
 * verified dashed #0d99ff focus treatment을 이용한 form-field 확장입니다.
 * public capture에는 input/error state가 없으므로, invalid border와 helper/error layout은 local web extension입니다.
 * editor input 또는 editor error token을 주장하지 않습니다.
 */
export function FigmaInput({
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
}: FigmaInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-help` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = Boolean(errorMessage);

  return (
    <label className={joinClasses("block font-['figmaSans']", containerClassName)} htmlFor={inputId}>
      {label ? <span className="mb-2 block text-base font-[330] leading-[23px] tracking-[-0.009em] text-black">{label}</span> : null}
      <input
        {...inputProps}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        className={joinClasses(
          "min-h-[49px] w-full rounded-lg border bg-white px-4 py-3 text-base font-[330] leading-[23px] tracking-[-0.009em] text-black outline-none placeholder:text-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-[#0d99ff] disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-black/50",
          hasError ? "border-black" : "border-[#ebebeb]",
          className,
        )}
        disabled={disabled}
        id={inputId}
        type={type}
      />
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

export default FigmaInput;
