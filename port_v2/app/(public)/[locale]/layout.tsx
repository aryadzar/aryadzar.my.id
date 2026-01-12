import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "../../globals.css";
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
    <html lang={locale}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
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
      </body>
      <Toaster />
      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
    </html>
  );
}
