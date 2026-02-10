// Types EXACTS pour le Document d'Architecture (DA)
// Basés sur la structure officielle du template DA

export interface DAData {
  cadre1_ProjetActeurs: Cadre1_ProjetActeurs;
  cadre2_FonctionnalitesDonnees: Cadre2_FonctionnalitesDonnees;
  cadre3_ContraintesVolumetrie: Cadre3_ContraintesVolumetrie;
  cadre4_ExigencesContextuelles: Cadre4_ExigencesContextuelles;
  cadre5_ArchitectureActeurs: Cadre5_ArchitectureActeurs;
  cadre6_ArchitectureFonctionnelle: Cadre6_ArchitectureFonctionnelle;
  cadre7_ArchitectureApplicative: Cadre7_ArchitectureApplicative;
  cadre8_ArchitectureTechnique: Cadre8_ArchitectureTechnique;
  cadre9_ServeursComposants: Cadre9_ServeursComposants;
  cadre10_MatricesFlux: Cadre10_MatricesFlux;
  cadre11_Dimensionnement: Cadre11_Dimensionnement;
  cadre12_URLs: Cadre12_URLs;
  annexe_SuiviChangements: Annexe_SuiviChangements;
}

// ============================================================================
// CADRE 1 : PROJET - ACTEURS
// ============================================================================

export interface Cadre1_ProjetActeurs {
  nomDuProjet: string;
  contexteProjetApplicatif: string;
  objectifsProjetApplicatif: string;
  enjeuxProjetApplicatif: string;
  planningProjet: PlanningProjet[]; // 3 lignes fixes: V1, V2, V3
  acteursDuProjet: ActeurDuProjet[]; // Rôles fixes: MOA, AMOA, ETUDE, MOE, AMOE, INTEGRATEUR, ARCHITECTE SI, INTEGRATION, PRODUCTION
  acteursMetiersDuSIApplicatif: ActeurMetierDuSI[]; // Tableau dynamique avec total calculé
}

export interface PlanningProjet {
  version: string;
  date: string;
  commentaires: string;
}

export interface ActeurDuProjet {
  role: string;
  nom: string;
  fonction: string;
  entite: string;
}

export interface ActeurMetierDuSI {
  [key: string]: string | boolean;
  profilsActeurs: string;
  nombreUtilisateursM: string; // Ministère
  nombreUtilisateursR: string; // Réseau interministériel
  nombreUtilisateursE: string; // Extranet
  nombreUtilisateursP: string; // Public
}

// ============================================================================
// CADRE 2 : FONCTIONNALITÉS - DONNÉES
// ============================================================================

export interface Cadre2_FonctionnalitesDonnees {
  fonctionnalitesDuSIApplicatif: FonctionnaliteDuSI[];
  donneesMetierDuSIApplicatif: DonneeMetierDuSI[];
  fichiersMetiersDuSIApplicatif: FichierMetierDuSI[];
  referentielsDonneesHorsSI: ReferentielDonnees[];
  sensibiliteDesDonnees: SensibiliteDonnees;
  servicesUtilisesParApplication: ServiceUtilise[];
}

export interface FonctionnaliteDuSI {
  [key: string]: string | boolean;
  fonctionnalite: string;
  M: boolean; // Ministère
  R: boolean; // Réseau interministériel
  E: boolean; // Extranet
  P: boolean; // Public
}

export interface DonneeMetierDuSI {
  [key: string]: string | boolean;
  donnee: string;
  M: boolean;
  R: boolean;
  E: boolean;
  P: boolean;
}

export interface FichierMetierDuSI {
  [key: string]: string | boolean;
  fichier: string;
  M: boolean;
  R: boolean;
  E: boolean;
  P: boolean;
}

