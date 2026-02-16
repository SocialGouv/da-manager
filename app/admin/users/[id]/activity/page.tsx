"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SharedDA {
  id: string;
  nom: string;
  createdAt: string;
  updatedAt: string;
  sharedAt: string;
}

interface LogEntry {
  id: string;
  createdAt: string;
  formId: string;
  formNom: string;
}

interface UserInfo {
  id: string;
  givenName: string | null;
  usualName: string | null;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function UserActivityPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<UserInfo | null>(null);
  const [sharedDAs, setSharedDAs] = useState<SharedDA[]>([]);
  const [editLogs, setEditLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/activity`);
        if (response.status === 403) {
          router.push("/");
          return;
        }
        if (response.status === 404) {
          setError("Utilisateur introuvable");
          return;
        }
        if (!response.ok) {
          throw new Error("Erreur lors du chargement");
        }
        const data = await response.json();
        setUser(data.user);
        setSharedDAs(data.sharedDAs);
        setEditLogs(data.editLogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [userId, router]);

  const formatUserName = (u: UserInfo) => {
    if (u.givenName || u.usualName) {
      return `${u.givenName || ""} ${u.usualName || ""}`.trim();
    }
    return u.email;
  };

  if (isLoading) {
    return (
      <div className="fr-container fr-my-4w">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fr-container fr-my-6w">
        <Link
          href="/users"
          className="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mb-3w"
          style={{ display: "inline-block" }}
        >
          Retour à la liste des utilisateurs
        </Link>
        <div className="fr-callout fr-callout--red-marianne">
          <p className="fr-callout__text">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="fr-container fr-my-6w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12">
          <Link
            href="/users"
            className="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mb-3w"
            style={{ display: "inline-block" }}
          >
            Retour à la liste des utilisateurs
          </Link>

          <h1 className="fr-h2 fr-mb-1w">{formatUserName(user)}</h1>
          <p className="fr-text--lg fr-mb-1w" style={{ color: "var(--text-mention-grey)" }}>
            {user.email}
          </p>
          <p className="fr-text--sm fr-mb-4w" style={{ color: "var(--text-mention-grey)" }}>
            {user.isAdmin ? (
              <span className="fr-badge fr-badge--yellow-tournesol fr-badge--no-icon fr-badge--sm">
                Administrateur
              </span>
            ) : (
              <span className="fr-badge fr-badge--no-icon fr-badge--sm">
                Utilisateur
              </span>
            )}
            {" · "}Inscrit le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
          </p>

          {/* Section 1: DA partagés */}
          <h2 className="fr-h4 fr-mb-2w">
            DA partagés ({sharedDAs.length})
          </h2>

          {sharedDAs.length > 0 ? (
            <div className="fr-table fr-table--no-caption fr-mb-6w">
              <div className="fr-table__wrapper">
                <div className="fr-table__container">
                  <div className="fr-table__content">
                    <table>
                      <caption>DA partagés</caption>
                      <thead>
                        <tr>
                          <th scope="col">Nom du DA</th>
                          <th scope="col" style={{ textAlign: "right" }}>
                            Dernière modification
                          </th>
                          <th scope="col" style={{ textAlign: "right" }}>
                            Partagé le
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sharedDAs.map((da) => (
                          <tr key={da.id}>
                            <td>
                              <Link href={`/view/${da.id}`} className="fr-link">
                                {da.nom}
                              </Link>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {new Date(da.updatedAt).toLocaleDateString("fr-FR")}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {new Date(da.sharedAt).toLocaleDateString("fr-FR")}
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
            <div className="fr-callout fr-mb-6w">
              <p className="fr-callout__text">
                Aucun DA partagé avec cet utilisateur.
              </p>
            </div>
          )}

          {/* Section 2: Historique des modifications */}
          <h2 className="fr-h4 fr-mb-2w">
            Historique des modifications ({editLogs.length})
          </h2>

          {editLogs.length > 0 ? (
            <div className="fr-table fr-table--no-caption">
              <div className="fr-table__wrapper">
                <div className="fr-table__container">
                  <div className="fr-table__content">
                    <table>
                      <caption>Historique des modifications</caption>
                      <thead>
                        <tr>
                          <th scope="col">Document d&apos;Architecture</th>
                          <th scope="col" style={{ textAlign: "right" }}>
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {editLogs.map((log) => (
                          <tr key={log.id}>
                            <td>
                              <Link href={`/view/${log.formId}`} className="fr-link">
                                {log.formNom}
                              </Link>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {new Date(log.createdAt).toLocaleString("fr-FR")}
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
            <div className="fr-callout">
              <p className="fr-callout__text">
                Aucune modification enregistrée.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
