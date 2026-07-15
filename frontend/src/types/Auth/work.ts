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

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  worksCount: number;
  imageUrl: string;
  imageAlt: string;
}