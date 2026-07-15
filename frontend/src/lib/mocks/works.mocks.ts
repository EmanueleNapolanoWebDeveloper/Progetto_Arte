export interface Work {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  currency: string;
  categorySlug: string;
  categoryName: string;
  artist: {
    id: string;
    name: string;
    slug: string;
  };
  isSaved?: boolean;
}


const artists = [
  { id: "a1", name: "Giulia Ferraro", slug: "giulia-ferraro" },
  { id: "a2", name: "Marco Testa", slug: "marco-testa" },
  { id: "a3", name: "Elena Conti", slug: "elena-conti" },
  { id: "a4", name: "Luca Bianchi", slug: "luca-bianchi" },
];

const categoryBySlug: Record<string, string> = {
  pittura: "Pittura",
  fotografia: "Fotografia",
  scultura: "Scultura",
  illustrazione: "Illustrazione",
};

export const worksFixtures: Work[] = Array.from({ length: 12 }, (_, i) => {
  const categorySlug = Object.keys(categoryBySlug)[i % 4];
  const artist = artists[i % artists.length];

  return {
    id: `w${i + 1}`,
    slug: `opera-${i + 1}`,
    title: `Opera senza titolo n.${i + 1}`,
    imageUrl: `https://picsum.photos/seed/opera${i + 1}/600/800`,
    imageAlt: `Opera d'arte numero ${i + 1} di ${artist.name}`,
    price: 350 + i * 85,
    currency: "EUR",
    categorySlug,
    categoryName: categoryBySlug[categorySlug],
    artist,
    isSaved: false,
  };
});
