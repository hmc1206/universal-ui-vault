import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface BaeminInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Baemin의 오늘 뭐 먹지? 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function BaeminInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: BaeminInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans font-black", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#222222]">{label}{required ? <span className="text-[#222222]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-[28px] border border-[#222222] bg-white px-4 text-base text-[#222222] outline-none placeholder:text-[#52615e] transition-all duration-200 ease-out focus:border-[#0cefd3] focus:ring-2 focus:ring-[#0cefd3]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#222222]" : "text-[#52615e]")}>{feedback}</span> : null}
    </label>
  );
}

export default BaeminInput;
