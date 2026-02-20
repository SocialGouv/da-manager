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

export const Cadre3ContraintesVolumetrie: React.FC<Props> = ({
  data,
  projectName,
}) => {
  const c3 = data.cadre3_ContraintesVolumetrie;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={3} title="Contraintes - Volumétrie" />

      <Subsection title="Contraintes légales" />
      <TextField value={c3.contraintesLegales} />

      <Subsection title="Contraintes métiers" />
      <TextField value={c3.contraintesMetiers} />

      <Subsection title="Dépendances avec d'autres SI" />
      <DataTable
        columns={[
          {
            key: "systemeInformation",
            label: "Système d'information",
            width: "50%",
          },
          {
            key: "fournisseur",
            label: "Fournisseur",
            width: "25%",
            align: "center",
          },
          {
            key: "consommateur",
            label: "Consommateur",
            width: "25%",
            align: "center",
          },
        ]}
        data={c3.dependancesAvecDautresSI}
        filterKey="systemeInformation"
        emptyMessage="Aucune dépendance définie"
      />

      <Subsection title="Dépendances avec le poste de travail" />
      <TextField value={c3.dependancesAvecLePosteDeTravail} />

      <Subsection title="Utilisabilité en mode Tablette" />
      <View style={s.callout} wrap={false}>
        <View style={s.inlineGroup}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Mode connecté</Text>
            <Text style={s.calloutText}>
              {c3.niveauUtilisabiliteSecuriteEnModeTablette.modeConnecte || "—"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Mode déconnecté</Text>
            <Text style={s.calloutText}>
              {c3.niveauUtilisabiliteSecuriteEnModeTablette.modeDeconnecte ||
                "—"}
            </Text>
          </View>
        </View>
        {c3.niveauUtilisabiliteSecuriteEnModeTablette.precisions ? (
          <View style={{ marginTop: 4 }}>
            <Text style={s.label}>Précisions</Text>
            <Text style={s.calloutText}>
              {c3.niveauUtilisabiliteSecuriteEnModeTablette.precisions}
            </Text>
          </View>
        ) : null}
      </View>

      <Subsection title="Utilisabilité en mode Smartphone" />
      <View style={s.callout} wrap={false}>
        <View style={s.inlineGroup}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Mode connecté</Text>
            <Text style={s.calloutText}>
              {c3.niveauUtilisabiliteSecuriteEnModeSmartphone.modeConnecte ||
                "—"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Mode déconnecté</Text>
            <Text style={s.calloutText}>
              {c3.niveauUtilisabiliteSecuriteEnModeSmartphone.modeDeconnecte ||
                "—"}
            </Text>
          </View>
        </View>
        {c3.niveauUtilisabiliteSecuriteEnModeSmartphone.precisions ? (
          <View style={{ marginTop: 4 }}>
            <Text style={s.label}>Précisions</Text>
            <Text style={s.calloutText}>
              {c3.niveauUtilisabiliteSecuriteEnModeSmartphone.precisions}
            </Text>
          </View>
        ) : null}
      </View>

      <Subsection title="Nombre d'appareils mobiles" />
      <View style={s.callout} wrap={false}>
        <View style={s.inlineGroup}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Tablette Ministère</Text>
            <Text style={s.calloutText}>
              {c3.mobile.tabletteMinistere || "—"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Tablette Personnel</Text>
            <Text style={s.calloutText}>
              {c3.mobile.tablettePersonnel || "—"}
            </Text>
          </View>
        </View>
        <View style={[s.inlineGroup, { marginTop: 4 }]}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Smartphone Ministère</Text>
            <Text style={s.calloutText}>
              {c3.mobile.smartphoneMinistere || "—"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Smartphone Personnel</Text>
            <Text style={s.calloutText}>
              {c3.mobile.smartphonePersonnel || "—"}
            </Text>
          </View>
        </View>
      </View>

      <Subsection title="Volumétrie des données" />
      <View style={s.callout}>
        <KV
          label="D1 - Enregistrements à récupérer"
          value={
            c3.volumetrieDonneesDuSIApplicatif
              .d1_NombreEnregistrementsARecuperer
          }
        />
        <KV
          label="D2 - Enregistrements par an"
          value={
            c3.volumetrieDonneesDuSIApplicatif.d2_NombreEnregistrementsParAn
          }
        />
        <KV
          label="D3 - Taille moyenne enregistrement (KO)"
          value={
            c3.volumetrieDonneesDuSIApplicatif
              .d3_TailleMoyenneEnregistrementKO
          }
        />
        <KV
          label="D4 - Années en base BDD"
          value={
            c3.volumetrieDonneesDuSIApplicatif
              .d4_NombreAnneesEnregistrementsEnBaseBDD
          }
        />
        <KV
          label="D5 - Volume BDD initial (GO)"
          value={c3.volumetrieDonneesDuSIApplicatif.d5_VolumeBDDInitialGO}
        />
        <KV
          label="D6 - Volume BDD actuel (GO)"
          value={c3.volumetrieDonneesDuSIApplicatif.d6_VolumeBDDActuelGO}
        />
        <KV
          label="D7 - Volume BDD total (GO)"
          value={c3.volumetrieDonneesDuSIApplicatif.d7_VolumeBDDTotalGO}
        />
        {c3.volumetrieDonneesDuSIApplicatif.commentaires ? (
          <View style={{ marginTop: 4 }}>
            <Text style={s.label}>Commentaires</Text>
            <Text style={s.calloutText}>
              {c3.volumetrieDonneesDuSIApplicatif.commentaires}
            </Text>
          </View>
        ) : null}
      </View>

      <Subsection title="Volumétrie des fichiers" />
      <View style={s.callout}>
        <KV
          label="F1 - Fichiers à récupérer"
          value={
            c3.volumetrieFichiersDuSIApplicatif.f1_NombreDeFichiersARecuperer
          }
        />
        <KV
          label="F2 - Fichiers par an"
          value={c3.volumetrieFichiersDuSIApplicatif.f2_NombreDeFichiersParAn}
        />
        <KV
          label="F3 - Taille moyenne fichier (MO)"
          value={
            c3.volumetrieFichiersDuSIApplicatif.f3_TailleMoyenneDunFichierMO
          }
        />
        <KV
          label="F4 - Années fichiers en FS"
          value={
            c3.volumetrieFichiersDuSIApplicatif
              .f4_NombreAnneesFichiersEnFileSystemFS
          }
        />
        <KV
          label="F5 - Volume FS initial (GO)"
          value={c3.volumetrieFichiersDuSIApplicatif.f5_VolumeFSInitialGO}
        />
        <KV
          label="F6 - Volume FS actuel (GO)"
          value={c3.volumetrieFichiersDuSIApplicatif.f6_VolumeFSActuelGO}
        />
        <KV
          label="F7 - Volume FS total (GO)"
          value={c3.volumetrieFichiersDuSIApplicatif.f7_VolumeFSTotalGO}
        />
      </View>

      <Subsection title="Réduction volume données et fichiers" />
      <View style={s.callout} wrap={false}>
        <Text style={s.calloutText}>
          {c3.reductionVolumeDonneesEtFichiers.purgeDonneesDansBDDApplicatif
            ? "✓"
            : "✗"}{" "}
          Purge données dans BDD applicatif
        </Text>
        <Text style={s.calloutText}>
          {c3.reductionVolumeDonneesEtFichiers.purgeFichiersDansFSApplicatif
            ? "✓"
            : "✗"}{" "}
          Purge fichiers dans FS applicatif
        </Text>
        <Text style={s.calloutText}>
          {c3.reductionVolumeDonneesEtFichiers.archivageDonneesHorsApplicatif
            ? "✓"
            : "✗"}{" "}
          Archivage données hors applicatif
        </Text>
        <Text style={s.calloutText}>
          {c3.reductionVolumeDonneesEtFichiers.archivageFichiersHorsApplicatif
            ? "✓"
            : "✗"}{" "}
          Archivage fichiers hors applicatif
        </Text>
      </View>

      <PageFooter projectName={projectName} />
    </Page>
  );
};
