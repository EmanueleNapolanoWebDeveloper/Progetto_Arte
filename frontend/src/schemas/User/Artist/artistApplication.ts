import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];


const socialLinksSchema = z
  .object({
    instagram: z
      .string()
      .trim()
      .url("URL non valido")
      .optional()
      .or(z.literal("")),
    behance: z
      .string()
      .trim()
      .url("URL non valido")
      .optional()
      .or(z.literal("")),
    facebook: z
      .string()
      .trim()
      .url("URL non valido")
      .optional()
      .or(z.literal("")),
    other: z.string().trim().url("URL non valido").optional().or(z.literal("")),
  })
  .partial()
  .optional();

const portfolioFileSchema = z
  .instanceof(File, { message: "File non valido" })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Formato immagine non supportato (jpeg, png, webp)",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Il file supera i 5MB",
  });

export const ArtistApplicationSchema = z.object({
  // ---- Campi destinati a artist_profiles ----
  display_name: z
    .string()
    .trim()
    .min(1, "Il nome d'arte è obbligatorio")
    .max(255, "Il nome d'arte è troppo lungo"),

  bio: z
    .string()
    .trim()
    .max(2000, "La bio è troppo lunga")
    .optional()
    .or(z.literal("")),

  website_url: z
    .string()
    .trim()
    .url("Inserisci un URL valido")
    .optional()
    .or(z.literal("")),

  studio_location: z
    .string()
    .trim()
    .max(255, "Il campo è troppo lungo")
    .optional()
    .or(z.literal("")),

  social_links: socialLinksSchema,

  // ---- Campi destinati a artist_applications ----
  statement: z
    .string()
    .trim()
    .min(50, "Lo statement deve contenere almeno 50 caratteri")
    .max(3000, "Lo statement è troppo lungo"),

  // ---- Relazione artist_specialties (many-to-many via pivot) ----
  specialtyIds: z
    .array(z.string().uuid("ID specializzazione non valido"))
    .min(1, "Seleziona almeno una specializzazione"),

  // ---- Upload portfolio ----
  portfolioSamples: z
    .array(portfolioFileSchema)
    .min(3, "Carica almeno 3 opere")
    .max(5, "Puoi caricare al massimo 5 opere"),
});

export type ArtistApplicationFormData = z.infer<typeof ArtistApplicationSchema>;
