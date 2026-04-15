export interface Character {
  id: number;
  name: string;
  alias?: string;
  occupation?: string;
  age?: number;
  gender?: string;
  family?: string;
  description?: string;
  imageUrl?: string;
  firstAppearance?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CharacterRequestDTO {
  name: string;
  alias?: string;
  occupation?: string;
  age?: number;
  gender?: string;
  family?: string;
  description?: string;
  imageUrl?: string;
  firstAppearance?: string;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
