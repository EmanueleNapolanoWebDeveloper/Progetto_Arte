import { ApiError, apiFetch } from "@/src/lib/API/client";
import { validatePortfolioFiles } from "./validate.portfolio";
import type {
  ConfirmPortfolioResponse,
  PresignedUrlResponse,
} from "./types.portfolio";

type UploadProgressCallback = (completed: number, total: number) => void;

/**
 * Gestisce l'intero flusso di upload del portfolio per una candidatura:
 * 1. richiede gli URL presignati al backend
 * 2. carica ogni file direttamente su storage (MinIO/S3) via PUT
 * 3. conferma al backend le chiavi caricate con successo
 *
 * Lancia un errore se: la validazione client fallisce, una richiesta
 * al backend fallisce, o un singolo upload PUT non va a buon fine.
 */
export async function uploadPortfolioFiles(
  applicationId: string,
  files: File[],
  onProgress?: UploadProgressCallback,
): Promise<void> {
  if (files.length === 0) return;

  validatePortfolioFiles(files);

  const fileNames = files.map((file) => file.name);

  const { urls } = await apiFetch<PresignedUrlResponse>(
    `/artist-application/${applicationId}/presigned-urls`,
    {
      method: "POST",
      body: JSON.stringify({ files: fileNames }),
    },
  );

  let completed = 0;
  const total = files.length;

  await Promise.all(
    files.map(async (file, index) => {
      await uploadSingleFile(file, urls[index].uploadUrl);
      completed += 1;
      onProgress?.(completed, total);
    }),
  );

  const uploadKeys = urls.map((url) => url.fileKey);

  await apiFetch<ConfirmPortfolioResponse>(
    `/artist-application/${applicationId}/confirm-portfolio`,
    {
      method: "POST",
      body: JSON.stringify({ fileKeys: uploadKeys }),
    },
  );
}

async function uploadSingleFile(file: File, uploadUrl: string): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!res.ok) {
    throw new ApiError(
      `Upload fallito per "${file.name}" (status ${res.status})`,
      res.status,
    );
  }
}
