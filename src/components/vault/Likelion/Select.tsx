import { useId, type ChangeEvent, type ReactNode } from "react";

export interface LikelionSelectOption { value: string; label: string; disabled?: boolean; }
export interface LikelionSelectProps {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string, option: LikelionSelectOption) => void;
  options: LikelionSelectOption[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  errorMessage?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined | null>) { return classes.filter(Boolean).join(" "); }

/** Likelion의 선택 구조와 focus rhythm을 담은 native-accessible select입니다. */
export function LikelionSelect({ className, description, disabled = false, error, errorMessage, label, onChange, options, placeholder = "옵션을 선택하세요", required = false, value = "", ...props }: LikelionSelectProps) {
  const id = useId();
  const feedback = error ?? errorMessage ?? description;
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const option = options.find((item) => item.value === event.target.value) ?? { value: event.target.value, label: event.target.value };
    if (onChange) (onChange as (value: string, option: LikelionSelectOption) => void)(event.target.value, option);
  }
  return (
    <label className={joinClasses("block font-mono", className)} htmlFor={id}>
      {label ? <span className="mb-2 block text-sm font-bold text-[#222222]">{label}{required ? <span className="ml-1 text-[#ff6000]">*</span> : null}</span> : null}
      <span className="relative block"><select {...props} aria-invalid={Boolean(error || errorMessage) || undefined} className="min-h-12 w-full appearance-none rounded-xl border border-[#f4c6a7] bg-white px-4 pr-11 text-sm font-semibold text-[#222222] outline-none transition-all duration-200 ease-out focus:border-[#ff6000] focus:ring-2 focus:ring-[#ff6000]/20" disabled={disabled} id={id} onChange={handleChange} value={value}><option disabled value="">{placeholder}</option>{options.map((option) => <option disabled={option.disabled} key={option.value} value={option.value}>{option.label}</option>)}</select><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ff6000]">⌄</span></span>
      {feedback ? <span className="mt-2 block text-xs text-[#67564a]">{feedback}</span> : null}
    </label>
  );
}

export default LikelionSelect;
