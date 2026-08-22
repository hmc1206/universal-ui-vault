import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface TwentyNineCmInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** 29CM의 EDITORIAL SELECTION 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function TwentyNineCmInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: TwentyNineCmInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#111111]">{label}{required ? <span className="text-[#ff4800]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-none border border-[#d8d8d8] bg-white px-4 text-base text-[#111111] outline-none placeholder:text-[#666666] transition-all duration-300 ease-out focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#ff4800]" : "text-[#666666]")}>{feedback}</span> : null}
    </label>
  );
}

export default TwentyNineCmInput;
