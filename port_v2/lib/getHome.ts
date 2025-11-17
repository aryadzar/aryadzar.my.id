import { Hero } from "@/types/homeType";
import { api } from "./api";
import { About } from "@/types/aboutType";
import { Certificate } from "@/types/certificateType";
import { ProjectOverview } from "@/types/projectOverviewType";
import { BlogOverview } from "@/types/blogOverviewTypes";

export const getHero = async (lang: string): Promise<Hero> => {
  const { data } = await api.get(`/api/${lang}/hero`);

  return data;
};

export const getAbout = async (lang: string): Promise<About> => {
  const { data } = await api.get(`/api/${lang}/about`);

  return data;
};

export const getCertificate = async (): Promise<Certificate[]> => {
  const { data } = await api.get(`/api/certificate`);

  return data;
};

export const getProjectOverview = async (
  lang: string
): Promise<ProjectOverview> => {
  const { data } = await api.get(`/api/${lang}/project`, {
    params: {
      page: 1,
      limit: 3,
    },
  });

  return data;
};
export const getBlogOverview = async (lang: string): Promise<BlogOverview> => {
  const { data } = await api.get(`/api/${lang}/blog`, {
    params: {
      page: 1,
      limit: 3,
    },
  });

  return data;
};
