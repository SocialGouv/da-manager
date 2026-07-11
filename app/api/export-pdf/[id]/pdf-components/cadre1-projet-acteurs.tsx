import React from "react";
import { Page } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, Subsection, TextField, DataTable } from "./helpers";

interface Cadre1Props {
  data: DAData;
  projectName: string;
}

export function Cadre1ProjetActeurs({ data, projectName }: Cadre1Props) {
  const cadre = data.cadre1_ProjetActeurs;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={1} title="Projet - Acteurs" />

      <Subsection title="Nom du projet" />
      <TextField value={cadre.nomDuProjet} />

      <Subsection title="Contexte du projet applicatif" />
      <TextField value={cadre.contexteProjetApplicatif} />

      <Subsection title="Objectifs du projet applicatif" />
      <TextField value={cadre.objectifsProjetApplicatif} />

      <Subsection title="Enjeux du projet applicatif" />
      <TextField value={cadre.enjeuxProjetApplicatif} />

      <Subsection title="Planning du projet" />
      <DataTable
        columns={[
          { key: "version", label: "Version", width: "20%" },
          { key: "date", label: "Date", width: "25%" },
          { key: "commentaires", label: "Commentaires", width: "55%" },
        ]}
        data={cadre.planningProjet}
        filterKey="version"
      />

      <Subsection title="Acteurs du projet" />
      <DataTable
        columns={[
          { key: "role", label: "Rôle", width: "25%", bold: true },
          { key: "nom", label: "Nom", width: "25%" },
          { key: "fonction", label: "Fonction", width: "25%" },
          { key: "entite", label: "Entité", width: "25%" },
        ]}
        data={cadre.acteursDuProjet}
        filterKey="nom"
      />

      <Subsection title="Acteurs métiers du SI Applicatif" />
      <DataTable
        columns={[
          { key: "profilsActeurs", label: "Profils Acteurs", width: "36%" },
          { key: "nombreUtilisateursM", label: "Ministère (M)", width: "16%", align: "center" },
          { key: "nombreUtilisateursR", label: "RIE (R)", width: "16%", align: "center" },
          { key: "nombreUtilisateursE", label: "Extranet (E)", width: "16%", align: "center" },
          { key: "nombreUtilisateursP", label: "Public (P)", width: "16%", align: "center" },
        ]}
        data={cadre.acteursMetiersDuSIApplicatif}
        filterKey="profilsActeurs"
        emptyMessage="Aucun acteur métier défini"
      />

      <PageFooter projectName={projectName} />
    </Page>
  );
}
