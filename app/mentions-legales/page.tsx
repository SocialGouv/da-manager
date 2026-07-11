import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales - Documents d'Architecture",
};

export default function MentionsLegales() {
  return (
    <main className="fr-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <h1>Mentions légales</h1>

          <h2>Éditeur</h2>
          <p>
            Le gestionnaire de Documents d&apos;Architecture (DA Manager) est édité
            par la Fabrique numérique des ministères sociaux, sous l&apos;égide du
            Ministère du Travail, de la Santé et des Solidarités.
          </p>
          <address>
            <strong>Ministère du Travail, de la Santé et des Solidarités</strong>
            <br />
            14 avenue Duquesne
            <br />
            75350 Paris 07 SP
            <br />
            Tél.&nbsp;: +33 (0)1 40 56 60 00
          </address>

          <h2>Directeur de la publication</h2>
          <p>
            Le directeur de la publication est le Secrétaire général des ministères
            chargés des affaires sociales.
          </p>

          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par&nbsp;:
          </p>
          <address>
            <strong>OVH SAS</strong>
            <br />
            2 rue Kellermann
            <br />
            59100 Roubaix
            <br />
            Tél.&nbsp;: 1007
          </address>

          <h2>Accessibilité</h2>
          <p>
            La conformité aux normes d&apos;accessibilité numérique est un objectif
            ultérieur et nous travaillons à rendre ce site accessible à toutes et à
            tous.
          </p>
          <h3>Signaler un dysfonctionnement</h3>
          <p>
            Si vous rencontrez un défaut d&apos;accessibilité vous empêchant
            d&apos;accéder à un contenu ou à une fonctionnalité du site, merci de
            nous le signaler. Si vous n&apos;obtenez pas de réponse rapide de notre
            part, vous êtes en droit de faire parvenir vos doléances ou une demande
            de saisine au Défenseur des droits.
          </p>

          <h2>Sécurité</h2>
          <p>
            Le site est protégé par un certificat électronique, matérialisé pour la
            grande majorité des navigateurs par un cadenas. Cette protection
            participe à la confidentialité des échanges.
          </p>
          <p>
            En aucun cas les services associés à la plateforme ne seront à
            l&apos;origine d&apos;envoi de courriels pour demander la saisie
            d&apos;informations personnelles.
          </p>

          <h2>Réutilisation des contenus</h2>
          <p>
            Sauf mention explicite de propriété intellectuelle détenue par des tiers,
            les contenus de ce site sont proposés sous{" "}
            <a
              href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
              target="_blank"
              rel="noopener external"
              title="Licence etalab-2.0 - nouvelle fenêtre"
            >
              licence etalab-2.0
            </a>
            .
          </p>

          <h2>Crédits</h2>
          <p>
            Ce service est développé par la{" "}
            <a
              href="https://www.fabrique.social.gouv.fr"
              target="_blank"
              rel="noopener external"
              title="Fabrique numérique des ministères sociaux - nouvelle fenêtre"
            >
              Fabrique numérique des ministères sociaux
            </a>
            . Le code source est disponible sur{" "}
            <a
              href="https://github.com/SocialGouv/da-manager"
              target="_blank"
              rel="noopener external"
              title="GitHub SocialGouv/da-manager - nouvelle fenêtre"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
