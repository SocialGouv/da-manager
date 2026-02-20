import React from "react";
import { Text, View } from "@react-pdf/renderer";
import type { SensibiliteDonnees } from "@/types/da.types";
import { COLORS, s } from "./styles";

// ============================================================================
// COMPOSANTS HELPERS
// ============================================================================

export const PageHeader = ({ projectName }: { projectName: string }) => (
  <View style={s.pageHeader} fixed>
    <Text style={s.pageHeaderText}>Document d'Architecture — {projectName}</Text>
    <Text
      style={s.pageNumber}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

export const PageFooter = ({ projectName }: { projectName: string }) => (
  <Text style={s.pageFooter} fixed>
    Document d'Architecture — {projectName}
  </Text>
);

export const SectionBanner = ({ number, title }: { number: number; title: string }) => (
  <View style={s.sectionBanner}>
    <Text style={s.sectionBannerText}>
      {number}. {title}
    </Text>
  </View>
);

export const Subsection = ({ title }: { title: string }) => (
  <Text style={s.subsection}>{title}</Text>
);

export const TextField = ({
  value,
  label,
}: {
  value: string | undefined;
  label?: string;
}) => (
  <View wrap={false}>
    {label && <Text style={s.label}>{label}</Text>}
    <View style={s.callout}>
      <Text style={value ? s.calloutText : s.emptyText}>
        {value || "Non renseigné"}
      </Text>
    </View>
  </View>
);

export const KV = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <View style={s.kvRow}>
    <Text style={s.kvLabel}>{label}</Text>
    <Text style={value ? s.kvValue : s.emptyText}>{value || "—"}</Text>
  </View>
);

// ============================================================================
// TABLE HELPERS
// ============================================================================

export interface Column {
  key: string;
  label: string;
  width: string;
  align?: "center" | "left" | "right";
  bold?: boolean;
}

export function formatCellValue(val: unknown): string {
  if (val === true) return "✓";
  if (val === false || val === undefined || val === null) return "";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.join(", ");
  return String(val);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable({
  columns,
  data,
  filterKey,
  emptyMessage,
}: {
  columns: Column[];
  data: any[];
  filterKey?: string;
  emptyMessage?: string;
}) {
  const filtered = filterKey
    ? data.filter((row) => {
        const val = row[filterKey];
        return typeof val === "string" ? val.trim() !== "" : !!val;
      })
    : data;

  if (filtered.length === 0) {
    return (
      <View style={s.callout}>
        <Text style={s.emptyText}>{emptyMessage || "Aucune donnée"}</Text>
      </View>
    );
  }

  return (
    <View style={s.table}>
      <View style={s.thRow}>
        {columns.map((col) => (
          <Text
            key={col.key}
            style={[s.thCell, { width: col.width, textAlign: col.align || "left" }]}
          >
            {col.label}
          </Text>
        ))}
      </View>
      {filtered.map((row, i) => (
        <View key={i} style={i % 2 === 0 ? s.tdRow : s.tdRowAlt} wrap={false}>
          {columns.map((col) => (
            <Text
              key={col.key}
              style={[
                col.bold
                  ? s.tdCellBold
                  : col.align === "center"
                  ? s.tdCellCenter
                  : s.tdCell,
                { width: col.width },
              ]}
            >
              {formatCellValue(row[col.key])}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

// ============================================================================
// SENSIBILITE DES DONNEES
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

export function SensibiliteMatrix({
  sensibilite,
}: {
  sensibilite: SensibiliteDonnees;
}) {
  const tresSensible = SENSIBILITE_FIELDS.filter(
    (f) => sensibilite[f.key] === "Très sensible"
  );
  const sensible = SENSIBILITE_FIELDS.filter(
    (f) => sensibilite[f.key] === "Sensible"
  );
  const publicItems = SENSIBILITE_FIELDS.filter(
    (f) =>
      sensibilite[f.key] !== "Très sensible" &&
      sensibilite[f.key] !== "Sensible" &&
      sensibilite[f.key] !== ""
  );

  const hasAny =
    tresSensible.length > 0 || sensible.length > 0 || publicItems.length > 0;

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

// ============================================================================
// SECTIONS DU SOMMAIRE
// ============================================================================

export const SECTIONS = [
  "Projet - Acteurs",
  "Fonctionnalités - Données",
  "Contraintes - Volumétrie",
  "Exigences Contextuelles",
  "Architecture Acteurs du SI",
  "Architecture Fonctionnelle du SI",
  "Architecture Applicative",
  "Architecture Technique",
  "Serveurs & Composants Applicatifs",
  "Matrices des Flux Applicatifs",
  "Dimensionnement du SI Applicatif",
  "URLs Applicatives",
];
