import { BlogOverview } from "@/types/blogOverviewTypes";
import { api } from "./api";
import { BlogDetail } from "@/types/blogDetailTypes";

export const getBlogs = async (
  lang: string,
  page = 1,
  limit = 6,
  q = ""
): Promise<BlogOverview> => {
  const { data } = await api.get(`/api/${lang}/blog`, {
    params: {
      page,
      limit,
      q,
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
