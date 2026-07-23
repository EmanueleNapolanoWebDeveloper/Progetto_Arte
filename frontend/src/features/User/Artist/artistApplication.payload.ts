import { ArtistApplicationFormData } from "@/src/schemas/User/Artist/artistApplication";

/**
 * Modello dei social link così come atteso dall'API.
 * Tutti i campi sono opzionali: vengono omessi se non valorizzati.
 */
interface ArtistApplicationSocialLinksPayload {
  instagram?: string;
  behance?: string;
  facebook?: string;
  other?: string;
}

/**
 * Payload finale inviato all'endpoint di creazione candidatura artista.
 * Nota: `portfolioSamples` NON è presente per contratto — i file
 * vengono gestiti da una chiamata separata (upload dedicato).
 */
export interface ArtistApplicationPayload {
  previous_application_id?: string;
  display_name: string;
  bio?: string;
  city?: string;
  region?: string;
  country_code: string;
  website_url?: string;
  social_links?: ArtistApplicationSocialLinksPayload;
  statement?: string;
  specialty_ids: string[];
}

/**
 * Restituisce `value` solo se "significativo" (non null, non undefined,
 * non stringa vuota/whitespace). Altrimenti `undefined`, cosicché lo
 * spread a valle lo ometta automaticamente dall'oggetto risultante.
 */
function toOptionalField<T extends string>(
  value: T | null | undefined,
): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string" && value.trim().length === 0) return undefined;
  return value;
}

/**
 * Costruisce l'oggetto social_links partendo dai social link della form.
 * Restituisce `undefined` se, dopo la pulizia, non resta alcun link valido:
 * evita di inviare un oggetto vuoto `{}` inutile all'API.
 */
function buildSocialLinksPayload(
  socialLinks: ArtistApplicationFormData["social_links"] | undefined,
): ArtistApplicationSocialLinksPayload | undefined {
  if (!socialLinks) return undefined;

  const { instagram, behance, facebook, other } = socialLinks;

  const cleaned: ArtistApplicationSocialLinksPayload = {
    ...(toOptionalField(instagram) && {
      instagram: toOptionalField(instagram),
    }),
    ...(toOptionalField(behance) && { behance: toOptionalField(behance) }),
    ...(toOptionalField(facebook) && { facebook: toOptionalField(facebook) }),
    ...(toOptionalField(other) && { other: toOptionalField(other) }),
  };

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

/**
 * Unico punto di trasformazione tra il modello della form
 * (ArtistApplicationFormData) e il modello richiesto dall'API
 * (ArtistApplicationPayload).
 *
 * Regole:
 * - i campi null/undefined/stringa vuota vengono omessi dal payload
 * - `portfolioSamples` viene sempre ignorato: i file seguono un flusso
 *   di upload separato e non fanno parte di questo payload JSON
 * - nessuna mutazione: l'oggetto in input non viene mai modificato
 */
export function buildArtistApplicationPayload(
  data: ArtistApplicationFormData,
): ArtistApplicationPayload {
  const {
    previous_application_id,
    display_name,
    bio,
    city,
    region,
    country_code,
    website_url,
    social_links,
    statement,
    specialtyIds,
    // portfolioSamples volutamente non destrutturato: non deve
    // in alcun modo finire nel payload, nemmeno per errore futuro
  } = data;

  const socialLinksPayload = buildSocialLinksPayload(social_links);

  const cleanCountryCode = country_code?.trim() ?? "";

  return {
    ...(toOptionalField(previous_application_id) && {
      previous_application_id: toOptionalField(previous_application_id),
    }),
    display_name,
    ...(toOptionalField(bio) && { bio: toOptionalField(bio) }),
    ...(toOptionalField(city) && { city: toOptionalField(city) }),
    ...(toOptionalField(region) && { region: toOptionalField(region) }),
    country_code: cleanCountryCode,
    ...(toOptionalField(website_url) && {
      website_url: toOptionalField(website_url),
    }),
    ...(socialLinksPayload && { social_links: socialLinksPayload }),
    ...(toOptionalField(statement) && {
      statement: toOptionalField(statement),
    }),
    specialty_ids: specialtyIds,
  };
}
