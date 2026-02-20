import React from "react";
import { Page } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, DataTable } from "./helpers";

interface Cadre12Props {
  data: DAData;
  projectName: string;
}

export function Cadre12URLs({ data, projectName }: Cadre12Props) {
  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={12} title="URLs Applicatives" />

      <DataTable
        columns={[
          { key: "libelleURL", label: "Libellé URL", width: "18%" },
          { key: "acteurAppelant", label: "Acteur appelant", width: "14%" },
          { key: "ressourceAppelee", label: "Ressource appelée", width: "14%" },
          { key: "fonctionnaliteOuServiceFourni", label: "Fonctionnalité", width: "22%" },
          { key: "donneesTransitent", label: "Données", width: "16%" },
          { key: "precisions", label: "Précisions", width: "16%" },
        ]}
        data={data.cadre12_URLs.urls}
        filterKey="libelleURL"
        emptyMessage="Aucune URL définie"
      />

      <PageFooter projectName={projectName} />
    </Page>
  );
}
