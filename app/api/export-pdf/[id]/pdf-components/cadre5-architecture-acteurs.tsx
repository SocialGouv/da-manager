import React from "react";
import { Page, View, Image } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, Subsection, TextField, DataTable } from "./helpers";

interface Cadre5Props {
  data: DAData;
  projectName: string;
}

export function Cadre5ArchitectureActeurs({ data, projectName }: Cadre5Props) {
  const cadre = data.cadre5_ArchitectureActeurs;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={5} title="Architecture Acteurs du SI" />

      <Subsection title="Description" />
      <TextField value={cadre.description} />

      {cadre.schemaActeursImage ? (
        <View wrap={false}>
          <Subsection title="Schéma des acteurs" />
          <Image
            src={cadre.schemaActeursImage}
            style={s.diagramImage}
          />
        </View>
      ) : null}

      <Subsection title="Acteurs consommateurs" />
      <DataTable
        columns={[
          { key: "nom", label: "Nom", width: "25%" },
          { key: "type", label: "Type", width: "25%" },
          { key: "description", label: "Description", width: "50%" },
        ]}
        data={cadre.acteursConsommateurs}
        filterKey="nom"
        emptyMessage="Aucun acteur consommateur défini"
      />

      <Subsection title="Acteurs fournisseurs" />
      <DataTable
        columns={[
          { key: "nom", label: "Nom", width: "25%" },
          { key: "type", label: "Type", width: "25%" },
          { key: "description", label: "Description", width: "50%" },
        ]}
        data={cadre.acteursFournisseurs}
        filterKey="nom"
        emptyMessage="Aucun acteur fournisseur défini"
      />

      <PageFooter projectName={projectName} />
    </Page>
  );
}
