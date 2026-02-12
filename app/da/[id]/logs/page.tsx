"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LogEntry {
  id: string;
  createdAt: string;
  userName: string | null;
  userGivenName: string | null;
  userEmail: string | null;
}

export default function LogsPage() {
  const params = useParams();
  const formId = params.id as string;

  const [daNom, setDaNom] = useState<string>("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [daRes, logsRes] = await Promise.all([
          fetch(`/api/da/${formId}`),
          fetch(`/api/da/${formId}/logs`),
        ]);
        if (daRes.ok) {
          const da = await daRes.json();
          setDaNom(da.nom);
        }
        if (logsRes.ok) {
          const data = await logsRes.json();
          setLogs(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [formId]);

  const formatUserName = (log: LogEntry) => {
    if (log.userGivenName || log.userName) {
      return `${log.userGivenName || ""} ${log.userName || ""}`.trim();
    }
    return log.userEmail || "Utilisateur inconnu";
  };

  return (
    <main className="fr-container fr-my-6w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <Link href="/" className="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mb-3w" style={{ display: "inline-block" }}>
            Retour à la liste des DA
          </Link>

          <h1 className="fr-h2 fr-mb-1w">Historique des modifications</h1>
          {daNom && (
            <p className="fr-text--lg fr-text--bold fr-mb-4w">{daNom}</p>
          )}

          {isLoading ? (
            <p>Chargement...</p>
          ) : logs.length > 0 ? (
            <div className="fr-table fr-table--no-caption">
              <div className="fr-table__wrapper">
                <div className="fr-table__container">
                  <div className="fr-table__content">
                    <table>
                      <caption>Historique des modifications</caption>
                      <thead>
                        <tr>
                          <th scope="col">Utilisateur</th>
                          <th scope="col" style={{ textAlign: "right" }}>
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log) => (
                          <tr key={log.id}>
                            <td>
                              <strong>{formatUserName(log)}</strong>
                              {log.userEmail && (
                                <>
                                  <br />
                                  <span className="fr-text--xs fr-text--mention-grey">
                                    {log.userEmail}
                                  </span>
                                </>
                              )}
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
            <div className="fr-callout fr-callout--info">
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
