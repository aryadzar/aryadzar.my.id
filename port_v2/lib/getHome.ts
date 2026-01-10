import { Hero } from "@/types/homeType";
import { About } from "@/types/aboutType";
import { Certificate } from "@/types/certificateType";
import { ProjectOverview } from "@/types/projectOverviewType";
import { BlogOverview } from "@/types/blogOverviewTypes";
import { ExperienceData } from "@/types/experienceType";
import { EducationData } from "@/types/educationType";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { sanityFetch } from "@/sanity/lib/live";

export const getHero = async (lang?: string): Promise<Hero> => {
  const { data } = await sanityFetch({
    query: `*[_type == "hero" && language == $lang][0]{
      _id,
      _type,
      title,
      subtitle,
      "videoUrl" : video.asset->url,
      "cvUrl" : cvFile.asset->url
    }`,
    params: { lang },
  });

  return data;
};

export const getAbout = async (lang: string): Promise<About> => {
  const { data } = await sanityFetch({
    query: `*[_type == "about" && language == $lang][0]{
      name,
      jobTitle,
      description,
      "imageUrl": profileImage.asset->url,
      "cvUrl": cvFile.asset->url,
      "certificateUrl": certificateFile.asset->url
    }`,
    params: { lang },
  });

  return data;
};

export const getCertificate = async (
  limit: number = 6
): Promise<Certificate[]> => {
  const { data } = await sanityFetch({
    query: `*[_type == "certification"] | order(date desc)[0...$limit]{
      _id,
      _type,
      title,
      issuer,
      "date": date,
      "id": certId,
      "href": certificateFile.asset->url,
      "logoSrc": logo.asset->url,
      "logoAlt": logoAlt
    }`,
    params: { limit },
  });

  return data;
};

export const getProjectOverview = async (
  lang: string,
  page: number = 1,
  limit: number = 3
): Promise<ProjectOverview> => {
  const start = (page - 1) * limit;

  const query = `
    {
      "projects": *[
        _type == "project" &&
        language == $lang &&
        publishedAt <= now()
      ] | order(publishedAt desc) [${start}...${start + limit}] {
        _id,
        _type,
        title,
        slug,
        "thumbnail" : thumbnail.asset->url,
        shortDesc,
        categories[]->{_id, title, slug},
        publishedAt
      },

      "total": count(*[
        _type == "project" &&
        language == $lang &&
        publishedAt <= now()
      ])
    }
  `;

  const { data } = await sanityFetch({ query, params: { lang } });

  const { projects, total } = data;

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    success: true,
    page,
    limit,
    total,
    totalPages,
    projects,
  };
};

export const getBlogOverview = async (
  lang: string,
  page: number = 1,
  limit: number = 3
): Promise<BlogOverview> => {
  const start = (page - 1) * limit;

  const query = `
    {
      "blogs": *[
        _type == "blog" &&
        language == $lang &&
        publishedAt <= now()
      ] | order(publishedAt desc) [${start}...${start + limit}] {
        _id,
        _type,
        title,
        slug,
        "thumbnail" : coverImage.asset->url,
        excerpt,
        categories[]->{_id, title, slug},
        publishedAt
      },

      "total": count(*[
        _type == "blog" &&
        language == $lang &&
        publishedAt <= now()
      ])
    }
  `;

  const { data } = await sanityFetch({ query, params: { lang } });
  const { blogs, total } = data;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    success: true,
    page,
    limit,
    total,
    totalPages,
    blogs,
  };
};

export const getExperience = async (lang: string): Promise<ExperienceData> => {
  const { data } = await sanityFetch({
    query: `*[_type == "experience" && language == $lang] | order(duration desc) {
      _id,
      _type,
      title,
      company,
      duration,
      description,
      skills[]->{
        _id,
        title
      },
      "logo": {
        "src": logo.asset->url,
        "alt": logo.alt
      }
    }`,
    params: { lang },
  });

  return { experience: data };
};

export const getEducation = async (lang: string): Promise<EducationData> => {
  const { data } = await sanityFetch({
    query: `*[_type == "education" && language == $lang] | order(date desc) {
      _id,
      _type,
      degree,
      school,
      field,
      date,
      "logo": {
        "src": logo.asset->url,
        "alt": logo.alt
      }
    }`,
    params: { lang },
  });

  return { education: data };
};
