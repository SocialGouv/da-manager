import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import {
  PageHeader,
  PageFooter,
  SectionBanner,
  Subsection,
  TextField,
  KV,
  DataTable,
} from "./helpers";

interface Props {
  data: DAData;
  projectName: string;
}

export const Cadre4ExigencesContextuelles: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const c4 = data.cadre4_ExigencesContextuelles;
  const dict = c4.echelleDICT_EBIOS_1a4_GlobalSI;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={4} title="Exigences Contextuelles" />

      <Subsection title="Échelle DICT (EBIOS) — Front-end" />
      <View style={s.table}>
        <View style={s.thRow}>
          <Text style={[s.thCell, { width: "30%" }]}>Critère</Text>
          <Text style={[s.thCell, { width: "15%", textAlign: "center" }]}>
            Niveau
          </Text>
          <Text style={[s.thCell, { width: "55%" }]}>Précisions</Text>
        </View>
        {[
          {
            label: "Disponibilité",
            niveau: dict.exigenceDisponibilite_NiveauFront,
            precisions: dict.exigenceDisponibilite_PrecisionsFront,
          },
          {
            label: "Intégrité",
            niveau: dict.exigenceIntegrite_NiveauFront,
            precisions: dict.exigenceIntegrite_PrecisionsFront,
          },
          {
            label: "Confidentialité",
            niveau: dict.exigenceConfidentialite_NiveauFront,
            precisions: dict.exigenceConfidentialite_PrecisionsFront,
          },
          {
            label: "Traçabilité",
            niveau: dict.exigenceTracabilite_NiveauFront,
            precisions: dict.exigenceTracabilite_PrecisionsFront,
          },
        ].map((row, i) => (
          <View
            key={i}
            style={i % 2 === 0 ? s.tdRow : s.tdRowAlt}
            wrap={false}
          >
            <Text style={[s.tdCellBold, { width: "30%" }]}>{row.label}</Text>
            <Text style={[s.tdCellCenter, { width: "15%" }]}>
              {row.niveau || "—"}
            </Text>
            <Text style={[s.tdCell, { width: "55%" }]}>
              {row.precisions || "—"}
            </Text>
          </View>
        ))}
      </View>

      <Subsection title="Échelle DICT (EBIOS) — Back-end" />
      <View style={s.table}>
        <View style={s.thRow}>
          <Text style={[s.thCell, { width: "30%" }]}>Critère</Text>
          <Text style={[s.thCell, { width: "15%", textAlign: "center" }]}>
            Niveau
          </Text>
          <Text style={[s.thCell, { width: "55%" }]}>Précisions</Text>
        </View>
        {[
          {
            label: "Disponibilité",
            niveau: dict.exigenceDisponibilite_NiveauBack,
            precisions: dict.exigenceDisponibilite_PrecisionsBack,
          },
          {
            label: "Intégrité",
            niveau: dict.exigenceIntegrite_NiveauBack,
            precisions: dict.exigenceIntegrite_PrecisionsBack,
          },
          {
            label: "Confidentialité",
            niveau: dict.exigenceConfidentialite_NiveauBack,
            precisions: dict.exigenceConfidentialite_PrecisionsBack,
          },
          {
            label: "Traçabilité",
            niveau: dict.exigenceTracabilite_NiveauBack,
            precisions: dict.exigenceTracabilite_PrecisionsBack,
          },
        ].map((row, i) => (
          <View
            key={i}
            style={i % 2 === 0 ? s.tdRow : s.tdRowAlt}
            wrap={false}
          >
            <Text style={[s.tdCellBold, { width: "30%" }]}>{row.label}</Text>
            <Text style={[s.tdCellCenter, { width: "15%" }]}>
              {row.niveau || "—"}
            </Text>
            <Text style={[s.tdCell, { width: "55%" }]}>
              {row.precisions || "—"}
            </Text>
          </View>
        ))}
      </View>

      <Subsection title="Échelle IMPACT (EBIOS)" />
      <View style={s.callout} wrap={false}>
        <KV label="Domaine" value={c4.echelleIMPACT_EBIOS_GlobalSI.domaine} />
        <KV label="Niveau" value={c4.echelleIMPACT_EBIOS_GlobalSI.niveau} />
        <KV
          label="Description"
          value={c4.echelleIMPACT_EBIOS_GlobalSI.description}
        />
        <KV
          label="Contexte applicatif"
          value={c4.echelleIMPACT_EBIOS_GlobalSI.contexteApplicatif}
        />
      </View>

      <Subsection title="Exigence de PREUVE par fonctionnalité" />
      <DataTable
        columns={[
          { key: "fonctionnalite", label: "Fonctionnalité", width: "40%" },
          {
            key: "descriptionExigencePreuve",
            label: "Description exigence de preuve",
            width: "60%",
          },
        ]}
        data={c4.exigencePREUVE_ParFonctionnalite}
        filterKey="fonctionnalite"
        emptyMessage="Aucune exigence de preuve définie"
      />

      <Subsection title="Garantie de service" />
      <View style={s.callout}>
        <KV label="PCA" value={c4.garantieDeService.planDeContinuiteActivite_PCA} />
        <KV label="PRA" value={c4.garantieDeService.planDeRepriseActivite_PRA} />
        <KV
          label="DMIA"
          value={c4.garantieDeService.dureMaximaleInterruptionAdmissible_DMIA}
        />
        <KV
          label="Perte de données non admissible"
          value={c4.garantieDeService.perteDeDonneesNonAdmissible}
        />
        <KV
          label="Impact métier en cas de perte de données"
          value={c4.garantieDeService.impactMetierEnCasDePerteDeDonnees}
        />
        <KV
          label="Impact métier en cas de défaillance service"
          value={c4.garantieDeService.impactMetierEnCasDeDefaillanceService}
        />
      </View>

      <Subsection title="Périodes applicatives" />
      <DataTable
        columns={[
          { key: "periode", label: "Période", width: "25%" },
          { key: "dateDebut", label: "Début", width: "15%" },
          { key: "dateFin", label: "Fin", width: "15%" },
          {
            key: "nuc_NombreUtilisateursConnectes",
            label: "NUC",
            width: "20%",
            align: "center",
          },
          {
            key: "nrs_NombreRequetesSimultaneesParSec",
            label: "NRS/s",
            width: "25%",
            align: "center",
          },
        ]}
        data={c4.periodesApplicatives}
        filterKey="periode"
        emptyMessage="Aucune période définie"
      />

      <Subsection title="Temps de réponse" />
      <View style={s.table}>
        <View style={s.thRow}>
          <Text style={[s.thCell, { width: "40%" }]}>Type</Text>
          <Text style={[s.thCell, { width: "30%", textAlign: "center" }]}>
            Période standard (s)
          </Text>
          <Text style={[s.thCell, { width: "30%", textAlign: "center" }]}>
            Période de charge (s)
          </Text>
        </View>
        {[
          {
            label: "Affichage page d'accueil",
            standard:
              c4.tempsDeReponse.affichagePageAccueil_PeriodeStandard,
            charge: c4.tempsDeReponse.affichagePageAccueil_PeriodeDeCharge,
          },
          {
            label: "Affichage page simple",
            standard: c4.tempsDeReponse.affichagePageSimple_PeriodeStandard,
            charge: c4.tempsDeReponse.affichagePageSimple_PeriodeDeCharge,
          },
          {
            label: "Affichage page complexe",
            standard:
              c4.tempsDeReponse.affichagePageComplexe_PeriodeStandard,
            charge: c4.tempsDeReponse.affichagePageComplexe_PeriodeDeCharge,
          },
          {
            label: "Traitement requête simple",
            standard:
              c4.tempsDeReponse.traitementRequeteSimple_PeriodeStandard,
            charge:
              c4.tempsDeReponse.traitementRequeteSimple_PeriodeDeCharge,
          },
          {
            label: "Traitement requête complexe",
            standard:
              c4.tempsDeReponse.traitementRequeteComplexe_PeriodeStandard,
            charge:
              c4.tempsDeReponse.traitementRequeteComplexe_PeriodeDeCharge,
          },
        ].map((row, i) => (
          <View
            key={i}
            style={i % 2 === 0 ? s.tdRow : s.tdRowAlt}
            wrap={false}
          >
            <Text style={[s.tdCellBold, { width: "40%" }]}>{row.label}</Text>
            <Text style={[s.tdCellCenter, { width: "30%" }]}>
              {row.standard || "—"}
            </Text>
            <Text style={[s.tdCellCenter, { width: "30%" }]}>
              {row.charge || "—"}
            </Text>
          </View>
        ))}
      </View>

      <Subsection title="Traitements automatisés" />
      <DataTable
        columns={[
          {
            key: "batchsApplicatifs",
            label: "Batchs applicatifs",
            width: "25%",
          },
          { key: "plage", label: "Plage", width: "15%" },
          { key: "frequence", label: "Fréquence", width: "15%" },
          { key: "impactMetier", label: "Impact métier", width: "22.5%" },
          { key: "impactCharge", label: "Impact charge", width: "22.5%" },
        ]}
        data={c4.traitementsAutomatises}
        filterKey="batchsApplicatifs"
        emptyMessage="Aucun traitement automatisé défini"
      />

      <Subsection title="Impact métier en cas d'anomalie" />
      <TextField value={c4.impactMetierEnCasDAnomalie} />

      <Subsection title="Impact de charge sur les performances" />
      <TextField value={c4.impactDeChargeSurPerformances} />

      <PageFooter projectName={projectName} />
    </Page>
  );
};
