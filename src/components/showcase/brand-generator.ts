import { resolveComponentTokens } from "./custom-brand";
import type { ComponentId, CustomBrandDNA } from "./showcase.types";

export const GENERATED_COMPONENT_IDS: ComponentId[] = [
  "Button",
  "Input",
  "HeroCard",
  "Toast",
  "Badge",
  "Modal",
  "Select",
  "Avatar",
  "Tabs",
  "Accordion",
];

export const GENERATED_COMPONENT_DESCRIPTIONS: Record<ComponentId, string> = {
  Button: "3가지 배색과 3가지 크기, 키보드·pressed feedback을 포함한 핵심 액션 컨트롤입니다.",
  Input: "label, hint, error, focus depth feedback을 포함한 접근 가능한 입력 컨트롤입니다.",
  HeroCard: "비대칭 bento 레이아웃과 primary·secondary action을 가진 랜딩 카드입니다.",
  Toast: "성공·경고·오류 상태와 자동 닫힘을 지원하는 상태 알림입니다.",
  Badge: "상태와 분류를 전달하는 compact inline label입니다.",
  Modal: "Escape·backdrop close·aria-modal을 지원하는 독립형 대화상자입니다.",
  Select: "키보드 조작과 outside-dismiss를 갖춘 custom listbox입니다.",
  Avatar: "image fallback, initials, 온라인 상태 표시를 갖춘 프로필 표시기입니다.",
  Tabs: "controlled·uncontrolled 사용을 모두 지원하는 탭 네비게이션입니다.",
  Accordion: "단일·복수 열기와 aria-expanded를 지원하는 disclosure 목록입니다.",
};

export interface BrandGenerationBrief {
  evidenceNote: string;
  licenseNote: string;
  referenceUrl: string;
  slug: string;
}

export interface GeneratedVaultFile {
  componentId: ComponentId;
  content: string;
  path: string;
}

export interface BrandGenerationManifest {
  brand: {
    descriptor: string;
    displayName: string;
    slug: string;
  };
  contract: {
    componentIds: ComponentId[];
    dependencyPolicy: "react-and-tailwind-only";
    standaloneFiles: true;
    stylingPolicy: "tailwind-utilities-only";
  };
  dna: CustomBrandDNA;
  evidence: {
    licenseNote: string;
    observedNote: string;
    referenceUrl: string;
  };
  files: GeneratedVaultFile[];
  generatedAt: string;
  schemaVersion: 3;
}

interface GenerationContext {
  accent: string;
  accentRgb: string;
  border: string;
  borderWidth: string;
  brandName: string;
  cardRadius: string;
  danger: string;
  densityClass: string;
  descriptor: string;
  displayFont: string;
  focusRing: string;
  disabledOpacity: string;
  hoverAccent: string;
  hoverLift: string;
  ink: string;
  interaction: string;
  interactionPressed: string;
  pressedScale: string;
  modalRadius: string;
  mutedInk: string;
  primaryHover: string;
  primarySoft: string;
  radius: string;
  shadow: string;
  success: string;
  surface: string;
  surfaceElevated: string;
  warning: string;
}

const SLUG_PATTERN = /^[a-z][a-z0-9-]{1,31}$/;
const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

function hexToRgb(hex: string) {
  const safeHex = HEX_PATTERN.test(hex) ? hex.slice(1) : "7C3AED";
  return `${Number.parseInt(safeHex.slice(0, 2), 16)},${Number.parseInt(safeHex.slice(2, 4), 16)},${Number.parseInt(safeHex.slice(4, 6), 16)}`;
}

export function normalizeBrandSlug(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

  if (SLUG_PATTERN.test(normalized)) {
    return normalized;
  }

  return "my-brand";
}

export function sanitizeGenerationBrief(input: Partial<BrandGenerationBrief>, brand: CustomBrandDNA): BrandGenerationBrief {
  const referenceUrl = input.referenceUrl?.trim().slice(0, 240) ?? "";
  const safeUrl = referenceUrl.startsWith("https://") || referenceUrl.startsWith("http://") ? referenceUrl : "";

  return {
    evidenceNote: input.evidenceNote?.trim().slice(0, 480) || "User-defined DNA. Verify observed product traits before production use.",
    licenseNote: input.licenseNote?.trim().slice(0, 320) || "Confirm font, logo, trademark, image, and reference-use rights before publishing.",
    referenceUrl: safeUrl,
    slug: normalizeBrandSlug(input.slug || brand.name),
  };
}

