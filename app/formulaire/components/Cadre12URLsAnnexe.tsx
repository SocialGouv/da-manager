import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre12URLsAnnexe({ daData, setDAData }: CadreProps) {
  return (
    <div>
      {/* URLs Applicatives */}
      <h3 className="fr-h3">URLs Applicatives</h3>
      <div className="fr-table">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <thead>
                  <tr>
                    <th>Libellé URL</th>
                    <th>Acteur Appelant</th>
                    <th>Ressource Appelée</th>
                    <th>Fonctionnalité/Service Fourni</th>
                    <th>Données Transitent</th>
                    <th>Précisions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre12_URLs.urls.map((url, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={url.libelleURL}
                          onChange={(e) => {
                            const newURLs = [...daData.cadre12_URLs.urls];
                            newURLs[index].libelleURL = e.target.value;
                            setDAData({
                              ...daData,
                              cadre12_URLs: {
                                urls: newURLs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={url.acteurAppelant}
                          onChange={(e) => {
                            const newURLs = [...daData.cadre12_URLs.urls];
                            newURLs[index].acteurAppelant = e.target.value;
                            setDAData({
                              ...daData,
                              cadre12_URLs: {
                                urls: newURLs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={url.ressourceAppelee}
                          onChange={(e) => {
                            const newURLs = [...daData.cadre12_URLs.urls];
                            newURLs[index].ressourceAppelee = e.target.value;
                            setDAData({
                              ...daData,
                              cadre12_URLs: {
                                urls: newURLs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={url.fonctionnaliteOuServiceFourni}
                          onChange={(e) => {
                            const newURLs = [...daData.cadre12_URLs.urls];
                            newURLs[index].fonctionnaliteOuServiceFourni = e.target.value;
                            setDAData({
                              ...daData,
                              cadre12_URLs: {
                                urls: newURLs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={url.donneesTransitent}
                          onChange={(e) => {
                            const newURLs = [...daData.cadre12_URLs.urls];
                            newURLs[index].donneesTransitent = e.target.value;
                            setDAData({
                              ...daData,
                              cadre12_URLs: {
                                urls: newURLs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={url.precisions}
                          onChange={(e) => {
                            const newURLs = [...daData.cadre12_URLs.urls];
                            newURLs[index].precisions = e.target.value;
                            setDAData({
                              ...daData,
                              cadre12_URLs: {
                                urls: newURLs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="fr-btn fr-btn--sm fr-btn--secondary"
                          type="button"
                          title="Supprimer"
                          onClick={() => {
                            const newURLs = daData.cadre12_URLs.urls.filter((_, i) => i !== index);
                            setDAData({
                              ...daData,
                              cadre12_URLs: {
                                urls: newURLs,
                              },
                            });
                          }}
                        >
                          <span className="fr-icon-delete-line" aria-hidden="true"></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="fr-table__footer">
          <div className="fr-table__footer--end">
            <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-md">
              <li>
                <button
                  className="fr-btn fr-btn--secondary"
                  onClick={() => {
                    setDAData({
                      ...daData,
                      cadre12_URLs: {
                        urls: [
                          ...daData.cadre12_URLs.urls,
                          {
                            libelleURL: "",
                            acteurAppelant: "",
                            ressourceAppelee: "",
                            fonctionnaliteOuServiceFourni: "",
                            donneesTransitent: "",
                            precisions: "",
                          },
                        ],
                      },
                    });
                  }}
                >
                  <span className="fr-icon-add-line" aria-hidden="true"></span>
                  Ajouter une URL applicative
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Annexe : Suivi des changements */}
      <h3 className="fr-h3 fr-mt-6w">Annexe : Suivi des Changements</h3>

      <div className="fr-input-group">
        <label className="fr-label" htmlFor="versionnage">
          Versionnage (X.Y.Z.K)
        </label>
        <input
          className="fr-input"
          id="versionnage"
          type="text"
          placeholder="1.0.0.0"
          value={daData.annexe_SuiviChangements.versionnage}
          onChange={(e) =>
            setDAData({
              ...daData,
              annexe_SuiviChangements: {
                ...daData.annexe_SuiviChangements,
                versionnage: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="fr-table">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Date</th>
                    <th>Demandeur Changement</th>
                    <th>Rapporteur Changement</th>
                    <th>Description Détaillée</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {daData.annexe_SuiviChangements.changements.map((changement, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          placeholder="x.y.z"
                          value={changement.version}
                          onChange={(e) => {
                            const newChangements = [...daData.annexe_SuiviChangements.changements];
                            newChangements[index].version = e.target.value;
                            setDAData({
                              ...daData,
                              annexe_SuiviChangements: {
                                ...daData.annexe_SuiviChangements,
                                changements: newChangements,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="date"
                          value={changement.date}
                          onChange={(e) => {
                            const newChangements = [...daData.annexe_SuiviChangements.changements];
                            newChangements[index].date = e.target.value;
                            setDAData({
                              ...daData,
                              annexe_SuiviChangements: {
                                ...daData.annexe_SuiviChangements,
                                changements: newChangements,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={changement.demandeurChangement}
                          onChange={(e) => {
                            const newChangements = [...daData.annexe_SuiviChangements.changements];
                            newChangements[index].demandeurChangement = e.target.value;
                            setDAData({
                              ...daData,
                              annexe_SuiviChangements: {
                                ...daData.annexe_SuiviChangements,
                                changements: newChangements,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={changement.rapporteurChangement}
                          onChange={(e) => {
                            const newChangements = [...daData.annexe_SuiviChangements.changements];
                            newChangements[index].rapporteurChangement = e.target.value;
                            setDAData({
                              ...daData,
                              annexe_SuiviChangements: {
                                ...daData.annexe_SuiviChangements,
                                changements: newChangements,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={changement.descriptionDetaillee}
                          onChange={(e) => {
                            const newChangements = [...daData.annexe_SuiviChangements.changements];
                            newChangements[index].descriptionDetaillee = e.target.value;
                            setDAData({
                              ...daData,
                              annexe_SuiviChangements: {
                                ...daData.annexe_SuiviChangements,
                                changements: newChangements,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="fr-btn fr-btn--sm fr-btn--secondary"
                          type="button"
                          title="Supprimer"
                          onClick={() => {
                            const newChangements = daData.annexe_SuiviChangements.changements.filter(
                              (_, i) => i !== index
                            );
                            setDAData({
                              ...daData,
                              annexe_SuiviChangements: {
                                ...daData.annexe_SuiviChangements,
                                changements: newChangements,
                              },
                            });
                          }}
                        >
                          <span className="fr-icon-delete-line" aria-hidden="true"></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="fr-table__footer">
          <div className="fr-table__footer--end">
            <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-md">
              <li>
                <button
                  className="fr-btn fr-btn--secondary"
                  onClick={() => {
                    setDAData({
                      ...daData,
                      annexe_SuiviChangements: {
                        ...daData.annexe_SuiviChangements,
                        changements: [
                          ...daData.annexe_SuiviChangements.changements,
                          {
                            version: "",
                            date: "",
                            demandeurChangement: "",
                            rapporteurChangement: "",
                            descriptionDetaillee: "",
                          },
                        ],
                      },
                    });
                  }}
                >
                  <span className="fr-icon-add-line" aria-hidden="true"></span>
                  Ajouter un changement
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
