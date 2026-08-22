import { useId, type ChangeEvent, type ReactNode } from "react";

export interface FigmaSelectOption { value: string; label: string; disabled?: boolean; }
export interface FigmaSelectProps {
  label?: ReactNode;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: FigmaSelectOption[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  errorMessage?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Figma의 선택 구조와 focus rhythm을 담은 native-accessible select입니다. */
export function FigmaSelect({ className, description, disabled = false, error, errorMessage, label, onChange, options, placeholder = "옵션을 선택하세요", required = false, value = "", ...props }: FigmaSelectProps) {
  const id = useId();
  const feedback = error ?? errorMessage ?? description;
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange?.(event);
  }
  return (
    <label className={joinClasses("block font-['figmaSans']", className)} htmlFor={id}>
      {label ? <span className="mb-2 block text-sm font-bold text-[#ffffff]">{label}{required ? <span className="ml-1 text-[#0d99ff]">*</span> : null}</span> : null}
      <span className="relative block"><select {...props} aria-invalid={Boolean(error || errorMessage) || undefined} className="min-h-12 w-full appearance-none rounded-sm border border-[#4d4d4d] bg-white px-4 pr-11 text-sm font-semibold text-[#ffffff] outline-none transition-all duration-150 ease-out focus:border-[#0d99ff] focus:ring-2 focus:ring-[#0d99ff]/20" disabled={disabled} id={id} onChange={handleChange} value={value}><option disabled value="">{placeholder}</option>{options.map((option) => <option disabled={option.disabled} key={option.value} value={option.value}>{option.label}</option>)}</select><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0d99ff]">⌄</span></span>
      {feedback ? <span className="mt-2 block text-xs text-[#b8b8b8]">{feedback}</span> : null}
    </label>
  );
}

export default FigmaSelect;
