import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";
import { DisplayModeProvider } from "@/hooks/useDisplayMode";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.mainNav.title,
    template: `%s - ${siteConfig.mainNav.title}`,
  },
  description: siteConfig.mainNav.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fr">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <DisplayModeProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col min-h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow pb-12">
                {children}
              </main>
              <footer className="fixed bottom-0 w-full flex items-center justify-center py-2 bg-background/80 backdrop-blur-sm border-t border-default-200">
                  <span className="text-default-600">{siteConfig.mainNav.title} -&nbsp;</span>
                  <span className="text-default-600">Created by&nbsp;</span>
                  <p className="text-primary">TheoSLV</p>
              </footer>
            </div>
          </Providers>
        </DisplayModeProvider>
      </body>
    </html>
  );
}