export interface SensibiliteDonnees {
  // Architecture technique
  NIR: "Très sensible" | "Sensible" | "";
  medicales: "Très sensible" | "Sensible" | "";
  viePrivee: "Très sensible" | "Sensible" | "";
  etatCivil: "Très sensible" | "Sensible" | "";
  identite: "Très sensible" | "Sensible" | "";
  viePersonnelle: "Très sensible" | "Sensible" | "";
  biometrique: "Très sensible" | "Sensible" | "";
  vieProfessionnelle: "Très sensible" | "Sensible" | "";
  mecanismeFraude: "Très sensible" | "Sensible" | "";
  mouvementsSalariaux: "Très sensible" | "Sensible" | "";
  santeEconomique: "Très sensible" | "Sensible" | "";
  patrimoine: "Très sensible" | "Sensible" | "";
  appartenanceSyndicale: "Très sensible" | "Sensible" | "";

  // Champs pour les catégories
  architectureTechnique: "Très sensible" | "Sensible" | "";
  organisationnel: "Très sensible" | "Sensible" | "";

  // Organisationnel - items
  justice: "Très sensible" | "Sensible" | "";
  adressePostale: "Très sensible" | "Sensible" | "";

  // Architecture sécurité
  faillesVulnerabilite: "Très sensible" | "Sensible" | "";

  // Public
  publicDonnees: "Très sensible" | "Sensible" | "";
  editoriaux: "Très sensible" | "Sensible" | "";
  publicationExtranet: "Très sensible" | "Sensible" | "";
  campagneDeCom: "Très sensible" | "Sensible" | "";
  statistiquesPubliables: "Très sensible" | "Sensible" | "";
}

export interface ReferentielDonnees {
  [key: string]: string | boolean;
  referentiel: string;
  modeEchange: string;
  M: boolean;
  R: boolean;
  E: boolean;
  P: boolean;
}

export interface ServiceUtilise {
  [key: string]: string | boolean;
  service: string;
  modeEchange: string;
  M: boolean;
  R: boolean;
  E: boolean;
  P: boolean;
}

// ============================================================================
// CADRE 3 : CONTRAINTES - VOLUMÉTRIE
// ============================================================================

export interface Cadre3_ContraintesVolumetrie {
  contraintesLegales: string;
  contraintesMetiers: string;
  dependancesAvecDautresSI: DependanceAvecAutreSI[];
  dependancesAvecLePosteDeTravail: string;
  niveauUtilisabiliteSecuriteEnModeTablette: NiveauUtilisabilite;
  niveauUtilisabiliteSecuriteEnModeSmartphone: NiveauUtilisabilite;
  mobile: MobileInfo;
  volumetrieDonneesDuSIApplicatif: VolumetrieDonnees;
  volumetrieFichiersDuSIApplicatif: VolumetrieFichiers;
  reductionVolumeDonneesEtFichiers: ReductionVolume;
}

export interface DependanceAvecAutreSI {
  systemeInformation: string;
  fournisseur: boolean;
  consommateur: boolean;
}

export interface NiveauUtilisabilite {
  modeConnecte: "Néant" | "Faible" | "Moyen" | "Fort";
  modeDeconnecte: "Néant" | "Faible" | "Moyen" | "Fort";
  precisions: string;
}

export interface MobileInfo {
  tabletteMinistere: number;
  tablettePersonnel: number;
  smartphoneMinistere: number;
  smartphonePersonnel: number;
}

export interface VolumetrieDonnees {
  d1_NombreEnregistrementsARecuperer: string;
  d2_NombreEnregistrementsParAn: string;
  d3_TailleMoyenneEnregistrementKO: string;
  d4_NombreAnneesEnregistrementsEnBaseBDD: string;
  d5_VolumeBDDInitialGO: string;
  d6_VolumeBDDActuelGO: string;
  d7_VolumeBDDTotalGO: string;
  commentaires: string;
}

export interface VolumetrieFichiers {
  f1_NombreDeFichiersARecuperer: string;
  f2_NombreDeFichiersParAn: string;
  f3_TailleMoyenneDunFichierMO: string;
  f4_NombreAnneesFichiersEnFileSystemFS: string;
  f5_VolumeFSInitialGO: string;
  f6_VolumeFSActuelGO: string;
  f7_VolumeFSTotalGO: string;
}

