import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";
import Script from "next/script";
import HeaderWithAuth from "./components/HeaderWithAuth";
import type { Metadata } from "next";
import "./globals.css";
import "./dsfr-extensions.css";

export const metadata: Metadata = {
  title: "Formulaire DA - Document d'Architecture",
  description: "Formulaire pour créer des Documents d'Architecture (DA)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-fr-theme="light">
      <body>
        <HeaderWithAuth />
        {children}

        {/* JavaScript DSFR */}
        <Script
          src="/dsfr/dsfr.module.min.js"
          type="module"
          strategy="afterInteractive"
        />
        <Script
          src="/dsfr/dsfr.nomodule.min.js"
          noModule
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
