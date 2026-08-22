import { createDefaultGenerationBrief, createManifestDownload, isGeneratedManifest, sanitizeGenerationBrief, type BrandGenerationBrief, type BrandGenerationManifest, type GeneratedVaultFile } from "./brand-generator";
import type { CustomBrandDNA } from "./showcase.types";

export const BRAND_GENERATION_STORAGE_KEY = "universal-ui-vault.brand-generation.v1";

export interface StoredBrandGeneration {
  brief: BrandGenerationBrief;
  manifest: BrandGenerationManifest | null;
}

export function loadStoredBrandGeneration(brand: CustomBrandDNA): StoredBrandGeneration {
  const fallback: StoredBrandGeneration = {
    brief: createDefaultGenerationBrief(brand),
    manifest: null,
  };

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const serialized = window.localStorage.getItem(BRAND_GENERATION_STORAGE_KEY);
    if (!serialized) return fallback;

    const parsed = JSON.parse(serialized) as Partial<StoredBrandGeneration>;
    return {
      brief: sanitizeGenerationBrief(parsed.brief ?? {}, brand),
      manifest: isGeneratedManifest(parsed.manifest) ? parsed.manifest : null,
    };
  } catch {
    return fallback;
  }
}

export function saveStoredBrandGeneration(stored: StoredBrandGeneration, brand: CustomBrandDNA) {
  if (typeof window === "undefined") return;

  const safeValue: StoredBrandGeneration = {
    brief: sanitizeGenerationBrief(stored.brief, brand),
    manifest: isGeneratedManifest(stored.manifest) ? stored.manifest : null,
  };

  window.localStorage.setItem(BRAND_GENERATION_STORAGE_KEY, JSON.stringify(safeValue));
}

export function resetStoredBrandGeneration() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(BRAND_GENERATION_STORAGE_KEY);
  }
}

function triggerDownload(fileName: string, content: string, type: string) {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => window.URL.revokeObjectURL(url), 0);
}

export function downloadGeneratedFile(file: GeneratedVaultFile) {
  triggerDownload(`${file.componentId}.tsx`, file.content, "text/plain;charset=utf-8");
}

export function downloadGenerationManifest(manifest: BrandGenerationManifest) {
  triggerDownload(`${manifest.brand.slug}-vault-manifest.json`, createManifestDownload(manifest), "application/json;charset=utf-8");
}

export function copyGenerationText(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value).then(() => true).catch(() => false);
  }

  if (typeof document === "undefined") return Promise.resolve(false);

  const element = document.createElement("textarea");
  element.value = value;
  element.setAttribute("readonly", "");
  element.style.position = "fixed";
  element.style.opacity = "0";
  document.body.appendChild(element);
  element.select();

  const copied = document.execCommand("copy");
  element.remove();
  return Promise.resolve(copied);
}
