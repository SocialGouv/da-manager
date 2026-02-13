import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getFormById, checkFormAccess } from "@/lib/db/queries/forms";
import type { DAData } from "@/types/da.types";
import ReadonlyDA from "../_components/ReadonlyDA";

const sections = [
  { id: 1, title: "Projet - Acteurs" },
  { id: 2, title: "Fonctionnalités - Données" },
  { id: 3, title: "Contraintes - Volumétrie" },
  { id: 4, title: "Exigences Contextuelles" },
  { id: 5, title: "Architecture Acteurs" },
  { id: 6, title: "Architecture Fonctionnelle" },
  { id: 7, title: "Architecture Applicative" },
  { id: 8, title: "Architecture Technique" },
  { id: 9, title: "Serveurs & Composants" },
  { id: 10, title: "Matrices Flux" },
  { id: 11, title: "Dimensionnement" },
  { id: 12, title: "URLs" },
];

export default async function ViewDA({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    redirect("/");
  }

  const { id } = await params;

  const access = await checkFormAccess(
    id,
    session.user.dbUserId,
    session.user.isAdmin,
  );
  if (!access) {
    redirect("/");
  }

  const form = await getFormById(id);
  if (!form) {
    redirect("/");
  }

  const daData = form.data as DAData;
  const canEdit = access === "admin" || access === "editor";
  const projectName =
    daData.cadre1_ProjetActeurs?.nomDuProjet || "Document d'Architecture";

  return (
    <main id="content" className="fr-main" role="main">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-3">
            <nav
              className="fr-sidemenu fr-sidemenu--sticky-full-height"
              role="navigation"
              aria-labelledby="sidemenu-title"
            >
              <div className="fr-sidemenu__inner">
                <ul className="fr-btns-group fr-mt-2w">
                  <li>
                    <Link href="/" className="fr-btn fr-btn--sm">
                      <span
                        className="fr-icon-arrow-left-line"
                        aria-hidden="true"
                      ></span>
                      Retour
                    </Link>
                  </li>
                  {canEdit && (
                    <li>
                      <Link
                        href={`/da/${id}`}
                        className="fr-btn fr-btn--sm fr-btn--secondary"
                      >
                        <span
                          className="fr-icon-edit-line"
                          aria-hidden="true"
                        ></span>
                        Éditer
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href={`/api/export-pdf/${id}`}
                      target="_blank"
                      className="fr-btn fr-btn--sm fr-btn--tertiary"
                    >
                      <span
                        className="fr-icon-download-line"
                        aria-hidden="true"
                      ></span>
                      PDF
                    </Link>
                  </li>
                </ul>
                <button
                  aria-expanded="false"
                  aria-controls="sidemenu-collapse-view"
                  type="button"
                  className="fr-sidemenu__btn"
                >
                  Sommaire
                </button>
                <div className="fr-collapse" id="sidemenu-collapse-view">
                  <p
                    className="fr-sidemenu__title fr-mb-1w"
                    id="sidemenu-title"
                  >
                    {projectName}
                  </p>
                  <ul className="fr-sidemenu__list">
                    {sections.map((section) => (
                      <li className="fr-sidemenu__item" key={section.id}>
                        <a
                          className="fr-sidemenu__link"
                          href={`#cadre-${section.id}`}
                        >
                          {section.id}. {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="content-editorial fr-col-12 fr-col-md-9 fr-mt-2w">
            <h1 className="fr-h1">{projectName}</h1>
            <p className="fr-text--sm fr-mb-4w" style={{ color: "#666" }}>
              Dernière modification :{" "}
              {new Date(form.updatedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <ReadonlyDA daData={daData} />
          </div>
        </div>
      </div>
    </main>
  );
}
