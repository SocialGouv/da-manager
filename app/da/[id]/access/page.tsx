"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface AccessEntry {
  id: string;
  userId: string;
  role: string;
  userEmail: string;
  userGivenName: string | null;
  userUsualName: string | null;
  userIsAdmin: boolean;
}

interface AvailableUser {
  id: string;
  email: string;
  givenName: string | null;
  usualName: string | null;
  isAdmin: boolean;
}

export default function AccessPage() {
  const params = useParams();
  const formId = params.id as string;

  const [daNom, setDaNom] = useState<string>("");
  const [accessList, setAccessList] = useState<AccessEntry[]>([]);
  const [availableUsers, setAvailableUsers] = useState<AvailableUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState<"editor" | "viewer">(
    "editor",
  );

  const loadData = async () => {
    try {
      const [daRes, accessRes] = await Promise.all([
        fetch(`/api/da/${formId}`),
        fetch(`/api/da/${formId}/access`),
      ]);
      if (daRes.ok) {
        const da = await daRes.json();
        setDaNom(da.nom);
      }
      if (accessRes.ok) {
        const data = await accessRes.json();
        setAccessList(data.accessList);
        setAvailableUsers(data.availableUsers);
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [formId]);

  const handleGrant = async () => {
    if (!selectedUserId) return;

    try {
      const response = await fetch(`/api/da/${formId}/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserId, role: selectedRole }),
      });

      if (response.ok) {
        setSelectedUserId("");
        await loadData();
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de l'attribution de l'accès");
      }
    } catch {
      alert("Erreur lors de l'attribution de l'accès");
    }
  };

  const handleRevoke = async (userId: string, userName: string) => {
    if (
      !confirm(`Retirer l'accès de "${userName}" à ce document ?`)
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/da/${formId}/access/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadData();
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la révocation de l'accès");
      }
    } catch {
      alert("Erreur lors de la révocation de l'accès");
    }
  };

  return (
    <main className="fr-container fr-my-6w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <Link href="/" className="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mb-3w" style={{ display: "inline-block" }}>
            Retour à la liste des DA
          </Link>

          <h1 className="fr-h2 fr-mb-1w">Gestion des accès</h1>
          {daNom && (
            <p className="fr-text--lg fr-text--bold fr-mb-4w">{daNom}</p>
          )}

          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <>
              {/* Liste des accès existants */}
              {accessList.length > 0 ? (
                <div className="fr-table fr-table--no-caption fr-mb-4w">
                  <div className="fr-table__wrapper">
                    <div className="fr-table__container">
                      <div className="fr-table__content">
                        <table>
                          <caption>Utilisateurs ayant accès</caption>
                          <thead>
                            <tr>
                              <th scope="col">Utilisateur</th>
                              <th scope="col">Rôle</th>
                              <th
                                scope="col"
                                style={{ textAlign: "right" }}
                              ></th>
                            </tr>
                          </thead>
                          <tbody>
                            {accessList.map((entry) => (
                              <tr key={entry.id}>
                                <td>
                                  {entry.userGivenName} {entry.userUsualName}
                                  <br />
                                  <span className="fr-text--xs fr-text--mention-grey">
                                    {entry.userEmail}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className={`fr-badge fr-badge--sm ${entry.role === "editor" ? "fr-badge--info" : "fr-badge--new"}`}
                                  >
                                    {entry.role === "editor"
                                      ? "Éditeur"
                                      : "Lecteur"}
                                  </span>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <button
                                    className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
                                    type="button"
                                    onClick={() =>
                                      handleRevoke(
                                        entry.userId,
                                        `${entry.userGivenName} ${entry.userUsualName}`,
                                      )
                                    }
                                  >
                                    <span
                                      className="fr-icon-close-line"
                                      aria-hidden="true"
                                    ></span>
                                    Retirer
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="fr-callout fr-callout--info fr-mb-4w">
                  <p className="fr-callout__text">
                    Aucun utilisateur n&apos;a accès à ce document pour le
                    moment.
                  </p>
                </div>
              )}

              {/* Formulaire d'ajout d'accès */}
              {availableUsers.length > 0 && (
                <div
                  className="fr-p-3w"
                  style={{
                    border: "1px solid var(--border-default-grey)",
                    borderRadius: "0.25rem",
                    background: "var(--background-alt-grey)",
                  }}
                >
                  <h2 className="fr-h6 fr-mb-2w">Ajouter un utilisateur</h2>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="fr-select-group" style={{ flex: 1 }}>
                      <label className="fr-label" htmlFor="user-select">
                        Utilisateur
                      </label>
                      <select
                        className="fr-select"
                        id="user-select"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                      >
                        <option value="">Sélectionner un utilisateur</option>
                        {availableUsers
                          .filter((u) => !u.isAdmin)
                          .map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.givenName} {user.usualName} ({user.email})
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="fr-select-group">
                      <label className="fr-label" htmlFor="role-select">
                        Rôle
                      </label>
                      <select
                        className="fr-select"
                        id="role-select"
                        value={selectedRole}
                        onChange={(e) =>
                          setSelectedRole(
                            e.target.value as "editor" | "viewer",
                          )
                        }
                      >
                        <option value="editor">Éditeur</option>
                        <option value="viewer">Lecteur</option>
                      </select>
                    </div>
                    <button
                      className="fr-btn"
                      type="button"
                      onClick={handleGrant}
                      disabled={!selectedUserId}
                    >
                      <span
                        className="fr-icon-add-line"
                        aria-hidden="true"
                      ></span>
                      Ajouter
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
