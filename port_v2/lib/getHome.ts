import { Hero } from "@/types/homeType";
import { About } from "@/types/aboutType";
import { Certificate } from "@/types/certificateType";
import { ProjectOverview } from "@/types/projectOverviewType";
import { BlogOverview } from "@/types/blogOverviewTypes";
import { ExperienceData } from "@/types/experienceType";
import { EducationData } from "@/types/educationType";
import { client } from "@/sanity/lib/client";

export const getHero = async (lang?: string): Promise<Hero> => {
  const data = await client.fetch(
    `*[_type == "hero" && language == $lang][0]{
      title,
      subtitle,
      "videoUrl" : video.asset->url,
      "cvUrl" : cvFile.asset->url
    }`,
    { lang }
  );

  return data;
};

export const getAbout = async (lang: string): Promise<About> => {
  const data = await client.fetch(
    `*[_type == "about" && language == $lang][0]{
      name,
      jobTitle,
      description,
      "imageUrl": profileImage.asset->url,
      "cvUrl": cvFile.asset->url,
      "certificateUrl": certificateFile.asset->url
    }`,
    { lang }
  );

  return data;
};

export const getCertificate = async (limit: number = 6): Promise<Certificate[]> => {
  const data = await client.fetch(
    `*[_type == "certification"] | order(date desc)[0...$limit]{
      title,
      issuer,
      "date": date,
      "id": certId,
      "href": certificateFile.asset->url,
      "logoSrc": logo.asset->url,
      "logoAlt": logoAlt
    }`,
    { limit }
  );

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

  const { projects, total } = await client.fetch(query, { lang });

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

  const { blogs, total } = await client.fetch(query, { lang });

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
  const data = await client.fetch(
    `*[_type == "experience" && language == $lang] | order(duration desc) {
      _id,
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
    { lang }
  );

  return { experience: data };
};

export const getEducation = async (lang: string): Promise<EducationData> => {
  const data = await client.fetch(
    `*[_type == "education" && language == $lang] | order(date desc) {
      _id,
      degree,
      school,
      field,
      date,
      "logo": {
        "src": logo.asset->url,
        "alt": logo.alt
      }
    }`,
    { lang }
  );

  return { education: data };
};