export function createDefaultGenerationBrief(brand: CustomBrandDNA): BrandGenerationBrief {
  return sanitizeGenerationBrief(
    {
      evidenceNote: "This session DNA is an original local extension. It is not presented as an official design system.",
      licenseNote: "Use only brand assets, fonts, and trademarks that you are licensed or authorized to use.",
      slug: brand.name,
    },
    brand,
  );
}

function createContext(brand: CustomBrandDNA, componentId: ComponentId): GenerationContext {
  const componentTokens = resolveComponentTokens(brand, componentId);
  const accentRgb = hexToRgb(componentTokens.accent);
  const override = brand.componentOverrides[componentId];
  const states = override?.enabled ? override.states : undefined;
  const shadow = brand.shadow === "sharp"
    ? `shadow-[0_9px_0_rgba(${hexToRgb(brand.tokens.ink)},0.22)]`
    : brand.shadow === "soft"
      ? `shadow-[0_22px_46px_rgba(${accentRgb},0.18)]`
      : `shadow-[0_14px_32px_rgba(${accentRgb},0.26)]`;
  const duration = `duration-[${brand.motion.duration}]`;
  const hoverLift = `hover:-translate-y-[${states?.hoverLift || brand.motion.hoverLift}]`;

  return {
    accent: componentTokens.accent,
    accentRgb,
    border: brand.tokens.border,
    borderWidth: brand.geometry.borderWidth,
    brandName: brand.name,
    cardRadius: brand.geometry.cardRadius,
    danger: brand.tokens.danger,
    densityClass: componentTokens.density === "compact" ? "py-1.5" : componentTokens.density === "spacious" ? "py-3" : "py-2.5",
    descriptor: brand.descriptor,
    displayFont: brand.displayFont,
    disabledOpacity: states?.disabledOpacity || "0.45",
    focusRing: `focus-visible:ring-[${states?.focusRing || brand.tokens.focusRing}]/45`,
    hoverAccent: states?.hoverAccent || brand.tokens.primaryHover,
    hoverLift: states?.hoverLift || brand.motion.hoverLift,
    ink: brand.tokens.ink,
    interaction: brand.material === "elastic"
      ? `${duration} ${brand.motion.easing} ${hoverLift} hover:scale-[1.01]`
      : brand.material === "crisp"
        ? `${duration} ${brand.motion.easing} ${hoverLift}`
        : `${duration} ${brand.motion.easing} ${hoverLift}`,
    interactionPressed: brand.material === "elastic" ? `active:translate-y-0 active:scale-[${states?.pressedScale || brand.motion.pressScale}]` : "active:translate-y-0",
    pressedScale: states?.pressedScale || brand.motion.pressScale,
    modalRadius: brand.geometry.modalRadius,
    mutedInk: brand.tokens.mutedInk,
    primaryHover: brand.tokens.primaryHover,
    primarySoft: brand.tokens.primarySoft,
    radius: componentTokens.radius,
    shadow,
    success: brand.tokens.success,
    surface: componentTokens.surface,
    surfaceElevated: brand.tokens.surfaceElevated,
    warning: brand.tokens.warning,
  };
}

function sharedHeader(componentName: ComponentId, context: GenerationContext) {
  return `/**\n * ${context.brandName} ${componentName}\n * Generated from a local brand DNA manifest. This standalone file uses React and Tailwind CSS only.\n */\n`;
}

function buttonSource(context: GenerationContext) {
  return `${sharedHeader("Button", context)}import { useState, type ButtonHTMLAttributes } from "react";\n\nexport type ButtonVariant = "solid" | "outline" | "quiet";\nexport type ButtonSize = "sm" | "md" | "lg";\n\nexport interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {\n  fullWidth?: boolean;\n  size?: ButtonSize;\n  variant?: ButtonVariant;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nconst sizeClasses: Record<ButtonSize, string> = {\n  sm: "min-h-9 px-3 text-sm",\n  md: "min-h-11 px-4 text-sm",\n  lg: "min-h-12 px-5 text-base",\n};\n\nconst variantClasses: Record<ButtonVariant, string> = {\n    solid: "border-[${context.borderWidth}] border-[${context.accent}] bg-[${context.accent}] text-white shadow-[0_10px_20px_rgba(${context.accentRgb},0.24)] hover:bg-[${context.hoverAccent}]",
\n  outline: "border-[${context.borderWidth}] border-[${context.accent}] bg-[${context.surfaceElevated}] text-[${context.accent}] hover:bg-[${context.primarySoft}]",\n  quiet: "border border-transparent bg-transparent text-[${context.ink}] hover:bg-[${context.primarySoft}]",\n};\n\nexport function Button({ className, disabled, fullWidth = false, onKeyDown, onPointerDown, onPointerUp, size = "md", type = "button", variant = "solid", ...props }: ButtonProps) {\n  const [pressed, setPressed] = useState(false);\n\n  return (\n    <button\n      {...props}\n      aria-pressed={pressed || undefined}\n      className={joinClasses(\n        "inline-flex items-center justify-center gap-2 font-semibold outline-none transition-[transform,box-shadow,background-color,color,border-color] motion-reduce:transform-none motion-reduce:transition-none",\n        "rounded-[${context.radius}] ${context.densityClass} ${context.interaction} ${context.interactionPressed}",\n                "focus-visible:ring-4 ${context.focusRing} focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[${context.disabledOpacity}]",
\n        sizeClasses[size],\n        variantClasses[variant],\n        fullWidth && "w-full",\n        className,\n      )}\n      disabled={disabled}\n      onKeyDown={(event) => {\n        if (event.key === " " || event.key === "Enter") setPressed(true);\n        onKeyDown?.(event);\n      }}\n      onKeyUp={() => setPressed(false)}\n      onPointerDown={(event) => {\n        setPressed(true);\n        onPointerDown?.(event);\n      }}\n      onPointerUp={(event) => {\n        setPressed(false);\n        onPointerUp?.(event);\n      }}\n      type={type}\n    />\n  );\n}\n\nexport default Button;\n`;
}

