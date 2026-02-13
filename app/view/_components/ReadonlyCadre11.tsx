import type { DAData } from "@/types/da.types";

interface ReadonlyCadreProps {
  daData: DAData;
}

export default function ReadonlyCadre11({ daData }: ReadonlyCadreProps) {
  const justifications =
    daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances;
  const ressources =
    daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.filter(
      (r) => r.nom.trim() !== ""
    );

  return (
    <div>
      <h3 className="fr-h3">Justifications PDMA / DMIA / Performances</h3>

      <div className="fr-mb-4w">
        <p className="fr-text--bold fr-text--sm fr-mb-0">
          Perte de données maximale admissible (PDMA)
        </p>
        <p className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
          {justifications.perteDeDonneesMaximaleAdmissible || "—"}
        </p>
      </div>

      <div className="fr-mb-4w">
        <p className="fr-text--bold fr-text--sm fr-mb-0">
          Durée maximale d{"'"}interruption admissible (DMIA)
        </p>
        <p className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
          {justifications.dureeMaximaleInterruptionAdmissible || "—"}
        </p>
      </div>

      <div className="fr-mb-4w">
        <p className="fr-text--bold fr-text--sm fr-mb-0">
          Performances applicatives
        </p>
        <p className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
          {justifications.performancesApplicatives || "—"}
        </p>
      </div>

      <h3 className="fr-h3 fr-mt-6w">
        Justifications des allocations de ressources matérielles
      </h3>

      {ressources.length === 0 ? (
        <div className="fr-callout">
          <p className="fr-callout__text">Aucune ressource définie</p>
        </div>
      ) : (
        <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered">
          <div className="fr-table__wrapper">
            <div className="fr-table__container">
              <div className="fr-table__content">
                <table>
                  <caption>
                    Justifications des allocations de ressources matérielles
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">Détails / Hypothèses</th>
                      <th scope="col">Nombre CPU</th>
                      <th scope="col">Nombre Serveurs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ressources.map((r, index) => (
                      <tr key={index}>
                        <td>{r.nom}</td>
                        <td>{r.detailsHypotheses}</td>
                        <td>{r.nombreCPU}</td>
                        <td>{r.nombreServeurs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
