export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  size: "large" | "small";
};

export const CATEGORIES_MOCK: Category[] = [
  {
    id: "cat-quadri",
    slug: "quadri",
    name: "Quadri",
    description: "Pittura contemporanea e classica",
    imageUrl:
      "https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=1600&auto=format&fit=crop",
    size: "large",
  },
  {
    id: "cat-sculture",
    slug: "sculture",
    name: "Sculture",
    description: "Opere tridimensionali uniche",
    imageUrl:
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1200&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "cat-fotografia",
    slug: "fotografia",
    name: "Fotografia",
    description: "Stampe d'autore in edizione limitata",
    imageUrl:
      "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?q=80&w=1200&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "cat-digitale",
    slug: "digitale",
    name: "Arte Digitale",
    description: "Opere digitali certificate",
    imageUrl:
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop",
    size: "small",
  },
];
