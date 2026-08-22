import { useId, type InputHTMLAttributes, type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #ff6f0f only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface KarrotInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

/** Karrot의 우리 동네 입력 리듬과 선명한 focus feedback을 담은 독립형 필드입니다. */
export function KarrotInput({ className, description, error, errorMessage, helperText, id, inputClassName, label, required = false, type = "text", ...props }: KarrotInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#212124]">{label}{required ? <span className="text-[#ff6f0f]">*</span> : null}</span> : null}
      <span className="relative block">
        <input
          {...props}
          aria-invalid={Boolean(error || errorMessage) || undefined}
          className={joinClasses("min-h-12 w-full rounded-3xl border border-[#ffe1d0] bg-white px-4 text-base text-[#212124] outline-none motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current shadow-[0_8px_20px_rgba(15,23,42,0.07)] backdrop-blur-md placeholder:text-[#868b94] transition-all duration-200 ease-out focus:border-[#ff6f0f] focus:shadow-[0_14px_30px_rgba(15,23,42,0.12)] focus:ring-2 focus:ring-[#ff6f0f]/20", inputClassName)}
          id={inputId}
          type={type}
        />
      </span>
      {feedback ? <span className={joinClasses("mt-2 block text-xs leading-5", error || errorMessage ? "text-[#ff6f0f]" : "text-[#868b94]")}>{feedback}</span> : null}
    </label>
  );
}

export default KarrotInput;
