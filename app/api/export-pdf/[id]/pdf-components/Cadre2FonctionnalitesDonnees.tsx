import React from "react";
import { Page } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import {
  PageHeader,
  PageFooter,
  SectionBanner,
  Subsection,
  DataTable,
  SensibiliteMatrix,
} from "./helpers";

interface Props {
  data: DAData;
  projectName: string;
}

export const Cadre2FonctionnalitesDonnees: React.FC<Props> = ({
  data,
  projectName,
}) => (
  <Page size="A4" style={s.page} wrap>
    <PageHeader projectName={projectName} />

    <SectionBanner number={2} title="Fonctionnalités - Données" />

    <Subsection title="Fonctionnalités du SI Applicatif" />
    <DataTable
      columns={[
        { key: "fonctionnalite", label: "Fonctionnalité", width: "52%" },
        { key: "M", label: "M", width: "12%", align: "center" },
        { key: "R", label: "R", width: "12%", align: "center" },
        { key: "E", label: "E", width: "12%", align: "center" },
        { key: "P", label: "P", width: "12%", align: "center" },
      ]}
      data={data.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif}
      filterKey="fonctionnalite"
      emptyMessage="Aucune fonctionnalité définie"
    />

    <Subsection title="Données métier du SI Applicatif" />
    <DataTable
      columns={[
        { key: "donnee", label: "Donnée", width: "52%" },
        { key: "M", label: "M", width: "12%", align: "center" },
        { key: "R", label: "R", width: "12%", align: "center" },
        { key: "E", label: "E", width: "12%", align: "center" },
        { key: "P", label: "P", width: "12%", align: "center" },
      ]}
      data={data.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif}
      filterKey="donnee"
      emptyMessage="Aucune donnée métier définie"
    />

    <Subsection title="Fichiers métiers du SI Applicatif" />
    <DataTable
      columns={[
        { key: "fichier", label: "Fichier", width: "52%" },
        { key: "M", label: "M", width: "12%", align: "center" },
        { key: "R", label: "R", width: "12%", align: "center" },
        { key: "E", label: "E", width: "12%", align: "center" },
        { key: "P", label: "P", width: "12%", align: "center" },
      ]}
      data={data.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif}
      filterKey="fichier"
      emptyMessage="Aucun fichier métier défini"
    />

    <Subsection title="Référentiels de données hors SI" />
    <DataTable
      columns={[
        { key: "referentiel", label: "Référentiel", width: "35%" },
        { key: "modeEchange", label: "Mode d'échange", width: "17%" },
        { key: "M", label: "M", width: "12%", align: "center" },
        { key: "R", label: "R", width: "12%", align: "center" },
        { key: "E", label: "E", width: "12%", align: "center" },
        { key: "P", label: "P", width: "12%", align: "center" },
      ]}
      data={data.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI}
      filterKey="referentiel"
      emptyMessage="Aucun référentiel défini"
    />

    <Subsection title="Sensibilité des données" />
    <SensibiliteMatrix
      sensibilite={data.cadre2_FonctionnalitesDonnees.sensibiliteDesDonnees}
    />

    <Subsection title="Services utilisés par l'application" />
    <DataTable
      columns={[
        { key: "service", label: "Service", width: "35%" },
        { key: "modeEchange", label: "Mode d'échange", width: "17%" },
        { key: "M", label: "M", width: "12%", align: "center" },
        { key: "R", label: "R", width: "12%", align: "center" },
        { key: "E", label: "E", width: "12%", align: "center" },
        { key: "P", label: "P", width: "12%", align: "center" },
      ]}
      data={data.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication}
      filterKey="service"
      emptyMessage="Aucun service défini"
    />

    <PageFooter projectName={projectName} />
  </Page>
);
