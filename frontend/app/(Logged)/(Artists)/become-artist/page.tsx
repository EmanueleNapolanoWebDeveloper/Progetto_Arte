import { ArtistApplicationForm } from "@/src/components/Forms/ArtistApplication/ArtistApplicationForm";
import { getArtistSpecialtyCategories } from "@/src/lib/repositories/categories/categories.repository";
import { ArtistApplicationFormData } from "@/src/schemas/User/Artist/artistApplication";

export default async function Page() {
  const categories = await getArtistSpecialtyCategories();

  // Funzione di test da passare al Form
  const handleTestSubmit = async (data: ArtistApplicationFormData) => {
    "use server";

    console.log("=== 🎨 RICEVUTI DATI DALLA FORM (SERVER) ===");
    console.log("Statement:", data.statement);
    console.log("Specializzazioni (IDs):", data.specialtyIds);
    console.log("File Selezionati (count):", data.portfolioSamples.length);
  };

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Candidatura Artista</h1>
      <ArtistApplicationForm
        categories={categories}
        onSubmitApplication={handleTestSubmit}
      />
    </main>
  );
}
