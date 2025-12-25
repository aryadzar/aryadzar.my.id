export interface BlogOverview {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  blogs: Blog[];
}

export interface Blog {
  _id: string;
  categories: Category[];
  excerpt?: string;
  publishedAt: string;
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
