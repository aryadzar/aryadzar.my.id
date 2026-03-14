import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {/* <Script id="set-lang-attribute" strategy="afterInteractive">
          {`
            (function() {
              const path = window.location.pathname;
              const locale = path.split('/')[1];
              const validLocales = ['en', 'id'];
              if (validLocales.includes(locale)) {
                document.documentElement.lang = locale;
              }
            })();
          `}
        </Script> */}
        {children}
      </body>
    </html>
  );
}
