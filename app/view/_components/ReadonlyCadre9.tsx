import type { DAData } from "@/types/da.types";

interface ReadonlyCadreProps {
  daData: DAData;
}

export default function ReadonlyCadre9({ daData }: ReadonlyCadreProps) {
  const serveurs = daData.cadre9_ServeursComposants.serveurs.filter(
    (s) => s.nomServeur.trim() !== ""
  );

  if (serveurs.length === 0) {
    return (
      <div className="fr-callout">
        <p className="fr-callout__text">Aucun serveur défini</p>
      </div>
    );
  }

  return (
    <div>
      {serveurs.map((serveur, index) => (
        <div key={index} className="fr-mb-6w" style={{ border: "1px solid var(--border-default-grey)", padding: "1rem" }}>
          <h3 className="fr-h3">{serveur.nomServeur}</h3>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-4">
              <p className="fr-text--bold fr-text--sm fr-mb-0">Type</p>
              <p className="fr-text--sm">{serveur.type}</p>
            </div>
            <div className="fr-col-4">
              <p className="fr-text--bold fr-text--sm fr-mb-0">Rôle</p>
              <p className="fr-text--sm">{serveur.role || "—"}</p>
            </div>
            <div className="fr-col-2">
              <p className="fr-text--bold fr-text--sm fr-mb-0">vCPU</p>
              <p className="fr-text--sm">{serveur.vCPU}</p>
            </div>
            <div className="fr-col-2">
              <p className="fr-text--bold fr-text--sm fr-mb-0">RAM (GO)</p>
              <p className="fr-text--sm">{serveur.ramGO}</p>
            </div>
          </div>

          {serveur.composantsLogiciels.filter(c => c.composant.trim() !== "").length > 0 && (
            <>
              <h4 className="fr-h4 fr-mt-4w">Composants Logiciels</h4>
              <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
                <div className="fr-table__wrapper">
                  <div className="fr-table__container">
                    <div className="fr-table__content">
                      <table>
                        <caption>Composants Logiciels</caption>
                        <thead>
                          <tr>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Composant</th>
                            <th scope="col">Version</th>
                            <th scope="col">Rôle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serveur.composantsLogiciels
                            .filter(c => c.composant.trim() !== "")
                            .map((composant, ci) => (
                              <tr key={ci}>
                                <td>{composant.categorie}</td>
                                <td>{composant.composant}</td>
                                <td>{composant.version}</td>
                                <td>{composant.role}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
