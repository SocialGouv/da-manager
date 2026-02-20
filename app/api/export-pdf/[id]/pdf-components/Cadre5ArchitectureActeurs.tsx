import React from "react";
import { Page, Image, View } from "@react-pdf/renderer";
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

export const Cadre5ArchitectureActeurs: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const c5 = data.cadre5_ArchitectureActeurs;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={5} title="Architecture Acteurs du SI" />

      <Subsection title="Description" />
      <TextField value={c5.description} />

      {c5.schemaActeursImage ? (
        <View wrap={false}>
          <Subsection title="Schéma des acteurs" />
          <Image src={c5.schemaActeursImage} style={s.diagramImage} />
        </View>
      ) : null}

      <Subsection title="Acteurs consommateurs" />
      <DataTable
        columns={[
          { key: "nom", label: "Nom", width: "25%" },
          { key: "type", label: "Type", width: "25%" },
          { key: "description", label: "Description", width: "50%" },
        ]}
        data={c5.acteursConsommateurs}
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
        data={c5.acteursFournisseurs}
        filterKey="nom"
        emptyMessage="Aucun acteur fournisseur défini"
      />

      <PageFooter projectName={projectName} />
    </Page>
  );
};
