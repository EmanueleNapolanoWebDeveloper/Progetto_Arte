import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// HELPER PER CAMPI URL OPZIONALI COMPATIBILE CON ZOD INFERENCE
// Mantiene _input come string | undefined senza degradare a 'unknown'
const optionalUrl = z
  .string()
  .trim()
  .transform((val) => {
    if (!val) return "";
    return /^https?:\/\//i.test(val) ? val : `https://${val}`;
  })
  .pipe(z.string().url("Inserisci un URL valido").or(z.literal("")))
  .optional()
  .or(z.literal(""));

const socialLinksSchema = z
  .object({
    instagram: optionalUrl,
    behance: optionalUrl,
    facebook: optionalUrl,
    other: optionalUrl,
  })
  .partial()
  .optional();

const portfolioFileSchema = z
  .instanceof(File, { message: "File non valido" })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Formato immagine non supportato (JPEG, PNG, WEBP)",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Il file non può superare i 5MB",
  });

export const ArtistApplicationSchema = z.object({
  // ---- Gestione Storico Candidature ----
  previous_application_id: z
    .string()
    .uuid("ID candidatura non valido")
    .nullable()
    .optional(),

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

  // Ubicazione suddivisa come nel DB
  city: z
    .string()
    .trim()
    .max(255, "Nome città troppo lungo")
    .optional()
    .or(z.literal("")),

  region: z
    .string()
    .trim()
    .max(255, "Nome regione troppo lungo")
    .optional()
    .or(z.literal("")),

  country_code: z
    .string()
    .trim()
    .max(2, "Il codice paese deve essere di 2 lettere (es. IT)")
    .transform((val) => val.toUpperCase())
    .optional()
    .or(z.literal("")),

  website_url: optionalUrl,

  social_links: socialLinksSchema,

  // ---- Campi destinati a artist_applications ----
  statement: z
    .string()
    .trim()
    .min(50, "Lo statement deve contenere almeno 50 caratteri")
    .max(3000, "Lo statement è troppo lungo"),

  // ---- Relazione artist_specialties (many-to-many via pivot) ----
  specialtyIds: z
    .array(z.string().uuid({ message: "ID specializzazione non valido" }))
    .min(1, "Seleziona almeno una specializzazione"),

  // ---- Upload portfolio ----
  portfolioSamples: z
    .array(portfolioFileSchema)
    .min(3, "Carica almeno 3 opere")
    .max(5, "Puoi caricare al massimo 5 opere"),
});

export type ArtistApplicationFormData = z.infer<typeof ArtistApplicationSchema>;
