import React from "react";
import { Page } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import {
  PageHeader,
  PageFooter,
  SectionBanner,
  Subsection,
  TextField,
  DataTable,
} from "./helpers";

interface Props {
  data: DAData;
  projectName: string;
}

export const Cadre11Dimensionnement: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const c11 = data.cadre11_Dimensionnement;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={11} title="Dimensionnement du SI Applicatif" />

      <Subsection title="Justifications PDMA / DMIA / Performances" />
      <TextField
        label="Perte de données maximale admissible (PDMA)"
        value={
          c11.justificationsPDMA_DMIA_Performances
            .perteDeDonneesMaximaleAdmissible
        }
      />
      <TextField
        label="Durée maximale d'interruption admissible (DMIA)"
        value={
          c11.justificationsPDMA_DMIA_Performances
            .dureeMaximaleInterruptionAdmissible
        }
      />
      <TextField
        label="Performances applicatives"
        value={
          c11.justificationsPDMA_DMIA_Performances.performancesApplicatives
        }
      />

      <Subsection title="Justifications allocations ressources matérielles" />
      <DataTable
        columns={[
          { key: "nom", label: "Nom", width: "25%", bold: true },
          {
            key: "detailsHypotheses",
            label: "Détails / Hypothèses",
            width: "45%",
          },
          {
            key: "nombreCPU",
            label: "Nb CPU",
            width: "15%",
            align: "center",
          },
          {
            key: "nombreServeurs",
            label: "Nb Serveurs",
            width: "15%",
            align: "center",
          },
        ]}
        data={c11.justificationsAllocationsRessourcesMaterielles}
        filterKey="nom"
        emptyMessage="Aucune ressource définie"
      />

      <PageFooter projectName={projectName} />
    </Page>
  );
};
