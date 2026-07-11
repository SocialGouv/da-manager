import React from "react";
import { Document } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { CoverPage } from "./pdf-components/cover-page";
import { TableOfContents } from "./pdf-components/table-of-contents";
import { Cadre1ProjetActeurs } from "./pdf-components/cadre1-projet-acteurs";
import { Cadre2FonctionnalitesDonnees } from "./pdf-components/cadre2-fonctionnalites-donnees";
import { Cadre3ContraintesVolumetrie } from "./pdf-components/cadre3-contraintes-volumetrie";
import { Cadre4ExigencesContextuelles } from "./pdf-components/cadre4-exigences-contextuelles";
import { Cadre5ArchitectureActeurs } from "./pdf-components/cadre5-architecture-acteurs";
import { Cadre6ArchitectureFonctionnelle } from "./pdf-components/cadre6-architecture-fonctionnelle";
import { Cadre7ArchitectureApplicative } from "./pdf-components/cadre7-architecture-applicative";
import { Cadre8ArchitectureTechnique } from "./pdf-components/cadre8-architecture-technique";
import { Cadre9ServeursComposants } from "./pdf-components/cadre9-serveurs-composants";
import { Cadre10MatricesFlux } from "./pdf-components/cadre10-matrices-flux";
import { Cadre11Dimensionnement } from "./pdf-components/cadre11-dimensionnement";
import { Cadre12URLs } from "./pdf-components/cadre12-urls";

interface DADocumentProps {
  data: DAData;
}

export const DADocument: React.FC<DADocumentProps> = ({ data }) => {
  const projectName =
    data.cadre1_ProjetActeurs.nomDuProjet || "Document d'Architecture";

  return (
    <Document>
      <CoverPage projectName={projectName} />
      <TableOfContents projectName={projectName} />
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
