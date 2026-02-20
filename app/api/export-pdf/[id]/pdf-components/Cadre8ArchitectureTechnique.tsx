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
} from "./helpers";

interface Props {
  data: DAData;
  projectName: string;
}

export const Cadre8ArchitectureTechnique: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const c8 = data.cadre8_ArchitectureTechnique;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={8} title="Architecture Technique" />

      <Subsection title="Description" />
      <TextField value={c8.description} />

      {c8.schemaArchitectureTechniqueImage ? (
        <View wrap={false}>
          <Subsection title="Schéma de l'architecture technique" />
          <Image
            src={c8.schemaArchitectureTechniqueImage}
            style={s.diagramImage}
          />
        </View>
      ) : null}

      <Subsection title="Notes" />
      <TextField value={c8.notes} />

      <PageFooter projectName={projectName} />
    </Page>
  );
};
