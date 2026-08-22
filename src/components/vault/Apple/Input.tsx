import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface AppleInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Apple의 DESIGNED TO FEEL NATURAL 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function AppleInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: AppleInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-['SF_Pro_Display']", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#1d1d1f]">{label}{required ? <span className="text-[#2997ff]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-[22px] border border-[#d2d2d7] bg-white px-4 text-base text-[#1d1d1f] outline-none placeholder:text-[#6e6e73] transition-all duration-500 ease-out focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#2997ff]" : "text-[#6e6e73]")}>{feedback}</span> : null}
    </label>
  );
}

export default AppleInput;
