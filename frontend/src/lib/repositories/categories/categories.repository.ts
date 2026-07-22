import type {
  CategoryOption,
  CategorySpecialtiesResponse,
} from "@/src/types/Category/categoryTypes";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  "http://127.0.0.1:8000";
const API_URL = `${APP_URL}/api`;

export async function getArtistSpecialtyCategories(): Promise<
  CategoryOption[]
> {
  try {
    const res = await fetch(`${API_URL}/categories/specialties`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "Nessun corpo risposta");
      console.error(`❌ Errore API Laravel [HTTP ${res.status}]:`, errorBody);
      throw new Error(
        `Errore HTTP ${res.status} durante il recupero delle categorie`,
      );
    }

    const payload: CategorySpecialtiesResponse = await res.json();
    return payload.data;
  } catch (error) {
    console.error("❌ Errore durante il recupero delle categorie:", error);
    // Rilanciamo l'errore o restituiamo un array vuoto come fallback
    throw error;
  }
}
