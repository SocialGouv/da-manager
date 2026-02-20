import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";
import { s } from "./styles";

interface CoverPageProps {
  projectName: string;
  dateStr: string;
}

export const CoverPage: React.FC<CoverPageProps> = ({ projectName, dateStr }) => (
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
