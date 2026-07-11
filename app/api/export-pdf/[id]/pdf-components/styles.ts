import { StyleSheet } from "@react-pdf/renderer";

// ============================================================================
// COULEURS
// ============================================================================
export const COLORS = {
  bleu: "#000091",
  bleuClair: "#e3e3fd",
  gris50: "#f6f6f6",
  gris100: "#eeeeee",
  gris200: "#dddddd",
  gris400: "#929292",
  gris600: "#666666",
  blanc: "#ffffff",
  noir: "#161616",
  rouge: "#e1000f",
  rougeClair: "#ffe9e6",
  jaune: "#ffca00",
  jauneClair: "#fef7da",
  vert: "#18753c",
  vertClair: "#b8fec9",
};

// ============================================================================
// STYLES
// ============================================================================
export const s = StyleSheet.create({
  // Page
  page: {
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: COLORS.noir,
  },

  // En-tête fixe
  pageHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.bleu,
  },
  pageHeaderText: {
    fontSize: 7,
    color: COLORS.gris600,
    flex: 1,
  },
  pageNumber: {
    fontSize: 7,
    color: COLORS.gris600,
  },

  // Pied de page
  pageFooter: {
    position: "absolute",
    bottom: 15,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 7,
    color: COLORS.gris400,
  },

  // Page de garde
  coverBanner: {
    backgroundColor: COLORS.bleu,
    marginHorizontal: -40,
    marginTop: -60,
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  coverBannerText: {
    fontSize: 11,
    color: COLORS.blanc,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
  },
  coverTitle: {
    fontSize: 28,
    color: COLORS.bleu,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginTop: 80,
    marginBottom: 15,
  },
  coverProject: {
    fontSize: 18,
    color: COLORS.noir,
    textAlign: "center",
    marginBottom: 60,
  },
  coverInfoBox: {
    backgroundColor: COLORS.gris50,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.bleu,
    padding: 15,
    marginTop: "auto",
    marginBottom: 20,
  },
  coverInfoText: {
    fontSize: 9,
    color: COLORS.gris600,
    lineHeight: 1.6,
  },

  // Sommaire
  tocTitle: {
    fontSize: 20,
    color: COLORS.bleu,
    fontFamily: "Helvetica-Bold",
    marginBottom: 30,
  },
  tocItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gris100,
  },
  tocNumber: {
    fontSize: 11,
    color: COLORS.bleu,
    fontFamily: "Helvetica-Bold",
    width: 30,
  },
  tocText: {
    fontSize: 11,
    color: COLORS.noir,
  },

  // Bandeau section
  sectionBanner: {
    backgroundColor: COLORS.bleu,
    marginHorizontal: -40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 15,
    marginTop: 5,
  },
  sectionBannerText: {
    fontSize: 14,
    color: COLORS.blanc,
    fontFamily: "Helvetica-Bold",
  },

  // Sous-titre
  subsection: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.bleu,
    marginTop: 15,
    marginBottom: 6,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.bleu,
  },

  // Champ texte avec callout
  callout: {
    backgroundColor: COLORS.gris50,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.bleu,
    padding: 8,
    marginBottom: 8,
  },
  calloutText: {
    fontSize: 9,
    lineHeight: 1.5,
  },

  // Texte vide
  emptyText: {
    fontSize: 9,
    color: COLORS.gris400,
    fontStyle: "italic",
  },

  // Tableaux
  table: {
    width: "100%",
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.gris200,
  },
  thRow: {
    flexDirection: "row",
    backgroundColor: COLORS.bleu,
    minHeight: 26,
    alignItems: "center",
  },
  thCell: {
    padding: 5,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.blanc,
  },
  tdRow: {
    flexDirection: "row",
    minHeight: 22,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gris200,
  },
  tdRowAlt: {
    flexDirection: "row",
    minHeight: 22,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gris200,
    backgroundColor: COLORS.gris50,
  },
  tdCell: {
    padding: 5,
    fontSize: 8,
  },
  tdCellCenter: {
    padding: 5,
    fontSize: 8,
    textAlign: "center",
  },
  tdCellBold: {
    padding: 5,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },

  // Key-value
  kvRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  kvLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.gris600,
    width: "40%",
  },
  kvValue: {
    fontSize: 9,
    flex: 1,
  },

  // Image
  diagramImage: {
    marginVertical: 10,
    marginHorizontal: "auto",
    maxWidth: "100%",
    maxHeight: 380,
  },
  diagramCaption: {
    fontSize: 8,
    color: COLORS.gris600,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 10,
  },

  // Sensibilité matrix
  sensGrid: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 10,
  },
  sensCol: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gris200,
  },
  sensHeader: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  sensHeaderText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.blanc,
  },
  sensItem: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 8,
  },
  sensItemEmpty: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 8,
    color: COLORS.gris400,
    fontStyle: "italic",
  },

  // Serveur card
  serverCard: {
    borderWidth: 1,
    borderColor: COLORS.gris200,
    borderRadius: 2,
    padding: 10,
    marginBottom: 12,
  },
  serverName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.bleu,
    marginBottom: 6,
  },

  // Inline group
  inlineGroup: {
    flexDirection: "row",
    marginBottom: 4,
    gap: 20,
  },

  // Small label
  label: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.gris600,
    marginBottom: 2,
  },
  value: {
    fontSize: 9,
    marginBottom: 6,
  },
});
