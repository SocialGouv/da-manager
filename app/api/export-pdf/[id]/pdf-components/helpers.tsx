import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { s } from "./styles";

// ============================================================================
// COMPOSANTS D'EN-TÊTE ET PIED DE PAGE
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

// ============================================================================
// COMPOSANTS DE MISE EN PAGE
// ============================================================================

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

export const TextField = ({ value, label }: { value: string | undefined; label?: string }) => (
  <View wrap={false}>
    {label && <Text style={s.label}>{label}</Text>}
    <View style={s.callout}>
      <Text style={value ? s.calloutText : s.emptyText}>
        {value || "Non renseigné"}
      </Text>
    </View>
  </View>
);

export const KV = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <View style={s.kvRow}>
    <Text style={s.kvLabel}>{label}</Text>
    <Text style={value ? s.kvValue : s.emptyText}>{value || "—"}</Text>
  </View>
);

// ============================================================================
// COMPOSANT TABLEAU GÉNÉRIQUE
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
                col.bold ? s.tdCellBold : col.align === "center" ? s.tdCellCenter : s.tdCell,
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