function inputSource(context: GenerationContext) {
  return `${sharedHeader("Input", context)}import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";\n\nexport interface InputProps extends InputHTMLAttributes<HTMLInputElement> {\n  error?: string;\n  hint?: string;\n  label?: string;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, error, hint, id, label, onBlur, onFocus, ...props }, ref) {\n  const generatedId = useId();\n  const inputId = id ?? generatedId;\n  const hintId = hint || error ? inputId + "-hint" : undefined;\n  const [focused, setFocused] = useState(false);\n\n  return (\n    <label className="grid w-full gap-2" htmlFor={inputId}>\n      {label ? <span className="text-sm font-semibold text-[${context.ink}]">{label}</span> : null}\n      <span className="relative block">\n        <input\n          {...props}\n          aria-describedby={hintId}\n          aria-invalid={Boolean(error) || undefined}\n          className={joinClasses(\n            "min-h-11 w-full border bg-[${context.surfaceElevated}] px-3.5 ${context.densityClass} text-sm font-medium text-[${context.ink}] outline-none transition-[border-color,box-shadow,transform] placeholder:text-[${context.mutedInk}] motion-reduce:transition-none",\n            "rounded-[${context.radius}]",\n            error\n              ? "border-[${context.danger}] ring-4 ring-[${context.danger}]/15"\n              : focused\n                ? "border-[${context.accent}] shadow-[0_12px_28px_rgba(${context.accentRgb},0.16)]"\n                : "border-[${context.border}] shadow-sm",\n            "focus-visible:ring-4 ${context.focusRing}",\n            className,\n          )}\n          id={inputId}\n          onBlur={(event) => {\n            setFocused(false);\n            onBlur?.(event);\n          }}\n          onFocus={(event) => {\n            setFocused(true);\n            onFocus?.(event);\n          }}\n          ref={ref}\n        />\n      </span>\n      {error ? <span className="text-sm font-semibold text-[${context.danger}]" id={hintId} role="alert">{error}</span> : hint ? <span className="text-sm leading-5 text-[${context.ink}]/65" id={hintId}>{hint}</span> : null}\n    </label>\n  );\n});\n\nexport default Input;\n`;
}

