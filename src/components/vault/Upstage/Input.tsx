import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface UpstageInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Upstage의 MODEL / FLOW 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function UpstageInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: UpstageInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#0a0d14]">{label}{required ? <span className="text-[#5b52ff]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-xl border border-[#cdd0d5] bg-white px-4 text-base text-[#0a0d14] outline-none placeholder:text-[#52525b] transition-all duration-500 ease-out focus:border-[#5b52ff] focus:ring-2 focus:ring-[#5b52ff]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#5b52ff]" : "text-[#52525b]")}>{feedback}</span> : null}
    </label>
  );
}

export default UpstageInput;
