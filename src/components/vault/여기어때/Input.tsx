import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type GoodChoiceInputVariant = "search" | "field";

export interface GoodChoiceInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  /** YDS 검색바 또는 중립 필드 확장을 선택합니다. */
  variant?: GoodChoiceInputVariant;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

const variantContainerClasses: Record<GoodChoiceInputVariant, string> = {
  search: "min-h-12 rounded-xl border border-[#E6E6E6] bg-white px-4",
  field: "min-h-11 rounded-lg border border-[#E6E6E6] bg-white px-4",
};

const variantInputClasses: Record<GoodChoiceInputVariant, string> = {
  search: "h-12 text-base font-normal leading-6",
  field: "h-11 text-base font-normal leading-6",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 여기어때 YDS의 Search Bar 흰 표면·#222222 텍스트·12px 반경과 idle/focused/typing/populated 흐름을 반영한 독립형 입력 필드입니다.
 * field와 error 상태는 요청된 재사용성을 위한 확장이므로, 검색바 고유 상태와 구분해 사용합니다.
 */
export function GoodChoiceInput({
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
  variant = "search",
  ...inputProps
}: GoodChoiceInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[Pretendard,system-ui,sans-serif]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-semibold leading-6 tracking-[-0.02em] text-[#222222]" htmlFor={inputId}>
          {label}
          {required ? <span className="ml-1 text-[#F94239]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={joinClasses(
          "flex items-center gap-3 transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          variantContainerClasses[variant],
          error
            ? "border-[#F94239]"
            : "focus-within:border-[#1D8BFF] focus-within:ring-2 focus-within:ring-[#E3F0FF]",
          disabled && "bg-[#E6E6E6] text-[#737373]",
          readOnly && "bg-[#E3F0FF]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#737373]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "min-w-0 flex-1 bg-transparent py-2 tracking-[-0.02em] text-[#222222] outline-none placeholder:text-[#737373] disabled:cursor-not-allowed disabled:text-[#737373] read-only:cursor-default",
            variantInputClasses[variant],
            inputClassName,
          )}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          type={type}
        />
        {trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#737373]">{trailingIcon}</span> : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#F94239]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#737373]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default GoodChoiceInput;
