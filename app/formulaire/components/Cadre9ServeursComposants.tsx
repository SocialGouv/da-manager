import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre9ServeursComposants({ daData, setDAData }: CadreProps) {
  return (
    <div>
      {daData.cadre9_ServeursComposants.serveurs.map((serveur, serveurIndex) => (
        <div key={serveurIndex} className="fr-mb-6w" style={{ border: "1px solid #ddd", padding: "1rem" }}>
          <h3 className="fr-h3">Serveur {serveurIndex + 1}</h3>

          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-6">
              <div className="fr-input-group">
                <label className="fr-label" htmlFor={`nomServeur-${serveurIndex}`}>
                  Nom du serveur (logique)
                </label>
                <input
                  className="fr-input"
                  type="text"
                  id={`nomServeur-${serveurIndex}`}
                  value={serveur.nomServeur}
                  onChange={(e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].nomServeur = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="fr-col-6">
              <div className="fr-select-group">
                <label className="fr-label" htmlFor={`type-${serveurIndex}`}>
                  Type
                </label>
                <select
                  className="fr-select"
                  id={`type-${serveurIndex}`}
                  value={serveur.type}
                  onChange={(e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].type = e.target.value as "Machine Virtuelle" | "Container" | "Serverless" | "Bare Metal";
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  }}
                >
                  <option value="Machine Virtuelle">Machine Virtuelle</option>
                  <option value="Container">Container</option>
                  <option value="Serverless">Serverless</option>
                  <option value="Bare Metal">Bare Metal</option>
                </select>
              </div>
            </div>
          </div>

          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-4">
              <div className="fr-input-group">
                <label className="fr-label" htmlFor={`role-${serveurIndex}`}>
                  Rôle
                </label>
                <input
                  className="fr-input"
                  type="text"
                  id={`role-${serveurIndex}`}
                  value={serveur.role}
                  onChange={(e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].role = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="fr-col-4">
              <div className="fr-input-group">
                <label className="fr-label" htmlFor={`vCPU-${serveurIndex}`}>
                  vCPU
                </label>
                <input
                  className="fr-input"
                  type="number"
                  id={`vCPU-${serveurIndex}`}
                  min={0}
                  value={serveur.vCPU}
                  onChange={(e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].vCPU = parseInt(e.target.value) || 0;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="fr-col-4">
              <div className="fr-input-group">
                <label className="fr-label" htmlFor={`ramGO-${serveurIndex}`}>
                  RAM (GO)
                </label>
                <input
                  className="fr-input"
                  type="number"
                  id={`ramGO-${serveurIndex}`}
                  min={0}
                  value={serveur.ramGO}
                  onChange={(e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].ramGO = parseInt(e.target.value) || 0;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <h4 className="fr-h4 fr-mt-4w">Composants Logiciels</h4>
          <div className="fr-table fr-table--no-caption fr-table--bordered">
            <div className="fr-table__wrapper">
              <div className="fr-table__container">
                <div className="fr-table__content">
                  <table>
                    <caption>Composants Logiciels</caption>
                    <thead>
                      <tr>
                        <th scope="col" className="fr-col--md">Catégorie</th>
                        <th scope="col" className="fr-col--md">Composant</th>
                        <th scope="col" className="fr-col--sm">Version</th>
                        <th scope="col" className="fr-col--md">Rôle</th>
                        <th scope="col" className="fr-col--xs" style={{ textAlign: 'right' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {serveur.composantsLogiciels.map((composant, composantIndex) => (
                        <tr key={composantIndex}>
                          <td>
                            <input
                              className="fr-input"
                              type="text"
                              value={composant.categorie}
                              onChange={(e) => {
                                const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                                newServeurs[serveurIndex].composantsLogiciels[composantIndex].categorie = e.target.value;
                                setDAData({
                                  ...daData,
                                  cadre9_ServeursComposants: {
                                    serveurs: newServeurs,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              className="fr-input"
                              type="text"
                              value={composant.composant}
                              onChange={(e) => {
                                const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                                newServeurs[serveurIndex].composantsLogiciels[composantIndex].composant = e.target.value;
                                setDAData({
                                  ...daData,
                                  cadre9_ServeursComposants: {
                                    serveurs: newServeurs,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              className="fr-input"
                              type="text"
                              value={composant.version}
                              onChange={(e) => {
                                const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                                newServeurs[serveurIndex].composantsLogiciels[composantIndex].version = e.target.value;
                                setDAData({
                                  ...daData,
                                  cadre9_ServeursComposants: {
                                    serveurs: newServeurs,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              className="fr-input"
                              type="text"
                              value={composant.role}
                              onChange={(e) => {
                                const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                                newServeurs[serveurIndex].composantsLogiciels[composantIndex].role = e.target.value;
                                setDAData({
                                  ...daData,
                                  cadre9_ServeursComposants: {
                                    serveurs: newServeurs,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              className="fr-btn fr-btn--sm fr-btn--secondary"
                              type="button"
                              onClick={() => {
                                const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                                newServeurs[serveurIndex].composantsLogiciels = newServeurs[serveurIndex].composantsLogiciels.filter(
                                  (_, i) => i !== composantIndex
                                );
                                setDAData({
                                  ...daData,
                                  cadre9_ServeursComposants: {
                                    serveurs: newServeurs,
                                  },
                                });
                              }}
                            >
                              Supprimer
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
                      type="button"
                      onClick={() => {
                        const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                        newServeurs[serveurIndex].composantsLogiciels.push({
                          categorie: "",
                          composant: "",
                          version: "",
                          role: "",
                        });
                        setDAData({
                          ...daData,
                          cadre9_ServeursComposants: {
                            serveurs: newServeurs,
                          },
                        });
                      }}
                    >
                      <span className="fr-icon-add-line" aria-hidden="true"></span>
                      Ajouter un composant logiciel
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="fr-mt-2w">
            <button
              className="fr-btn fr-btn--sm fr-btn--secondary"
              type="button"
              onClick={() => {
                const newServeurs = daData.cadre9_ServeursComposants.serveurs.filter(
                  (_, i) => i !== serveurIndex
                );
                setDAData({
                  ...daData,
                  cadre9_ServeursComposants: {
                    serveurs: newServeurs,
                  },
                });
              }}
            >
              Supprimer ce serveur
            </button>
          </div>
        </div>
      ))}

      <button
        className="fr-btn fr-btn--sm"
        type="button"
        onClick={() => {
          setDAData({
            ...daData,
            cadre9_ServeursComposants: {
              serveurs: [
                ...daData.cadre9_ServeursComposants.serveurs,
                {
                  nomServeur: "",
                  type: "Machine Virtuelle",
                  role: "",
                  vCPU: 0,
                  ramGO: 0,
                  composantsLogiciels: [],
                },
              ],
            },
          });
        }}
      >
        <span className="fr-icon-add-line" aria-hidden="true"></span>
        Ajouter un serveur
      </button>
    </div>
  );
}
