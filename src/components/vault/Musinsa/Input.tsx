import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type MusinsaInputVariant = "storefront-search" | "information";

export interface MusinsaInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  /** 관측된 home search 또는 일반 정보 확장을 선택합니다. */
  variant?: MusinsaInputVariant;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

const variantContainerClasses: Record<MusinsaInputVariant, string> = {
  "storefront-search": "min-h-9 rounded border border-transparent bg-white pl-2 pr-7",
  information: "min-h-10 rounded-none border border-[#ebebeb] bg-white px-3",
};

const variantInputClasses: Record<MusinsaInputVariant, string> = {
  "storefront-search": "h-9 text-sm font-normal leading-5",
  information: "h-10 text-sm font-normal leading-[21px]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 무신사 home storefront의 Search Input(36px, 4px, white, 8px 28px 8px 8px, 14px/400 Pretendard)을 반영한 입력 컴포넌트입니다.
 * 공개 증거에는 focus/error 상태가 없으므로, outline과 오류 문구는 요청된 재사용을 위한 지역 확장으로만 제공합니다.
 */
export function MusinsaInput({
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
  variant = "storefront-search",
  ...inputProps
}: MusinsaInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[Pretendard,Apple_SD_Gothic_Neo,sans-serif]", className)}>
      {label ? (
        <label className="mb-2 block text-sm font-normal leading-[21px] text-black" htmlFor={inputId}>
          {label}
          {required ? <span className="ml-1 text-black" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={joinClasses(
          "flex items-center gap-2 transition-colors",
          variantContainerClasses[variant],
          error
            ? "border-black"
            : "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-black",
          disabled && "bg-[#f7f7f7] text-[#666666]",
          readOnly && "bg-[#f7f7f7]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#666666]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "min-w-0 flex-1 bg-transparent py-1 text-black outline-none placeholder:text-[#8a8a8a] disabled:cursor-not-allowed disabled:text-[#666666] read-only:cursor-default",
            variantInputClasses[variant],
            inputClassName,
          )}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          type={type}
        />
        {trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#666666]">{trailingIcon}</span> : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-xs font-normal leading-4 text-black" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-xs font-normal leading-4 text-[#666666]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default MusinsaInput;
