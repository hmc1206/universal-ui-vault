import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface TeslaInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 필드의 목적을 알리는 레이블입니다. */
  label?: ReactNode;
  /** 레이블 아래의 보조 설명입니다. */
  description?: ReactNode;
  /** 입력 완료를 돕는 간결한 보조 문구입니다. */
  helperText?: ReactNode;
  /** 검증 오류를 텍스트 중심으로 알립니다. */
  error?: ReactNode;
  /** error의 별칭입니다. */
  errorMessage?: ReactNode;
  /** 필수 입력 여부를 화면과 접근성 트리에 표시합니다. */
  required?: boolean;
  /** input 요소에만 추가할 Tailwind 클래스입니다. */
  inputClassName?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3 마케팅의 #f4f4f4 카드·#393c41 copy hierarchy를 참조한 form-field 확장입니다.
 * 캡처에는 form/error/focus 계약이 없으므로, 이 파일의 label·invalid feedback·focus ring은 재사용을 위한 로컬 web 확장입니다.
 * Tesla Universal Sans는 라이선스가 제공되지 않았으므로 어떤 대체 서체도 Tesla font로 표기하지 않습니다.
 */
export function TeslaInput({
  className,
  description,
  error,
  errorMessage,
  helperText,
  id,
  inputClassName,
  label,
  required = false,
  type = "text",
  ...props
}: TeslaInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = error ?? errorMessage ?? helperText ?? description;
  const hasError = Boolean(error ?? errorMessage);

  return (
    <label className={joinClasses("block font-sans", className)} htmlFor={inputId}>
      {label ? (
        <span className="mb-2 flex items-center gap-1 text-sm font-medium text-[#171a20]">
          {label}
          {required ? <span aria-hidden="true">*</span> : null}
        </span>
      ) : null}
      <span className="block rounded-[8px] bg-[#f4f4f4] p-1">
        <input
          {...props}
          aria-describedby={feedback ? `${inputId}-feedback` : undefined}
          aria-invalid={hasError || undefined}
          className={joinClasses(
            "min-h-11 w-full rounded-[4px] border border-transparent bg-white px-3 text-sm font-medium text-[#171a20] outline-none placeholder:text-[#5c5e62] focus:border-[#393c41] focus:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]",
            hasError && "border-[#393c41]",
            inputClassName,
          )}
          id={inputId}
          required={required}
          type={type}
        />
      </span>
      {feedback ? (
        <span
          className={joinClasses(
            "mt-2 block text-xs leading-5",
            hasError ? "font-medium text-[#393c41]" : "text-[#5c5e62]",
          )}
          id={`${inputId}-feedback`}
        >
          {feedback}
        </span>
      ) : null}
    </label>
  );
}

export default TeslaInput;
