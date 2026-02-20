import React from "react";
import { Page } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, DataTable } from "./helpers";

interface Props {
  data: DAData;
  projectName: string;
}

export const Cadre10MatricesFlux: React.FC<Props> = ({ data, projectName }) => (
  <Page size="A4" style={s.page} wrap>
    <PageHeader projectName={projectName} />

    <SectionBanner number={10} title="Matrices des Flux Applicatifs" />

    <DataTable
      columns={[
        { key: "numeroFlux", label: "N° Flux", width: "10%", bold: true },
        { key: "source", label: "Source", width: "22.5%" },
        { key: "destination", label: "Destination", width: "22.5%" },
        { key: "protocole", label: "Protocole", width: "15%" },
        { key: "commentaires", label: "Commentaires", width: "30%" },
      ]}
      data={data.cadre10_MatricesFlux.fluxApplicatifs}
      filterKey="source"
      emptyMessage="Aucun flux défini"
    />

    <PageFooter projectName={projectName} />
  </Page>
);
