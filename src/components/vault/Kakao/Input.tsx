import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface KakaoInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Kakao의 TALK TOGETHER 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function KakaoInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: KakaoInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#3c1e1e]">{label}{required ? <span className="text-[#3c1e1e]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-[22px] border border-[#e8d000] bg-white px-4 text-base text-[#3c1e1e] outline-none placeholder:text-[#6b5353] transition-all duration-200 ease-out focus:border-[#3c1e1e] focus:ring-2 focus:ring-[#3c1e1e]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#3c1e1e]" : "text-[#6b5353]")}>{feedback}</span> : null}
    </label>
  );
}

export default KakaoInput;
