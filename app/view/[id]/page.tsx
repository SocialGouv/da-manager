import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getFormById, checkFormAccess } from "@/lib/db/queries/forms";
import type { DAData } from "@/types/da.types";
import ReadonlyDA from "../_components/ReadonlyDA";
import ReadonlySidemenu from "../_components/ReadonlySidemenu";

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

  const form = await getFormById(id);
  if (!form) {
    redirect("/");
  }

  const access = await checkFormAccess(
    id,
    session.user.dbUserId,
    session.user.isAdmin,
  );

  const daData = form.data as DAData;
  const canEdit = access === "admin" || access === "editor";
  const projectName =
    daData.cadre1_ProjetActeurs?.nomDuProjet || "Document d'Architecture";

  return (
    <main id="content" className="fr-main" role="main">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <ReadonlySidemenu id={id} canEdit={canEdit} projectName={projectName} />
          <div className="content-editorial fr-col-12 fr-col-md-9 fr-mt-2w">
            <Link
              href="/"
              className="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mb-3w"
              style={{ display: "inline-block" }}
            >
              Retour à la liste des DA
            </Link>
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
