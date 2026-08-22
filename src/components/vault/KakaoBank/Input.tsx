import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface KakaoBankInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** KakaoBank의 BALANCE / TODAY 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function KakaoBankInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: KakaoBankInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#171717]">{label}{required ? <span className="text-[#171717]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-2xl border border-[#ece2a0] bg-white px-4 text-base text-[#171717] outline-none placeholder:text-[#676767] transition-all duration-300 ease-out focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#171717]" : "text-[#676767]")}>{feedback}</span> : null}
    </label>
  );
}

export default KakaoBankInput;
