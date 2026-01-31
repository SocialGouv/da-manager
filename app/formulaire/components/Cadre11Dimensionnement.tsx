import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre11Dimensionnement({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h3 className="fr-h3">Justifications PDMA / DMIA / Performances</h3>

      <div className="fr-input-group">
        <label className="fr-label" htmlFor="pdma">
          Perte de Données Maximale Admissible (PDMA)
        </label>
        <textarea
          className="fr-input"
          id="pdma"
          rows={4}
          value={daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.perteDeDonneesMaximaleAdmissible}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsPDMA_DMIA_Performances: {
                  ...daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances,
                  perteDeDonneesMaximaleAdmissible: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <div className="fr-input-group">
        <label className="fr-label" htmlFor="dmia">
          Durée Maximale d'Interruption Admissible (DMIA)
        </label>
        <textarea
          className="fr-input"
          id="dmia"
          rows={4}
          value={daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.dureeMaximaleInterruptionAdmissible}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsPDMA_DMIA_Performances: {
                  ...daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances,
                  dureeMaximaleInterruptionAdmissible: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <div className="fr-input-group">
        <label className="fr-label" htmlFor="performances">
          Performances Applicatives
        </label>
        <textarea
          className="fr-input"
          id="performances"
          rows={4}
          value={daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.performancesApplicatives}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsPDMA_DMIA_Performances: {
                  ...daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances,
                  performancesApplicatives: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <h3 className="fr-h3 fr-mt-6w">Justifications Allocations Ressources Matérielles</h3>

      <div className="fr-input-group">
        <label className="fr-label" htmlFor="nombre-cpu">
          Nombre de CPU
        </label>
        <textarea
          className="fr-input"
          id="nombre-cpu"
          rows={4}
          placeholder="Justifiez le nombre de CPU alloués"
          value={daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.nombreCPU}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsAllocationsRessourcesMaterielles: {
                  ...daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles,
                  nombreCPU: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <div className="fr-input-group">
        <label className="fr-label" htmlFor="nombre-serveurs">
          Nombre de Serveurs
        </label>
        <textarea
          className="fr-input"
          id="nombre-serveurs"
          rows={4}
          placeholder="Justifiez le nombre de serveurs alloués"
          value={daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.nombreServeurs}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsAllocationsRessourcesMaterielles: {
                  ...daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles,
                  nombreServeurs: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <div className="fr-input-group">
        <label className="fr-label" htmlFor="details-calculs">
          Détails des Calculs
        </label>
        <textarea
          className="fr-input"
          id="details-calculs"
          rows={6}
          placeholder="Détaillez les calculs de dimensionnement"
          value={daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.detailsCalculs}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsAllocationsRessourcesMaterielles: {
                  ...daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles,
                  detailsCalculs: e.target.value,
                },
              },
            })
          }
        />
      </div>
    </div>
  );
}
