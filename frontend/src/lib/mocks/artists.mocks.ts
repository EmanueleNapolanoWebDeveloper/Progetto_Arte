// src/lib/mocks/artists.mocks.ts
import { Artist } from "@/src/types/artist";

export const artistsFixtures: Artist[] = [
  {
    id: "art-1",
    slug: "elena-rossi",
    name: "Elena Rossi",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
    avatarAlt: "Ritratto di Elena Rossi",
    bio: "Pintrice astratta focalizzata sulle tensioni cromatiche e la fluidità delle forme naturali.",
    worksCount: 14,
    featuredWorkImageUrl:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&h=800&q=80",
    featuredWorkImageAlt: "Sinfonia Blu — Opera astratta di Elena Rossi",
    isFollowed: false,
  },
  {
    id: "art-2",
    slug: "marco-bianchi",
    name: "Marco Bianchi",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
    avatarAlt: "Ritratto di Marco Bianchi",
    bio: "Scultore che lavora il marmo di Carrara fondendo forme classiche con geometrie brutaliste moderne.",
    worksCount: 8,
    featuredWorkImageUrl:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&h=800&q=80",
    featuredWorkImageAlt:
      "Monolito 04 — Scultura geometrica in marmo di Marco Bianchi",
    isFollowed: true,
  },
  {
    id: "art-3",
    slug: "giulia-neri",
    name: "Giulia Neri",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80",
    avatarAlt: "Ritratto di Giulia Neri",
    bio: "Fotografa documentarista dedita alla cattura del contrasto fra architetture industriali e natura.",
    worksCount: 22,
    featuredWorkImageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=800&q=80",
    featuredWorkImageAlt:
      "Cemento Verde — Fotografia architettonica di Giulia Neri",
    isFollowed: false,
  },
  {
    id: "art-4",
    slug: "alessandro-verdi",
    name: "Alessandro Verdi",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
    avatarAlt: "Ritratto di Alessandro Verdi",
    bio: "Digital artist ed esploratore della modellazione 3D surreale e dell'estetica cyber-barocca.",
    worksCount: 19,
    featuredWorkImageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=800&q=80",
    featuredWorkImageAlt:
      "Neo-Flora 1.0 — Opera d'arte digitale di Alessandro Verdi",
    isFollowed: false,
  },
  {
    id: "art-5",
    slug: "sofia-lombardi",
    name: "Sofia Lombardi",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80",
    avatarAlt: "Ritratto di Sofia Lombardi",
    bio: "Sperimentatrice di tecniche miste, pittura ad olio su superfici metalliche ossidate.",
    worksCount: 11,
    featuredWorkImageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=800&q=80",
    featuredWorkImageAlt:
      "Ruggine e Luce — Tecnica mista su ferro di Sofia Lombardi",
    isFollowed: false,
  },
  {
    id: "art-6",
    slug: "davide-gallo",
    name: "Davide Gallo",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&h=300&q=80",
    avatarAlt: "Ritratto di Davide Gallo",
    bio: "Scultore della ceramica che rivisita il vasellame antico con distorsioni digital-glitch.",
    worksCount: 15,
    featuredWorkImageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&h=800&q=80",
    featuredWorkImageAlt:
      "Anfora Glitch — Vaso in argilla distorta di Davide Gallo",
    isFollowed: false,
  },
];

// Questa funzione simula un caricamento asincrono rendendo immediato lo switch ad un'API reale
export async function getFeaturedArtists(): Promise<Artist[]> {
  // Simula latenza di rete minima
  return Promise.resolve(artistsFixtures);
}
