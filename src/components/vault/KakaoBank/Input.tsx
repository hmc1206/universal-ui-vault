import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type KakaoBankInputVariant = "information" | "compact";

export interface KakaoBankInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  /** 공개 정보 화면용 기본 또는 조밀한 확장 필드를 선택합니다. */
  variant?: KakaoBankInputVariant;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

const variantContainerClasses: Record<KakaoBankInputVariant, string> = {
  information: "min-h-12 rounded-none border border-[#e6e6e6] bg-white px-4",
  compact: "min-h-10 rounded-none border border-[#e6e6e6] bg-white px-3",
};

const variantInputClasses: Record<KakaoBankInputVariant, string> = {
  information: "h-12 text-base font-normal leading-6",
  compact: "h-10 text-sm font-normal leading-5",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * KakaoBank 공개 정보 화면의 흰 캔버스·#e6e6e6 경계·검정 우선 텍스트를 활용한 입력 확장 컴포넌트입니다.
 * 현재 공개 증거에는 native banking input/focus/error가 없으므로, focus는 그림자 없이 검정 outline으로만 보완하고 error는 지역 확장으로 구분합니다.
 */
export function KakaoBankInput({
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
  variant = "information",
  ...inputProps
}: KakaoBankInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[Pretendard_Variable,Pretendard,system-ui,sans-serif]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-normal leading-6 tracking-[-0.02em] text-black" htmlFor={inputId}>
          {label}
          {required ? <span className="ml-1 text-black" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={joinClasses(
          "flex items-center gap-3 transition-colors",
          variantContainerClasses[variant],
          error
            ? "border-black"
            : "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-black",
          disabled && "bg-[#f7f7f7] text-[#888888]",
          readOnly && "bg-[#f7f7f7]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#888888]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "min-w-0 flex-1 bg-transparent py-2 tracking-[-0.02em] text-black outline-none placeholder:text-[#888888] disabled:cursor-not-allowed disabled:text-[#888888] read-only:cursor-default",
            variantInputClasses[variant],
            inputClassName,
          )}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          type={type}
        />
        {trailingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#888888]">{trailingIcon}</span> : null}
      </div>

      {error ? (
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-black" id={errorId}>
          {error}
        </p>
      ) : description ? (
        <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#444444]" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default KakaoBankInput;
