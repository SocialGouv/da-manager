import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
import { s } from "./styles";
import { PageHeader, PageFooter } from "./helpers";

const SECTIONS = [
  "Projet - Acteurs",
  "Fonctionnalités - Données",
  "Contraintes - Volumétrie",
  "Exigences Contextuelles",
  "Architecture Acteurs du SI",
  "Architecture Fonctionnelle du SI",
  "Architecture Applicative",
  "Architecture Technique",
  "Serveurs & Composants Applicatifs",
  "Matrices des Flux Applicatifs",
  "Dimensionnement du SI Applicatif",
  "URLs Applicatives",
];

interface TableOfContentsProps {
  projectName: string;
}

export function TableOfContents({ projectName }: TableOfContentsProps) {
  return (
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
}