function heroCardSource(context: GenerationContext) {
  return `${sharedHeader("HeroCard", context)}import { useState } from "react";\n\nexport interface HeroAction {\n  label: string;\n  onClick?: () => void;\n}\n\nexport interface HeroCardProps {\n  actions?: HeroAction[];\n  className?: string;\n  description: string;\n  eyebrow?: string;\n  primaryAction?: HeroAction;\n  secondaryAction?: HeroAction;\n  title: string;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nexport function HeroCard({ actions = [], className, description, eyebrow = "${context.brandName.toUpperCase()} SYSTEM", primaryAction, secondaryAction, title }: HeroCardProps) {\n  const [activeAction, setActiveAction] = useState<string | null>(null);\n  const visibleActions = primaryAction ? [primaryAction, ...(secondaryAction ? [secondaryAction] : [])] : actions.slice(0, 2);\n\n  return (\n    <section className={joinClasses("relative overflow-hidden border bg-[${context.surface}] p-5 text-[${context.ink}] sm:p-7", "rounded-[${context.cardRadius}] border-[${context.border}] ${context.shadow}", className)}>\n      <div aria-hidden="true" className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[${context.accent}]/20 blur-3xl" />\n      <div aria-hidden="true" className="absolute bottom-0 right-0 h-24 w-[60%] rounded-tl-[${context.radius}] border-l border-t border-white/70 bg-white/45 backdrop-blur-sm" />\n      <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">\n        <div>\n          <p className="${context.displayFont} text-xs font-bold uppercase tracking-[0.16em] text-[${context.accent}]">{eyebrow}</p>\n          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.05em] sm:text-4xl">{title}</h2>\n          <p className="mt-4 max-w-xl text-sm leading-6 text-[${context.ink}]/72 sm:text-base">{description}</p>\n        </div>\n        <div className="grid grid-cols-[1fr_auto] gap-3 rounded-[calc(${context.radius}-4px)] border border-white/85 bg-white/70 p-3 backdrop-blur-md">\n          <div>\n            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[${context.ink}]/55">DNA signal</p>\n            <p className="mt-2 text-sm font-semibold">${context.descriptor}</p>\n          </div>\n          <span className="grid h-10 w-10 place-items-center rounded-full bg-[${context.accent}] text-sm font-black text-white">${context.brandName.slice(0, 1).toUpperCase() || "B"}</span>\n        </div>\n      </div>\n      {visibleActions.length ? (\n        <div className="relative mt-7 flex flex-wrap gap-2">\n          {visibleActions.map((action, index) => (\n            <button\n              className={joinClasses(\n                "min-h-11 rounded-[${context.radius}] px-4 text-sm font-bold outline-none transition-[transform,box-shadow,background-color] ${context.interaction} ${context.interactionPressed} focus-visible:ring-4 ${context.focusRing}",\n                index === 0 ? "bg-[${context.accent}] text-white shadow-[0_10px_20px_rgba(${context.accentRgb},0.22)] hover:bg-[${context.primaryHover}]" : "border-[${context.borderWidth}] border-[${context.border}] bg-[${context.surfaceElevated}] text-[${context.ink}] hover:bg-[${context.primarySoft}]",\n                activeAction === action.label && "ring-2 ring-[${context.accent}] ring-offset-2",\n              )}\n              key={action.label}\n              onClick={() => {\n                setActiveAction(action.label);\n                action.onClick?.();\n              }}\n              type="button"\n            >\n              {action.label}\n            </button>\n          ))}\n        </div>\n      ) : null}\n    </section>\n  );\n}\n\nexport default HeroCard;\n`;
}

function toastSource(context: GenerationContext) {
  return `${sharedHeader("Toast", context)}import { useEffect } from "react";\n\nexport type ToastVariant = "success" | "warning" | "error";\n\nexport interface ToastProps {\n  className?: string;\n  description?: string;\n  duration?: number;\n  message?: string;\n  onClose?: () => void;\n  onDismiss?: () => void;\n  open?: boolean;\n  status?: ToastVariant;\n  title?: string;\n  variant?: ToastVariant;\n  visible?: boolean;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nconst toneClasses: Record<ToastVariant, string> = {\n  success: "border-[${context.success}] bg-[${context.success}]/10 text-[${context.ink}]",\n  warning: "border-[${context.warning}] bg-[${context.warning}]/12 text-[${context.ink}]",\n  error: "border-[${context.danger}] bg-[${context.danger}]/10 text-[${context.ink}]",\n};\n\nconst toneMark: Record<ToastVariant, string> = { success: "✓", warning: "!", error: "×" };\n\nexport function Toast({ className, description, duration = 5000, message, onClose, onDismiss, open = true, status, title, variant, visible }: ToastProps) {\n  const isVisible = visible ?? open;\n  const tone = variant ?? status ?? "success";\n  const close = onClose ?? onDismiss;\n  const heading = title ?? message ?? "${context.brandName} update";\n\n  useEffect(() => {\n    if (!isVisible || !close || duration <= 0) return;\n    const timer = window.setTimeout(close, duration);\n    return () => window.clearTimeout(timer);\n  }, [close, duration, isVisible]);\n\n  if (!isVisible) return null;\n\n  return (\n    <section aria-live={tone === "error" ? "assertive" : "polite"} className={joinClasses("relative flex w-full max-w-sm gap-3 border p-4 shadow-[0_18px_38px_rgba(${context.accentRgb},0.16)] transition motion-reduce:transition-none", "rounded-[${context.radius}]", toneClasses[tone], className)} role={tone === "error" ? "alert" : "status"}>\n      <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[${context.accent}] text-sm font-black text-white">{toneMark[tone]}</span>\n      <div className="min-w-0 flex-1">\n        <p className="text-sm font-bold">{heading}</p>\n        {description ? <p className="mt-1 text-sm leading-5 opacity-75">{description}</p> : null}\n      </div>\n      {close ? <button aria-label="알림 닫기" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-medium opacity-70 outline-none transition hover:bg-white/70 focus-visible:ring-4 ${context.focusRing}" onClick={close} type="button">×</button> : null}\n    </section>\n  );\n}\n\nexport default Toast;\n`;
}

