import React from "react";
import { Document } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { CoverPage } from "./pdf-components/CoverPage";
import { TocPage } from "./pdf-components/TocPage";
import { Cadre1ProjetActeurs } from "./pdf-components/Cadre1ProjetActeurs";
import { Cadre2FonctionnalitesDonnees } from "./pdf-components/Cadre2FonctionnalitesDonnees";
import { Cadre3ContraintesVolumetrie } from "./pdf-components/Cadre3ContraintesVolumetrie";
import { Cadre4ExigencesContextuelles } from "./pdf-components/Cadre4ExigencesContextuelles";
import { Cadre5ArchitectureActeurs } from "./pdf-components/Cadre5ArchitectureActeurs";
import { Cadre6ArchitectureFonctionnelle } from "./pdf-components/Cadre6ArchitectureFonctionnelle";
import { Cadre7ArchitectureApplicative } from "./pdf-components/Cadre7ArchitectureApplicative";
import { Cadre8ArchitectureTechnique } from "./pdf-components/Cadre8ArchitectureTechnique";
import { Cadre9ServeursComposants } from "./pdf-components/Cadre9ServeursComposants";
import { Cadre10MatricesFlux } from "./pdf-components/Cadre10MatricesFlux";
import { Cadre11Dimensionnement } from "./pdf-components/Cadre11Dimensionnement";
import { Cadre12URLs } from "./pdf-components/Cadre12URLs";

interface DADocumentProps {
  data: DAData;
}

export const DADocument: React.FC<DADocumentProps> = ({ data }) => {
  const projectName =
    data.cadre1_ProjetActeurs.nomDuProjet || "Document d'Architecture";
  const dateStr = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <CoverPage projectName={projectName} dateStr={dateStr} />
      <TocPage projectName={projectName} />
      <Cadre1ProjetActeurs data={data} projectName={projectName} />
      <Cadre2FonctionnalitesDonnees data={data} projectName={projectName} />
      <Cadre3ContraintesVolumetrie data={data} projectName={projectName} />
      <Cadre4ExigencesContextuelles data={data} projectName={projectName} />
      <Cadre5ArchitectureActeurs data={data} projectName={projectName} />
      <Cadre6ArchitectureFonctionnelle data={data} projectName={projectName} />
      <Cadre7ArchitectureApplicative data={data} projectName={projectName} />
      <Cadre8ArchitectureTechnique data={data} projectName={projectName} />
      <Cadre9ServeursComposants data={data} projectName={projectName} />
      <Cadre10MatricesFlux data={data} projectName={projectName} />
      <Cadre11Dimensionnement data={data} projectName={projectName} />
      <Cadre12URLs data={data} projectName={projectName} />
    </Document>
  );
};
