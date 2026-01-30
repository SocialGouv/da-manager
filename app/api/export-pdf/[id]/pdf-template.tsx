import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { DAData } from "@/types/da.types";

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000091",
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#000091",
  },
  subsectionTitle: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  table: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    minHeight: 25,
    alignItems: "center",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#000091",
    color: "#fff",
    minHeight: 30,
    alignItems: "center",
  },
  tableCol: {
    padding: 5,
    fontSize: 9,
  },
  tableHeaderCol: {
    padding: 5,
    fontSize: 9,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: "auto",
    maxWidth: "100%",
    maxHeight: 400,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 30,
    fontSize: 8,
    color: "#666",
  },
});

interface DADocumentProps {
  data: DAData;
}

export const DADocument: React.FC<DADocumentProps> = ({ data }) => {
  const projectName = data.cadre1_ProjetActeurs.nomDuProjet || "Document d'Architecture";

  return (
    <Document>
      {/* Page de garde */}
      <Page size="A4" style={styles.page}>
        <View style={{ marginTop: 100 }}>
          <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20, color: "#000091" }}>
            Document d'Architecture
          </Text>
          <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 40 }}>
            {projectName}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "center", color: "#666" }}>
            Version {data.annexe_SuiviChangements.versionnage || "1.0.0.0"}
          </Text>
          <Text style={{ fontSize: 10, textAlign: "center", color: "#666", marginTop: 10 }}>
            {new Date().toLocaleDateString("fr-FR")}
          </Text>
        </View>
      </Page>

      {/* CADRE 1: PROJET - ACTEURS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>1. PROJET - ACTEURS</Text>

        <Text style={styles.subsectionTitle}>Nom du projet</Text>
        <Text style={styles.text}>{data.cadre1_ProjetActeurs.nomDuProjet}</Text>

        <Text style={styles.subsectionTitle}>Contexte du projet applicatif</Text>
        <Text style={styles.text}>{data.cadre1_ProjetActeurs.contexteProjetApplicatif}</Text>

        <Text style={styles.subsectionTitle}>Objectifs du projet applicatif</Text>
        <Text style={styles.text}>{data.cadre1_ProjetActeurs.objectifsProjetApplicatif}</Text>

        <Text style={styles.subsectionTitle}>Enjeux du projet applicatif</Text>
        <Text style={styles.text}>{data.cadre1_ProjetActeurs.enjeuxProjetApplicatif}</Text>

        <Text style={styles.subsectionTitle}>Planning du projet</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "20%" }]}>Version</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Date</Text>
            <Text style={[styles.tableHeaderCol, { width: "55%" }]}>Commentaires</Text>
          </View>
          {data.cadre1_ProjetActeurs.planningProjet.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "20%" }]}>{item.version}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{item.date}</Text>
              <Text style={[styles.tableCol, { width: "55%" }]}>{item.commentaires}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subsectionTitle}>Acteurs du projet</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Rôle</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Nom</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Fonction</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Entité</Text>
          </View>
          {data.cadre1_ProjetActeurs.acteursDuProjet.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "25%" }]}>{item.role}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{item.nom}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{item.fonction}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{item.entite}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 2: FONCTIONNALITÉS - DONNÉES */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>2. FONCTIONNALITÉS - DONNÉES</Text>

        <Text style={styles.subsectionTitle}>Fonctionnalités du SI Applicatif</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "52%" }]}>Fonctionnalité</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>M</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>R</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>E</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>P</Text>
          </View>
          {data.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "52%" }]}>{item.fonctionnalite}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.M ? "✓" : ""}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.R ? "✓" : ""}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.E ? "✓" : ""}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.P ? "✓" : ""}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subsectionTitle}>Données métier du SI Applicatif</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "52%" }]}>Donnée</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>M</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>R</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>E</Text>
            <Text style={[styles.tableHeaderCol, { width: "12%" }]}>P</Text>
          </View>
          {data.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "52%" }]}>{item.donnee}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.M ? "✓" : ""}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.R ? "✓" : ""}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.E ? "✓" : ""}</Text>
              <Text style={[styles.tableCol, { width: "12%", textAlign: "center" }]}>{item.P ? "✓" : ""}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 3: CONTRAINTES - VOLUMÉTRIE */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>3. CONTRAINTES - VOLUMÉTRIE</Text>

        <Text style={styles.subsectionTitle}>Contraintes légales</Text>
        <Text style={styles.text}>{data.cadre3_ContraintesVolumetrie.contraintesLegales}</Text>

        <Text style={styles.subsectionTitle}>Contraintes métiers</Text>
        <Text style={styles.text}>{data.cadre3_ContraintesVolumetrie.contraintesMetiers}</Text>

        <Text style={styles.subsectionTitle}>Volumétrie des données</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "70%", fontWeight: "bold" }]}>
              Nombre d'enregistrements à récupérer
            </Text>
            <Text style={[styles.tableCol, { width: "30%" }]}>
              {data.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d1_NombreEnregistrementsARecuperer}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "70%", fontWeight: "bold" }]}>
              Nombre d'enregistrements par an
            </Text>
            <Text style={[styles.tableCol, { width: "30%" }]}>
              {data.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d2_NombreEnregistrementsParAn}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "70%", fontWeight: "bold" }]}>
              Taille moyenne d'un enregistrement (KO)
            </Text>
            <Text style={[styles.tableCol, { width: "30%" }]}>
              {data.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d3_TailleMoyenneEnregistrementKO}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "70%", fontWeight: "bold" }]}>
              Volume BDD total (GO)
            </Text>
            <Text style={[styles.tableCol, { width: "30%" }]}>
              {data.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d7_VolumeBDDTotalGO}
            </Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>Volumétrie des fichiers</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "70%", fontWeight: "bold" }]}>
              Nombre de fichiers à récupérer
            </Text>
            <Text style={[styles.tableCol, { width: "30%" }]}>
              {data.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f1_NombreDeFichiersARecuperer}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "70%", fontWeight: "bold" }]}>
              Nombre de fichiers par an
            </Text>
            <Text style={[styles.tableCol, { width: "30%" }]}>
              {data.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f2_NombreDeFichiersParAn}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "70%", fontWeight: "bold" }]}>
              Volume FS total (GO)
            </Text>
            <Text style={[styles.tableCol, { width: "30%" }]}>
              {data.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f7_VolumeFSTotalGO}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 4: EXIGENCES CONTEXTUELLES */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>4. EXIGENCES CONTEXTUELLES</Text>

        <Text style={styles.subsectionTitle}>Échelle DICT (Front-end)</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "40%" }]}>Critère</Text>
            <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Niveau</Text>
            <Text style={[styles.tableHeaderCol, { width: "45%" }]}>Précisions</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "40%" }]}>Disponibilité</Text>
            <Text style={[styles.tableCol, { width: "15%", textAlign: "center" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceDisponibilite_NiveauFront}
            </Text>
            <Text style={[styles.tableCol, { width: "45%" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceDisponibilite_PrecisionsFront}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "40%" }]}>Intégrité</Text>
            <Text style={[styles.tableCol, { width: "15%", textAlign: "center" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_NiveauFront}
            </Text>
            <Text style={[styles.tableCol, { width: "45%" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_PrecisionsFront}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "40%" }]}>Confidentialité</Text>
            <Text style={[styles.tableCol, { width: "15%", textAlign: "center" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceConfidentialite_NiveauFront}
            </Text>
            <Text style={[styles.tableCol, { width: "45%" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceConfidentialite_PrecisionsFront}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "40%" }]}>Traçabilité</Text>
            <Text style={[styles.tableCol, { width: "15%", textAlign: "center" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceTracabilite_NiveauFront}
            </Text>
            <Text style={[styles.tableCol, { width: "45%" }]}>
              {data.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceTracabilite_PrecisionsFront}
            </Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>Garantie de service</Text>
        <Text style={styles.text}>
          PCA: {data.cadre4_ExigencesContextuelles.garantieDeService.planDeContinuiteActivite_PCA}
        </Text>
        <Text style={styles.text}>
          PRA: {data.cadre4_ExigencesContextuelles.garantieDeService.planDeRepriseActivite_PRA}
        </Text>
        <Text style={styles.text}>
          DMIA: {data.cadre4_ExigencesContextuelles.garantieDeService.dureMaximaleInterruptionAdmissible_DMIA}
        </Text>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 5: ARCHITECTURE ACTEURS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>5. ARCHITECTURE ACTEURS DU SI</Text>

        <Text style={styles.subsectionTitle}>Description</Text>
        <Text style={styles.text}>{data.cadre5_ArchitectureActeurs.description}</Text>

        {data.cadre5_ArchitectureActeurs.schemaActeursImage && (
          <View>
            <Text style={styles.subsectionTitle}>Schéma des acteurs</Text>
            <Image
              src={data.cadre5_ArchitectureActeurs.schemaActeursImage}
              style={styles.image}
            />
          </View>
        )}

        <Text style={styles.subsectionTitle}>Acteurs consommateurs</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "30%" }]}>Nom</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Type</Text>
            <Text style={[styles.tableHeaderCol, { width: "45%" }]}>Description</Text>
          </View>
          {data.cadre5_ArchitectureActeurs.acteursConsommateurs.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "30%" }]}>{item.nom}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{item.type}</Text>
              <Text style={[styles.tableCol, { width: "45%" }]}>{item.description}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 6: ARCHITECTURE FONCTIONNELLE */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>6. ARCHITECTURE FONCTIONNELLE DU SI</Text>

        <Text style={styles.subsectionTitle}>Description</Text>
        <Text style={styles.text}>{data.cadre6_ArchitectureFonctionnelle.description}</Text>

        {data.cadre6_ArchitectureFonctionnelle.schemaArchitectureFonctionnelleImage && (
          <View>
            <Text style={styles.subsectionTitle}>Schéma de l'architecture fonctionnelle</Text>
            <Image
              src={data.cadre6_ArchitectureFonctionnelle.schemaArchitectureFonctionnelleImage}
              style={styles.image}
            />
          </View>
        )}

        <Text style={styles.subsectionTitle}>Blocs fonctionnels</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "30%" }]}>Nom</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Type acteurs</Text>
            <Text style={[styles.tableHeaderCol, { width: "45%" }]}>Usages</Text>
          </View>
          {data.cadre6_ArchitectureFonctionnelle.blocsFonctionnels.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "30%" }]}>{item.nom}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{item.typeActeurs}</Text>
              <Text style={[styles.tableCol, { width: "45%" }]}>{item.usages}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 7: ARCHITECTURE APPLICATIVE */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>7. ARCHITECTURE APPLICATIVE</Text>

        <Text style={styles.subsectionTitle}>Description</Text>
        <Text style={styles.text}>{data.cadre7_ArchitectureApplicative.description}</Text>

        {data.cadre7_ArchitectureApplicative.schemaArchitectureApplicativeImage && (
          <View>
            <Text style={styles.subsectionTitle}>Schéma de l'architecture applicative</Text>
            <Image
              src={data.cadre7_ArchitectureApplicative.schemaArchitectureApplicativeImage}
              style={styles.image}
            />
          </View>
        )}

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 8: ARCHITECTURE TECHNIQUE */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>8. ARCHITECTURE TECHNIQUE</Text>

        <Text style={styles.subsectionTitle}>Description</Text>
        <Text style={styles.text}>{data.cadre8_ArchitectureTechnique.description}</Text>

        {data.cadre8_ArchitectureTechnique.schemaArchitectureTechniqueImage && (
          <View>
            <Text style={styles.subsectionTitle}>Schéma de l'architecture technique</Text>
            <Image
              src={data.cadre8_ArchitectureTechnique.schemaArchitectureTechniqueImage}
              style={styles.image}
            />
          </View>
        )}

        <Text style={styles.subsectionTitle}>Notes</Text>
        <Text style={styles.text}>{data.cadre8_ArchitectureTechnique.notes}</Text>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 9: SERVEURS & COMPOSANTS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>9. SERVEURS & COMPOSANTS APPLICATIFS</Text>

        {data.cadre9_ServeursComposants.serveurs.map((serveur, idx) => (
          <View key={idx} style={{ marginBottom: 15 }}>
            <Text style={styles.subsectionTitle}>{serveur.nomServeur}</Text>
            <Text style={styles.text}>Type: {serveur.type}</Text>
            <Text style={styles.text}>Rôle: {serveur.role}</Text>
            <Text style={styles.text}>
              Ressources: {serveur.vCPU} vCPU, {serveur.ramGO} GO RAM
            </Text>

            {serveur.composantsLogiciels.length > 0 && (
              <View style={styles.table}>
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Catégorie</Text>
                  <Text style={[styles.tableHeaderCol, { width: "30%" }]}>Composant</Text>
                  <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Version</Text>
                  <Text style={[styles.tableHeaderCol, { width: "30%" }]}>Rôle</Text>
                </View>
                {serveur.composantsLogiciels.map((comp, compIdx) => (
                  <View key={compIdx} style={styles.tableRow}>
                    <Text style={[styles.tableCol, { width: "25%" }]}>{comp.categorie}</Text>
                    <Text style={[styles.tableCol, { width: "30%" }]}>{comp.composant}</Text>
                    <Text style={[styles.tableCol, { width: "15%" }]}>{comp.version}</Text>
                    <Text style={[styles.tableCol, { width: "30%" }]}>{comp.role}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 10: MATRICES DES FLUX */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>10. MATRICES DES FLUX APPLICATIFS</Text>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "10%" }]}>N°</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Source</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Destination</Text>
            <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Protocole</Text>
            <Text style={[styles.tableHeaderCol, { width: "25%" }]}>Commentaires</Text>
          </View>
          {data.cadre10_MatricesFlux.fluxApplicatifs.map((flux, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "10%" }]}>{flux.numeroFlux}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{flux.source}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{flux.destination}</Text>
              <Text style={[styles.tableCol, { width: "15%" }]}>{flux.protocole}</Text>
              <Text style={[styles.tableCol, { width: "25%" }]}>{flux.commentaires}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 11: DIMENSIONNEMENT */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>11. DIMENSIONNEMENT DU SI APPLICATIF</Text>

        <Text style={styles.subsectionTitle}>Justifications PDMA - DMIA - Performances</Text>
        <Text style={styles.text}>
          Perte de données maximale admissible:{" "}
          {data.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.perteDeDonneesMaximaleAdmissible}
        </Text>
        <Text style={styles.text}>
          Durée maximale d'interruption admissible:{" "}
          {data.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.dureeMaximaleInterruptionAdmissible}
        </Text>
        <Text style={styles.text}>
          Performances applicatives:{" "}
          {data.cadre11_Dimensionnement.justificationsPDMA_DMIA_Performances.performancesApplicatives}
        </Text>

        <Text style={styles.subsectionTitle}>Justifications allocations ressources matérielles</Text>
        <Text style={styles.text}>
          Nombre de CPU:{" "}
          {data.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.nombreCPU}
        </Text>
        <Text style={styles.text}>
          Nombre de serveurs:{" "}
          {data.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.nombreServeurs}
        </Text>
        <Text style={styles.text}>
          Détails des calculs:{" "}
          {data.cadre11_Dimensionnement.justificationsAllocationsRessourcesMaterielles.detailsCalculs}
        </Text>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* CADRE 12: URLs APPLICATIVES */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>12. URLs APPLICATIVES</Text>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "20%" }]}>Libellé URL</Text>
            <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Acteur appelant</Text>
            <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Ressource appelée</Text>
            <Text style={[styles.tableHeaderCol, { width: "20%" }]}>Fonctionnalité</Text>
            <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Données</Text>
            <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Précisions</Text>
          </View>
          {data.cadre12_URLs.urls.map((url, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "20%" }]}>{url.libelleURL}</Text>
              <Text style={[styles.tableCol, { width: "15%" }]}>{url.acteurAppelant}</Text>
              <Text style={[styles.tableCol, { width: "15%" }]}>{url.ressourceAppelee}</Text>
              <Text style={[styles.tableCol, { width: "20%" }]}>
                {url.fonctionnaliteOuServiceFourni}
              </Text>
              <Text style={[styles.tableCol, { width: "15%" }]}>{url.donneesTransitent}</Text>
              <Text style={[styles.tableCol, { width: "15%" }]}>{url.precisions}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>

      {/* ANNEXE: SUIVI DES CHANGEMENTS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>ANNEXE - SUIVI DES CHANGEMENTS</Text>

        <Text style={styles.subsectionTitle}>
          Version: {data.annexe_SuiviChangements.versionnage}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCol, { width: "10%" }]}>Version</Text>
            <Text style={[styles.tableHeaderCol, { width: "15%" }]}>Date</Text>
            <Text style={[styles.tableHeaderCol, { width: "20%" }]}>Demandeur</Text>
            <Text style={[styles.tableHeaderCol, { width: "20%" }]}>Rapporteur</Text>
            <Text style={[styles.tableHeaderCol, { width: "35%" }]}>Description</Text>
          </View>
          {data.annexe_SuiviChangements.changements.map((change, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "10%" }]}>{change.version}</Text>
              <Text style={[styles.tableCol, { width: "15%" }]}>{change.date}</Text>
              <Text style={[styles.tableCol, { width: "20%" }]}>{change.demandeurChangement}</Text>
              <Text style={[styles.tableCol, { width: "20%" }]}>{change.rapporteurChangement}</Text>
              <Text style={[styles.tableCol, { width: "35%" }]}>
                {change.descriptionDetaillee}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{projectName}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
      </Page>
    </Document>
  );
};
