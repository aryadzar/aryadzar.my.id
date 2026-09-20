import { getTranslations } from "next-intl/server";
import PhotosPage from "./_components/photos-page";
import { createMetadata } from "@/lib/metadata";
import { getPhotos } from "@/lib/getHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "metadata.photos",
  });
  return createMetadata({
    title: t("title"),
    description: t("description"),
    url: `/photos`,
    locale: locale,
  });
}

export default async function PhotosPageIndex() {
  const photos = await getPhotos();
  return <PhotosPage photos={photos} />;
}
