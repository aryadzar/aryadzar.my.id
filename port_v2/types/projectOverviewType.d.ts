export interface ProjectOverview {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  projects: Project[];
}

export interface Project {
  _id: string;
  categories?: Category[];
  publishedAt: string;
  shortDesc?: string;
  slug: Slug2;
  thumbnail: string;
  title: string;
}

export interface Category {
  _id: string;
  slug: Slug;
  title: string;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface Slug2 {
  _type: string;
  current: string;
}
