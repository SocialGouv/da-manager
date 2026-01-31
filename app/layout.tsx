import { DsfrHeadBase } from "@codegouvfr/react-dsfr/next-app-router/DsfrHead";
import { createGetHtmlAttributes } from "@codegouvfr/react-dsfr/next-app-router/getHtmlAttributes";
import { ClientDsfrProvider } from "./components/ClientDsfrProvider";
import HeaderWithAuth from "./components/HeaderWithAuth";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import "./dsfr-extensions.css";

export const metadata: Metadata = {
  title: "Formulaire DA - Document d'Architecture",
  description: "Formulaire pour créer des Documents d'Architecture (DA)",
};

const { getHtmlAttributes } = createGetHtmlAttributes({ defaultColorScheme });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = "fr";

  return (
    <html {...getHtmlAttributes({ lang })}>
      <head>
        <DsfrHeadBase
          Link={Link}
          preloadFonts={[
            "Marianne-Regular",
            "Marianne-Bold"
          ]}
        />
      </head>
      <body>
        <ClientDsfrProvider lang={lang}>
          <HeaderWithAuth />
          {children}
        </ClientDsfrProvider>
      </body>
    </html>
  );
}
