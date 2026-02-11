"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  proconnectSub: string;
  email: string;
  givenName: string | null;
  usualName: string | null;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.status === 403) {
        router.push("/");
        return;
      }
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur inconnue",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleAdmin = async (userId: string, currentIsAdmin: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: !currentIsAdmin }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Erreur lors de la modification");
        return;
      }

      // Recharger la liste
      await loadUsers();
    } catch {
      alert("Erreur lors de la modification de l'utilisateur");
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur "${userName}" ? Cette action est irréversible.`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Erreur lors de la suppression");
        return;
      }

      // Recharger la liste
      await loadUsers();
    } catch {
      alert("Erreur lors de la suppression de l'utilisateur");
    }
  };

  if (isLoading) {
    return (
      <div className="fr-container fr-my-4w">
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fr-container fr-my-4w">
        <div className="fr-callout fr-callout--red-marianne">
          <p className="fr-callout__text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--middle fr-my-4w">
        <div className="fr-col-12">
          <h1 className="fr-h1">Gestion des utilisateurs</h1>
          <p className="fr-text--lead">
            Liste des utilisateurs du système ({users.length} utilisateur
            {users.length > 1 ? "s" : ""})
          </p>
          <div className="fr-callout fr-callout--blue-ecume fr-mb-3w">
            <p className="fr-callout__text">
              Les utilisateurs sont automatiquement créés lors de leur première
              connexion via ProConnect. Vous pouvez gérer leurs droits
              d&apos;administration ici.
            </p>
          </div>
        </div>
      </div>

      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Liste des utilisateurs</caption>
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rôle</th>
                    <th scope="col">Date d&apos;inscription</th>
                    <th scope="col" style={{ textAlign: "right" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        {user.givenName} {user.usualName}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <span className="fr-badge fr-badge--info">
                            Administrateur
                          </span>
                        ) : (
                          <span className="fr-badge fr-badge--new">
                            Utilisateur
                          </span>
                        )}
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className={`fr-btn fr-btn--sm ${user.isAdmin ? "fr-btn--secondary" : ""}`}
                            type="button"
                            title={
                              user.isAdmin
                                ? "Retirer les droits admin"
                                : "Passer administrateur"
                            }
                            onClick={() =>
                              handleToggleAdmin(user.id, user.isAdmin)
                            }
                          >
                            <span
                              className={
                                user.isAdmin
                                  ? "fr-icon-subtract-line"
                                  : "fr-icon-shield-line"
                              }
                              aria-hidden="true"
                            ></span>
                            {user.isAdmin ? "Retirer admin" : "Passer admin"}
                          </button>
                          <button
                            className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
                            type="button"
                            title="Supprimer"
                            onClick={() =>
                              handleDelete(
                                user.id,
                                `${user.givenName} ${user.usualName}`,
                              )
                            }
                          >
                            <span
                              className="fr-icon-delete-line"
                              aria-hidden="true"
                            ></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
