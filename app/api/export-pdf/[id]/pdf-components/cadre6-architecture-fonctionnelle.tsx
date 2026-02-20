import React from "react";
import { Page, View, Image } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, Subsection, TextField, DataTable } from "./helpers";

interface Cadre6Props {
  data: DAData;
  projectName: string;
}

export function Cadre6ArchitectureFonctionnelle({ data, projectName }: Cadre6Props) {
  const cadre = data.cadre6_ArchitectureFonctionnelle;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={6} title="Architecture Fonctionnelle du SI" />

      <Subsection title="Description" />
      <TextField value={cadre.description} />

      {cadre.schemaArchitectureFonctionnelleImage ? (
        <View wrap={false}>
          <Subsection title="Schéma de l'architecture fonctionnelle" />
          <Image
            src={cadre.schemaArchitectureFonctionnelleImage}
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
        data={cadre.blocsFonctionnels}
        filterKey="nom"
        emptyMessage="Aucun bloc fonctionnel défini"
      />

      <Subsection title="Convention de flux" />
      <TextField value={cadre.conventionFlux} />

      <PageFooter projectName={projectName} />
    </Page>
  );
}
