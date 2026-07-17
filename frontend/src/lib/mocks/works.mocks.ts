// src/lib/mocks/works.mocks.ts
import { Work } from "@/src/types/Auth/work";

export const worksFixtures: Work[] = [
  {
    id: "1",
    slug: "quiete-mattutina",
    title: "Quiete Mattutina",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dipinto astratto di quiete mattutina con toni caldi e floreali",
    categorySlug: "pittura",
    categoryName: "Pittura",
    price: 1200,
    currency: "EUR",
    artist: { id: "a1", name: "Elena Rossi", slug: "elena-rossi" },
    isSaved: false,
  },
  {
    id: "2",
    slug: "forma-liquida",
    title: "Forma Liquida",
    imageUrl:
      "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Scultura classica dettagliata in bronzo/marmo",
    categorySlug: "scultura",
    categoryName: "Scultura",
    price: 3400,
    currency: "EUR",
    artist: { id: "a2", name: "Marco Bianchi", slug: "marco-bianchi" },
    isSaved: false,
  },
  {
    id: "3",
    slug: "strade-di-roma",
    title: "Strade di Roma",
    imageUrl:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Fotografia di una via storica di Roma con luce pomeridiana",
    categorySlug: "fotografia",
    categoryName: "Fotografia",
    price: 850,
    currency: "EUR",
    artist: { id: "a3", name: "Giulia Conti", slug: "giulia-conti" },
    isSaved: true,
  },
  {
    id: "4",
    slug: "eco-digitale",
    title: "Eco Digitale",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Arte digitale generativa con forme fluide tridimensionali",
    categorySlug: "digitale",
    categoryName: "Digitale",
    price: 600,
    currency: "EUR",
    artist: { id: "a4", name: "Sara Neri", slug: "sara-neri" },
    isSaved: false,
  },
];
