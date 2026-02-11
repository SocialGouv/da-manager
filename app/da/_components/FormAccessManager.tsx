"use client";

import { useState, useEffect } from "react";

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

interface FormAccessManagerProps {
  formId: string;
}

export default function FormAccessManager({ formId }: FormAccessManagerProps) {
  const [accessList, setAccessList] = useState<AccessEntry[]>([]);
  const [availableUsers, setAvailableUsers] = useState<AvailableUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState<"editor" | "viewer">(
    "editor",
  );
  const [isOpen, setIsOpen] = useState(false);

  const loadAccess = async () => {
    try {
      const response = await fetch(`/api/da/${formId}/access`);
      if (response.ok) {
        const data = await response.json();
        setAccessList(data.accessList);
        setAvailableUsers(data.availableUsers);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des accès:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAccess();
    }
  }, [isOpen, formId]);

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
        await loadAccess();
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
      !confirm(
        `Retirer l'accès de "${userName}" à ce document ?`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/da/${formId}/access/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadAccess();
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la révocation de l'accès");
      }
    } catch {
      alert("Erreur lors de la révocation de l'accès");
    }
  };

  return (
    <div className="fr-mb-4w">
      <button
        className="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-team-line"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Gérer les accès
      </button>

      {isOpen && (
        <div
          className="fr-mt-2w fr-p-3w"
          style={{
            border: "1px solid var(--border-default-grey)",
            borderRadius: "0.25rem",
          }}
        >
          <h3 className="fr-h6 fr-mb-2w">Accès au document</h3>

          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <>
              {/* Liste des accès existants */}
              {accessList.length > 0 ? (
                <div className="fr-table fr-table--sm fr-table--no-caption fr-mb-3w">
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
                <p className="fr-text--sm fr-mb-3w">
                  Aucun utilisateur n&apos;a accès à ce document pour le moment.
                </p>
              )}

              {/* Formulaire d'ajout d'accès */}
              {availableUsers.length > 0 && (
                <div>
                  <h4 className="fr-text--bold fr-mb-1w">
                    Ajouter un utilisateur
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="fr-select-group" style={{ flex: 1 }}>
                      <label
                        className="fr-label"
                        htmlFor="user-select"
                      >
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
                      className="fr-btn fr-btn--sm"
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
      )}
    </div>
  );
}
