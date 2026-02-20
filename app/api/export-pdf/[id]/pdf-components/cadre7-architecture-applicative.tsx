import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, Subsection, TextField } from "./helpers";

interface Cadre7Props {
  data: DAData;
  projectName: string;
}

export function Cadre7ArchitectureApplicative({ data, projectName }: Cadre7Props) {
  const cadre = data.cadre7_ArchitectureApplicative;
  const pilesValides = cadre.pilesComposants.filter((p) => p.fonctionnalite.trim() !== "");

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={7} title="Architecture Applicative" />

      <Subsection title="Description" />
      <TextField value={cadre.description} />

      {cadre.schemaArchitectureApplicativeImage ? (
        <View wrap={false}>
          <Subsection title="Schéma de l'architecture applicative" />
          <Image
            src={cadre.schemaArchitectureApplicativeImage}
            style={s.diagramImage}
          />
        </View>
      ) : null}

      <Subsection title="Piles de composants" />
      {pilesValides.length > 0 ? (
        <View style={s.table}>
          <View style={s.thRow}>
            <Text style={[s.thCell, { width: "35%" }]}>Fonctionnalité</Text>
            <Text style={[s.thCell, { width: "65%" }]}>Composants</Text>
          </View>
          {pilesValides.map((pile, i) => (
            <View key={i} style={i % 2 === 0 ? s.tdRow : s.tdRowAlt} wrap={false}>
              <Text style={[s.tdCellBold, { width: "35%" }]}>{pile.fonctionnalite}</Text>
              <Text style={[s.tdCell, { width: "65%" }]}>{pile.composants.join(", ")}</Text>
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
}
