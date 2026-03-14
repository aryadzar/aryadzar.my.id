import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import { NavbarView } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import BProgressProvider from "@/provider/bprogress-provider";
import { createMetadata } from "@/lib/metadata";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Toaster } from "sonner";
import { SanityLive } from "@/sanity/lib/live";
import { handleError } from "./client-function";
import { draftMode } from "next/headers";
import { DraftModeToast } from "./DraftModeToast";
import { VisualEditing } from "next-sanity/visual-editing";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "metadata.home",
  });
  return createMetadata({
    title: t("title"),
    description: t("description"),
    url: `/`,
    locale: locale,
  });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TALLY_FORMS: Record<string, string> = {
  en: "yP4NB0",
  id: "447JXo",
  // de: "kL82P1",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const formId = TALLY_FORMS[locale] ?? TALLY_FORMS.en;

  return (
    <>
      <NextIntlClientProvider>
        <BProgressProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavbarView />
              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              {children}
              <Script id="tally-config" strategy="afterInteractive">
                {`
              window.TallyConfig = {
                "formId": "${formId}",
                "popup": {
                  "width": 380,
                  "emoji": {
                    "text": "👋",
                    "animation": "wave"
                  },
                  "formEventsForwarding": true
                }
              };
            `}
              </Script>
              <Script
                src="https://tally.so/widgets/embed.js"
                strategy="afterInteractive"
              />
              <Footer />
            </ThemeProvider>
            <Analytics />
          </ReactQueryProvider>
        </BProgressProvider>
      </NextIntlClientProvider>
      <Toaster />
      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
    </>
  );
}
