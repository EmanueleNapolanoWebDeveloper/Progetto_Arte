import type { CategoryOption } from "@/src/schemas/User/Artist/artistApplication";

type CategorySpecialtiesReponse = {
  data: CategoryOption[];
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  "http://127.0.0.1:8000";
const API_URL = `${APP_URL}/api`;

export async function getArtistSpecialtyCategories(): Promise<
  CategoryOption[]
> {
  const res = await fetch(`${API_URL}/categories/specialties`, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    // 🔍 Diagnostica: Stampa nel terminale di Next.js la risposta di Laravel
    const errorBody = await res.text();
    console.error(`❌ Errore API Laravel [HTTP ${res.status}]:`, errorBody);

    throw new Error(`Impossibile recuperare le categorie (HTTP ${res.status})`);
  }

  const { data }: CategorySpecialtiesReponse = await res.json();

  return data;
}
