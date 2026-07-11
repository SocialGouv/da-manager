import React from "react";
import { Page, View, Image } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, Subsection, TextField } from "./helpers";

interface Cadre8Props {
  data: DAData;
  projectName: string;
}

export function Cadre8ArchitectureTechnique({ data, projectName }: Cadre8Props) {
  const cadre = data.cadre8_ArchitectureTechnique;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={8} title="Architecture Technique" />

      <Subsection title="Description" />
      <TextField value={cadre.description} />

      {cadre.schemaArchitectureTechniqueImage ? (
        <View wrap={false}>
          <Subsection title="Schéma de l'architecture technique" />
          <Image
            src={cadre.schemaArchitectureTechniqueImage}
            style={s.diagramImage}
          />
        </View>
      ) : null}

      <Subsection title="Notes" />
      <TextField value={cadre.notes} />

      <PageFooter projectName={projectName} />
    </Page>
  );
}
