import React from "react";
import { Page } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import {
  PageHeader,
  PageFooter,
  SectionBanner,
  Subsection,
  TextField,
  DataTable,
} from "./helpers";

interface Props {
  data: DAData;
  projectName: string;
}

export const Cadre1ProjetActeurs: React.FC<Props> = ({ data, projectName }) => (
  <Page size="A4" style={s.page} wrap>
    <PageHeader projectName={projectName} />

    <SectionBanner number={1} title="Projet - Acteurs" />

    <Subsection title="Nom du projet" />
    <TextField value={data.cadre1_ProjetActeurs.nomDuProjet} />

    <Subsection title="Contexte du projet applicatif" />
    <TextField value={data.cadre1_ProjetActeurs.contexteProjetApplicatif} />

    <Subsection title="Objectifs du projet applicatif" />
    <TextField value={data.cadre1_ProjetActeurs.objectifsProjetApplicatif} />

    <Subsection title="Enjeux du projet applicatif" />
    <TextField value={data.cadre1_ProjetActeurs.enjeuxProjetApplicatif} />

    <Subsection title="Planning du projet" />
    <DataTable
      columns={[
        { key: "version", label: "Version", width: "20%" },
        { key: "date", label: "Date", width: "25%" },
        { key: "commentaires", label: "Commentaires", width: "55%" },
      ]}
      data={data.cadre1_ProjetActeurs.planningProjet}
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
      data={data.cadre1_ProjetActeurs.acteursDuProjet}
      filterKey="nom"
    />

    <Subsection title="Acteurs métiers du SI Applicatif" />
    <DataTable
      columns={[
        { key: "profilsActeurs", label: "Profils Acteurs", width: "36%" },
        {
          key: "nombreUtilisateursM",
          label: "Ministère (M)",
          width: "16%",
          align: "center",
        },
        {
          key: "nombreUtilisateursR",
          label: "RIE (R)",
          width: "16%",
          align: "center",
        },
        {
          key: "nombreUtilisateursE",
          label: "Extranet (E)",
          width: "16%",
          align: "center",
        },
        {
          key: "nombreUtilisateursP",
          label: "Public (P)",
          width: "16%",
          align: "center",
        },
      ]}
      data={data.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif}
      filterKey="profilsActeurs"
      emptyMessage="Aucun acteur métier défini"
    />

    <PageFooter projectName={projectName} />
  </Page>
);
