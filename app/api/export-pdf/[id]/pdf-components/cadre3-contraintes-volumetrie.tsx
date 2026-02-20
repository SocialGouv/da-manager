import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
import type { DAData } from "@/types/da.types";
import { s } from "./styles";
import { PageHeader, PageFooter, SectionBanner, Subsection, TextField, KV, DataTable } from "./helpers";

interface Cadre3Props {
  data: DAData;
  projectName: string;
}

export function Cadre3ContraintesVolumetrie({ data, projectName }: Cadre3Props) {
  const cadre = data.cadre3_ContraintesVolumetrie;

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader projectName={projectName} />

      <SectionBanner number={3} title="Contraintes - Volumétrie" />

      <Subsection title="Contraintes légales" />
      <TextField value={cadre.contraintesLegales} />

      <Subsection title="Contraintes métiers" />
      <TextField value={cadre.contraintesMetiers} />

      <Subsection title="Dépendances avec d'autres SI" />
      <DataTable
        columns={[
          { key: "systemeInformation", label: "Système d'information", width: "50%" },
          { key: "fournisseur", label: "Fournisseur", width: "25%", align: "center" },
          { key: "consommateur", label: "Consommateur", width: "25%", align: "center" },
        ]}
        data={cadre.dependancesAvecDautresSI}
        filterKey="systemeInformation"
        emptyMessage="Aucune dépendance définie"
      />

      <Subsection title="Dépendances avec le poste de travail" />
      <TextField value={cadre.dependancesAvecLePosteDeTravail} />

      <Subsection title="Utilisabilité en mode Tablette" />
      <View style={s.callout} wrap={false}>
        <View style={s.inlineGroup}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Mode connecté</Text>
            <Text style={s.calloutText}>
              {cadre.niveauUtilisabiliteSecuriteEnModeTablette.modeConnecte || "—"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Mode déconnecté</Text>
            <Text style={s.calloutText}>
              {cadre.niveauUtilisabiliteSecuriteEnModeTablette.modeDeconnecte || "—"}
            </Text>
          </View>
        </View>
        {cadre.niveauUtilisabiliteSecuriteEnModeTablette.precisions ? (
          <View style={{ marginTop: 4 }}>
            <Text style={s.label}>Précisions</Text>
            <Text style={s.calloutText}>
              {cadre.niveauUtilisabiliteSecuriteEnModeTablette.precisions}
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
              {cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.modeConnecte || "—"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Mode déconnecté</Text>
            <Text style={s.calloutText}>
              {cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.modeDeconnecte || "—"}
            </Text>
          </View>
        </View>
        {cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.precisions ? (
          <View style={{ marginTop: 4 }}>
            <Text style={s.label}>Précisions</Text>
            <Text style={s.calloutText}>
              {cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.precisions}
            </Text>
          </View>
        ) : null}
      </View>

      <Subsection title="Nombre d'appareils mobiles" />
      <View style={s.callout} wrap={false}>
        <View style={s.inlineGroup}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Tablette Ministère</Text>
            <Text style={s.calloutText}>{cadre.mobile.tabletteMinistere || "—"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Tablette Personnel</Text>
            <Text style={s.calloutText}>{cadre.mobile.tablettePersonnel || "—"}</Text>
          </View>
        </View>
        <View style={[s.inlineGroup, { marginTop: 4 }]}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Smartphone Ministère</Text>
            <Text style={s.calloutText}>{cadre.mobile.smartphoneMinistere || "—"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Smartphone Personnel</Text>
            <Text style={s.calloutText}>{cadre.mobile.smartphonePersonnel || "—"}</Text>
          </View>
        </View>
      </View>

      <Subsection title="Volumétrie des données" />
      <View style={s.callout}>
        <KV label="D1 - Enregistrements à récupérer" value={cadre.volumetrieDonneesDuSIApplicatif.d1_NombreEnregistrementsARecuperer} />
        <KV label="D2 - Enregistrements par an" value={cadre.volumetrieDonneesDuSIApplicatif.d2_NombreEnregistrementsParAn} />
        <KV label="D3 - Taille moyenne enregistrement (KO)" value={cadre.volumetrieDonneesDuSIApplicatif.d3_TailleMoyenneEnregistrementKO} />
        <KV label="D4 - Années en base BDD" value={cadre.volumetrieDonneesDuSIApplicatif.d4_NombreAnneesEnregistrementsEnBaseBDD} />
        <KV label="D5 - Volume BDD initial (GO)" value={cadre.volumetrieDonneesDuSIApplicatif.d5_VolumeBDDInitialGO} />
        <KV label="D6 - Volume BDD actuel (GO)" value={cadre.volumetrieDonneesDuSIApplicatif.d6_VolumeBDDActuelGO} />
        <KV label="D7 - Volume BDD total (GO)" value={cadre.volumetrieDonneesDuSIApplicatif.d7_VolumeBDDTotalGO} />
        {cadre.volumetrieDonneesDuSIApplicatif.commentaires ? (
          <View style={{ marginTop: 4 }}>
            <Text style={s.label}>Commentaires</Text>
            <Text style={s.calloutText}>{cadre.volumetrieDonneesDuSIApplicatif.commentaires}</Text>
          </View>
        ) : null}
      </View>

      <Subsection title="Volumétrie des fichiers" />
      <View style={s.callout}>
        <KV label="F1 - Fichiers à récupérer" value={cadre.volumetrieFichiersDuSIApplicatif.f1_NombreDeFichiersARecuperer} />
        <KV label="F2 - Fichiers par an" value={cadre.volumetrieFichiersDuSIApplicatif.f2_NombreDeFichiersParAn} />
        <KV label="F3 - Taille moyenne fichier (MO)" value={cadre.volumetrieFichiersDuSIApplicatif.f3_TailleMoyenneDunFichierMO} />
        <KV label="F4 - Années fichiers en FS" value={cadre.volumetrieFichiersDuSIApplicatif.f4_NombreAnneesFichiersEnFileSystemFS} />
        <KV label="F5 - Volume FS initial (GO)" value={cadre.volumetrieFichiersDuSIApplicatif.f5_VolumeFSInitialGO} />
        <KV label="F6 - Volume FS actuel (GO)" value={cadre.volumetrieFichiersDuSIApplicatif.f6_VolumeFSActuelGO} />
        <KV label="F7 - Volume FS total (GO)" value={cadre.volumetrieFichiersDuSIApplicatif.f7_VolumeFSTotalGO} />
      </View>

      <Subsection title="Réduction volume données et fichiers" />
      <View style={s.callout} wrap={false}>
        <Text style={s.calloutText}>
          {cadre.reductionVolumeDonneesEtFichiers.purgeDonneesDansBDDApplicatif ? "✓" : "✗"}{" "}
          Purge données dans BDD applicatif
        </Text>
        <Text style={s.calloutText}>
          {cadre.reductionVolumeDonneesEtFichiers.purgeFichiersDansFSApplicatif ? "✓" : "✗"}{" "}
          Purge fichiers dans FS applicatif
        </Text>
        <Text style={s.calloutText}>
          {cadre.reductionVolumeDonneesEtFichiers.archivageDonneesHorsApplicatif ? "✓" : "✗"}{" "}
          Archivage données hors applicatif
        </Text>
        <Text style={s.calloutText}>
          {cadre.reductionVolumeDonneesEtFichiers.archivageFichiersHorsApplicatif ? "✓" : "✗"}{" "}
          Archivage fichiers hors applicatif
        </Text>
      </View>

      <PageFooter projectName={projectName} />
    </Page>
  );
}
