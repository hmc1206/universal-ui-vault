import { useId, type ChangeEvent, type ReactNode } from "react";

export interface TossSelectOption { value: string; label: string; disabled?: boolean; }
export interface TossSelectProps {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string, option: TossSelectOption) => void;
  options: TossSelectOption[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  errorMessage?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Toss의 선택 구조와 focus rhythm을 담은 native-accessible select입니다. */
export function TossSelect({ className, description, disabled = false, error, errorMessage, label, onChange, options, placeholder = "옵션을 선택하세요", required = false, value = "", ...props }: TossSelectProps) {
  const id = useId();
  const feedback = error ?? errorMessage ?? description;
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const option = options.find((item) => item.value === event.target.value) ?? { value: event.target.value, label: event.target.value };
    if (onChange) (onChange as (value: string, option: TossSelectOption) => void)(event.target.value, option);
  }
  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={id}>
      {label ? <span className="mb-2 block text-sm font-bold text-[#191f28]">{label}{required ? <span className="ml-1 text-[#3182f6]">*</span> : null}</span> : null}
      <span className="relative block"><select {...props} aria-invalid={Boolean(error || errorMessage) || undefined} className="min-h-12 w-full appearance-none rounded-3xl border border-[#dcecff] bg-white px-4 pr-11 text-sm font-semibold text-[#191f28] outline-none transition-all duration-300 ease-out focus:border-[#3182f6] focus:ring-2 focus:ring-[#3182f6]/20" disabled={disabled} id={id} onChange={handleChange} value={value}><option disabled value="">{placeholder}</option>{options.map((option) => <option disabled={option.disabled} key={option.value} value={option.value}>{option.label}</option>)}</select><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#3182f6]">⌄</span></span>
      {feedback ? <span className="mt-2 block text-xs text-[#6b7684]">{feedback}</span> : null}
    </label>
  );
}

export default TossSelect;
