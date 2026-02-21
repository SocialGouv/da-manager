import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité - Documents d'Architecture",
  description:
    "Déclaration d'accessibilité du service Documents d'Architecture (DA Manager)",
};

export default function DeclarationAccessibilitePage() {
  return (
    <main role="main" id="content">
      <div className="fr-container fr-py-6w">
        {/* Breadcrumb */}
        <nav role="navigation" aria-label="Fil d'Ariane" className="fr-breadcrumb">
          <button
            className="fr-breadcrumb__button"
            aria-expanded="false"
            aria-controls="breadcrumb-transcription"
          >
            Voir le fil d&apos;Ariane
          </button>
          <div className="fr-collapse" id="breadcrumb-transcription">
            <ol className="fr-breadcrumb__list">
              <li>
                <Link className="fr-breadcrumb__link" href="/">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  className="fr-breadcrumb__link"
                  aria-current="page"
                  href="/declaration-accessibilite"
                >
                  Déclaration d&apos;accessibilité
                </Link>
              </li>
            </ol>
          </div>
        </nav>

        <div className="fr-grid-row fr-grid-row--gutters fr-mt-4w">
          {/* Sidebar navigation */}
          <div className="fr-col-12 fr-col-md-3">
            <nav
              className="fr-sidemenu fr-sidemenu--sticky"
              aria-labelledby="sidemenu-title"
            >
              <div className="fr-sidemenu__inner">
                <button
                  className="fr-sidemenu__btn"
                  aria-controls="sidemenu-wrapper"
                  aria-expanded="false"
                >
                  Dans cette page
                </button>
                <div className="fr-collapse" id="sidemenu-wrapper">
                  <div
                    className="fr-sidemenu__title"
                    id="sidemenu-title"
                  >
                    Sommaire
                  </div>
                  <ul className="fr-sidemenu__list">
                    <li className="fr-sidemenu__item fr-sidemenu__item--active">
                      <a
                        className="fr-sidemenu__link"
                        href="#etat-conformite"
                        aria-current="page"
                      >
                        État de conformité
                      </a>
                    </li>
                    <li className="fr-sidemenu__item">
                      <a
                        className="fr-sidemenu__link"
                        href="#perimetre"
                      >
                        Périmètre du service
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
                        Contact et recours
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          {/* Main content */}
          <div className="fr-col-12 fr-col-md-9">
            <h1>Déclaration d&apos;accessibilité</h1>

            <p className="fr-text--lead">
              La Direction du Numérique des Ministères Sociaux s&apos;engage à rendre son
              service <strong>Documents d&apos;Architecture (DA Manager)</strong> accessible,
              conformément à l&apos;article 47 de la loi n° 2005-102 du 11 février 2005.
            </p>

            <p>
              Cette déclaration d&apos;accessibilité s&apos;applique au service{" "}
              <strong>Documents d&apos;Architecture</strong>.
            </p>

            {/* État de conformité */}
            <section aria-labelledby="etat-conformite">
              <h2 id="etat-conformite">État de conformité</h2>

              <div className="fr-callout fr-callout--orange-terre-battue fr-icon-warning-fill">
                <h3 className="fr-callout__title">Non conforme</h3>
                <p className="fr-callout__text">
                  Le service <strong>Documents d&apos;Architecture</strong> est{" "}
                  <strong>non conforme</strong> avec le référentiel général
                  d&apos;amélioration de l&apos;accessibilité (RGAA) version 4.1. Le site
                  n&apos;a pas encore fait l&apos;objet d&apos;un audit d&apos;accessibilité.
                </p>
              </div>

              <p className="fr-mt-3w">
                Cette déclaration a été établie le <strong>21 février 2026</strong>.
              </p>
            </section>

            {/* Périmètre du service */}
            <section aria-labelledby="perimetre" className="fr-mt-6w">
              <h2 id="perimetre">Périmètre du service</h2>

              <p>
                Le service <strong>Documents d&apos;Architecture (DA Manager)</strong> est
                un outil interne destiné aux équipes techniques des ministères pour la
                création, l&apos;édition et l&apos;export de Documents d&apos;Architecture.
                Il s&apos;agit d&apos;un outil à usage professionnel, utilisé exclusivement sur
                des postes de travail de bureau.
              </p>

              <p>Les pages suivantes sont dans le périmètre de cette déclaration :</p>

              <div className="fr-table fr-table--multiline fr-table--no-caption">
                <div className="fr-table__wrapper">
                  <div className="fr-table__container">
                    <div className="fr-table__content">
                      <table>
                        <caption>Pages du service DA Manager</caption>
                        <thead>
                          <tr>
                            <th scope="col">Page</th>
                            <th scope="col">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Accueil</td>
                            <td>Liste des Documents d&apos;Architecture</td>
                          </tr>
                          <tr>
                            <td>Éditeur de DA</td>
                            <td>
                              Formulaire en 12 étapes pour créer et modifier un
                              Document d&apos;Architecture
                            </td>
                          </tr>
                          <tr>
                            <td>Consultation d&apos;un DA</td>
                            <td>Vue en lecture seule d&apos;un Document d&apos;Architecture</td>
                          </tr>
                          <tr>
                            <td>Gestion des versions</td>
                            <td>
                              Historique et gestion des versions d&apos;un DA
                            </td>
                          </tr>
                          <tr>
                            <td>Journal des modifications</td>
                            <td>Suivi des modifications d&apos;un DA</td>
                          </tr>
                          <tr>
                            <td>Gestion des accès</td>
                            <td>
                              Partage et gestion des droits d&apos;accès à un DA
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contenus non accessibles */}
            <section aria-labelledby="contenus-non-accessibles" className="fr-mt-6w">
              <h2 id="contenus-non-accessibles">Contenus non accessibles</h2>

              <p>
                En l&apos;absence d&apos;audit, les non-conformités identifiées lors du
                développement sont listées ci-dessous à titre indicatif.
              </p>

              <h3>Non-conformités identifiées</h3>
              <ul>
                <li>
                  <strong>Éditeur de schémas Excalidraw</strong> : L&apos;éditeur de
                  diagrammes d&apos;architecture intégré (cadres 5, 6, 7, 8 et 10) n&apos;est
                  pas pleinement accessible aux technologies d&apos;assistance. L&apos;accès
                  au dessin de schémas techniques est limité pour les utilisateurs de
                  lecteurs d&apos;écran.
                </li>
                <li>
                  <strong>Navigation au clavier</strong> : Certaines interactions dans
                  les formulaires complexes (matrices de flux, tableaux de serveurs)
                  peuvent nécessiter l&apos;utilisation d&apos;une souris.
                </li>
                <li>
                  <strong>Contrastes</strong> : Des vérifications de contraste sur
                  l&apos;ensemble des états visuels n&apos;ont pas été réalisées de manière
                  exhaustive.
                </li>
                <li>
                  <strong>Export PDF</strong> : Le PDF généré n&apos;est pas un document
                  PDF accessible (pas de balises de structure, pas de texte
                  alternatif pour les schémas).
                </li>
              </ul>

              <h3>Dérogations pour charge disproportionnée</h3>
              <p>
                L&apos;éditeur de diagrammes techniques (Excalidraw) est un composant
                tiers. Sa mise en accessibilité complète représenterait une charge de
                travail disproportionnée au regard de l&apos;usage professionnel et du
                contexte d&apos;utilisation (outil interne, non ouvert au grand public).
              </p>

              <h3>Contenus non soumis à l&apos;obligation d&apos;accessibilité</h3>
              <p>
                Les schémas d&apos;architecture exportés au format PNG et intégrés dans les
                documents PDF sont des contenus graphiques dont la description textuelle
                exhaustive est techniquement difficile à automatiser dans le cadre d&apos;un
                outil de modélisation.
              </p>
            </section>

            {/* Technologies utilisées */}
            <section aria-labelledby="technologies" className="fr-mt-6w">
              <h2 id="technologies">Technologies utilisées</h2>

              <p>
                L&apos;accessibilité de ce service s&apos;appuie sur les technologies suivantes :
              </p>

              <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript (ES2020+)</li>
                <li>
                  DSFR (Système de Design de l&apos;État français) — version 1.x
                </li>
                <li>WAI-ARIA 1.2</li>
              </ul>
            </section>

            {/* Environnement de test */}
            <section aria-labelledby="environnement-test" className="fr-mt-6w">
              <h2 id="environnement-test">Environnement de test</h2>

              <p>
                Aucun audit formel n&apos;a été réalisé à ce jour. Le service est testé
                manuellement lors du développement dans l&apos;environnement suivant :
              </p>

              <div className="fr-table fr-table--multiline fr-table--no-caption">
                <div className="fr-table__wrapper">
                  <div className="fr-table__container">
                    <div className="fr-table__content">
                      <table>
                        <caption>Environnement de test</caption>
                        <thead>
                          <tr>
                            <th scope="col">Composant</th>
                            <th scope="col">Version / Détail</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Navigateur</td>
                            <td>Google Chrome (dernière version stable)</td>
                          </tr>
                          <tr>
                            <td>Système d&apos;exploitation</td>
                            <td>macOS, Windows 11</td>
                          </tr>
                          <tr>
                            <td>Résolution</td>
                            <td>1280×800 minimum (outil desktop uniquement)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fr-notice fr-notice--info fr-mt-4w">
                <div className="fr-container">
                  <div className="fr-notice__body">
                    <p>
                      <span className="fr-notice__title">
                        Outil à usage interne uniquement
                      </span>
                      <span className="fr-notice__desc">
                        Ce service est exclusivement destiné aux agents de la
                        Direction du Numérique des Ministères Sociaux. Il n&apos;est
                        pas ouvert au grand public.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact et recours */}
            <section aria-labelledby="contact" className="fr-mt-6w">
              <h2 id="contact">Contact et voies de recours</h2>

              <h3>Retour d&apos;information et contact</h3>

              <p>
                Si vous constatez un manque d&apos;accessibilité nous empêchant d&apos;accéder
                à un contenu ou à une fonctionnalité du site, vous pouvez nous
                contacter pour être orienté vers une alternative accessible ou obtenir
                le contenu sous une autre forme.
              </p>

              <div className="fr-callout fr-mt-3w">
                <h4 className="fr-callout__title">Nous contacter</h4>
                <p className="fr-callout__text">
                  Pour signaler un problème d&apos;accessibilité ou demander une
                  assistance, contactez l&apos;équipe de développement via les canaux
                  internes de votre organisation (référent numérique, équipe DSI).
                </p>
              </div>

              <h3 className="fr-mt-4w">Voies de recours</h3>

              <p>
                Cette procédure est à utiliser dans le cas suivant : vous avez
                signalé au responsable du site internet un défaut d&apos;accessibilité
                qui vous empêche d&apos;accéder à un contenu ou à un des services du
                portail et vous n&apos;avez pas obtenu de réponse satisfaisante.
              </p>

              <ul>
                <li>
                  Écrire un message au{" "}
                  <a
                    href="https://formulaire.defenseurdesdroits.fr/"
                    target="_blank"
                    rel="noopener external"
                    title="Défenseur des droits - nouvelle fenêtre"
                  >
                    Défenseur des droits
                  </a>
                </li>
                <li>
                  Contacter le{" "}
                  <a
                    href="https://www.defenseurdesdroits.fr/saisir/delegues"
                    target="_blank"
                    rel="noopener external"
                    title="Délégué du Défenseur des droits dans votre région - nouvelle fenêtre"
                  >
                    délégué du Défenseur des droits dans votre région
                  </a>
                </li>
                <li>
                  Envoyer un courrier par la poste (gratuit, ne pas mettre de
                  timbre) :<br />
                  <address className="fr-mt-1w" style={{ fontStyle: "normal" }}>
                    Défenseur des droits
                    <br />
                    Libre réponse 71120
                    <br />
                    75342 Paris CEDEX 07
                  </address>
                </li>
              </ul>
            </section>

            <hr className="fr-mt-6w" />
            <p className="fr-text--sm fr-text--mention">
              Déclaration mise à jour le 21 février 2026. Cette déclaration sera
              actualisée à l&apos;issue de la réalisation d&apos;un audit d&apos;accessibilité.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
