"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/src/lib/API/client";
import type { ArtistApplicationFormData } from "@/src/schemas/User/Artist/artistApplication";
import { buildArtistApplicationPayload } from "../artistApplication.payload";
import { uploadPortfolioFiles } from "./upload.portfolio";

type CreateApplicationResponse = {
  data: { id: string };
};

export type SubmitPhase =
  | "idle"
  | "creating-application"
  | "uploading-portfolio";

export function useArtistApplicationSubmit() {
  const router = useRouter();
  const [phase, setPhase] = useState<SubmitPhase>("idle");
  const [uploadProgress, setUploadProgress] = useState<{
    completed: number;
    total: number;
  } | null>(null);

  const submit = async (data: ArtistApplicationFormData) => {
    setPhase("creating-application");
    setUploadProgress(null);

    const payload = buildArtistApplicationPayload(data);
    const appResponse = await apiFetch<CreateApplicationResponse>(
      "/artist-application",
      { method: "POST", body: JSON.stringify(payload) },
    );

    const applicationId = appResponse.data.id;
    const files = data.portfolioSamples ?? [];

    if (files.length > 0) {
      setPhase("uploading-portfolio");
      await uploadPortfolioFiles(applicationId, files, (completed, total) => {
        setUploadProgress({ completed, total });
      });
    }

    router.push("/");
    // niente try/catch qui: lascio che l'errore risalga a Form,
    // che già lo gestisce (ApiError -> campi + messaggio, altrimenti generico)
  };

  return { submit, phase, uploadProgress };
}
