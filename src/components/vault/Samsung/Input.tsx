import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface SamsungInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Samsung의 ONE UI / READY 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function SamsungInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: SamsungInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#111111]">{label}{required ? <span className="text-[#007aff]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-2xl border border-[#dbe3f0] bg-white px-4 text-base text-[#111111] outline-none placeholder:text-[#6b7280] transition-all duration-300 ease-out focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#007aff]" : "text-[#6b7280]")}>{feedback}</span> : null}
    </label>
  );
}

export default SamsungInput;
