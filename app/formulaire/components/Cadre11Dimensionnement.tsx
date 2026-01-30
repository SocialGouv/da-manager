import { Input } from "@codegouvfr/react-dsfr/Input";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre11Dimensionnement({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 11 : Dimensionnement du SI Applicatif</h2>

      <h3 className="fr-h3">Justifications PDMA / DMIA / Performances</h3>

      <Input
        label="Perte de Données Maximale Admissible (PDMA)"
        textArea
        nativeTextAreaProps={{
          id: "pdma",
          rows: 4,
          value: daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.perteDeDonneesMaximaleAdmissible,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsPDMA_DMIA_Performances: {
                  ...daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances,
                  perteDeDonneesMaximaleAdmissible: e.target.value,
                },
              },
            }),
        }}
      />

      <Input
        label="Durée Maximale d'Interruption Admissible (DMIA)"
        textArea
        nativeTextAreaProps={{
          id: "dmia",
          rows: 4,
          value: daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.dureeMaximaleInterruptionAdmissible,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsPDMA_DMIA_Performances: {
                  ...daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances,
                  dureeMaximaleInterruptionAdmissible: e.target.value,
                },
              },
            }),
        }}
      />

      <Input
        label="Performances Applicatives"
        textArea
        nativeTextAreaProps={{
          id: "performances",
          rows: 4,
          value: daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.performancesApplicatives,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsPDMA_DMIA_Performances: {
                  ...daData.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances,
                  performancesApplicatives: e.target.value,
                },
              },
            }),
        }}
      />

      <h3 className="fr-h3 fr-mt-6w">Justifications Allocations Ressources Matérielles</h3>

      <Input
        label="Nombre de CPU"
        textArea
        nativeTextAreaProps={{
          id: "nombre-cpu",
          rows: 4,
          placeholder: "Justifiez le nombre de CPU alloués",
          value: daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.nombreCPU,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsAllocationsRessourcesMaterielles: {
                  ...daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles,
                  nombreCPU: e.target.value,
                },
              },
            }),
        }}
      />

      <Input
        label="Nombre de Serveurs"
        textArea
        nativeTextAreaProps={{
          id: "nombre-serveurs",
          rows: 4,
          placeholder: "Justifiez le nombre de serveurs alloués",
          value: daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.nombreServeurs,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsAllocationsRessourcesMaterielles: {
                  ...daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles,
                  nombreServeurs: e.target.value,
                },
              },
            }),
        }}
      />

      <Input
        label="Détails des Calculs"
        textArea
        nativeTextAreaProps={{
          id: "details-calculs",
          rows: 6,
          placeholder: "Détaillez les calculs de dimensionnement",
          value: daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.detailsCalculs,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre11_Dimensionnement: {
                ...daData.cadre11_Dimensionnement,
                justificationsAllocationsRessourcesMaterielles: {
                  ...daData.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles,
                  detailsCalculs: e.target.value,
                },
              },
            }),
        }}
      />
    </div>
  );
}
