"use client";

import Form from "@/src/components/UI/Form/Form";
import Input from "@/src/components/UI/Inputs/Input";
import Textarea from "@/src/components/UI/TextArea/TextArea";
import {
  ArtistApplicationFormData,
  ArtistApplicationSchema,
} from "@/src/schemas/User/Artist/artistApplication";
import type { CategoryOption } from "@/src/types/Category/categoryTypes";
import styles from "./artist_application.module.css";
import { CategoryCheckboxSelect } from "./CategoryCheckboxSelect";
import { ImageUploader } from "../../UI/ImageUploader/ImageUploader";
import { buildArtistApplicationPayload } from "@/src/features/User/Artist/artistApplication.payload";
import { apiFetch } from "@/src/lib/API/client";

type Props = {
  categories: CategoryOption[];
  previousApplicationId?: string | null;
};

const defaultValues: ArtistApplicationFormData = {
  previous_application_id: null,
  display_name: "",
  bio: "",
  city: "",
  region: "",
  country_code: "",
  website_url: "",
  social_links: {
    instagram: "",
    behance: "",
    facebook: "",
    other: "",
  },
  statement: "",
  specialtyIds: [],
  portfolioSamples: [],
};

// Funzione di test da passare al Form
const handleSubmit = async (data: ArtistApplicationFormData) => {
  console.log("=== 🎨 RICEVUTI DATI DALLA FORM (SERVER) ===");
  console.log("Data:", data);

  try {
    //creazione payload
    const payload = buildArtistApplicationPayload(data);

    //invio payload
    const appResponse = (await apiFetch)<{ data: { id: string } }>(
      "/artist-application",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    //recupero ID di application
    const applicationId = (await appResponse).data.id;
    const files = data.portfolioSamples ?? [];

    if (files.length > 0) {
      const fileNames = files.map((file) => file.name);

      const { urls } = await apiFetch<{
        urls: { uploadUrl: string; fileKey: string }[];
      }>(`/artist-application/${applicationId}/presigned-urls`, {
        method: "POST",
        body: JSON.stringify({ files: fileNames }),
      });

      //carichiamo file direttamente su minio
      const uploadPromises = files.map((file, index) => {
        const { uploadUrl } = urls[index];

        return fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
      });

      await Promise.all(uploadPromises);

      //conferma di upload completato
      const uploadKeys = urls.map((url) => url.fileKey);
      await apiFetch("artist-application/${applicationId}/confirm-portfolio", {
        method: "POST",
        body: JSON.stringify({ fileKeys: uploadKeys }),
      });
    }
  } catch (error) {
    console.error("Errore: ", error);
  }
};

export function ArtistApplicationForm({
  categories = [],
  previousApplicationId,
}: Props) {
  // Prepariamo i defaultValues includendo l'eventuale ID della candidatura precedente
  const initialValues: ArtistApplicationFormData = {
    ...defaultValues,
    previous_application_id: previousApplicationId ?? null,
  };

  return (
    <Form<ArtistApplicationFormData>
      schema={ArtistApplicationSchema}
      defaultValues={initialValues}
      submitLabel="Invia candidatura"
      className={styles.form}
      onSubmit={async (data) => {
        await handleSubmit(data);
      }}
    >
      {(methods) => {
        const {
          register,
          setValue,
          watch,
          formState: { errors },
        } = methods;

        const portfolioFiles = watch("portfolioSamples") ?? [];

        return (
          <div className={styles.formContainer}>
            {/* Campo nascosto per l'eventuale ID candidatura precedente */}
            {previousApplicationId && (
              <input type="hidden" {...register("previous_application_id")} />
            )}

            {/* Informazioni Personali / Nome d'arte */}
            <div className={styles.gridTwoColumns}>
              <Input
                label="Nome d'arte"
                error={errors.display_name?.message}
                {...register("display_name")}
              />

              <Input
                label="Città dello studio"
                placeholder="es. Milano"
                error={errors.city?.message}
                {...register("city")}
              />
            </div>

            {/* Ubicazione Dettagliata (Regione & Paese) */}
            <div className={styles.gridTwoColumns}>
              <Input
                label="Regione / Provincia"
                placeholder="es. Lombardia"
                error={errors.region?.message}
                {...register("region")}
              />

              <Input
                label="Codice Paese (ISO-2)"
                placeholder="IT"
                maxLength={2}
                error={errors.country_code?.message}
                {...register("country_code")}
              />
            </div>

            <Textarea
              label="Bio"
              rows={3}
              error={errors.bio?.message}
              {...register("bio")}
            />

            {/* Link Esterni e Social */}
            <div className={styles.gridTwoColumns}>
              <Input
                label="Sito web / portfolio esterno"
                type="url"
                placeholder="https://..."
                error={errors.website_url?.message}
                {...register("website_url")}
              />

              <Input
                label="Instagram"
                type="url"
                placeholder="https://instagram.com/..."
                error={errors.social_links?.instagram?.message}
                {...register("social_links.instagram")}
              />
            </div>

            <div className={styles.gridThreeColumns}>
              <Input
                label="Behance"
                type="url"
                placeholder="https://behance.net/..."
                error={errors.social_links?.behance?.message}
                {...register("social_links.behance")}
              />

              <Input
                label="Facebook"
                type="url"
                placeholder="https://facebook.com/..."
                error={errors.social_links?.facebook?.message}
                {...register("social_links.facebook")}
              />

              <Input
                label="Altro link social / portfolio"
                type="url"
                placeholder="https://..."
                error={errors.social_links?.other?.message}
                {...register("social_links.other")}
              />
            </div>

            {/* Statement Artistico */}
            <Textarea
              label="Statement artistico"
              rows={4}
              error={errors.statement?.message}
              {...register("statement")}
            />

            {/* Selettore Categorie (Full Width) */}
            <CategoryCheckboxSelect
              categories={categories}
              name="specialtyIds"
              label="Specializzazioni"
              error={errors.specialtyIds?.message as string | undefined}
              control={methods.control}
            />

            {/* Uploader Immagini (Full Width) */}
            <ImageUploader
              label="Opere di portfolio (3–5 immagini)"
              value={portfolioFiles}
              onChange={(files) =>
                setValue("portfolioSamples", files, { shouldValidate: true })
              }
              error={errors.portfolioSamples?.message as string | undefined}
              minFiles={3}
              maxFiles={5}
            />
          </div>
        );
      }}
    </Form>
  );
}
