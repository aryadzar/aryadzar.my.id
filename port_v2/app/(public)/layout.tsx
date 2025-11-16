import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { NavbarView } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryProvider from "@/provider/react-query-provider";

export const metadata: Metadata = {
  title: "Arya Dzaky's Portfolio",
  description: "Created with v0",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
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
      </body>
    </html>
  );
}
