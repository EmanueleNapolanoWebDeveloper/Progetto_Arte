import { ArtistApplicationForm } from "@/src/components/Forms/ArtistApplication/ArtistApplicationForm";
import { getArtistSpecialtyCategories } from "@/src/lib/repositories/categories/categories.repository";

export default async function Page() {
  const categories = await getArtistSpecialtyCategories();

  return (
    <main style={{ width: "100%", padding: "2rem 1.5rem" }}>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            marginBottom: "2rem",
            fontSize: "1.75rem",
            fontWeight: "700",
          }}
        >
          Candidatura Artista
        </h1>
        <ArtistApplicationForm
          categories={categories}
        />
      </div>
    </main>
  );
}
