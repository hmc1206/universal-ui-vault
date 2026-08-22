import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface TossInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Toss의 EASY MONEY FLOW 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function TossInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: TossInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#191f28]">{label}{required ? <span className="text-[#3182f6]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-3xl border border-[#dcecff] bg-white px-4 text-base text-[#191f28] outline-none placeholder:text-[#6b7684] transition-all duration-300 ease-out focus:border-[#3182f6] focus:ring-2 focus:ring-[#3182f6]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#3182f6]" : "text-[#6b7684]")}>{feedback}</span> : null}
    </label>
  );
}

export default TossInput;
