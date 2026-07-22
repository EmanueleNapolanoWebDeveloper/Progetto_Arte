"use client";

import React, {
  useMemo,
  useEffect,
  useState,
  ChangeEvent,
  DragEvent,
} from "react";
import Image from "next/image";
import styles from "./imageUploader.module.css";

type Props = {
  label?: string;
  value?: File[];
  onChange: (files: File[]) => void;
  error?: string;
  minFiles?: number;
  maxFiles?: number;
  accept?: string;
};

export function ImageUploader({
  label = "Opere di portfolio",
  value = [],
  onChange,
  error,
  minFiles = 3,
  maxFiles = 5,
  accept = "image/jpeg,image/png,image/webp",
}: Props) {
  const [isDragging, setIsDragging] = useState(false);

  // 1. Calcoliamo le preview direttamente con useMemo (nessun setState, zero cascading renders!)
  const previews = useMemo(() => {
    return value.map((file) => URL.createObjectURL(file));
  }, [value]);

  // 2. L'effetto serve SOLO a revocare gli ObjectURL quando cambiano o al disinnesco del componente
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFiles = (newFiles: File[]) => {
    const validTypes = accept.split(",").map((t) => t.trim());
    const validFiles = newFiles.filter(
      (file) => validTypes.length === 0 || validTypes.includes(file.type),
    );

    const combined = [...value, ...validFiles].slice(0, maxFiles);
    onChange(combined);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const isMaxReached = value.length >= maxFiles;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {label && <label className={styles.label}>{label}</label>}
        <span
          className={`${styles.counter} ${
            value.length >= minFiles && value.length <= maxFiles
              ? styles.counterSuccess
              : ""
          }`}
        >
          {value.length} / {maxFiles} immagini
        </span>
      </div>

      {/* Zona Drag and Drop */}
      {!isMaxReached && (
        <div
          className={`${styles.dropzone} ${
            isDragging ? styles.dropzoneDragging : ""
          } ${error ? styles.dropzoneError : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="portfolio-upload"
            accept={accept}
            multiple
            onChange={handleInputChange}
            className={styles.hiddenInput}
          />

          <label htmlFor="portfolio-upload" className={styles.dropzoneLabel}>
            <div className={styles.uploadIcon}>📸</div>
            <p className={styles.primaryText}>
              <span>Clicca per caricare</span> o trascina qui le immagini
            </p>
            <p className={styles.secondaryText}>
              JPG, PNG o WEBP (Consigliate tra {minFiles} e {maxFiles} immagini)
            </p>
          </label>
        </div>
      )}

      {/* Griglia Anteprime */}
      {previews.length > 0 && (
        <div className={styles.previewGrid}>
          {previews.map((src, index) => (
            <div key={src} className={styles.previewCard}>
              <Image
                src={src}
                alt={`Anteprima opera ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100px, 120px"
                className={styles.previewImage}
              />
              <div className={styles.overlay}>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className={styles.removeBtn}
                  aria-label={`Rimuovi immagine ${index + 1}`}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
