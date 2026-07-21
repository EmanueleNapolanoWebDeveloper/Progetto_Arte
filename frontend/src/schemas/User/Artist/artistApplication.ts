import { z } from "zod";

export type CategoryOption = {
  id: string;
  name: string;
  parentName: string;
};

const MAX_FILE_SIZE = 5 + 1024 * 1024; //5 mb
const ACCEPTED_IMAGES_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const artistApplicationSchema = z.object({
  statement: z
    .string()
    .min(100, "Racconta il tuo percorso in almeno 100 caratteri")
    .max(2000, "Massimo 2000 caratteri"),

  specialtyIds: z
    .array(z.string().uuid())
    .min(1, "Seleziona almeno una specializzazione")
    .max(5, "Massimo 5 specializazzioni"),

  portfolioSamples: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          "Ogni immagine deve essere sotto i 5 MB",
        )
        .refine(
          (file) => ACCEPTED_IMAGES_TYPES.includes(file.type),
          "Formati accettati: JPEG, PNG, WEBP",
        ),
    )
    .min(2, "Carica almeno 2 opere")
    .max(5, "Massimo 5 opere"),
});

export type ArtistApplicationFormData = z.infer<typeof artistApplicationSchema>;