function badgeSource(context: GenerationContext) {
  return `${sharedHeader("Badge", context)}import type { HTMLAttributes, ReactNode } from "react";\n\nexport type BadgeTone = "accent" | "neutral" | "success" | "warning";\n\nexport interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {\n  children: ReactNode;\n  tone?: BadgeTone;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nconst toneClasses: Record<BadgeTone, string> = {\n  accent: "border-[${context.accent}]/22 bg-[${context.accent}]/10 text-[${context.accent}]",\n  neutral: "border-[${context.ink}]/12 bg-white text-[${context.ink}]/75",\n  success: "border-[${context.success}] bg-[${context.success}]/10 text-[${context.success}]",\n  warning: "border-[${context.warning}] bg-[${context.warning}]/12 text-[${context.warning}]",\n};\n\nexport function Badge({ children, className, tone = "accent", ...props }: BadgeProps) {\n  return (\n    <span {...props} className={joinClasses("inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-bold tracking-[-0.01em]", toneClasses[tone], className)}>\n      {children}\n    </span>\n  );\n}\n\nexport default Badge;\n`;
}

function modalSource(context: GenerationContext) {
  return `${sharedHeader("Modal", context)}import { useEffect, type ReactNode } from "react";\n\nexport interface ModalAction {\n  label: string;\n  onClick?: () => void;\n  variant?: "primary" | "secondary";\n}\n\nexport interface ModalProps {\n  actions?: ModalAction[];\n  children?: ReactNode;\n  closeOnBackdrop?: boolean;\n  description?: string;\n  dismissible?: boolean;\n  footer?: ReactNode;\n  onClose: () => void;\n  open: boolean;\n  title: string;\n}\n\nexport function Modal({ actions = [], children, closeOnBackdrop = true, description, dismissible = true, footer, onClose, open, title }: ModalProps) {\n  useEffect(() => {\n    if (!open) return;\n    const handleKeyDown = (event: KeyboardEvent) => {\n      if (event.key === "Escape") onClose();\n    };\n    window.addEventListener("keydown", handleKeyDown);\n    return () => window.removeEventListener("keydown", handleKeyDown);\n  }, [onClose, open]);\n\n  if (!open) return null;\n\n  return (\n    <div\n      aria-modal="true"\n      className="fixed inset-0 z-50 grid place-items-center bg-[${context.ink}]/55 p-4 backdrop-blur-sm"\n      onMouseDown={(event) => {\n        if (closeOnBackdrop && event.currentTarget === event.target) onClose();\n      }}\n      role="dialog"\n      aria-label={title}\n    >\n      <section className="w-full max-w-lg border-[${context.borderWidth}] border-[${context.border}] bg-[${context.surfaceElevated}] p-5 text-[${context.ink}] shadow-[0_28px_80px_rgba(${context.accentRgb},0.28)] sm:p-7 rounded-[${context.modalRadius}]">\n        <div className="flex items-start justify-between gap-4">\n          <div>\n            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[${context.accent}]">${context.brandName}</p>\n            <h2 className="mt-2 text-xl font-bold tracking-[-0.04em]">{title}</h2>\n            {description ? <p className="mt-2 text-sm leading-6 text-[${context.ink}]/68">{description}</p> : null}\n          </div>\n          {dismissible ? <button aria-label="대화상자 닫기" className="grid h-10 w-10 place-items-center rounded-full text-xl outline-none transition hover:bg-[${context.surface}] focus-visible:ring-4 ${context.focusRing}" onClick={onClose} type="button">×</button> : null}\n        </div>\n        {children ? <div className="mt-5 text-sm leading-6 text-[${context.ink}]/82">{children}</div> : null}\n        {footer ?? (actions.length ? <div className="mt-7 flex flex-wrap justify-end gap-2">{actions.map((action, index) => <button className={index === 0 && action.variant !== "secondary" ? "min-h-11 rounded-[${context.radius}] bg-[${context.accent}] px-4 text-sm font-bold text-white outline-none transition hover:brightness-95 focus-visible:ring-4 ${context.focusRing}" : "min-h-11 rounded-[${context.radius}] border border-[${context.ink}]/18 bg-white px-4 text-sm font-bold text-[${context.ink}] outline-none transition hover:bg-[${context.surface}] focus-visible:ring-4 ${context.focusRing}"} key={action.label} onClick={action.onClick} type="button">{action.label}</button>)}</div> : null)}\n      </section>\n    </div>\n  );\n}\n\nexport default Modal;\n`;
}

