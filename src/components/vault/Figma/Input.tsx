import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface FigmaInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Figma의 CANVAS / 100% 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function FigmaInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: FigmaInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-['figmaSans']", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#ffffff]">{label}{required ? <span className="text-[#0d99ff]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-sm border border-[#4d4d4d] bg-white px-4 text-base text-[#ffffff] outline-none placeholder:text-[#b8b8b8] transition-all duration-150 ease-out focus:border-[#0d99ff] focus:ring-2 focus:ring-[#0d99ff]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#0d99ff]" : "text-[#b8b8b8]")}>{feedback}</span> : null}
    </label>
  );
}

export default FigmaInput;
