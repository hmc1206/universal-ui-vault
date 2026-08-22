import { auditCustomBrandAccessibility, getContrastRatio } from "../src/components/showcase/accessibility-audit";
import { DEFAULT_CUSTOM_BRAND } from "../src/components/showcase/custom-brand";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const blackWhiteRatio = getContrastRatio("#000000", "#FFFFFF");
assert(Math.abs(blackWhiteRatio - 21) < 0.01, `Expected black/white contrast to be 21:1, received ${blackWhiteRatio}`);

const baseline = auditCustomBrandAccessibility(DEFAULT_CUSTOM_BRAND);
assert(baseline.totalCount === 7, `Expected 7 accessibility checks, received ${baseline.totalCount}`);
assert(baseline.checks.some((check) => check.id === "body-ink-on-surface" && check.level === "pass"), "Expected default body ink audit to pass");

const lowContrastBrand = {
  ...DEFAULT_CUSTOM_BRAND,
  tokens: { ...DEFAULT_CUSTOM_BRAND.tokens, primary: "#FEE2E2" },
};
const lowContrastAudit = auditCustomBrandAccessibility(lowContrastBrand);
assert(lowContrastAudit.checks.some((check) => check.id === "white-on-primary" && check.level !== "pass"), "Expected pale primary with white label to be flagged");

console.info(`Accessibility audit verified: ${baseline.passCount}/${baseline.totalCount} default checks pass; low-contrast primary is flagged.`);