export interface ReductionVolume {
  purgeDonneesDansBDDApplicatif: boolean;
  purgeFichiersDansFSApplicatif: boolean;
  archivageDonneesHorsApplicatif: boolean;
  archivageFichiersHorsApplicatif: boolean;
}

// ============================================================================
// CADRE 4 : EXIGENCES CONTEXTUELLES
// ============================================================================

export interface Cadre4_ExigencesContextuelles {
  echelleDICT_EBIOS_1a4_GlobalSI: EchelleDICT;
  echelleIMPACT_EBIOS_GlobalSI: EchelleImpactEBIOS;
  exigencePREUVE_ParFonctionnalite: ExigencePreuve[];
  garantieDeService: GarantieDeService;
  periodesApplicatives: PeriodeApplicative[];
  tempsDeReponse: TempsDeReponse;
  traitementsAutomatises: TraitementAutomatise[];
}

export interface EchelleDICT {
  // Usagers niveau 1 à 4
  exigenceDisponibilite_NiveauFront: number;
  exigenceDisponibilite_PrecisionsFront: string;
  exigenceDisponibilite_NiveauBack: number;
  exigenceDisponibilite_PrecisionsBack: string;

  exigenceIntegrite_NiveauFront: number;
  exigenceIntegrite_PrecisionsFront: string;
  exigenceIntegrite_NiveauBack: number;
  exigenceIntegrite_PrecisionsBack: string;

  exigenceConfidentialite_NiveauFront: number;
  exigenceConfidentialite_PrecisionsFront: string;
  exigenceConfidentialite_NiveauBack: number;
  exigenceConfidentialite_PrecisionsBack: string;

  exigenceTracabilite_NiveauFront: number;
  exigenceTracabilite_PrecisionsFront: string;
  exigenceTracabilite_NiveauBack: number;
  exigenceTracabilite_PrecisionsBack: string;
}

export interface EchelleImpactEBIOS {
  domaine: string;
  niveau: string;
  description: string;
  contexteApplicatif: string;
}

export interface ExigencePreuve {
  fonctionnalite: string;
  descriptionExigencePreuve: string;
}

export interface GarantieDeService {
  planDeContinuiteActivite_PCA: string;
  planDeRepriseActivite_PRA: string;
  perteDeDonneesNonAdmissible: string;
  dureMaximaleInterruptionAdmissible_DMIA: string;
  impactMetierEnCasDePerteDeDonnees: string;
  impactMetierEnCasDeDefaillanceService: string;
}

export interface PeriodeApplicative {
  periode: string;
  dateDebut: string;
  dateFin: string;
  nuc_NombreUtilisateursConnectes: string;
  nrs_NombreRequetesSimultaneesParSec: string;
}

export interface TempsDeReponse {
  affichagePageAccueil_PeriodeStandard: number;
  affichagePageAccueil_PeriodeDeCharge: number;
  affichagePageSimple_PeriodeStandard: number;
  affichagePageSimple_PeriodeDeCharge: number;
  affichagePageComplexe_PeriodeStandard: number;
  affichagePageComplexe_PeriodeDeCharge: number;
  traitementRequeteSimple_PeriodeStandard: number;
  traitementRequeteSimple_PeriodeDeCharge: number;
  traitementRequeteComplexe_PeriodeStandard: number;
  traitementRequeteComplexe_PeriodeDeCharge: number;
  precisions: string;
}

export interface TraitementAutomatise {
  batchsApplicatifs: string;
  plage: string;
  frequence: string;
  impactMetier: string;
  impactCharge: string;
}

// ============================================================================
// CADRE 5 : ARCHITECTURE ACTEURS DU SI
// ============================================================================

export interface Cadre5_ArchitectureActeurs {
  description: string;
  schemaActeursJSON: string; // JSON Excalidraw pour édition
  schemaActeursImage: string; // PNG base64 pour affichage/export PDF
  acteursConsommateurs: ActeurSI[];
  acteursFournisseurs: ActeurSI[];
}

