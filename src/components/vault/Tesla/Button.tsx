import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TeslaButtonVariant = "primary" | "contrast" | "quiet";
export type TeslaButtonSize = "sm" | "md" | "lg";

export interface TeslaButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** CTA 레이블 또는 제어 콘텐츠입니다. */
  children: ReactNode;
  /** Model 3 마케팅에서 관측된 primary/white CTA 관계를 선택합니다. */
  variant?: TeslaButtonVariant;
  /** 요청된 재사용 크기입니다. md가 관측된 14px CTA 문자 역할에 가장 가깝습니다. */
  size?: TeslaButtonSize;
  /** 로컬 재사용 확장: 처리 중 상태를 전달합니다. */
  loading?: boolean;
  /** 로컬 재사용 확장: 컨테이너 폭을 채웁니다. */
  fullWidth?: boolean;
}

const sizeClasses: Record<TeslaButtonSize, string> = {
  sm: "min-h-8 px-3 text-xs",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
};

const variantClasses: Record<TeslaButtonVariant, string> = {
  primary:
    "border-[3px] border-transparent bg-[#3e6ae1] text-white active:bg-[#3e6ae0] focus-visible:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.05)]",
  contrast:
    "border-[3px] border-transparent bg-white text-[#393c41] active:bg-[#f4f4f4] focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]",
  quiet:
    "border-[3px] border-transparent bg-transparent text-[#393c41] active:bg-black/5 focus-visible:shadow-[inset_0_0_0_2px_rgba(57,60,65,0.05)]",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tesla Model 3 공개 마케팅 CTA를 근거로 한 독립형 버튼입니다.
 * Universal Sans의 downstream 라이선스는 이 파일에 포함되지 않으므로, host 프로젝트의 기본 sans 서체를 상속합니다.
 * hover 전환은 캡처에 측정되지 않아 공식 Tesla 동작으로 주장하지 않으며, pressed/focus 표면만 관측값에 맞춥니다.
 */
export function TeslaButton({
  children,
  className,
  disabled = false,
  fullWidth = false,
  loading = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: TeslaButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses(
        "inline-flex items-center justify-center gap-2 rounded-[4px] font-sans font-medium leading-[1.2] outline-none disabled:cursor-not-allowed disabled:opacity-45",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      <span>{children}</span>
    </button>
  );
}

export default TeslaButton;
