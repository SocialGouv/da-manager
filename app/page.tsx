import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { getFormsForUser } from "@/lib/db/queries/forms";
import ProConnectLoginButton from "./_components/ProConnectLoginButton";

export default async function Home() {
  const session = await auth();

  const daList =
    session?.user?.dbUserId
      ? await getFormsForUser(session.user.dbUserId, session.user.isAdmin)
      : [];

  return (
    <>
      {/* Hero Section */}
      <div className="fr-container fr-py-12w">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
          <div className="fr-col-12 fr-col-md-6">
            <h1 className="fr-h1">Documents d&apos;Architecture</h1>
            <p className="fr-text--lead fr-mb-3w">
              Créez, éditez et exportez vos Documents d&apos;Architecture (DA)
              conformes aux standards de l&apos;État.
            </p>
            <p className="fr-text--sm fr-mb-5w">
              Structurez votre architecture SI en 12 cadres détaillés : projet,
              fonctionnalités, contraintes, exigences, architectures (acteurs,
              fonctionnelle, applicative, technique), serveurs, flux,
              dimensionnement et annexes.
            </p>

            {session?.user ? (
              session.user.isAdmin && (
                <Link href="/da/new" className="fr-btn fr-btn--lg">
                  <span className="fr-icon-add-line" aria-hidden="true"></span>
                  Créer un nouveau DA
                </Link>
              )
            ) : (
              <ProConnectLoginButton />
            )}
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <Image
              src="/hero-api.svg"
              alt="Illustration API"
              width={600}
              height={600}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Liste des DA - visible uniquement si connecté */}
      {session?.user && (
        <main className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12">
              {daList.length > 0 ? (
                <div>
                  <h2 className="fr-h2">Mes Documents d&apos;Architecture</h2>
                  <div className="fr-table fr-table--layout-fixed fr-table--no-caption">
                    <div className="fr-table__content">
                      <table>
                        <caption>
                          Liste des Documents d&apos;Architecture
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Nom du projet</th>
                            <th
                              scope="col"
                              className="fr-col--xs"
                              style={{ textAlign: "right" }}
                            >
                              Date de création
                            </th>
                            <th
                              scope="col"
                              className="fr-col--xs"
                              style={{ textAlign: "right" }}
                            >
                              Dernière modification
                            </th>
                            <th
                              scope="col"
                              className="fr-col--sm"
                              style={{ textAlign: "right" }}
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {daList.map((da) => (
                            <tr key={da.id}>
                              <td>
                                <strong>{da.nom}</strong>
                              </td>
                              <td
                                className="fr-col--xs"
                                style={{ textAlign: "right" }}
                              >
                                {new Date(da.createdAt).toLocaleDateString(
                                  "fr-FR",
                                )}
                              </td>
                              <td
                                className="fr-col--xs"
                                style={{ textAlign: "right" }}
                              >
                                {new Date(da.updatedAt).toLocaleDateString(
                                  "fr-FR",
                                )}
                              </td>
                              <td
                                className="fr-col--sm"
                                style={{ textAlign: "right" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Link
                                    href={`/da/${da.id}`}
                                    className="fr-btn fr-btn--sm"
                                  >
                                    <span
                                      className="fr-icon-edit-line"
                                      aria-hidden="true"
                                    ></span>
                                    Éditer
                                  </Link>
                                  <Link
                                    href={`/api/export-pdf/${da.id}`}
                                    target="_blank"
                                    className="fr-btn fr-btn--sm fr-btn--secondary"
                                  >
                                    <span
                                      className="fr-icon-download-line"
                                      aria-hidden="true"
                                    ></span>
                                    PDF
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="fr-callout fr-callout--info fr-mt-6w">
                  <p className="fr-callout__text">
                    {session.user.isAdmin
                      ? "Aucun document d'architecture trouvé. Créez votre premier DA !"
                      : "Aucun document d'architecture ne vous a été partagé pour le moment."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
