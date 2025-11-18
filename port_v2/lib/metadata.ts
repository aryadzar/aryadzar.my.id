import type { Metadata } from "next";

interface CreateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  locale?: string;
}

const defaultConfig = {
  siteName: "Arya Dzaky’s Portfolio",
  baseUrl: "https://your-domain.com",
  defaultImage: "/og-image.jpg",
  creator: "Arya Dzaky",
};

export function createMetadata({
  title,
  description,
  keywords = [],
  image,
  url = "/",
  locale = "en",
}: CreateMetadataProps): Metadata {
  const fullUrl = `${defaultConfig.baseUrl}${url}`;
  const ogImage = image
    ? `${image}`
    : `${defaultConfig.baseUrl}${defaultConfig.defaultImage}`;

  return {
    metadataBase: new URL(defaultConfig.baseUrl),
    title: title,
    description:
      description ??
      "Portofolio resmi Arya Dzaky — Web Developer dengan project Next.js, React, dan Laravel.",

    keywords: [
      "Arya Dzaky",
      "Portfolio",
      "Web Developer",
      "Frontend Developer",
      "Next.js",
      "React",
      ...keywords,
    ],

    alternates: {
      canonical: url,
      languages: {
        "en-US": `/en${url}`,
        "id-ID": `/id${url}`,
      },
    },

    openGraph: {
      type: "website",
      url: fullUrl,
      title: title ?? defaultConfig.siteName,
      description:
        description ??
        "Portofolio profesional Arya Dzaky. Berisi project dan artikel software engineering.",
      siteName: defaultConfig.siteName,
      locale: locale === "en" ? "en_US" : "id_ID",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },

    twitter: {
      card: "summary_large_image",
      creator: "@yourtwitter",
      title: title ?? defaultConfig.siteName,
      description:
        description ??
        "Portofolio modern berisi project dan blog teknologi oleh Arya Dzaky.",
      images: [ogImage],
    },
  };
}
