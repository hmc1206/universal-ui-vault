import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface MusinsaInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Musinsa의 MUSINSA STANDARD 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function MusinsaInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: MusinsaInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans font-black", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#000000]">{label}{required ? <span className="text-[#000000]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-none border border-[#111111] bg-white px-4 text-base text-[#000000] outline-none placeholder:text-[#666666] transition-all duration-150 ease-out focus:border-[#000000] focus:ring-2 focus:ring-[#000000]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#000000]" : "text-[#666666]")}>{feedback}</span> : null}
    </label>
  );
}

export default MusinsaInput;
