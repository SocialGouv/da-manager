import React from "react";
import { Page, Text, Image, View } from "@react-pdf/renderer";
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

export const Cadre7ArchitectureApplicative: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const c7 = data.cadre7_ArchitectureApplicative;
  const pilesNonVides = c7.pilesComposants.filter(
    (p) => p.fonctionnalite.trim() !== ""
  );

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={7} title="Architecture Applicative" />

      <Subsection title="Description" />
      <TextField value={c7.description} />

      {c7.schemaArchitectureApplicativeImage ? (
        <View wrap={false}>
          <Subsection title="Schéma de l'architecture applicative" />
          <Image
            src={c7.schemaArchitectureApplicativeImage}
            style={s.diagramImage}
          />
        </View>
      ) : null}

      <Subsection title="Piles de composants" />
      {pilesNonVides.length > 0 ? (
        <View style={s.table}>
          <View style={s.thRow}>
            <Text style={[s.thCell, { width: "35%" }]}>Fonctionnalité</Text>
            <Text style={[s.thCell, { width: "65%" }]}>Composants</Text>
          </View>
          {pilesNonVides.map((pile, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? s.tdRow : s.tdRowAlt}
              wrap={false}
            >
              <Text style={[s.tdCellBold, { width: "35%" }]}>
                {pile.fonctionnalite}
              </Text>
              <Text style={[s.tdCell, { width: "65%" }]}>
                {pile.composants.join(", ")}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={s.callout}>
          <Text style={s.emptyText}>Aucune pile de composants définie</Text>
        </View>
      )}

      <PageFooter projectName={projectName} />
    </Page>
  );
};
