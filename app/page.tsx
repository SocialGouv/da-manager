import { promises as fs } from "fs";
import path from "path";
import Button from "@codegouvfr/react-dsfr/Button";
import Image from "next/image";
import { auth } from "@/auth";
import ProConnectLoginButton from "./components/ProConnectLoginButton";

interface DA {
  id: string;
  nom: string;
  dateCreation: string;
  dateModification: string;
}

async function getDAList(): Promise<DA[]> {
  try {
    const filePath = path.join(process.cwd(), "public/da/index.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Erreur lors du chargement de la liste des DA:", error);
    return [];
  }
}

export default async function Home() {
  const session = await auth();
  const daList = session?.user ? await getDAList() : [];

  return (
    <>
      {/* Hero Section */}
      <div className="fr-container fr-py-12w">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
          <div className="fr-col-12 fr-col-md-6">
            <h1 className="fr-h1">Documents d&apos;Architecture</h1>
            <p className="fr-text--lead fr-mb-3w">
              Créez, éditez et exportez vos Documents d&apos;Architecture (DA) conformes aux standards de l&apos;État.
            </p>
            <p className="fr-text--sm fr-mb-5w">
              Structurez votre architecture SI en 12 cadres détaillés : projet, fonctionnalités, contraintes, exigences,
              architectures (acteurs, fonctionnelle, applicative, technique), serveurs, flux, dimensionnement et annexes.
            </p>

            {session?.user ? (
              <Button
                linkProps={{ href: "/formulaire/new" }}
                size="large"
                iconId="fr-icon-add-line"
                iconPosition="left"
              >
                Créer un nouveau DA
              </Button>
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
              style={{ width: '100%', height: 'auto' }}
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
                        <caption>Liste des Documents d&apos;Architecture</caption>
                        <thead>
                          <tr>
                            <th scope="col">Nom du projet</th>
                            <th scope="col" className="fr-col--xs" style={{ textAlign: 'right' }}>Date de création</th>
                            <th scope="col" className="fr-col--xs" style={{ textAlign: 'right' }}>Dernière modification</th>
                            <th scope="col" className="fr-col--sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {daList.map((da) => (
                            <tr key={da.id}>
                              <td><strong>{da.nom}</strong></td>
                              <td className="fr-col--xs" style={{ textAlign: 'right' }}>{new Date(da.dateCreation).toLocaleDateString("fr-FR")}</td>
                              <td className="fr-col--xs" style={{ textAlign: 'right' }}>{new Date(da.dateModification).toLocaleDateString("fr-FR")}</td>
                              <td className="fr-col--sm">
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <Button
                                    linkProps={{ href: `/formulaire/${da.id}` }}
                                    size="small"
                                    iconId="fr-icon-edit-line"
                                    iconPosition="left"
                                  >
                                    Éditer
                                  </Button>
                                  <Button
                                    linkProps={{ href: `/api/export-pdf/${da.id}`, target: "_blank" }}
                                    size="small"
                                    priority="secondary"
                                    iconId="fr-icon-download-line"
                                    iconPosition="left"
                                  >
                                    PDF
                                  </Button>
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
                    Aucun document d&apos;architecture trouvé. Créez votre premier DA !
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
