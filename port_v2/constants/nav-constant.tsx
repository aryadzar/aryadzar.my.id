"use client";

import { useTranslations } from "next-intl";

export function useNavItems() {
  const t = useTranslations("nav");

  return [
    { name: t("home"), link: "/" },
    { name: t("projects"), link: "/projects" },
    { name: t("blog"), link: "/blog" },
    {
      name: t("more"),
      children: [
        { name: t("skills"), link: "/skills" },
        { name: t("uses"), link: "/uses" },
      ],
    },
    { name: t("about"), link: "/about" },
    // { name: t("contact"), link: "#contact" },
  ];
}
