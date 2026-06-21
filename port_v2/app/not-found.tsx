"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";

export default function NotFound() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="container flex flex-col items-center justify-center min-h-screen py-10 mx-auto text-foreground md:flex-row gap-8 bg-background">
        {/* Bagian Teks */}
        <div className="px-6 text-center md:text-left flex-grow max-w-md">
          <h1 className="mb-2 text-6xl font-extrabold tracking-tight text-primary">
            OOPS
          </h1>
          <h2 className="text-2xl font-bold mb-4">
            404 - That's Error
          </h2>
          <p className="text-muted-foreground mb-8">
            The requested URL was not found on this server. That's all we know.
          </p>

          {/* Tombol Back to Home */}
          <div>
            <Button variant="default" size="lg" asChild>
              <Link href="/">
                Back to Home
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
      </div>
    </ThemeProvider>
  );
}
