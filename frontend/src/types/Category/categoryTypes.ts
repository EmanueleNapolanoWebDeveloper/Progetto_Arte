export interface CategoryOption {
  id: string;
  name: string;
  parentName: string;
}

/** Forma della risposta JSON restituita da GET /api/categories/specialties */
export interface CategorySpecialtiesResponse {
  data: CategoryOption[];
}
