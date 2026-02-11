"use client";

import { useState, useEffect } from "react";
import type { DAData } from "@/types/da.types";

interface VersionEntry {
  id: string;
  versionNumber: number;
  name: string | null;
  createdAt: string;
}

interface VersionManagerProps {
  formId: string;
  onRestore: (data: DAData) => void;
}

export default function VersionManager({
  formId,
  onRestore,
}: VersionManagerProps) {
  const [versionList, setVersionList] = useState<VersionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newVersionName, setNewVersionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [viewingVersion, setViewingVersion] = useState<string | null>(null);

  const loadVersions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/da/${formId}/versions`);
      if (response.ok) {
        const data = await response.json();
        setVersionList(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des versions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadVersions();
    }
  }, [isOpen, formId]);

  const handleCreateVersion = async () => {
    if (!newVersionName.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch(`/api/da/${formId}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newVersionName.trim() }),
      });

      if (response.ok) {
        setNewVersionName("");
        await loadVersions();
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la création de la version");
      }
    } catch {
      alert("Erreur lors de la création de la version");
    } finally {
      setIsCreating(false);
    }
  };

  const handleRestore = async (versionId: string, versionName: string) => {
    if (
      !confirm(
        `Restaurer la version "${versionName}" ? Les données actuelles seront remplacées.`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/da/${formId}/versions/${versionId}`,
      );
      if (response.ok) {
        const version = await response.json();
        onRestore(version.data as DAData);
      }
    } catch {
      alert("Erreur lors de la restauration de la version");
    }
  };

  const namedVersions = versionList.filter((v) => v.name !== null);
  const autoSaves = versionList.filter((v) => v.name === null);

  return (
    <div className="fr-mb-4w">
      <button
        className="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-git-branch-line"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Versions
      </button>

      {isOpen && (
        <div
          className="fr-mt-2w fr-p-3w"
          style={{
            border: "1px solid var(--border-default-grey)",
            borderRadius: "0.25rem",
          }}
        >
          <h3 className="fr-h6 fr-mb-2w">Historique des versions</h3>

          {/* Formulaire de création de version nommée */}
          <div
            className="fr-mb-3w"
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-end",
            }}
          >
            <div className="fr-input-group" style={{ flex: 1 }}>
              <label className="fr-label" htmlFor="version-name">
                Créer un snapshot nommé
              </label>
              <input
                className="fr-input"
                type="text"
                id="version-name"
                placeholder="Ex: V1 - Validation comité"
                value={newVersionName}
                onChange={(e) => setNewVersionName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateVersion();
                }}
              />
            </div>
            <button
              className="fr-btn fr-btn--sm"
              type="button"
              onClick={handleCreateVersion}
              disabled={!newVersionName.trim() || isCreating}
            >
              {isCreating ? "Création..." : "Créer"}
            </button>
          </div>

          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <>
              {/* Versions nommées */}
              {namedVersions.length > 0 && (
                <div className="fr-mb-3w">
                  <h4 className="fr-text--bold fr-text--sm fr-mb-1w">
                    Snapshots nommés
                  </h4>
                  {namedVersions.map((version) => (
                    <div
                      key={version.id}
                      className="fr-p-2w fr-mb-1w"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background:
                          "var(--background-alt-blue-france)",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <div>
                        <span className="fr-text--bold">{version.name}</span>
                        <br />
                        <span className="fr-text--xs fr-text--mention-grey">
                          v{version.versionNumber} —{" "}
                          {new Date(version.createdAt).toLocaleString("fr-FR")}
                        </span>
                      </div>
                      <button
                        className="fr-btn fr-btn--sm fr-btn--tertiary"
                        type="button"
                        onClick={() =>
                          handleRestore(
                            version.id,
                            version.name || `v${version.versionNumber}`,
                          )
                        }
                      >
                        <span
                          className="fr-icon-refresh-line"
                          aria-hidden="true"
                        ></span>
                        Restaurer
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Auto-saves */}
              {autoSaves.length > 0 && (
                <div>
                  <details>
                    <summary className="fr-text--sm fr-text--bold">
                      Sauvegardes automatiques ({autoSaves.length})
                    </summary>
                    <div className="fr-mt-1w">
                      {autoSaves.slice(0, 20).map((version) => (
                        <div
                          key={version.id}
                          className="fr-p-1w fr-mb-1v"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom:
                              "1px solid var(--border-default-grey)",
                          }}
                        >
                          <span className="fr-text--xs fr-text--mention-grey">
                            v{version.versionNumber} —{" "}
                            {new Date(version.createdAt).toLocaleString(
                              "fr-FR",
                            )}
                          </span>
                          <button
                            className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
                            type="button"
                            onClick={() =>
                              handleRestore(
                                version.id,
                                `Auto-save v${version.versionNumber}`,
                              )
                            }
                          >
                            <span
                              className="fr-icon-refresh-line fr-icon--sm"
                              aria-hidden="true"
                            ></span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}

              {versionList.length === 0 && (
                <p className="fr-text--sm fr-text--mention-grey">
                  Aucune version disponible. Les versions sont créées
                  automatiquement lors des sauvegardes.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
