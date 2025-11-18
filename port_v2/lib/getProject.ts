import { client } from "@/sanity/lib/client";
import { ProjectOverview } from "@/types/projectOverviewType";
import { groq } from "next-sanity";
import { api } from "./api";
import { ProjectDetail } from "@/types/projectDetailType";

export const getProjects = async (
  lang: string,
  page = 1,
  limit = 6,
  q = ""
): Promise<ProjectOverview> => {
  const { data } = await api.get(`/api/${lang}/project`, {
    params: {
      page,
      limit,
      q,
    },
  });

  return data;
};

export const getProject = async (
  slug: string,
  lang: string
): Promise<ProjectDetail> => {
  const { data } = await api.get(`/api/${lang}/project/${slug}`);

  return data;
};
