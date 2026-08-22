import { useId, type ChangeEvent, type ReactNode } from "react";

export interface UpstageSelectOption { value: string; label: string; disabled?: boolean; }
export interface UpstageSelectProps {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string, option: UpstageSelectOption) => void;
  options: UpstageSelectOption[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  errorMessage?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Upstage의 선택 구조와 focus rhythm을 담은 native-accessible select입니다. */
export function UpstageSelect({ className, description, disabled = false, error, errorMessage, label, onChange, options, placeholder = "옵션을 선택하세요", required = false, value = "", ...props }: UpstageSelectProps) {
  const id = useId();
  const feedback = error ?? errorMessage ?? description;
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const option = options.find((item) => item.value === event.target.value) ?? { value: event.target.value, label: event.target.value };
    if (onChange) (onChange as (value: string, option: UpstageSelectOption) => void)(event.target.value, option);
  }
  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={id}>
      {label ? <span className="mb-2 block text-sm font-bold text-[#0a0d14]">{label}{required ? <span className="ml-1 text-[#5b52ff]">*</span> : null}</span> : null}
      <span className="relative block"><select {...props} aria-invalid={Boolean(error || errorMessage) || undefined} className="min-h-12 w-full appearance-none rounded-xl border border-[#cdd0d5] bg-white px-4 pr-11 text-sm font-semibold text-[#0a0d14] outline-none transition-all duration-500 ease-out focus:border-[#5b52ff] focus:ring-2 focus:ring-[#5b52ff]/20" disabled={disabled} id={id} onChange={handleChange} value={value}><option disabled value="">{placeholder}</option>{options.map((option) => <option disabled={option.disabled} key={option.value} value={option.value}>{option.label}</option>)}</select><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#5b52ff]">⌄</span></span>
      {feedback ? <span className="mt-2 block text-xs text-[#52525b]">{feedback}</span> : null}
    </label>
  );
}

export default UpstageSelect;
