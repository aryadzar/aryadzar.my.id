import { Slug } from "sanity";
import { api } from "./api";

export interface CategoryContent {
  success: boolean;
  page: number;
  limit: number;
  totalBlogs: number;
  totalProjects: number;
  totalPages: number;
  category: {
    _id: string;
    title: string;
    slug: string;
    description?: string;
  } | null;
  blogs: Array<{
    _id: string;
    title: string;
    slug: Slug;
    thumbnail: string;
    excerpt: string;
    categories: Array<{
      _id: string;
      title: string;
      slug: string;
    }>;
    publishedAt: string;
  }>;
  projects: Array<{
    _id: string;
    title: string;
    slug: Slug;
    thumbnail: string;
    shortDesc: string;
    categories: Array<{
      _id: string;
      title: string;
      slug: string;
    }>;
    publishedAt: string;
  }>;
}

 

export const getCategoryContent = async (
  slug: string,
  lang: string,
  page = 1,
  limit = 6
): Promise<CategoryContent> => {
  const { data } = await api.get(`/api/${lang}/category/${slug}`, {
    params: {
      page,
      limit,
    },
  });

  return data;
};
