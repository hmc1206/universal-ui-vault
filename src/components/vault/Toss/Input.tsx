import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type TossInputVariant = "box" | "line" | "big" | "hero";

export interface TossInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력 필드 위에 표시할 레이블입니다. */
  label?: ReactNode;
  /** 입력을 돕는 짧은 설명입니다. */
  description?: ReactNode;
  /** 수정이 필요한 경우 표시할 분명한 안내입니다. */
  error?: ReactNode;
  /** 입력 칸 앞에 표시할 아이콘 또는 보조 콘텐츠입니다. */
  leadingIcon?: ReactNode;
  /** 입력 칸 뒤에 표시할 아이콘 또는 보조 콘텐츠입니다. */
  trailingIcon?: ReactNode;
  /** TDS 텍스트 필드의 표면 유형입니다. */
  variant?: TossInputVariant;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

const variantContainerClasses: Record<TossInputVariant, string> = {
  box: "min-h-12 rounded-lg border bg-white px-4",
  line: "min-h-12 rounded-none border-x-0 border-t-0 bg-transparent px-0",
  big: "min-h-14 rounded-[10px] border bg-white px-5",
  hero: "min-h-16 rounded-[14px] border bg-white px-5",
};

const variantInputClasses: Record<TossInputVariant, string> = {
  box: "h-12 text-base leading-6",
  line: "h-12 text-base leading-6",
  big: "h-14 text-lg font-semibold leading-7",
  hero: "h-16 text-xl font-semibold leading-7",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * TDS Mobile의 box·line·big·hero 텍스트 필드 변형과 focus·error·disabled·read-only 상태를 갖춘 독립형 입력 필드입니다.
 * Toss Product Sans가 프로젝트에 적법하게 로드된 경우에만 우선 적용되며, 글꼴 파일은 포함하지 않습니다.
 */
export function TossInput({
  className,
  description,
  disabled,
  error,
  id,
  inputClassName,
  label,
  leadingIcon,
  readOnly,
  required = false,
  trailingIcon,
  type = "text",
  variant = "box",
  ...inputProps
}: TossInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[Toss\ Product\ Sans,system-ui,sans-serif]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-semibold leading-6 tracking-[-0.02em] text-[#191f28]" htmlFor={inputId}>
          {label}
          {required ? <span className="ml-1 text-[#e42939]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={joinClasses(
          "flex items-center gap-3 transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          variantContainerClasses[variant],
          error
            ? "border-[#e42939]"
            : "border-[#e5e8eb] focus-within:border-[#3182f6] focus-within:ring-2 focus-within:ring-[#3182f6]/20",
          disabled && "bg-[#f2f4f6] text-[#8b95a1]",
          readOnly && "bg-[#f2f4f6]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#8b95a1]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "min-w-0 flex-1 bg-transparent py-2 font-normal tracking-[-0.02em] text-[#191f28] outline-none placeholder:text-[#8b95a1] disabled:cursor-not-allowed disabled:text-[#8b95a1] read-only:cursor-default",
            variantInputClasses[variant],
            inputClassName,
          )}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          type={type}
        />
        {trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#8b95a1]">{trailingIcon}</span> : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#e42939]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#8b95a1]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default TossInput;
