import { BlogOverview } from "@/types/blogOverviewTypes";
import { api } from "./api";
import { BlogDetail } from "@/types/blogDetailTypes";

export const getBlogs = async (
  lang: string,
  page = 1,
  limit = 6,
  q = "",
  categorySlug = ""
): Promise<BlogOverview> => {
  const { data } = await api.get(`/api/${lang}/blog`, {
    params: {
      page,
      limit,
      q,
      category: categorySlug,
    },
  });

  return data;
};

export const getBlog = async (
  slug: string,
  lang: string
): Promise<BlogDetail> => {
  const { data } = await api.get(`/api/${lang}/blog/${slug}`);

  return data;
};

export const getBlogsByCategory = async (
  categorySlug: string,
  lang: string,
  page = 1,
  limit = 6
): Promise<BlogOverview> => {
  const { data } = await api.get(`/api/${lang}/blog`, {
    params: {
      page,
      limit,
      category: categorySlug,
    },
  });

  return data;
};
