import { Hero } from "@/types/homeType";
import { api } from "./api";

export const getHero = async (lang: string): Promise<Hero> => {
  const { data } = await api.get(`/api/${lang}/hero`);

  return data;
};

export const getAbout = async (lang: string): Promise<Hero> => {
  const { data } = await api.get(`/api/${lang}/about`);

  return data;
};
