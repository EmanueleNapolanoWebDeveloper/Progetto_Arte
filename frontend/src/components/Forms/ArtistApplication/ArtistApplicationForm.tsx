"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";

import styles from "./artist_application.module.css";
import {
  ArtistApplicationFormData,
  artistApplicationSchema,
} from "@/src/schemas/User/Artist/artistApplication";
import { zodResolver } from "@hookform/resolvers/zod";

type CategoryOptions = {
  id: string;
  name: string;
  parentName: string;
};

type Props = {
  categories: CategoryOptions[];
  onSubmitApplication: (data: ArtistApplicationFormData) => Promise<void>;
};

export function ArtistApplicationForm({
  categories,
  onSubmitApplication,
}: Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  //useFORM
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArtistApplicationFormData>({
    resolver: zodResolver(artistApplicationSchema),
    defaultValues: {
      specialtyIds: [],
      portfolioSamples: [],
    },
  });

  const selectedFiles = watch("portfolioSamples");

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setValue("portfolioSamples", files, { shouldValidate: true });
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setValue("portfolioSamples", updated, { shouldValidate: true });
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ArtistApplicationFormData) => {
    setSubmitError(null);

    try {
      onSubmitApplication(data);
    } catch {
      setSubmitError("Invio non riuscito. Risèporva tra qualche istante");
    }
  };

  //raggruppa macro/microcategorie
  const groupedCategories = categories.reduce<
    Record<string, CategoryOptions[]>
  >((acc, cat) => {
    (acc[cat.parentName] ??= []).push(cat);
    return acc;
  }, {});

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label htmlFor="statement">Statement artistico</label>
        <textarea
          id="statement"
          rows={6}
          aria-invalid={!!errors.statement}
          aria-describedby={errors.statement ? "statement-error" : undefined}
          {...register("statement")}
        />
        {errors.statement && (
          <p id="statement-error" className={styles.error}>
            {errors.statement.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="specialties">Specializzazioni</label>
        <select
          id="specialties"
          multiple
          size={6}
          aria-invalid={!!errors.specialtyIds}
          aria-describedby={
            errors.specialtyIds ? "specialties-error" : undefined
          }
          {...register("specialtyIds")}
        >
          {Object.entries(groupedCategories).map(([parentName, options]) => (
            <optgroup key={parentName} label={parentName}>
              {options.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.specialtyIds && (
          <p id="specialties-error" className={styles.error}>
            {errors.specialtyIds.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="portfolio">Opere di portfolio (3–5 immagini)</label>
        <input
          id="portfolio"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          aria-invalid={!!errors.portfolioSamples}
          aria-describedby={
            errors.portfolioSamples ? "portfolio-error" : undefined
          }
          onChange={handleFilesChange}
        />
        {errors.portfolioSamples && (
          <p id="portfolio-error" className={styles.error}>
            {errors.portfolioSamples.message as string}
          </p>
        )}

        {previews.length > 0 && (
          <ul className={styles.previewGrid}>
            {previews.map((src, index) => (
              <li key={src} className={styles.previewItem}>
                <img src={src} alt={`Anteprima opera ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`Rimuovi opera ${index + 1}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {submitError && (
        <p role="alert" className={styles.formError}>
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Invio in corso…" : "Invia candidatura"}
      </button>
    </form>
  );
}
