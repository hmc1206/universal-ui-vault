import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createBrandGenerationManifest } from "../src/components/showcase/brand-generator.ts";

const fixtureBrand = {
  accent: "#7C3AED",
  componentOverrides: {
    Button: { accent: "#5B21B6", density: "compact" as const, enabled: true, radius: "12px", surface: "#F5F3FF" },
  },
  descriptor: "A safe generated vault fixture",
  displayFont: "font-sans",
  geometry: { borderWidth: "2px", cardRadius: "24px", controlRadius: "20px", modalRadius: "24px" },
  id: "custom" as const,
  ink: "#17111F",
  material: "elastic" as const,
  motion: { duration: "260ms", easing: "ease-out" as const, hoverLift: "2px", pressScale: "0.98" },
  name: "Aurora",
  radius: "20px",
  sansFont: "font-sans",
  shadow: "ambient" as const,
  surface: "#F6F1FF",
  tokens: {
    border: "#DDD5F4",
    danger: "#DC2626",
    focusRing: "#A78BFA",
    ink: "#17111F",
    mutedInk: "#6B6477",
    primary: "#7C3AED",
    primaryHover: "#6D28D9",
    primarySoft: "#EDE9FE",
    success: "#059669",
    surface: "#F6F1FF",
    surfaceElevated: "#FFFFFF",
    warning: "#D97706",
  },
};

const outputDirectory = resolve(process.cwd(), ".tmp-generated-vault");
const manifest = createBrandGenerationManifest(fixtureBrand, {
  evidenceNote: "Fixture-only validation.",
  licenseNote: "Fixture-only validation.",
  slug: "aurora",
});

if (manifest.files.length !== 10) {
  throw new Error(`Expected 10 generated files, received ${manifest.files.length}.`);
}

const paths = new Set(manifest.files.map((file) => file.path));
if (paths.size !== 10) {
  throw new Error("Generated component paths must be unique.");
}

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of manifest.files) {
  const hasNamedExport = file.content.includes(`export function ${file.componentId}`) || file.content.includes(`export const ${file.componentId}`);
  if (!file.content.includes("export default") || !hasNamedExport) {
    throw new Error(`${file.componentId} must expose named and default exports.`);
  }

  if (file.content.includes("style=")) {
    throw new Error(`${file.componentId} must not include inline style props.`);
  }

  if (file.content.includes("from \"framer-motion\"") || file.content.includes("from \"lucide-react\"")) {
    throw new Error(`${file.componentId} must not include external UI dependencies.`);
  }

  await writeFile(resolve(outputDirectory, `${file.componentId}.tsx`), file.content, "utf8");
}

console.log(`Generated ${manifest.files.length} standalone TSX files in ${outputDirectory}.`);
