import { useId, type ChangeEvent, type ReactNode } from "react";

/**
 * 2026 local enhancement: liquid-glass refraction, spatial depth and WCAG-oriented reduced-motion/high-contrast utilities are layered over the existing brand DNA.
 * The visual extension uses #ff4800 only as this component's existing brand accent; it does not redefine unobserved official product states.
 */

export interface TwentyNineCmSelectOption { value: string; label: string; disabled?: boolean; }
export interface TwentyNineCmSelectProps {
  label?: ReactNode;
  value?: string;
  onChange?: ((value: string, option: TwentyNineCmSelectOption) => void) | ((event: ChangeEvent<HTMLSelectElement>) => void);
  options: TwentyNineCmSelectOption[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  errorMessage?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** 29CM의 선택 구조와 focus rhythm을 담은 native-accessible select입니다. */
export function TwentyNineCmSelect({ className, description, disabled = false, error, errorMessage, label, onChange, options, placeholder = "옵션을 선택하세요", required = false, value = "", ...props }: TwentyNineCmSelectProps) {
  const id = useId();
  const feedback = error ?? errorMessage ?? description;
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const option = options.find((item) => item.value === event.target.value) ?? { value: event.target.value, label: event.target.value };
    if (onChange) (onChange as (value: string, option: TwentyNineCmSelectOption) => void)(event.target.value, option);
  }
  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={id}>
      {label ? <span className="mb-2 block text-sm font-bold text-[#111111]">{label}{required ? <span className="ml-1 text-[#ff4800]">*</span> : null}</span> : null}
      <span className="relative block"><select {...props} aria-invalid={Boolean(error || errorMessage) || undefined} className="min-h-12 w-full appearance-none rounded-none border border-[#d8d8d8] bg-white px-4 pr-11 text-sm font-semibold text-[#111111] outline-none motion-reduce:transform-none motion-reduce:transition-none contrast-more:outline contrast-more:outline-2 contrast-more:outline-current focus-within:outline focus-within:outline-2 focus-within:outline-current transition-all duration-300 ease-out focus:border-[#111111] shadow-[0_8px_20px_rgba(15,23,42,0.07)] backdrop-blur-md focus:shadow-[0_14px_30px_rgba(15,23,42,0.12)] focus:ring-2 focus:ring-[#111111]/20" disabled={disabled} id={id} onChange={handleChange} value={value}><option disabled value="">{placeholder}</option>{options.map((option) => <option disabled={option.disabled} key={option.value} value={option.value}>{option.label}</option>)}</select><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ff4800]">⌄</span></span>
      {feedback ? <span className="mt-2 block text-xs text-[#666666]">{feedback}</span> : null}
    </label>
  );
}

export default TwentyNineCmSelect;
