import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
import { s } from "./styles";

interface CoverPageProps {
  projectName: string;
}

export function CoverPage({ projectName }: CoverPageProps) {
  const dateStr = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Page size="A4" style={[s.page, { paddingTop: 0 }]}>
      <View style={s.coverBanner}>
        <Text style={s.coverBannerText}>RÉPUBLIQUE FRANÇAISE</Text>
      </View>

      <Text style={s.coverTitle}>Document d'Architecture</Text>
      <Text style={s.coverProject}>{projectName}</Text>

      <View style={{ flex: 1 }} />

      <View style={s.coverInfoBox}>
        <Text style={s.coverInfoText}>Généré le {dateStr}</Text>
        <Text style={s.coverInfoText}>
          Ce document décrit l'architecture du système d'information
          applicatif selon le cadre méthodologique ministériel.
        </Text>
      </View>
    </Page>
  );
}
