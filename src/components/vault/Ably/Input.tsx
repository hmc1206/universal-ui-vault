import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface AblyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  errorMessage?: ReactNode;
  required?: boolean;
  inputClassName?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/** Ably의 STYLE DROP 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function AblyInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: AblyInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#2b1d22]">{label}{required ? <span className="text-[#ff5160]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-3xl border border-[#ffd5db] bg-white px-4 text-base text-[#2b1d22] outline-none placeholder:text-[#7b5962] transition-all duration-200 ease-out focus:border-[#ff5160] focus:ring-2 focus:ring-[#ff5160]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#ff5160]" : "text-[#7b5962]")}>{feedback}</span> : null}
    </label>
  );
}

export default AblyInput;