function selectSource(context: GenerationContext) {
  return `${sharedHeader("Select", context)}import { useEffect, useId, useRef, useState } from "react";\n\nexport interface SelectOption {\n  disabled?: boolean;\n  label: string;\n  value: string;\n}\n\nexport interface SelectProps {\n  className?: string;\n  label?: string;\n  onChange: (value: string) => void;\n  options: SelectOption[];\n  placeholder?: string;\n  value?: string;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nexport function Select({ className, label, onChange, options, placeholder = "선택하세요", value }: SelectProps) {\n  const [open, setOpen] = useState(false);\n  const rootRef = useRef<HTMLDivElement>(null);\n  const listId = useId();\n  const selected = options.find((option) => option.value === value);\n\n  useEffect(() => {\n    const handlePointerDown = (event: MouseEvent) => {\n      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);\n    };\n    document.addEventListener("mousedown", handlePointerDown);\n    return () => document.removeEventListener("mousedown", handlePointerDown);\n  }, []);\n\n  return (\n    <div className="grid w-full gap-2" ref={rootRef}>\n      {label ? <span className="text-sm font-semibold text-[${context.ink}]">{label}</span> : null}\n      <div className="relative">\n        <button\n          aria-controls={listId}\n          aria-expanded={open}\n          className={joinClasses("flex min-h-11 w-full items-center justify-between border bg-white px-3.5 text-left text-sm font-medium text-[${context.ink}] outline-none transition focus-visible:ring-4 ${context.focusRing}", "rounded-[${context.radius}] border-[${context.ink}]/18", open && "border-[${context.accent}] shadow-[0_12px_28px_rgba(${context.accentRgb},0.16)]", className)}\n          onClick={() => setOpen((current) => !current)}\n          role="combobox"\n          type="button"\n        >\n          <span className={selected ? "" : "text-[${context.ink}]/45"}>{selected?.label ?? placeholder}</span>\n          <svg aria-hidden="true" className={joinClasses("h-4 w-4 transition motion-reduce:transition-none", open && "rotate-180")} fill="none" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>\n        </button>\n        {open ? (\n          <ul className="absolute z-20 mt-2 max-h-60 w-full overflow-auto border border-[${context.ink}]/14 bg-white p-1.5 shadow-[0_18px_40px_rgba(${context.accentRgb},0.18)] rounded-[${context.radius}]" id={listId} role="listbox">\n            {options.map((option) => (\n              <li key={option.value}>\n                <button\n                  aria-selected={option.value === value}\n                  className={joinClasses("flex min-h-10 w-full items-center justify-between px-3 text-left text-sm font-medium outline-none transition hover:bg-[${context.surface}] focus-visible:bg-[${context.surface}]", "rounded-[calc(${context.radius}-6px)]", option.value === value && "bg-[${context.accent}]/10 text-[${context.accent}]", option.disabled && "cursor-not-allowed opacity-45")}\n                  disabled={option.disabled}\n                  onClick={() => {\n                    onChange(option.value);\n                    setOpen(false);\n                  }}\n                  role="option"\n                  type="button"\n                >\n                  {option.label}\n                  {option.value === value ? <span aria-hidden="true">✓</span> : null}\n                </button>\n              </li>\n            ))}\n          </ul>\n        ) : null}\n      </div>\n    </div>\n  );\n}\n\nexport default Select;\n`;
}

