import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité — Formulaire DA",
  description:
    "Déclaration d'accessibilité du formulaire de Document d'Architecture (DA) — Fabrique Numérique des ministères sociaux",
};

export default function DeclarationAccessibilite() {
  return (
    <main className="fr-container fr-my-6w">
      <div className="fr-grid-row fr-grid-row--gutters">
        {/* Colonne de navigation latérale */}
        <nav
          className="fr-col-12 fr-col-md-3"
          aria-label="Sommaire de la déclaration"
          role="navigation"
        >
          <div
            className="fr-sidemenu fr-sidemenu--sticky-full-height"
            aria-label="Sommaire"
          >
            <div className="fr-sidemenu__inner">
              <div className="fr-collapse" id="fr-sidemenu-wrapper">
                <p className="fr-sidemenu__title" aria-hidden="true">
                  Sommaire
                </p>
                <ul className="fr-sidemenu__list">
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#etat-de-conformite"
                      aria-current="false"
                    >
                      État de conformité
                    </a>
                  </li>
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#contenus-non-accessibles"
                    >
                      Contenus non accessibles
                    </a>
                  </li>
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#amelioration"
                    >
                      Démarche d&apos;amélioration
                    </a>
                  </li>
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#etablissement"
                    >
                      Établissement de la déclaration
                    </a>
                  </li>
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#technologies"
                    >
                      Technologies utilisées
                    </a>
                  </li>
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#environnement-test"
                    >
                      Environnement de test
                    </a>
                  </li>
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#contact"
                    >
                      Contact et retour d&apos;information
                    </a>
                  </li>
                  <li className="fr-sidemenu__item">
                    <a
                      className="fr-sidemenu__link"
                      href="#voies-de-recours"
                    >
                      Voies de recours
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <div className="fr-col-12 fr-col-md-9">
          <h1>Déclaration d&apos;accessibilité</h1>
          <p className="fr-text--lg">
            La Fabrique Numérique des ministères sociaux s&apos;engage à rendre
            son service accessible conformément à l&apos;article 47 de la loi
            n°2005-102 du 11 février 2005.
          </p>
          <p>
            Cette déclaration d&apos;accessibilité s&apos;applique au{" "}
            <strong>Formulaire DA — Document d&apos;Architecture</strong>.
          </p>

          {/* État de conformité */}
          <section id="etat-de-conformite" className="fr-mt-6w">
            <h2>État de conformité</h2>
            <div className="fr-callout fr-icon-information-line">
              <p className="fr-callout__title">
                Formulaire DA — Document d&apos;Architecture
              </p>
              <p className="fr-callout__text">
                Le{" "}
                <strong>Formulaire DA — Document d&apos;Architecture</strong>{" "}
                est <strong>non conforme</strong> avec le référentiel général
                d&apos;amélioration de l&apos;accessibilité (RGAA version 4.1).
              </p>
              <p className="fr-callout__text">
                <span className="fr-badge fr-badge--error fr-badge--no-icon">
                  Non conforme
                </span>
              </p>
            </div>
            <p className="fr-mt-2w">
              Cette non-conformité signifie que certaines pages du site web
              n&apos;ont pas encore fait l&apos;objet d&apos;un audit
              d&apos;accessibilité ou que des non-conformités identifiées
              n&apos;ont pas encore été corrigées.
            </p>
            <p>
              L&apos;outil est actuellement en cours de développement.
              L&apos;accessibilité numérique est prise en compte dès
              maintenant, notamment via l&apos;utilisation du{" "}
              <a
                href="https://www.systeme-de-design.gouv.fr/"
                target="_blank"
                rel="noopener external"
                title="Système de Design de l'État - nouvelle fenêtre"
              >
                Système de Design de l&apos;État (DSFR)
              </a>
              , qui intègre nativement des composants accessibles.
            </p>
          </section>

          {/* Contenus non accessibles */}
          <section id="contenus-non-accessibles" className="fr-mt-6w">
            <h2>Contenus non accessibles</h2>
            <p>
              Les contenus listés ci-dessous ne sont pas accessibles pour les
              raisons suivantes.
            </p>

            <h3 className="fr-mt-3w">Non-conformités</h3>
            <ul>
              <li>
                L&apos;application n&apos;a pas encore fait l&apos;objet
                d&apos;un audit d&apos;accessibilité complet selon le RGAA
                4.1.
              </li>
              <li>
                Certaines interactions complexes (éditeur de schémas
                Excalidraw) peuvent présenter des difficultés pour les
                utilisateurs de technologies d&apos;assistance.
              </li>
              <li>
                Les formulaires multi-étapes peuvent ne pas être entièrement
                navigables au clavier.
              </li>
            </ul>

            <h3 className="fr-mt-3w">Dérogations pour charge disproportionnée</h3>
            <p>
              Aucune dérogation pour charge disproportionnée n&apos;est
              invoquée à ce stade.
            </p>

            <h3 className="fr-mt-3w">
              Contenus non soumis à l&apos;obligation d&apos;accessibilité
            </h3>
            <ul>
              <li>
                Les schémas d&apos;architecture produits avec l&apos;éditeur
                Excalidraw sont des contenus graphiques dont l&apos;accessibilité
                complète relève d&apos;une contrainte technique liée à
                l&apos;outil tiers intégré.
              </li>
              <li>
                Les exports PDF générés automatiquement à partir des formulaires
                peuvent présenter des limitations d&apos;accessibilité inhérentes
                au format.
              </li>
            </ul>
          </section>

          {/* Démarche d'amélioration */}
          <section id="amelioration" className="fr-mt-6w">
            <h2>Démarche d&apos;amélioration</h2>
            <p>
              La Fabrique Numérique des ministères sociaux s&apos;engage à
              améliorer progressivement l&apos;accessibilité de cet outil.
            </p>
            <p>Les actions prévues sont les suivantes :</p>
            <ul>
              <li>
                Réalisation d&apos;un audit de conformité RGAA 4.1 dès que
                l&apos;outil sera suffisamment stable.
              </li>
              <li>
                Correction des non-conformités identifiées, par ordre de
                priorité selon leur impact sur les utilisateurs.
              </li>
              <li>
                Amélioration de la navigation au clavier dans les formulaires
                multi-étapes.
              </li>
              <li>
                Ajout de descriptions alternatives pour les contenus visuels.
              </li>
            </ul>
          </section>

          {/* Établissement de la déclaration */}
          <section id="etablissement" className="fr-mt-6w">
            <h2>Établissement de cette déclaration</h2>
            <p>
              Cette déclaration a été établie le{" "}
              <time dateTime="2025-01-01">1er janvier 2025</time>.
            </p>

            <h3 className="fr-mt-3w">Technologies utilisées pour la réalisation des tests</h3>
            <p>
              Aucun audit formel n&apos;a été réalisé à ce jour. L&apos;évaluation
              repose sur une auto-évaluation partielle utilisant les outils
              suivants.
            </p>

            <h3 className="fr-mt-3w">Mise à jour</h3>
            <p>
              Cette déclaration sera mise à jour à chaque évolution significative
              du service ou à l&apos;issue d&apos;un audit d&apos;accessibilité.
            </p>
          </section>

          {/* Technologies utilisées */}
          <section id="technologies" className="fr-mt-6w">
            <h2>Technologies utilisées</h2>
            <p>
              L&apos;accessibilité du Formulaire DA s&apos;appuie sur les
              technologies suivantes :
            </p>
            <ul>
              <li>HTML5</li>
              <li>CSS</li>
              <li>
                JavaScript (framework React / Next.js)
              </li>
              <li>
                Système de Design de l&apos;État (DSFR) — version 1.x
              </li>
            </ul>
          </section>

          {/* Environnement de test */}
          <section id="environnement-test" className="fr-mt-6w">
            <h2>Environnement de test</h2>
            <p>
              L&apos;auto-évaluation de l&apos;accessibilité a été réalisée
              dans l&apos;environnement de test suivant :
            </p>
            <div className="fr-table fr-table--bordered fr-mt-2w">
              <div className="fr-table__wrapper">
                <div className="fr-table__container">
                  <div className="fr-table__content">
                    <table>
                      <caption>
                        Environnements et technologies utilisés lors des tests
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Système d&apos;exploitation</th>
                          <th scope="col">Navigateur</th>
                          <th scope="col">Technologie d&apos;assistance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Windows 11</td>
                          <td>Google Chrome (dernière version)</td>
                          <td>Sans technologie d&apos;assistance</td>
                        </tr>
                        <tr>
                          <td>macOS Sequoia</td>
                          <td>Safari (dernière version)</td>
                          <td>Sans technologie d&apos;assistance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact et retour d'information */}
          <section id="contact" className="fr-mt-6w">
            <h2>Contact et retour d&apos;information</h2>
            <p>
              Si vous n&apos;arrivez pas à accéder à un contenu ou à un
              service, vous pouvez contacter le responsable du Formulaire DA
              pour être orienté vers une alternative accessible ou obtenir le
              contenu sous une autre forme.
            </p>

            <div className="fr-callout fr-mt-2w">
              <p className="fr-callout__title">Contacter l&apos;équipe</p>
              <p className="fr-callout__text">
                Pour toute question relative à l&apos;accessibilité de cet
                outil, vous pouvez contacter la{" "}
                <strong>Fabrique Numérique des ministères sociaux</strong>.
              </p>
              <p className="fr-callout__text">
                Envoyez votre demande via le{" "}
                <a
                  href="https://github.com/SocialGouv/da-manager/issues"
                  target="_blank"
                  rel="noopener external"
                  title="Dépôt GitHub du projet - nouvelle fenêtre"
                >
                  dépôt GitHub du projet
                </a>
                .
              </p>
            </div>

            <p className="fr-mt-3w">
              Nous nous engageons à vous répondre dans un délai raisonnable.
            </p>
          </section>

          {/* Voies de recours */}
          <section id="voies-de-recours" className="fr-mt-6w fr-mb-6w">
            <h2>Voies de recours</h2>
            <p>
              Si vous constatez un défaut d&apos;accessibilité vous empêchant
              d&apos;accéder à un contenu ou une fonctionnalité du site, que
              vous nous le signalez et que vous ne parvenez pas à obtenir une
              réponse de notre part, vous êtes en droit de faire parvenir vos
              doléances ou une demande de saisine au Défenseur des droits.
            </p>
            <p>Plusieurs moyens sont à votre disposition :</p>
            <ul>
              <li>
                <a
                  href="https://formulaire.defenseurdesdroits.fr/"
                  target="_blank"
                  rel="noopener external"
                  title="Formulaire en ligne - Défenseur des droits - nouvelle fenêtre"
                >
                  Formulaire en ligne
                </a>
              </li>
              <li>
                Appeler le{" "}
                <a href="tel:+33969390000">09 69 39 00 00</a> (du lundi au
                vendredi de 9h à 19h)
              </li>
              <li>
                Envoyer un courrier postal (gratuit, sans affranchissement) :
                <br />
                <address className="fr-mt-1w">
                  Défenseur des droits
                  <br />
                  Libre réponse 71120
                  <br />
                  75342 Paris CEDEX 07
                </address>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
