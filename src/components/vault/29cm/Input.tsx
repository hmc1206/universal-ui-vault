import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type TwentyNineCmInputVariant = "quantity" | "field";

export interface TwentyNineCmInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  /** 관측된 quantity 또는 재사용용 field 확장을 선택합니다. */
  variant?: TwentyNineCmInputVariant;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

const variantContainerClasses: Record<TwentyNineCmInputVariant, string> = {
  quantity: "min-h-9 rounded-none border border-[#dddddd] bg-white px-3",
  field: "min-h-11 rounded border border-[#dddddd] bg-white px-4",
};

const variantInputClasses: Record<TwentyNineCmInputVariant, string> = {
  quantity: "h-9 text-base font-medium leading-6",
  field: "h-11 text-base font-normal leading-6",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 29CM product-detail의 Quantity Input(36px·흰색·검정 16px/500·1px #dddddd·0px radius)을 반영한 독립형 입력입니다.
 * 관측된 quantity는 시각적으로 달라진 focus를 노출하지 않았으므로 glow를 추가하지 않습니다.
 * field와 error 상태는 요청된 재사용성을 위한 확장이며 수량 입력의 공식 상태 계약으로 주장하지 않습니다.
 */
export function TwentyNineCmInput({
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
  variant = "quantity",
  ...inputProps
}: TwentyNineCmInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[Pretendard_Variable,Pretendard,system-ui,sans-serif]", className)}>
      {label ? (
        <label className="mb-2 block text-sm font-bold leading-5 tracking-[-0.02em] text-black" htmlFor={inputId}>
          {label}
          {required ? <span className="ml-1 text-[#ff4800]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={joinClasses(
          "flex items-center gap-2 transition-colors duration-150 ease-out",
          variantContainerClasses[variant],
          variant === "field" && "focus-within:border-black focus-within:outline focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-black",
          error && "border-[#ff4800]",
          disabled && "bg-[#f4f4f4] text-[#5d5d5d]",
          readOnly && "bg-[#f4f4f4]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#5d5d5d]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "min-w-0 flex-1 bg-transparent py-1 tracking-[-0.02em] text-black outline-none placeholder:text-[#5d5d5d] disabled:cursor-not-allowed disabled:text-[#5d5d5d] read-only:cursor-default",
            variantInputClasses[variant],
            inputClassName,
          )}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          type={type}
        />
        {trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#5d5d5d]">{trailingIcon}</span> : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-xs font-medium leading-4 tracking-[-0.02em] text-[#ff4800]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-xs font-medium leading-4 tracking-[-0.02em] text-[#5d5d5d]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default TwentyNineCmInput;
