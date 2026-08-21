import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface SamsungInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력 필드 위에 표시할 레이블입니다. */
  label?: ReactNode;
  /** 레이블 옆에 표시할 선택 안내입니다. */
  optionalLabel?: string;
  /** 입력을 돕는 짧은 설명입니다. */
  description?: ReactNode;
  /** 수정이 필요한 경우 표시할 명확한 안내입니다. */
  error?: ReactNode;
  /** 입력 칸 앞에 표시할 아이콘 또는 보조 콘텐츠입니다. */
  leadingIcon?: ReactNode;
  /** 입력 칸 뒤에 표시할 아이콘 또는 보조 콘텐츠입니다. */
  trailingIcon?: ReactNode;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 삼성전자 공개 웹의 흰 캔버스·옅은 회색 표면·흑백 위계를 기반으로 한 독립형 입력 필드입니다.
 * 현재 캡처에는 삼성 고유 폼 오류/포커스 값이 없으므로 One UI 파랑 대신 접근 가능한 검정 윤곽선과 설명을 사용합니다.
 */
export function SamsungInput({
  className,
  description,
  disabled,
  error,
  id,
  inputClassName,
  label,
  leadingIcon,
  optionalLabel = "선택",
  required = false,
  trailingIcon,
  type = "text",
  ...inputProps
}: SamsungInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[SamsungOneKorean,sans-serif]", className)}>
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label className="text-sm font-bold leading-5 tracking-[-0.02em] text-[#000000]" htmlFor={inputId}>
            {label}
            {required ? <span className="ml-1" aria-hidden="true">*</span> : null}
          </label>
          {!required && optionalLabel ? <span className="text-xs font-normal leading-4 text-[#707070]">{optionalLabel}</span> : null}
        </div>
      ) : null}

      <div
        className={joinClasses(
          "flex min-h-10 items-center gap-3 rounded-[20px] border bg-[#ffffff] px-5 transition-[border-color,background-color] duration-150 ease-out",
          error ? "border-[#000000]" : "border-[#dddddd] focus-within:border-[#000000]",
          disabled && "bg-[#f7f7f7] text-[#707070]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#707070]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "h-10 min-w-0 flex-1 bg-transparent py-2 text-base font-normal leading-5 tracking-[-0.02em] text-[#000000] outline-none placeholder:text-[#707070] disabled:cursor-not-allowed disabled:text-[#707070]",
            inputClassName,
          )}
          disabled={disabled}
          id={inputId}
          required={required}
          type={type}
        />
        {trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#707070]">{trailingIcon}</span> : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#000000]" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#707070]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SamsungInput;
