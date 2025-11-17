import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import Footer from "@/components/footer";
import { NavbarView } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import BProgressProvider from "@/provider/bprogress-provider";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return createMetadata({
    description: "Arya Dzaky's Portfolio Fullstack Developer",
    url: `/`,
    locale: "en",
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
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
              <Footer />
            </ThemeProvider>
            <Analytics />
          </ReactQueryProvider>
        </BProgressProvider>
      </body>
    </html>
  );
}
