"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteDAButton from "./DeleteDAButton";

export interface DAItem {
  id: string;
  nom: string;
  createdAt: string;
  updatedAt: string;
  authorGivenName?: string | null;
  authorUsualName?: string | null;
}

interface VersionEntry {
  id: string;
  versionNumber: number;
  name: string | null;
  createdAt: string;
  authorGivenName: string | null;
  authorUsualName: string | null;
}

export type DATableMode = "admin" | "editor" | "viewer";

interface DATableProps {
  daList: DAItem[];
  versionCounts: Record<string, number>;
  mode: DATableMode;
}

type SortColumn = "nom" | "auteur" | "date";
type SortDirection = "ascending" | "descending";

function formatAuthorName(item: {
  authorGivenName?: string | null;
  authorUsualName?: string | null;
}): string {
  if (item.authorGivenName || item.authorUsualName) {
    return `${item.authorGivenName || ""} ${item.authorUsualName || ""}`.trim();
  }
  return "\u2014";
}

export default function DATable({
  daList,
  versionCounts,
  mode,
}: DATableProps) {
  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [versionsData, setVersionsData] = useState<
    Record<string, VersionEntry[]>
  >({});
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());
  const [deletingVersions, setDeletingVersions] = useState<Set<string>>(
    new Set(),
  );
  const [sortColumn, setSortColumn] = useState<SortColumn>("nom");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("ascending");

  const sortedDaList = useMemo(() => {
    const sorted = [...daList];
    sorted.sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case "nom":
          cmp = a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
          break;
        case "auteur": {
          const authorA = formatAuthorName(a);
          const authorB = formatAuthorName(b);
          cmp = authorA.localeCompare(authorB, "fr", { sensitivity: "base" });
          break;
        }
        case "date":
          cmp =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
      }
      return sortDirection === "ascending" ? cmp : -cmp;
    });
    return sorted;
  }, [daList, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) =>
        prev === "ascending" ? "descending" : "ascending",
      );
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }
  };

  const toggleRow = async (daId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(daId)) {
      newExpanded.delete(daId);
      setExpandedRows(newExpanded);
      return;
    }

    newExpanded.add(daId);
    setExpandedRows(newExpanded);

    if (!versionsData[daId]) {
      setLoadingRows((prev) => new Set(prev).add(daId));
      try {
        const res = await fetch(`/api/da/${daId}/versions`);
        if (res.ok) {
          const data = await res.json();
          setVersionsData((prev) => ({ ...prev, [daId]: data }));
        }
      } catch {
        // Silently fail
      } finally {
        setLoadingRows((prev) => {
          const next = new Set(prev);
          next.delete(daId);
          return next;
        });
      }
    }
  };

  const deleteVersion = async (
    daId: string,
    versionId: string,
    versionLabel: string,
  ) => {
    const confirmed = confirm(
      `Êtes-vous sûr de vouloir supprimer la version "${versionLabel}" ?\n\nCette action est irréversible.`,
    );
    if (!confirmed) return;

    setDeletingVersions((prev) => new Set(prev).add(versionId));
    try {
      const res = await fetch(`/api/da/${daId}/versions/${versionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVersionsData((prev) => ({
          ...prev,
          [daId]: (prev[daId] || []).filter((v) => v.id !== versionId),
        }));
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch {
      alert("Erreur réseau lors de la suppression");
    } finally {
      setDeletingVersions((prev) => {
        const next = new Set(prev);
        next.delete(versionId);
        return next;
      });
    }
  };

  function sortButtonClass(column: SortColumn): string {
    if (sortColumn !== column) return "fr-btn fr-btn--sort";
    return sortDirection === "ascending"
      ? "fr-btn fr-btn--sort-asc"
      : "fr-btn fr-btn--sort-desc";
  }

  function sortAria(
    column: SortColumn,
  ): "ascending" | "descending" | "none" {
    if (sortColumn !== column) return "none";
    return sortDirection;
  }

  // Nombre de colonnes (toujours 4 : nom, auteur, date, actions)
  const colCount = 4;

  return (
    <div className="fr-table fr-table--layout-fixed fr-table--no-caption">
      <div className="fr-table__content">
        <table>
          <caption>Liste des Documents d&apos;Architecture</caption>
          <thead>
            <tr>
              <th scope="col">
                <div className="fr-cell--sort">
                  Nom du projet
                  <button
                    type="button"
                    className={sortButtonClass("nom")}
                    aria-sort={sortAria("nom")}
                    onClick={() => handleSort("nom")}
                  >
                    Trier
                  </button>
                </div>
              </th>
              <th scope="col">
                <div className="fr-cell--sort">
                  Auteur
                  <button
                    type="button"
                    className={sortButtonClass("auteur")}
                    aria-sort={sortAria("auteur")}
                    onClick={() => handleSort("auteur")}
                  >
                    Trier
                  </button>
                </div>
              </th>
              <th scope="col" style={{ textAlign: "right" }}>
                <div
                  className="fr-cell--sort"
                  style={{ justifyContent: "flex-end" }}
                >
                  Dernière mise à jour
                  <button
                    type="button"
                    className={sortButtonClass("date")}
                    aria-sort={sortAria("date")}
                    onClick={() => handleSort("date")}
                  >
                    Trier
                  </button>
                </div>
              </th>
              <th
                scope="col"
                style={{ textAlign: "right" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {sortedDaList.map((da) => {
              const isExpanded = expandedRows.has(da.id);
              const isLoading = loadingRows.has(da.id);
              const versions = versionsData[da.id];
              const count = versionCounts[da.id] || 0;

              return (
                <ExpandableRow
                  key={da.id}
                  da={da}
                  isExpanded={isExpanded}
                  isLoading={isLoading}
                  versions={versions}
                  versionCount={count}
                  colCount={colCount}
                  mode={mode}
                  onToggle={toggleRow}
                  onDeleteVersion={deleteVersion}
                  deletingVersions={deletingVersions}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExpandableRow({
  da,
  isExpanded,
  isLoading,
  versions,
  versionCount,
  colCount,
  mode,
  onToggle,
  onDeleteVersion,
  deletingVersions,
}: {
  da: DAItem;
  isExpanded: boolean;
  isLoading: boolean;
  versions: VersionEntry[] | undefined;
  versionCount: number;
  colCount: number;
  mode: DATableMode;
  onToggle: (id: string) => void;
  onDeleteVersion: (
    daId: string,
    versionId: string,
    versionLabel: string,
  ) => void;
  deletingVersions: Set<string>;
}) {
  return (
    <>
      {/* Ligne DA parent */}
      <tr>
        <td>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.5rem",
                flexShrink: 0,
              }}
            >
              {versionCount > 0 && (
                <span
                  role="button"
                  tabIndex={0}
                  className={
                    isExpanded
                      ? "fr-icon-arrow-down-s-line"
                      : "fr-icon-arrow-right-s-line"
                  }
                  aria-expanded={isExpanded}
                  aria-controls={`versions-${da.id}`}
                  onClick={() => onToggle(da.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onToggle(da.id);
                    }
                  }}
                  title={`${versionCount} version(s)`}
                  style={{
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )}
            </span>
            <Link href={`/view/${da.id}`} className="fr-link">
              <strong>{da.nom}</strong>
            </Link>
          </div>
        </td>
        <td>{formatAuthorName(da)}</td>
        <td style={{ textAlign: "right" }}>
          <Link href={`/da/${da.id}/logs`} className="fr-link">
            {new Date(da.updatedAt).toLocaleString("fr-FR")}
          </Link>
        </td>
        <td style={{ textAlign: "right" }}>
          <div
            style={{
              display: "flex",
              gap: "0.25rem",
              justifyContent: "flex-end",
            }}
          >
            {(mode === "admin" || mode === "editor") && (
              <Link
                href={`/da/${da.id}`}
                className="fr-btn fr-btn--sm fr-icon-edit-line"
                title="Éditer"
              />
            )}
            <Link
              href={`/api/export-pdf/${da.id}`}
              target="_blank"
              className="fr-btn fr-btn--sm fr-btn--secondary fr-icon-download-line"
              title="Télécharger en PDF"
            />
            {mode === "admin" && (
              <>
                <Link
                  href={`/da/${da.id}/versions`}
                  className="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-git-branch-line"
                  title="Versions"
                />
                <Link
                  href={`/da/${da.id}/access`}
                  className="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-team-line"
                  title="Accès"
                />
                <DeleteDAButton daId={da.id} daNom={da.nom} />
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Sous-lignes versions */}
      {isExpanded &&
        (isLoading ? (
          <tr>
            <td
              colSpan={colCount}
              style={{
                background: "var(--background-alt-grey)",
                paddingLeft: "3rem",
              }}
            >
              <span className="fr-text--sm">Chargement des versions...</span>
            </td>
          </tr>
        ) : versions && versions.length > 0 ? (
          versions.map((v) => {
            const versionLabel = `v${v.versionNumber}${v.name ? ` — ${v.name}` : ""}`;
            return (
              <tr
                key={v.id}
                style={{ background: "var(--background-alt-grey)" }}
              >
                <td style={{ paddingLeft: "3rem" }}>
                  <Link
                    href={`/view/${da.id}/versions/${v.id}`}
                    className="fr-link fr-text--sm"
                  >
                    {versionLabel}
                  </Link>
                </td>
                <td>
                  <span className="fr-text--sm">{formatAuthorName(v)}</span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span className="fr-text--sm">
                    {new Date(v.createdAt).toLocaleString("fr-FR")}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.25rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Link
                      href={`/api/export-pdf/${da.id}/versions/${v.id}`}
                      target="_blank"
                      className="fr-btn fr-btn--sm fr-btn--secondary fr-icon-download-line"
                      title="Télécharger en PDF"
                    />
                    {mode === "admin" && (
                      <button
                        type="button"
                        className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-close-line"
                        title="Supprimer cette version"
                        disabled={deletingVersions.has(v.id)}
                        onClick={() =>
                          onDeleteVersion(da.id, v.id, versionLabel)
                        }
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={colCount}
              style={{
                background: "var(--background-alt-grey)",
                paddingLeft: "3rem",
              }}
            >
              <span className="fr-text--sm fr-text--mention-grey">
                Aucune version enregistrée.
              </span>
            </td>
          </tr>
        ))}
    </>
  );
}
