import React from "react";
import { View, Text } from "@react-pdf/renderer";
import type { SensibiliteDonnees } from "@/types/da.types";
import { s, COLORS } from "./styles";

// ============================================================================
// DONNÉES DE RÉFÉRENCE
// ============================================================================

const SENSIBILITE_FIELDS: { key: keyof SensibiliteDonnees; label: string }[] = [
  { key: "NIR", label: "NIR (N° Sécurité Sociale)" },
  { key: "medicales", label: "Données médicales" },
  { key: "viePrivee", label: "Vie privée" },
  { key: "justice", label: "Justice" },
  { key: "identite", label: "Identité" },
  { key: "biometrique", label: "Données biométriques" },
  { key: "mecanismeFraude", label: "Mécanisme de fraude" },
  { key: "faillesVulnerabilite", label: "Failles / Vulnérabilité" },
  { key: "patrimoine", label: "Patrimoine" },
  { key: "appartenanceSyndicale", label: "Appartenance syndicale" },
  { key: "architectureTechnique", label: "Architecture technique" },
  { key: "organisationnel", label: "Organisationnel" },
  { key: "etatCivil", label: "État civil" },
  { key: "adressePostale", label: "Adresse postale" },
  { key: "viePersonnelle", label: "Vie personnelle" },
  { key: "vieProfessionnelle", label: "Vie professionnelle" },
  { key: "mouvementsSalariaux", label: "Mouvements salariaux" },
  { key: "santeEconomique", label: "Santé économique" },
  { key: "publicDonnees", label: "Données publiques" },
  { key: "editoriaux", label: "Éditoriaux" },
  { key: "publicationExtranet", label: "Publication Extranet" },
  { key: "campagneDeCom", label: "Campagne de communication" },
  { key: "statistiquesPubliables", label: "Statistiques publiables" },
];

// ============================================================================
// COMPOSANT
// ============================================================================

export function SensibiliteMatrix({ sensibilite }: { sensibilite: SensibiliteDonnees }) {
  const tresSensible = SENSIBILITE_FIELDS.filter((f) => sensibilite[f.key] === "Très sensible");
  const sensible = SENSIBILITE_FIELDS.filter((f) => sensibilite[f.key] === "Sensible");
  const publicItems = SENSIBILITE_FIELDS.filter(
    (f) => sensibilite[f.key] !== "Très sensible" && sensibilite[f.key] !== "Sensible" && sensibilite[f.key] !== ""
  );

  const hasAny = tresSensible.length > 0 || sensible.length > 0 || publicItems.length > 0;

  if (!hasAny) {
    return (
      <View style={s.callout}>
        <Text style={s.emptyText}>Aucune sensibilité renseignée</Text>
      </View>
    );
  }

  return (
    <View style={s.sensGrid}>
      {/* Très sensible */}
      <View style={s.sensCol}>
        <View style={[s.sensHeader, { backgroundColor: COLORS.rouge }]}>
          <Text style={s.sensHeaderText}>Très sensible</Text>
        </View>
        {tresSensible.length > 0 ? (
          tresSensible.map((f) => (
            <Text key={f.key} style={s.sensItem}>
              ✓ {f.label}
            </Text>
          ))
        ) : (
          <Text style={s.sensItemEmpty}>Aucune</Text>
        )}
      </View>

      {/* Sensible */}
      <View style={s.sensCol}>
        <View style={[s.sensHeader, { backgroundColor: COLORS.jaune }]}>
          <Text style={[s.sensHeaderText, { color: COLORS.noir }]}>Sensible</Text>
        </View>
        {sensible.length > 0 ? (
          sensible.map((f) => (
            <Text key={f.key} style={s.sensItem}>
              ✓ {f.label}
            </Text>
          ))
        ) : (
          <Text style={s.sensItemEmpty}>Aucune</Text>
        )}
      </View>

      {/* Public */}
      <View style={s.sensCol}>
        <View style={[s.sensHeader, { backgroundColor: COLORS.vert }]}>
          <Text style={s.sensHeaderText}>Public</Text>
        </View>
        {publicItems.length > 0 ? (
          publicItems.map((f) => (
            <Text key={f.key} style={s.sensItem}>
              ✓ {f.label}
            </Text>
          ))
        ) : (
          <Text style={s.sensItemEmpty}>Aucune</Text>
        )}
      </View>
    </View>
  );
}
