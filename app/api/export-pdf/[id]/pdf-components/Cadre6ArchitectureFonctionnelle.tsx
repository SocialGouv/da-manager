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

export const Cadre6ArchitectureFonctionnelle: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const c6 = data.cadre6_ArchitectureFonctionnelle;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={6} title="Architecture Fonctionnelle du SI" />

      <Subsection title="Description" />
      <TextField value={c6.description} />

      {c6.schemaArchitectureFonctionnelleImage ? (
        <View wrap={false}>
          <Subsection title="Schéma de l'architecture fonctionnelle" />
          <Image
            src={c6.schemaArchitectureFonctionnelleImage}
            style={s.diagramImage}
          />
        </View>
      ) : null}

      <Subsection title="Blocs fonctionnels" />
      <DataTable
        columns={[
          { key: "nom", label: "Nom", width: "30%" },
          { key: "typeActeurs", label: "Type acteurs", width: "20%" },
          { key: "usages", label: "Usages", width: "50%" },
        ]}
        data={c6.blocsFonctionnels}
        filterKey="nom"
        emptyMessage="Aucun bloc fonctionnel défini"
      />

      <Subsection title="Convention de flux" />
      <TextField value={c6.conventionFlux} />

      <PageFooter projectName={projectName} />
    </Page>
  );
};
