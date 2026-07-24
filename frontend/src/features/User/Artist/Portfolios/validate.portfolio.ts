const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Validazione client-side "best effort": migliora la UX evitando upload
 * inutili, ma NON sostituisce la validazione lato server (unica barriera
 * di sicurezza reale, dato che il client è sempre bypassabile).
 */
export function validatePortfolioFiles(files: File[]): void {
  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      throw new Error(
        `Formato non supportato per "${file.name}". Usa JPG, PNG o WEBP.`,
      );
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(
        `Il file "${file.name}" supera la dimensione massima di 10MB.`,
      );
    }
  }
}
