import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type LikelionInputVariant = "course-search" | "field";

export interface LikelionInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  /** 홈페이지 과정 검색 또는 중립 확장 필드를 선택합니다. */
  variant?: LikelionInputVariant;
  /** 필수 입력 항목임을 표시합니다. */
  required?: boolean;
  /** 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
  /** 입력 요소에 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

const variantContainerClasses: Record<LikelionInputVariant, string> = {
  "course-search": "min-h-12 rounded-none border-0 bg-transparent px-0",
  field: "min-h-12 rounded-lg border border-[#e5e5e5] bg-white px-4",
};

const variantInputClasses: Record<LikelionInputVariant, string> = {
  "course-search": "h-12 text-xl font-semibold leading-6 text-[#ff6000] placeholder:text-[#a3a3a3]",
  field: "h-12 text-base font-normal leading-6 text-[#222222] placeholder:text-[#a3a3a3]",
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 멋쟁이사자처럼 홈페이지에서 관측된 20px/600 오렌지 과정 검색과 #2563eb 포커스 경계를 반영한 독립형 입력 컴포넌트입니다.
 * field와 error 상태는 요청된 재사용성을 위한 확장이므로, 과정 검색 고유 상태와 구분해 사용합니다.
 */
export function LikelionInput({
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
  variant = "course-search",
  ...inputProps
}: LikelionInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("w-full font-[inherit]", className)}>
      {label ? (
        <label className="mb-2 block text-base font-semibold leading-6 tracking-[-0.02em] text-[#222222]" htmlFor={inputId}>
          {label}
          {required ? <span className="ml-1 text-[#ff6000]" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={joinClasses(
          "flex items-center gap-3 transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          variantContainerClasses[variant],
          variant === "course-search" && "focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:ring-offset-2",
          variant === "field" && "focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20",
          error && "border-[#ff6000] ring-1 ring-[#ff6000]/25",
          disabled && "bg-[#fcf4ee] text-[#a3a3a3]",
          readOnly && "bg-[#fcf4ee]",
        )}
      >
        {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0 text-[#737373]">{leadingIcon}</span> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={joinClasses(
            "min-w-0 flex-1 bg-transparent py-2 tracking-[-0.02em] outline-none disabled:cursor-not-allowed disabled:text-[#a3a3a3] read-only:cursor-default",
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
        <p aria-live="polite" className="mt-2 text-sm font-normal leading-5 tracking-[-0.02em] text-[#ff6000]" id={errorId}>
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

export default LikelionInput;
