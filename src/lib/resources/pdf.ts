export const MAX_PDF_BYTES = 50 * 1024 * 1024;
export const PDFS_BUCKET = "pdfs";

/** Storage object keys look like `{slug}-{timestamp}.pdf`. */
const PDF_PATH_PATTERN = /^[a-z0-9-]+-\d+\.pdf$/;

export function validatePdfFile(
  file: File | null | undefined,
  required: boolean,
): string | null {
  if (!file || file.size === 0) {
    return required ? "A PDF file is required." : null;
  }
  if (file.type !== "application/pdf") {
    return "Only PDF files are allowed.";
  }
  if (file.size > MAX_PDF_BYTES) {
    return "PDF must be 50MB or smaller.";
  }
  return null;
}

export function buildPdfObjectPath(slug: string): string {
  return `${slug}-${Date.now()}.pdf`;
}

export function isValidPdfObjectPath(path: string): boolean {
  return PDF_PATH_PATTERN.test(path);
}
