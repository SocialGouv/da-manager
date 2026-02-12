"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SnapshotEntry {
  id: string;
  versionNumber: number;
  name: string;
  createdAt: string;
}

export default function SnapshotsPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;

  const [daNom, setDaNom] = useState<string>("");
  const [snapshots, setSnapshots] = useState<SnapshotEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newSnapshotName, setNewSnapshotName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [daRes, snapRes] = await Promise.all([
          fetch(`/api/da/${formId}`),
          fetch(`/api/da/${formId}/versions`),
        ]);
        if (daRes.ok) {
          const da = await daRes.json();
          setDaNom(da.nom);
        }
        if (snapRes.ok) {
          const data = await snapRes.json();
          setSnapshots(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [formId]);

  const handleCreate = async () => {
    if (!newSnapshotName.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch(`/api/da/${formId}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSnapshotName.trim() }),
      });

      if (response.ok) {
        setNewSnapshotName("");
        const snapRes = await fetch(`/api/da/${formId}/versions`);
        if (snapRes.ok) {
          setSnapshots(await snapRes.json());
        }
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la création du snapshot");
      }
    } catch {
      alert("Erreur lors de la création du snapshot");
    } finally {
      setIsCreating(false);
    }
  };

  const handleRestore = async (snapshotId: string, snapshotName: string) => {
    if (
      !confirm(
        `Restaurer le snapshot "${snapshotName}" ?\n\nLes données actuelles du DA seront remplacées par celles de ce snapshot.`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/da/${formId}/versions/${snapshotId}/restore`,
        { method: "POST" },
      );
      if (response.ok) {
        alert("Snapshot restauré avec succès.");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la restauration");
      }
    } catch {
      alert("Erreur lors de la restauration du snapshot");
    }
  };

  const handleDelete = async (snapshotId: string, snapshotName: string) => {
    if (
      !confirm(
        `Supprimer le snapshot "${snapshotName}" ?\n\nCette action est irréversible.`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/da/${formId}/versions/${snapshotId}`,
        { method: "DELETE" },
      );
      if (response.ok) {
        setSnapshots((prev) => prev.filter((s) => s.id !== snapshotId));
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch {
      alert("Erreur lors de la suppression du snapshot");
    }
  };

  return (
    <main className="fr-container fr-my-6w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <Link href="/" className="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mb-3w" style={{ display: "inline-block" }}>
            Retour à la liste des DA
          </Link>

          <h1 className="fr-h2 fr-mb-1w">Snapshots</h1>
          {daNom && (
            <p className="fr-text--lg fr-text--bold fr-mb-4w">{daNom}</p>
          )}

          {/* Formulaire de création */}
          <div
            className="fr-mb-4w fr-p-3w"
            style={{
              border: "1px solid var(--border-default-grey)",
              borderRadius: "0.25rem",
              background: "var(--background-alt-grey)",
            }}
          >
            <h2 className="fr-h6 fr-mb-2w">Créer un snapshot</h2>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "flex-end",
              }}
            >
              <div className="fr-input-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="fr-label" htmlFor="snapshot-name">
                  Nom du snapshot
                </label>
                <input
                  className="fr-input"
                  type="text"
                  id="snapshot-name"
                  placeholder="Ex: V1 - Validation comité"
                  value={newSnapshotName}
                  onChange={(e) => setNewSnapshotName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate();
                  }}
                />
              </div>
              <button
                className="fr-btn"
                type="button"
                onClick={handleCreate}
                disabled={!newSnapshotName.trim() || isCreating}
              >
                {isCreating ? "Création..." : "Créer"}
              </button>
            </div>
          </div>

          {/* Liste des snapshots */}
          {isLoading ? (
            <p>Chargement...</p>
          ) : snapshots.length > 0 ? (
            <div>
              <h2 className="fr-h6 fr-mb-2w">
                Snapshots existants ({snapshots.length})
              </h2>
              {snapshots.map((snapshot) => (
                <div
                  key={snapshot.id}
                  className="fr-p-3w fr-mb-2w"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "var(--background-alt-blue-france)",
                    borderRadius: "0.25rem",
                  }}
                >
                  <div>
                    <span className="fr-text--bold">{snapshot.name}</span>
                    <br />
                    <span className="fr-text--xs fr-text--mention-grey">
                      v{snapshot.versionNumber} —{" "}
                      {new Date(snapshot.createdAt).toLocaleString("fr-FR")}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="fr-btn fr-btn--sm fr-btn--tertiary"
                      type="button"
                      onClick={() =>
                        handleRestore(snapshot.id, snapshot.name)
                      }
                    >
                      <span
                        className="fr-icon-refresh-line"
                        aria-hidden="true"
                      ></span>
                      Restaurer
                    </button>
                    <button
                      className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
                      type="button"
                      onClick={() =>
                        handleDelete(snapshot.id, snapshot.name)
                      }
                      title="Supprimer ce snapshot"
                    >
                      <span
                        className="fr-icon-delete-line"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="fr-callout fr-callout--info">
              <p className="fr-callout__text">
                Aucun snapshot. Créez-en un pour figer une version du document.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
