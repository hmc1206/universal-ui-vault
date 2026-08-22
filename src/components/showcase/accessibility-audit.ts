import { isHexColor } from "./custom-brand";
import type { AccessibilityAuditCheck, AccessibilityAuditLevel, AccessibilityAuditResult, CustomBrandDNA } from "./showcase.types";

const WHITE = "#FFFFFF";
const BLACK = "#000000";

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  return {
    blue: Number.parseInt(normalized.slice(4, 6), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    red: Number.parseInt(normalized.slice(0, 2), 16),
  };
}

function linearize(channel: number) {
  const normalized = channel / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance for opaque sRGB #RRGGBB colors. */
export function getRelativeLuminance(hex: string) {
  if (!isHexColor(hex)) return 0;
  const { blue, green, red } = hexToRgb(hex);
  return 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue);
}

/** WCAG contrast ratio, rounded only for display by consumers. */
export function getContrastRatio(foreground: string, background: string) {
  if (!isHexColor(foreground) || !isHexColor(background)) return 1;
  const first = getRelativeLuminance(foreground);
  const second = getRelativeLuminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

export function getRecommendedForeground(background: string) {
  return getContrastRatio(WHITE, background) >= getContrastRatio(BLACK, background) ? WHITE : BLACK;
}

function getLevel(actualRatio: number, minimumRatio: number): AccessibilityAuditLevel {
  if (actualRatio >= minimumRatio) return "pass";
  if (actualRatio >= minimumRatio * 0.72) return "review";
  return "fail";
}

function createCheck({ background, category, foreground, id, label, minimumRatio, suggestion }: Omit<AccessibilityAuditCheck, "actualRatio" | "level">): AccessibilityAuditCheck {
  const actualRatio = getContrastRatio(foreground, background);
  return { actualRatio, background, category, foreground, id, label, level: getLevel(actualRatio, minimumRatio), minimumRatio, suggestion };
}

function colorLabel(color: string) {
  return color.toUpperCase();
}

/**
 * Audits the color pairings used by generated standalone components and the custom ThemeBridge skin.
 * It reports contrast only; it does not substitute for assistive-technology or keyboard testing.
 */
export function auditCustomBrandAccessibility(brand: CustomBrandDNA): AccessibilityAuditResult {
  const tokens = brand.tokens;
  const preferredOnSurface = getRecommendedForeground(tokens.surface);
  const preferredOnPrimary = getRecommendedForeground(tokens.primary);

  const checks: AccessibilityAuditCheck[] = [
    createCheck({
      background: tokens.surface,
      category: "text",
      foreground: tokens.ink,
      id: "body-ink-on-surface",
      label: "Body ink on surface",
      minimumRatio: 4.5,
      suggestion: `본문 텍스트는 ${colorLabel(tokens.surface)} 위에서 ${colorLabel(tokens.ink)}를 사용합니다. 필요하면 ${colorLabel(preferredOnSurface)} 쪽으로 ink를 조정하세요.`,
    }),
    createCheck({
      background: tokens.surface,
      category: "text",
      foreground: tokens.mutedInk,
      id: "muted-ink-on-surface",
      label: "Muted ink on surface",
      minimumRatio: 4.5,
      suggestion: "보조 텍스트도 일반 텍스트 기준을 적용합니다. muted ink를 더 어둡게 하거나 surface를 조정하세요.",
    }),
    createCheck({
      background: tokens.primary,
      category: "text",
      foreground: WHITE,
      id: "white-on-primary",
      label: "White label on primary action",
      minimumRatio: 4.5,
      suggestion: `생성 Button의 solid variant는 white label을 사용합니다. primary를 더 어둡게 하거나 foreground를 ${colorLabel(preferredOnPrimary)}로 전환하세요.`,
    }),
    createCheck({
      background: tokens.surface,
      category: "focus",
      foreground: tokens.focusRing,
      id: "focus-ring-on-surface",
      label: "Focus ring on surface",
      minimumRatio: 3,
      suggestion: "Focus indicator는 주변 surface와 구별되어야 합니다. focus ring의 명도 차이를 키우세요.",
    }),
    createCheck({
      background: tokens.surfaceElevated,
      category: "status",
      foreground: tokens.success,
      id: "success-on-elevated-surface",
      label: "Success on elevated surface",
      minimumRatio: 4.5,
      suggestion: "Success 상태 텍스트·아이콘은 자체 대비를 확보해야 합니다. success를 더 어둡게 하거나 elevated surface를 조정하세요.",
    }),
    createCheck({
      background: tokens.surfaceElevated,
      category: "status",
      foreground: tokens.warning,
      id: "warning-on-elevated-surface",
      label: "Warning on elevated surface",
      minimumRatio: 4.5,
      suggestion: "Warning은 색상만으로 의미를 전달하지 말고 텍스트·아이콘을 함께 사용하세요. 색상 대비도 4.5:1 이상으로 맞추세요.",
    }),
    createCheck({
      background: tokens.surfaceElevated,
      category: "status",
      foreground: tokens.danger,
      id: "danger-on-elevated-surface",
      label: "Danger on elevated surface",
      minimumRatio: 4.5,
      suggestion: "Danger 상태의 텍스트와 아이콘 대비를 확인하세요. 필요하면 danger를 더 어둡게 조정하세요.",
    }),
  ];

  return {
    checks,
    passCount: checks.filter((check) => check.level === "pass").length,
    totalCount: checks.length,
  };
}
