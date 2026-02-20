import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getVersionById } from "@/lib/db/queries/versions";
import type { DAData } from "@/types/da.types";
import ReadonlyDA from "../../../_components/ReadonlyDA";
import ReadonlySidemenu from "../../../_components/ReadonlySidemenu";

export default async function ViewVersion({
  params,
}: {
  params: Promise<{ id: string; versionId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    redirect("/");
  }

  const { id, versionId } = await params;

  const version = await getVersionById(versionId);
  if (!version || version.formId !== id) {
    redirect("/");
  }

  const daData = version.data as DAData;
  const projectName =
    daData.cadre1_ProjetActeurs?.nomDuProjet || "Document d'Architecture";

  return (
    <main id="content" className="fr-main" role="main">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <ReadonlySidemenu
            id={id}
            canEdit={false}
            projectName={projectName}
            pdfUrl={`/api/export-pdf/${id}/versions/${versionId}`}
          />
          <div className="content-editorial fr-col-12 fr-col-md-9 fr-mt-2w">
            <Link
              href="/"
              className="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mb-3w"
              style={{ display: "inline-block" }}
            >
              Retour à la liste des DA
            </Link>
            <div className="fr-callout fr-callout--brown-caramel fr-mb-3w">
              <p className="fr-callout__text">
                Version {version.name ? `« ${version.name} »` : `v${version.versionNumber}`}
                {" — "}
                {new Date(version.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <h1 className="fr-h1">{projectName}</h1>
            <ReadonlyDA daData={daData} />
          </div>
        </div>
      </div>
    </main>
  );
}
