import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type UpstageInputVariant = "pricing" | "compact";

export interface UpstageInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  /** public pricing 기반의 일반 또는 조밀한 정보 밀도를 선택합니다. */
  variant?: UpstageInputVariant;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

const variantContainerClasses: Record<UpstageInputVariant, string> = {
  pricing: "min-h-12 rounded-lg border border-[#CDD0D5] bg-white px-4",
  compact: "min-h-10 rounded-lg border border-[#CDD0D5] bg-white px-3",
};

const variantInputClasses: Record<UpstageInputVariant, string> = {
  pricing: "h-12 text-base font-normal leading-6",
  compact: "h-10 text-sm font-normal leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 업스테이지 공개 pricing 표면의 white, #CDD0D5 border, #0A0D14 ink, Geist hierarchy를 활용한 입력 확장입니다.
 * 공개 자료에는 input/focus/error 상태가 없으므로, violet focus outline과 오류 문구는 요청된 재사용을 위한 지역 확장입니다.
 */
export function UpstageInput({
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
  variant = "pricing",
  ...inputProps
}: UpstageInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[Geist]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-medium leading-6 text-[#0A0D14]" htmlFor={inputId}>
          {label}
          {required ? <span className="ml-1 text-[#5B52FF]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={joinClasses(
          "flex items-center gap-3 transition-colors",
          variantContainerClasses[variant],
          error
            ? "border-[#0A0D14]"
            : "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#5B52FF]",
          disabled && "bg-[#f7f7f8] text-[#52525B]",
          readOnly && "bg-[#f7f7f8]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#52525B]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "min-w-0 flex-1 bg-transparent py-2 text-[#0A0D14] outline-none placeholder:text-[#52525B] disabled:cursor-not-allowed disabled:text-[#52525B] read-only:cursor-default",
            variantInputClasses[variant],
            inputClassName,
          )}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          type={type}
        />
        {trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#52525B]">{trailingIcon}</span> : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 text-[#0A0D14]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 text-[#52525B]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default UpstageInput;