function avatarSource(context: GenerationContext) {
  return `${sharedHeader("Avatar", context)}import { useMemo, useState, type ImgHTMLAttributes } from "react";\n\nexport type AvatarSize = "sm" | "md" | "lg";\nexport type AvatarStatus = "active" | "away" | "offline";\n\nexport interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {\n  className?: string;\n  name: string;\n  showStatus?: boolean;\n  size?: AvatarSize;\n  status?: AvatarStatus;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nconst sizeClasses: Record<AvatarSize, string> = { sm: "h-9 w-9 text-xs", md: "h-11 w-11 text-sm", lg: "h-14 w-14 text-base" };\nconst statusClasses: Record<AvatarStatus, string> = { active: "bg-emerald-500", away: "bg-amber-400", offline: "bg-[#8f8f98]" };\n\nexport function Avatar({ alt, className, name, onError, showStatus = false, size = "md", src, status = "active", ...props }: AvatarProps) {\n  const [imageFailed, setImageFailed] = useState(false);\n  const initials = useMemo(() => name.trim().split(/\\s+/).map((part) => part.slice(0, 1)).join("").slice(0, 2).toUpperCase() || "?", [name]);\n  const showImage = Boolean(src) && !imageFailed;\n\n  return (\n    <span className={joinClasses("relative inline-flex shrink-0", className)}>\n      {showImage ? <img {...props} alt={alt ?? name} className={joinClasses("object-cover ring-2 ring-white shadow-[0_8px_16px_rgba(${context.accentRgb},0.2)]", "rounded-[${context.radius}]", sizeClasses[size])} onError={(event) => { setImageFailed(true); onError?.(event); }} src={src} /> : <span aria-label={name} className={joinClasses("grid place-items-center bg-[${context.accent}] font-bold text-white shadow-[0_8px_16px_rgba(${context.accentRgb},0.2)]", "rounded-[${context.radius}]", sizeClasses[size])} role="img">{initials}</span>}\n      {showStatus ? <span aria-label={status === "active" ? "온라인" : status === "away" ? "자리 비움" : "오프라인"} className={joinClasses("absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white", statusClasses[status])} /> : null}\n    </span>\n  );\n}\n\nexport default Avatar;\n`;
}

function tabsSource(context: GenerationContext) {
  return `${sharedHeader("Tabs", context)}import { useId, useState } from "react";\n\nexport interface TabItem {\n  disabled?: boolean;\n  label: string;\n  value: string;\n}\n\nexport interface TabsProps {\n  ariaLabel?: string;\n  className?: string;\n  defaultValue?: string;\n  layout?: "auto" | "fill";\n  onChange?: (value: string) => void;\n  tabs: TabItem[];\n  value?: string;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nexport function Tabs({ ariaLabel = "탭", className, defaultValue, layout = "auto", onChange, tabs, value }: TabsProps) {\n  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value ?? "";\n  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? fallbackValue);\n  const selectedValue = value ?? uncontrolledValue;\n  const idPrefix = useId();\n\n  function selectTab(nextValue: string) {\n    if (value === undefined) setUncontrolledValue(nextValue);\n    onChange?.(nextValue);\n  }\n\n  function moveFocus(currentIndex: number, direction: 1 | -1) {\n    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;\n    const next = tabs[nextIndex];\n    if (!next || next.disabled) return;\n    selectTab(next.value);\n  }\n\n  return (\n    <div className={joinClasses("w-full", className)}>\n      <div aria-label={ariaLabel} className={joinClasses("flex gap-1 border-b border-[${context.ink}]/14", layout === "fill" && "grid grid-flow-col auto-cols-fr")} role="tablist">\n        {tabs.map((tab, index) => {\n          const selected = tab.value === selectedValue;\n          return (\n            <button\n              aria-controls={idPrefix + "-" + tab.value + "-panel"}\n              aria-selected={selected}\n              className={joinClasses("relative min-h-11 px-3 text-sm font-bold outline-none transition focus-visible:ring-4 ${context.focusRing}", selected ? "text-[${context.accent}]" : "text-[${context.ink}]/58 hover:text-[${context.ink}]", tab.disabled && "cursor-not-allowed opacity-40")}\n              disabled={tab.disabled}\n              id={idPrefix + "-" + tab.value + "-tab"}\n              key={tab.value}\n              onClick={() => selectTab(tab.value)}\n              onKeyDown={(event) => {\n                if (event.key === "ArrowRight") { event.preventDefault(); moveFocus(index, 1); }\n                if (event.key === "ArrowLeft") { event.preventDefault(); moveFocus(index, -1); }\n              }}\n              role="tab"\n              type="button"\n            >\n              {tab.label}\n              <span aria-hidden="true" className={joinClasses("absolute inset-x-3 bottom-0 h-0.5 origin-left bg-[${context.accent}] transition-transform motion-reduce:transition-none", selected ? "scale-x-100" : "scale-x-0")} />\n            </button>\n          );\n        })}\n      </div>\n      {tabs.map((tab) => <div aria-labelledby={idPrefix + "-" + tab.value + "-tab"} hidden={tab.value !== selectedValue} id={idPrefix + "-" + tab.value + "-panel"} key={tab.value} role="tabpanel" />)}\n    </div>\n  );\n}\n\nexport default Tabs;\n`;
}

