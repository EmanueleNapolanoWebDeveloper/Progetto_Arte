export interface Artist {
  id: string;
  slug: string;
  name: string;
  avatarUrl: string;
  avatarAlt: string;
  bio: string; // breve, 1-2 frasi
  worksCount: number;
  featuredWorkImageUrl: string; // opera rappresentativa mostrata nella card
  featuredWorkImageAlt: string;
  isFollowed?: boolean;
}
