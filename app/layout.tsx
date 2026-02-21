import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";
import Script from "next/script";
import HeaderWithAuth from "./_components/HeaderWithAuth";
import type { Metadata } from "next";
import "./globals.css";
import "./dsfr-extensions.css";

export const metadata: Metadata = {
  title: "Formulaire DA - Document d'Architecture",
  description: "Formulaire pour créer des Documents d'Architecture (DA)",
  icons: {
    icon: [
      { url: "/dsfr/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/dsfr/favicon/favicon.ico", type: "image/x-icon", sizes: "32x32" },
    ],
    apple: "/dsfr/favicon/apple-touch-icon.png",
  },
  manifest: "/dsfr/favicon/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-fr-scheme="system" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.documentElement.getAttribute('data-fr-scheme');if(s==='system'){var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-fr-theme',d?'dark':'light');window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){document.documentElement.setAttribute('data-fr-theme',e.matches?'dark':'light')})}})()`,
          }}
        />
      </head>
      <body>
        <HeaderWithAuth />
        {children}

        <footer className="fr-footer" role="contentinfo" id="footer">
          <div className="fr-container">
            <div className="fr-footer__body">
              <div className="fr-footer__brand fr-enlarge-link">
                <a
                  href="/"
                  title="Retour à l'accueil du site - Documents d'Architecture - République Française"
                >
                  <p className="fr-logo">
                    République
                    <br />
                    Française
                  </p>
                </a>
              </div>
              <div className="fr-footer__content">
                <ul className="fr-footer__content-list">
                  <li className="fr-footer__content-item">
                    <a
                      title="info.gouv.fr - nouvelle fenêtre"
                      href="https://info.gouv.fr"
                      target="_blank"
                      rel="noopener external"
                      className="fr-footer__content-link"
                    >
                      info.gouv.fr
                    </a>
                  </li>
                  <li className="fr-footer__content-item">
                    <a
                      title="service-public.gouv.fr - nouvelle fenêtre"
                      href="https://service-public.gouv.fr"
                      target="_blank"
                      rel="noopener external"
                      className="fr-footer__content-link"
                    >
                      service-public.gouv.fr
                    </a>
                  </li>
                  <li className="fr-footer__content-item">
                    <a
                      title="legifrance.gouv.fr - nouvelle fenêtre"
                      href="https://legifrance.gouv.fr"
                      target="_blank"
                      rel="noopener external"
                      className="fr-footer__content-link"
                    >
                      legifrance.gouv.fr
                    </a>
                  </li>
                  <li className="fr-footer__content-item">
                    <a
                      title="data.gouv.fr - nouvelle fenêtre"
                      href="https://data.gouv.fr"
                      target="_blank"
                      rel="noopener external"
                      className="fr-footer__content-link"
                    >
                      data.gouv.fr
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="fr-footer__bottom">
              <ul className="fr-footer__bottom-list">
                <li className="fr-footer__bottom-item">
                  <a href="#" className="fr-footer__bottom-link">
                    Accessibilité : non conforme
                  </a>
                </li>
                <li className="fr-footer__bottom-item">
                  <a href="#" className="fr-footer__bottom-link">
                    Mentions légales
                  </a>
                </li>
                <li className="fr-footer__bottom-item">
                  <a href="#" className="fr-footer__bottom-link">
                    Données personnelles
                  </a>
                </li>
              </ul>
              <div className="fr-footer__bottom-copy">
                <p>
                  Sauf mention explicite de propriété intellectuelle détenue par
                  des tiers, les contenus de ce site sont proposés sous{" "}
                  <a
                    href="https://opensource.org/licenses/MIT"
                    target="_blank"
                    rel="noopener external"
                    title="Licence MIT - nouvelle fenêtre"
                  >
                    licence MIT
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>

        <Script src="/dsfr/dsfr.module.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