function accordionSource(context: GenerationContext) {
  return `${sharedHeader("Accordion", context)}import { useId, useState } from "react";\n\nexport interface AccordionItem {\n  content: string;\n  disabled?: boolean;\n  title: string;\n  value: string;\n}\n\nexport interface AccordionProps {\n  className?: string;\n  defaultOpenValues?: string[];\n  items: AccordionItem[];\n  multiple?: boolean;\n  onValueChange?: (values: string[]) => void;\n}\n\nfunction joinClasses(...classes: Array<string | false | null | undefined>) {\n  return classes.filter(Boolean).join(" ");\n}\n\nexport function Accordion({ className, defaultOpenValues = [], items, multiple = false, onValueChange }: AccordionProps) {\n  const [openValues, setOpenValues] = useState<string[]>(multiple ? defaultOpenValues : defaultOpenValues.slice(0, 1));\n  const idPrefix = useId();\n\n  function toggle(value: string) {\n    const isOpen = openValues.includes(value);\n    const nextValues = isOpen ? openValues.filter((current) => current !== value) : multiple ? [...openValues, value] : [value];\n    setOpenValues(nextValues);\n    onValueChange?.(nextValues);\n  }\n\n  return (\n    <div className={joinClasses("overflow-hidden border border-[${context.ink}]/14 bg-white", "rounded-[${context.radius}]", className)}>\n      {items.map((item, index) => {\n        const open = openValues.includes(item.value);\n        const buttonId = idPrefix + "-" + item.value + "-button";\n        const panelId = idPrefix + "-" + item.value + "-panel";\n        return (\n          <section className={index ? "border-t border-[${context.ink}]/12" : ""} key={item.value}>\n            <h3>\n              <button\n                aria-controls={panelId}\n                aria-expanded={open}\n                className={joinClasses("flex min-h-13 w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-bold text-[${context.ink}] outline-none transition hover:bg-[${context.surface}] focus-visible:ring-4 ${context.focusRing}", item.disabled && "cursor-not-allowed opacity-45")}\n                disabled={item.disabled}\n                id={buttonId}\n                onClick={() => toggle(item.value)}\n                type="button"\n              >\n                {item.title}\n                <svg aria-hidden="true" className={joinClasses("h-5 w-5 shrink-0 text-[${context.accent}] transition-transform motion-reduce:transition-none", open && "rotate-180")} fill="none" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>\n              </button>\n            </h3>\n            {open ? <div aria-labelledby={buttonId} className="bg-[${context.surface}]/55 px-4 pb-4 pt-1 text-sm leading-6 text-[${context.ink}]/74" id={panelId} role="region">{item.content}</div> : null}\n          </section>\n        );\n      })}\n    </div>\n  );\n}\n\nexport default Accordion;\n`;
}

const COMPONENT_BUILDERS: Record<ComponentId, (context: GenerationContext) => string> = {
  Button: buttonSource,
  Input: inputSource,
  HeroCard: heroCardSource,
  Toast: toastSource,
  Badge: badgeSource,
  Modal: modalSource,
  Select: selectSource,
  Avatar: avatarSource,
  Tabs: tabsSource,
  Accordion: accordionSource,
};

export function createBrandGenerationManifest(brand: CustomBrandDNA, input: Partial<BrandGenerationBrief> = {}): BrandGenerationManifest {
  const brief = sanitizeGenerationBrief(input, brand);
  const files = GENERATED_COMPONENT_IDS.map((componentId) => {
    const context = createContext(brand, componentId);
    return {
      componentId,
      content: COMPONENT_BUILDERS[componentId](context),
      path: `src/components/vault/${brief.slug}/${componentId}.tsx`,
    };
  });

  return {
    brand: {
      descriptor: brand.descriptor,
      displayName: brand.name,
      slug: brief.slug,
    },
    contract: {
      componentIds: [...GENERATED_COMPONENT_IDS],
      dependencyPolicy: "react-and-tailwind-only",
      standaloneFiles: true,
      stylingPolicy: "tailwind-utilities-only",
    },
    dna: brand,
    evidence: {
      licenseNote: brief.licenseNote,
      observedNote: brief.evidenceNote,
      referenceUrl: brief.referenceUrl,
    },
    files,
    generatedAt: new Date().toISOString(),
    schemaVersion: 3,
  };
}

export function getGeneratedFile(manifest: BrandGenerationManifest, componentId: ComponentId) {
  return manifest.files.find((file) => file.componentId === componentId) ?? manifest.files[0];
}

export function createManifestDownload(manifest: BrandGenerationManifest) {
  return JSON.stringify(manifest, null, 2);
}

export function isGeneratedManifest(value: unknown): value is BrandGenerationManifest {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<BrandGenerationManifest>;
  return record.schemaVersion === 3 && Array.isArray(record.files) && record.files.length === GENERATED_COMPONENT_IDS.length && Boolean(record.brand?.slug);
}
