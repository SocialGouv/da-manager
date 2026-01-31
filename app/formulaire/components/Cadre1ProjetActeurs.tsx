import type { DAData } from "@/types/da.types";
import Button from "@codegouvfr/react-dsfr/Button";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre1ProjetActeurs({ daData, setDAData }: CadreProps) {
  return (
    <div>
      {/* Nom du projet applicatif */}
      <h3 className="fr-h3 fr-mt-4w">Nom du projet applicatif</h3>
      <input
        className="fr-input"
        id="nomDuProjet"
        type="text"
        value={daData.cadre1_ProjetActeurs.nomDuProjet}
        onChange={(e) =>
          setDAData({
            ...daData,
            cadre1_ProjetActeurs: {
              ...daData.cadre1_ProjetActeurs,
              nomDuProjet: e.target.value,
            },
          })
        }
      />

      {/* Contexte projet applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Contexte projet applicatif</h3>
      <textarea
        className="fr-input"
        id="contexteProjetApplicatif"
        rows={5}
        value={daData.cadre1_ProjetActeurs.contexteProjetApplicatif}
        onChange={(e) =>
          setDAData({
            ...daData,
            cadre1_ProjetActeurs: {
              ...daData.cadre1_ProjetActeurs,
              contexteProjetApplicatif: e.target.value,
            },
          })
        }
      />

      {/* Enjeux projet applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Enjeux projet applicatif</h3>
      <textarea
        className="fr-input"
        id="enjeuxProjetApplicatif"
        rows={5}
        value={daData.cadre1_ProjetActeurs.enjeuxProjetApplicatif}
        onChange={(e) =>
          setDAData({
            ...daData,
            cadre1_ProjetActeurs: {
              ...daData.cadre1_ProjetActeurs,
              enjeuxProjetApplicatif: e.target.value,
            },
          })
        }
      />

      {/* Objectifs projet applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Objectifs projet applicatif</h3>
      <textarea
        className="fr-input"
        id="objectifsProjetApplicatif"
        rows={5}
        value={daData.cadre1_ProjetActeurs.objectifsProjetApplicatif}
        onChange={(e) =>
          setDAData({
            ...daData,
            cadre1_ProjetActeurs: {
              ...daData.cadre1_ProjetActeurs,
              objectifsProjetApplicatif: e.target.value,
            },
          })
        }
      />

      {/* Planning projet */}
      <h3 className="fr-h3 fr-mt-6w">Planning projet</h3>
      <div className="fr-table fr-table--no-caption fr-table--bordered">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Planning projet</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--sm">Version</th>
                    <th scope="col" className="fr-col--sm">Date</th>
                    <th scope="col" className="fr-col--lg">Commentaires</th>
                    <th scope="col" className="fr-col--xs" style={{ textAlign: 'right' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre1_ProjetActeurs.planningProjet.map((item, index) => (
                    <tr key={index}>
                      <td className="fr-bg-info">
                        <input
                          className="fr-input"
                          type="text"
                          value={item.version}
                          onChange={(e) => {
                            const newPlanning = [...daData.cadre1_ProjetActeurs.planningProjet];
                            newPlanning[index].version = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                planningProjet: newPlanning,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={item.date}
                          onChange={(e) => {
                            const newPlanning = [...daData.cadre1_ProjetActeurs.planningProjet];
                            newPlanning[index].date = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                planningProjet: newPlanning,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={item.commentaires}
                          onChange={(e) => {
                            const newPlanning = [...daData.cadre1_ProjetActeurs.planningProjet];
                            newPlanning[index].commentaires = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                planningProjet: newPlanning,
                              },
                            });
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Button
                          priority="secondary"
                          size="small"
                          iconId="fr-icon-delete-line"
                          title="Supprimer"
                          onClick={() => {
                            const newPlanning = daData.cadre1_ProjetActeurs.planningProjet.filter((_, i) => i !== index);
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                planningProjet: newPlanning,
                              },
                            });
                          }}
                        />
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
                      cadre1_ProjetActeurs: {
                        ...daData.cadre1_ProjetActeurs,
                        planningProjet: [
                          ...daData.cadre1_ProjetActeurs.planningProjet,
                          {
                            version: "",
                            date: "",
                            commentaires: "",
                          },
                        ],
                      },
                    });
                  }}
                >
                  <span className="fr-icon-add-line" aria-hidden="true"></span>
                  Ajouter une version
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acteurs du projet */}
      <h3 className="fr-h3 fr-mt-6w">Acteurs du projet</h3>
      <div className="fr-table fr-table--no-caption fr-table--bordered">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Acteurs du projet</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--lg">Rôle</th>
                    <th scope="col" className="fr-col--md">Nom</th>
                    <th scope="col" className="fr-col--md">Fonction</th>
                    <th scope="col" className="fr-col--md">Entité</th>
                    <th scope="col" className="fr-col--xs" style={{ textAlign: 'right' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre1_ProjetActeurs.acteursDuProjet.map((item, index) => (
                    <tr key={index}>
                      <td className="fr-bg-info">
                        <input
                          className="fr-input"
                          type="text"
                          value={item.role}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursDuProjet];
                            newActeurs[index].role = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursDuProjet: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={item.nom}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursDuProjet];
                            newActeurs[index].nom = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursDuProjet: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={item.fonction}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursDuProjet];
                            newActeurs[index].fonction = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursDuProjet: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={item.entite}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursDuProjet];
                            newActeurs[index].entite = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursDuProjet: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Button
                          priority="secondary"
                          size="small"
                          iconId="fr-icon-delete-line"
                          title="Supprimer"
                          onClick={() => {
                            const newActeurs = daData.cadre1_ProjetActeurs.acteursDuProjet.filter((_, i) => i !== index);
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursDuProjet: newActeurs,
                              },
                            });
                          }}
                        />
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
                      cadre1_ProjetActeurs: {
                        ...daData.cadre1_ProjetActeurs,
                        acteursDuProjet: [
                          ...daData.cadre1_ProjetActeurs.acteursDuProjet,
                          {
                            role: "",
                            nom: "",
                            fonction: "",
                            entite: "",
                          },
                        ],
                      },
                    });
                  }}
                >
                  <span className="fr-icon-add-line" aria-hidden="true"></span>
                  Ajouter un acteur
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acteurs métiers du SI applicatif - Tableau DYNAMIQUE */}
      <h3 className="fr-h3 fr-mt-6w">Acteurs métiers du SI applicatif</h3>
      <p className="fr-text--sm fr-mb-2w">M = Ministère, R = Réseau interministériel, E = Extranet, P = Public</p>
      <div className="fr-table fr-table--no-caption fr-table--bordered">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Acteurs métiers du SI applicatif</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--lg" rowSpan={2}>Profils acteurs</th>
                    <th scope="col" colSpan={4} style={{ textAlign: 'center' }}>Nombre utilisateurs</th>
                    <th scope="col" className="fr-col--xs" rowSpan={2} style={{ textAlign: 'right' }}></th>
                  </tr>
                  <tr>
                    <th scope="col" className="fr-col--sm fr-bg-red" style={{ textAlign: 'center' }}>M</th>
                    <th scope="col" className="fr-col--sm fr-bg-orange" style={{ textAlign: 'center' }}>R</th>
                    <th scope="col" className="fr-col--sm fr-bg-yellow" style={{ textAlign: 'center' }}>E</th>
                    <th scope="col" className="fr-col--sm fr-bg-green" style={{ textAlign: 'center' }}>P</th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.map((item, index) => (
                    <tr key={index}>
                      <td className="fr-bg-info">
                        <input
                          className="fr-input"
                          type="text"
                          value={item.profilsActeurs}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                            newActeurs[index].profilsActeurs = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursMetiersDuSIApplicatif: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="number"
                          value={item.nombreUtilisateursM}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                            newActeurs[index].nombreUtilisateursM = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursMetiersDuSIApplicatif: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="number"
                          value={item.nombreUtilisateursR}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                            newActeurs[index].nombreUtilisateursR = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursMetiersDuSIApplicatif: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="number"
                          value={item.nombreUtilisateursE}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                            newActeurs[index].nombreUtilisateursE = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursMetiersDuSIApplicatif: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="number"
                          value={item.nombreUtilisateursP}
                          onChange={(e) => {
                            const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                            newActeurs[index].nombreUtilisateursP = e.target.value;
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursMetiersDuSIApplicatif: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Button
                          priority="secondary"
                          size="small"
                          iconId="fr-icon-delete-line"
                          title="Supprimer"
                          onClick={() => {
                            const newActeurs = daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.filter((_, i) => i !== index);
                            setDAData({
                              ...daData,
                              cadre1_ProjetActeurs: {
                                ...daData.cadre1_ProjetActeurs,
                                acteursMetiersDuSIApplicatif: newActeurs,
                              },
                            });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                  {/* Ligne Total */}
                  <tr>
                    <td><strong>Total utilisateurs</strong></td>
                    <td className="fr-bg-red">
                      <input
                        className="fr-input fr-input--bold"
                        type="number"
                        value={daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                          (sum, item) => sum + (parseInt(item.nombreUtilisateursM) || 0),
                          0
                        )}
                        readOnly
                      />
                    </td>
                    <td className="fr-bg-orange">
                      <input
                        className="fr-input fr-input--bold"
                        type="number"
                        value={daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                          (sum, item) => sum + (parseInt(item.nombreUtilisateursR) || 0),
                          0
                        )}
                        readOnly
                      />
                    </td>
                    <td className="fr-bg-yellow">
                      <input
                        className="fr-input fr-input--bold"
                        type="number"
                        value={daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                          (sum, item) => sum + (parseInt(item.nombreUtilisateursE) || 0),
                          0
                        )}
                        readOnly
                      />
                    </td>
                    <td className="fr-bg-green">
                      <input
                        className="fr-input fr-input--bold"
                        type="number"
                        value={daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                          (sum, item) => sum + (parseInt(item.nombreUtilisateursP) || 0),
                          0
                        )}
                        readOnly
                      />
                    </td>
                    <td></td>
                  </tr>
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
                      cadre1_ProjetActeurs: {
                        ...daData.cadre1_ProjetActeurs,
                        acteursMetiersDuSIApplicatif: [
                          ...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif,
                          {
                            profilsActeurs: "",
                            nombreUtilisateursM: "0",
                            nombreUtilisateursR: "0",
                            nombreUtilisateursE: "0",
                            nombreUtilisateursP: "0",
                          },
                        ],
                      },
                    });
                  }}
                >
                  <span className="fr-icon-add-line" aria-hidden="true"></span>
                  Ajouter un profil acteur
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
