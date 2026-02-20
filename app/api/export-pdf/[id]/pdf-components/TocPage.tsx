import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";
import { s } from "./styles";
import { PageHeader, PageFooter, SECTIONS } from "./helpers";

interface TocPageProps {
  projectName: string;
}

export const TocPage: React.FC<TocPageProps> = ({ projectName }) => (
  <Page size="A4" style={s.page}>
    <PageHeader projectName={projectName} />
    <Text style={s.tocTitle}>Sommaire</Text>
    {SECTIONS.map((title, i) => (
      <View key={i} style={s.tocItem}>
        <Text style={s.tocNumber}>{i + 1}.</Text>
        <Text style={s.tocText}>{title}</Text>
      </View>
    ))}
    <PageFooter projectName={projectName} />
  </Page>
);
