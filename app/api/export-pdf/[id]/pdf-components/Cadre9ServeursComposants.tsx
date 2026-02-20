import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner } from "./helpers";

interface Props {
  data: DAData;
  projectName: string;
}

export const Cadre9ServeursComposants: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const serveurs = data.cadre9_ServeursComposants.serveurs.filter(
    (srv) => srv.nomServeur.trim() !== ""
  );

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={9} title="Serveurs & Composants Applicatifs" />

      {serveurs.length === 0 ? (
        <View style={s.callout}>
          <Text style={s.emptyText}>Aucun serveur défini</Text>
        </View>
      ) : (
        serveurs.map((serveur, idx) => (
          <View key={idx} style={s.serverCard} wrap={false}>
            <Text style={s.serverName}>{serveur.nomServeur}</Text>
            <View style={s.inlineGroup}>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Type</Text>
                <Text style={s.value}>{serveur.type || "—"}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Rôle</Text>
                <Text style={s.value}>{serveur.role || "—"}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>vCPU</Text>
                <Text style={s.value}>{serveur.vCPU || "—"}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>RAM (GO)</Text>
                <Text style={s.value}>{serveur.ramGO || "—"}</Text>
              </View>
            </View>

            {serveur.composantsLogiciels.filter(
              (c) => c.composant.trim() !== ""
            ).length > 0 && (
              <View style={[s.table, { marginTop: 6 }]}>
                <View style={s.thRow}>
                  <Text style={[s.thCell, { width: "25%" }]}>Catégorie</Text>
                  <Text style={[s.thCell, { width: "30%" }]}>Composant</Text>
                  <Text style={[s.thCell, { width: "15%" }]}>Version</Text>
                  <Text style={[s.thCell, { width: "30%" }]}>Rôle</Text>
                </View>
                {serveur.composantsLogiciels
                  .filter((c) => c.composant.trim() !== "")
                  .map((comp, ci) => (
                    <View
                      key={ci}
                      style={ci % 2 === 0 ? s.tdRow : s.tdRowAlt}
                    >
                      <Text style={[s.tdCell, { width: "25%" }]}>
                        {comp.categorie}
                      </Text>
                      <Text style={[s.tdCell, { width: "30%" }]}>
                        {comp.composant}
                      </Text>
                      <Text style={[s.tdCell, { width: "15%" }]}>
                        {comp.version}
                      </Text>
                      <Text style={[s.tdCell, { width: "30%" }]}>
                        {comp.role}
                      </Text>
                    </View>
                  ))}
              </View>
            )}
          </View>
        ))
      )}

      <PageFooter projectName={projectName} />
    </Page>
  );
};
