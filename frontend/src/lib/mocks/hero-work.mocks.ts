export type HeroWork = {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  blurDataUrl: string;
};

// Placeholder base64 blur generico (grigio-neutro), va bene per il mock.
// Quando avrai le opere reali, questo verrà generato in automatico
// in fase di upload (es. con `plaiceholder` o `sharp`).
const FALLBACK_BLUR =
  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBw" +
  "oIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

export const HERO_WORKS_MOCK: HeroWork[] = [
  {
    id: "work-001",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop",
    title: "Frammenti di Luce",
    artistName: "Elena Marchetti",
    blurDataUrl: FALLBACK_BLUR,
  },
  {
    id: "work-002",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1920&auto=format&fit=crop",
    title: "Paesaggio Interiore n.3",
    artistName: "Marco Bellandi",
    blurDataUrl: FALLBACK_BLUR,
  },
  {
    id: "work-003",
    imageUrl:
      "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1920&auto=format&fit=crop",
    title: "Astrazione Blu",
    artistName: "Giulia Ferraro",
    blurDataUrl: FALLBACK_BLUR,
  },
  {
    id: "work-004",
    imageUrl:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1920&auto=format&fit=crop",
    title: "Silenzio Materico",
    artistName: "Davide Conti",
    blurDataUrl: FALLBACK_BLUR,
  },
];
