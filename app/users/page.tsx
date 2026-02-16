"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

type SortColumn = "nom" | "email" | "role" | "date";
type SortDirection = "ascending" | "descending";

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>("nom");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("ascending");

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

  const sortedUsers = useMemo(() => {
    const sorted = [...users];
    sorted.sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case "nom": {
          const nameA = `${a.givenName || ""} ${a.usualName || ""}`.trim();
          const nameB = `${b.givenName || ""} ${b.usualName || ""}`.trim();
          cmp = nameA.localeCompare(nameB, "fr", { sensitivity: "base" });
          break;
        }
        case "email":
          cmp = a.email.localeCompare(b.email, "fr", { sensitivity: "base" });
          break;
        case "role":
          cmp = (a.isAdmin ? 0 : 1) - (b.isAdmin ? 0 : 1);
          break;
        case "date":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortDirection === "ascending" ? cmp : -cmp;
    });
    return sorted;
  }, [users, sortColumn, sortDirection]);

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
    <div className="fr-container fr-my-6w">
      <div className="fr-grid-row fr-grid-row--center">
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

      <div className="fr-table fr-table--layout-fixed fr-table--no-caption">
        <div className="fr-table__content">
          <table>
            <caption>Liste des utilisateurs</caption>
            <thead>
              <tr>
                <th scope="col">
                  <div className="fr-cell--sort">
                    Nom
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
                    Email
                    <button
                      type="button"
                      className={sortButtonClass("email")}
                      aria-sort={sortAria("email")}
                      onClick={() => handleSort("email")}
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
                    Inscription
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
                <th scope="col">
                  <div className="fr-cell--sort">
                    Rôle
                    <button
                      type="button"
                      className={sortButtonClass("role")}
                      aria-sort={sortAria("role")}
                      onClick={() => handleSort("role")}
                    >
                      Trier
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link href={`/admin/users/${user.id}/activity`} className="fr-link">
                      {user.givenName} {user.usualName}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td style={{ textAlign: "right" }}>
                    {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="fr-td--toggle">
                    <div className="fr-toggle">
                      <input
                        type="checkbox"
                        className="fr-toggle__input"
                        id={`toggle-admin-${user.id}`}
                        checked={user.isAdmin}
                        onChange={() =>
                          handleToggleAdmin(user.id, user.isAdmin)
                        }
                      />
                      <label
                        className="fr-toggle__label"
                        htmlFor={`toggle-admin-${user.id}`}
                      >
                        {user.isAdmin ? (
                          <span className="fr-badge fr-badge--yellow-tournesol fr-badge--no-icon">
                            <span className="fr-icon-admin-fill fr-icon--sm" aria-hidden="true" style={{ marginRight: "0.25rem" }} />
                            Administrateur
                          </span>
                        ) : (
                          <span className="fr-badge fr-badge--no-icon">
                            <span className="fr-icon-user-line fr-icon--sm" aria-hidden="true" style={{ marginRight: "0.25rem" }} />
                            Utilisateur
                          </span>
                        )}
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
