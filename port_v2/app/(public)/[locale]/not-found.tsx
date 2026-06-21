import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocalizedNotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="container flex flex-col items-center justify-center min-h-[70vh] py-16 mx-auto text-foreground md:flex-row gap-8">
      {/* Bagian Teks */}
      <div className="px-6 text-center md:text-left flex-grow max-w-md">
        <h1 className="mb-2 text-6xl font-extrabold tracking-tight text-primary">
          {t("title")}
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          {t("subtitle")}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t("description")}
        </p>

        {/* Tombol Back to Home */}
        <div>
          <Button variant="default" size="lg" asChild>
            <Link href="/">
              {t("backToHome")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="flex justify-center flex-grow max-w-sm">
        <img
          src="/404-scarameow.svg"
          alt="404 Image"
          className="object-contain w-72 h-72 dark:brightness-90 transition-all duration-300"
        />
      </div>
    </main>
  );
}
