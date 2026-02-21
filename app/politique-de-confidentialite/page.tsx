import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Documents d'Architecture",
};

export default function PolitiqueDeConfidentialite() {
  return (
    <main className="fr-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <h1>Politique de confidentialité</h1>

          <h2>Qui est responsable du traitement des données&nbsp;?</h2>
          <p>
            Le gestionnaire de Documents d&apos;Architecture (DA Manager) est
            développé au sein de la Fabrique numérique des ministères sociaux.
          </p>
          <p>
            Le responsable du traitement des données est le Ministère du Travail,
            de la Santé et des Solidarités.
          </p>

          <h2>Quelles sont les données que nous traitons&nbsp;?</h2>
          <p>
            Dans le cadre de l&apos;utilisation du DA Manager, nous traitons les
            données suivantes&nbsp;:
          </p>
          <ul>
            <li>
              <strong>Données d&apos;identification</strong>&nbsp;: nom, prénom,
              adresse électronique professionnelle
            </li>
            <li>
              <strong>Données de connexion</strong>&nbsp;: identifiants de session,
              logs d&apos;accès, date et heure de connexion
            </li>
            <li>
              <strong>Données liées aux Documents d&apos;Architecture</strong>&nbsp;:
              contenus saisis dans les formulaires, schémas d&apos;architecture,
              historique des modifications
            </li>
          </ul>

          <h2>Qu&apos;est-ce qui nous autorise à traiter ces données&nbsp;?</h2>
          <p>
            Le traitement des données à caractère personnel est fondé sur
            l&apos;article 6.1.e du Règlement général sur la protection des données
            (RGPD), relatif à l&apos;exécution d&apos;une mission d&apos;intérêt
            public ou relevant de l&apos;exercice de l&apos;autorité publique.
          </p>
          <p>
            Le DA Manager est un outil interne destiné aux agents de l&apos;État
            pour la rédaction et le suivi de Documents d&apos;Architecture dans le
            cadre de leurs missions.
          </p>

          <h2>Pendant combien de temps conservons-nous vos données&nbsp;?</h2>
          <table className="fr-table">
            <thead>
              <tr>
                <th>Type de données</th>
                <th>Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Données de connexion (logs techniques)</td>
                <td>12 mois</td>
              </tr>
              <tr>
                <td>Données de compte utilisateur</td>
                <td>Jusqu&apos;à la suppression du compte ou la fin de la mission</td>
              </tr>
              <tr>
                <td>Documents d&apos;Architecture</td>
                <td>Durée de vie du projet documenté</td>
              </tr>
            </tbody>
          </table>

          <h2>Quels droits avez-vous&nbsp;?</h2>
          <p>Vous disposez des droits suivants concernant vos données personnelles&nbsp;:</p>
          <ul>
            <li>Droit d&apos;information et droit d&apos;accès aux données</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d&apos;opposition au traitement des données</li>
          </ul>
          <p>
            Pour exercer ces droits ou pour toute question sur le traitement de vos
            données dans ce dispositif, vous pouvez contacter le délégué à la
            protection des données (DPD) du Ministère du Travail, de la Santé et
            des Solidarités&nbsp;:
          </p>
          <ul>
            <li>
              Par voie électronique&nbsp;:{" "}
              <a href="mailto:dpd-mts@sg.social.gouv.fr">
                dpd-mts@sg.social.gouv.fr
              </a>
            </li>
            <li>
              Par voie postale&nbsp;: Ministère du Travail, de la Santé et des
              Solidarités — Délégué à la Protection des Données — 14 avenue Duquesne,
              75350 Paris 07 SP
            </li>
          </ul>
          <p>
            Si vous estimez, après nous avoir contacté, que vos droits ne sont pas
            respectés, vous pouvez adresser une réclamation à la CNIL&nbsp;:{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener external"
              title="www.cnil.fr - nouvelle fenêtre"
            >
              www.cnil.fr
            </a>
            .
          </p>

          <h2>Qui peut accéder à vos données&nbsp;?</h2>
          <p>
            Les données sont accessibles aux seules personnes habilitées dans le
            cadre de leurs missions&nbsp;:
          </p>
          <ul>
            <li>
              Les agents disposant d&apos;un accès à l&apos;application selon les
              droits qui leur ont été accordés (administrateur, éditeur, lecteur)
            </li>
            <li>
              Les équipes techniques chargées de la maintenance et du développement
              de l&apos;application
            </li>
          </ul>
          <p>
            Les données ne sont pas transmises à des tiers en dehors du périmètre
            ministériel.
          </p>

          <h2>Cookies</h2>
          <p>
            Le DA Manager utilise uniquement des cookies strictement nécessaires au
            fonctionnement de l&apos;application (gestion de session
            d&apos;authentification). Ces cookies ne nécessitent pas de consentement
            préalable conformément à la recommandation de la CNIL.
          </p>
          <p>Aucun cookie de traçage ou de mesure d&apos;audience n&apos;est utilisé.</p>
        </div>
      </div>
    </main>
  );
}