export interface ActeurSI {
  nom: string;
  type: "Humain (IHM)" | "SI (WS/API)";
  description: string;
}

// ============================================================================
// CADRE 6 : ARCHITECTURE FONCTIONNELLE DU SI
// ============================================================================

export interface Cadre6_ArchitectureFonctionnelle {
  description: string;
  schemaArchitectureFonctionnelleJSON: string; // JSON Excalidraw pour édition
  schemaArchitectureFonctionnelleImage: string; // PNG base64 pour affichage/export PDF
  blocsFonctionnels: BlocFonctionnel[];
  conventionFlux: string;
}

export interface BlocFonctionnel {
  nom: string;
  usages: string;
  typeActeurs: "IHM" | "WS/API";
}

// ============================================================================
// CADRE 7 : ARCHITECTURE APPLICATIVE
// ============================================================================

export interface Cadre7_ArchitectureApplicative {
  description: string;
  schemaArchitectureApplicativeJSON: string; // JSON Excalidraw pour édition
  schemaArchitectureApplicativeImage: string; // PNG base64 pour affichage/export PDF
  pilesComposants: PileComposants[];
}

export interface PileComposants {
  fonctionnalite: string;
  composants: string[];
}

// ============================================================================
// CADRE 8 : ARCHITECTURE TECHNIQUE
// ============================================================================

export interface Cadre8_ArchitectureTechnique {
  description: string;
  schemaArchitectureTechniqueJSON: string; // JSON Excalidraw pour édition
  schemaArchitectureTechniqueImage: string; // PNG base64 pour affichage/export PDF
  notes: string;
}

// ============================================================================
// CADRE 9 : SERVEURS & COMPOSANTS APPLICATIFS
// ============================================================================

export interface Cadre9_ServeursComposants {
  serveurs: Serveur[];
}

export interface Serveur {
  nomServeur: string; // Nom logique
  type: "Machine Virtuelle" | "Container" | "Serverless" | "Bare Metal";
  role: string;
  vCPU: number;
  ramGO: number;
  composantsLogiciels: ComposantLogiciel[];
}

export interface ComposantLogiciel {
  categorie: string;
  composant: string;
  version: string;
  role: string;
}

// ============================================================================
// CADRE 10 : MATRICES DES FLUX APPLICATIFS
// ============================================================================

export interface Cadre10_MatricesFlux {
  fluxApplicatifs: FluxApplicatif[];
}

export interface FluxApplicatif {
  numeroFlux: string;
  source: string;
  destination: string;
  protocole: string;
  commentaires: string;
}

// ============================================================================
// CADRE 11 : DIMENSIONNEMENT DU SI APPLICATIF
// ============================================================================

export interface Cadre11_Dimensionnement {
  justificationsPDMA_DMIA_Performances: JustificationDimensionnement;
  justificationsAllocationsRessourcesMaterielles: JustificationRessources;
}

export interface JustificationDimensionnement {
  perteDeDonneesMaximaleAdmissible: string;
  dureeMaximaleInterruptionAdmissible: string;
  performancesApplicatives: string;
}

export interface JustificationRessources {
  nombreCPU: string;
  nombreServeurs: string;
  detailsCalculs: string;
}

// ============================================================================
// CADRE 12 : URLs APPLICATIVES
// ============================================================================

export interface Cadre12_URLs {
  urls: URLApplicative[];
}

export interface URLApplicative {
  libelleURL: string;
  acteurAppelant: string;
  ressourceAppelee: string;
  fonctionnaliteOuServiceFourni: string;
  donneesTransitent: string;
  precisions: string;
}

// ============================================================================
// ANNEXE : SUIVI DES CHANGEMENTS
// ============================================================================

export interface Annexe_SuiviChangements {
  versionnage: string; // Format X.Y.Z.K
  changements: Changement[];
}

export interface Changement {
  version: string; // x.y.z
  date: string;
  demandeurChangement: string;
  rapporteurChangement: string;
  descriptionDetaillee: string;
}
