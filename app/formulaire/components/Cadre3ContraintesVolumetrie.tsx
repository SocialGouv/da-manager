import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre3ContraintesVolumetrie({ daData, setDAData }: CadreProps) {
  return (
    <div>
      {/* Contraintes légales */}
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="contraintesLegales">
          Contraintes légales
        </label>
        <textarea
          className="fr-input"
          id="contraintesLegales"
          rows={6}
          value={daData.cadre3_ContraintesVolumetrie.contraintesLegales}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                contraintesLegales: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Contraintes métiers */}
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="contraintesMetiers">
          Contraintes métiers
        </label>
        <textarea
          className="fr-input"
          id="contraintesMetiers"
          rows={8}
          value={daData.cadre3_ContraintesVolumetrie.contraintesMetiers}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                contraintesMetiers: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Dépendances avec d'autres SI */}
      <h3 className="fr-h3 fr-mt-6w">Dépendances avec d'autres SI</h3>
      <div className="fr-table fr-table--no-caption fr-table--bordered">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Dépendances avec d'autres SI</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--lg">Système d'information</th>
                    <th scope="col" className="fr-col--sm" style={{ textAlign: 'center' }}>Fournisseur</th>
                    <th scope="col" className="fr-col--sm" style={{ textAlign: 'center' }}>Consommateur</th>
                    <th scope="col" className="fr-col--xs" style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={item.systemeInformation}
                          onChange={(e) => {
                            const newItems = [...daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI];
                            newItems[index].systemeInformation = e.target.value;
                            setDAData({
                              ...daData,
                              cadre3_ContraintesVolumetrie: {
                                ...daData.cadre3_ContraintesVolumetrie,
                                dependancesAvecDautresSI: newItems,
                              },
                            });
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={item.fournisseur}
                          onChange={(e) => {
                            const newItems = [...daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI];
                            newItems[index].fournisseur = e.target.checked;
                            setDAData({
                              ...daData,
                              cadre3_ContraintesVolumetrie: {
                                ...daData.cadre3_ContraintesVolumetrie,
                                dependancesAvecDautresSI: newItems,
                              },
                            });
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={item.consommateur}
                          onChange={(e) => {
                            const newItems = [...daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI];
                            newItems[index].consommateur = e.target.checked;
                            setDAData({
                              ...daData,
                              cadre3_ContraintesVolumetrie: {
                                ...daData.cadre3_ContraintesVolumetrie,
                                dependancesAvecDautresSI: newItems,
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
                            const newItems = daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI.filter(
                              (_, i) => i !== index
                            );
                            setDAData({
                              ...daData,
                              cadre3_ContraintesVolumetrie: {
                                ...daData.cadre3_ContraintesVolumetrie,
                                dependancesAvecDautresSI: newItems,
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
                  className="fr-btn fr-btn--sm"
                  type="button"
                  onClick={() => {
                    setDAData({
                      ...daData,
                      cadre3_ContraintesVolumetrie: {
                        ...daData.cadre3_ContraintesVolumetrie,
                        dependancesAvecDautresSI: [
                          ...daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI,
                          { systemeInformation: "", fournisseur: false, consommateur: false },
                        ],
                      },
                    });
                  }}
                >
                  + Ajouter une dépendance SI
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dépendances avec le poste de travail */}
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="dependancesAvecLePosteDeTravail">
          Dépendances avec le poste de travail
        </label>
        <textarea
          className="fr-input"
          id="dependancesAvecLePosteDeTravail"
          rows={4}
          value={daData.cadre3_ContraintesVolumetrie.dependancesAvecLePosteDeTravail}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                dependancesAvecLePosteDeTravail: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Niveau utilisabilité/sécurité en mode Tablette */}
      <h3 className="fr-h3 fr-mt-6w">
        Niveau d'utilisabilité/sécurité en mode Tablette
      </h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="tablette-mode-connecte">
              Mode Connecté
            </label>
            <select
              className="fr-select"
              id="tablette-mode-connecte"
              value={
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeTablette.modeConnecte
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    niveauUtilisabiliteSecuriteEnModeTablette: {
                      ...daData.cadre3_ContraintesVolumetrie
                        .niveauUtilisabiliteSecuriteEnModeTablette,
                      modeConnecte: e.target.value as
                        | "Néant"
                        | "Faible"
                        | "Moyen"
                        | "Fort",
                    },
                  },
                })
              }
            >
              <option value="Néant">Néant</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Fort">Fort</option>
            </select>
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="tablette-mode-deconnecte">
              Mode Déconnecté
            </label>
            <select
              className="fr-select"
              id="tablette-mode-deconnecte"
              value={
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeTablette.modeDeconnecte
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    niveauUtilisabiliteSecuriteEnModeTablette: {
                      ...daData.cadre3_ContraintesVolumetrie
                        .niveauUtilisabiliteSecuriteEnModeTablette,
                      modeDeconnecte: e.target.value as
                        | "Néant"
                        | "Faible"
                        | "Moyen"
                        | "Fort",
                    },
                  },
                })
              }
            >
              <option value="Néant">Néant</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Fort">Fort</option>
            </select>
          </div>
        </div>
      </div>
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="tablette-precisions">
          Précisions (si moyen/fort)
        </label>
        <textarea
          className="fr-input"
          id="tablette-precisions"
          rows={3}
          value={
            daData.cadre3_ContraintesVolumetrie
              .niveauUtilisabiliteSecuriteEnModeTablette.precisions
          }
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                niveauUtilisabiliteSecuriteEnModeTablette: {
                  ...daData.cadre3_ContraintesVolumetrie
                    .niveauUtilisabiliteSecuriteEnModeTablette,
                  precisions: e.target.value,
                },
              },
            })
          }
        />
      </div>

      {/* Niveau utilisabilité/sécurité en mode Smartphone */}
      <h3 className="fr-h3 fr-mt-6w">
        Niveau d'utilisabilité/sécurité en mode Smartphone
      </h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="smartphone-mode-connecte">
              Mode Connecté
            </label>
            <select
              className="fr-select"
              id="smartphone-mode-connecte"
              value={
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeSmartphone.modeConnecte
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    niveauUtilisabiliteSecuriteEnModeSmartphone: {
                      ...daData.cadre3_ContraintesVolumetrie
                        .niveauUtilisabiliteSecuriteEnModeSmartphone,
                      modeConnecte: e.target.value as
                        | "Néant"
                        | "Faible"
                        | "Moyen"
                        | "Fort",
                    },
                  },
                })
              }
            >
              <option value="Néant">Néant</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Fort">Fort</option>
            </select>
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="smartphone-mode-deconnecte">
              Mode Déconnecté
            </label>
            <select
              className="fr-select"
              id="smartphone-mode-deconnecte"
              value={
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeSmartphone.modeDeconnecte
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    niveauUtilisabiliteSecuriteEnModeSmartphone: {
                      ...daData.cadre3_ContraintesVolumetrie
                        .niveauUtilisabiliteSecuriteEnModeSmartphone,
                      modeDeconnecte: e.target.value as
                        | "Néant"
                        | "Faible"
                        | "Moyen"
                        | "Fort",
                    },
                  },
                })
              }
            >
              <option value="Néant">Néant</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Fort">Fort</option>
            </select>
          </div>
        </div>
      </div>
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="smartphone-precisions">
          Précisions (si moyen/fort)
        </label>
        <textarea
          className="fr-input"
          id="smartphone-precisions"
          rows={3}
          value={
            daData.cadre3_ContraintesVolumetrie
              .niveauUtilisabiliteSecuriteEnModeSmartphone.precisions
          }
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                niveauUtilisabiliteSecuriteEnModeSmartphone: {
                  ...daData.cadre3_ContraintesVolumetrie
                    .niveauUtilisabiliteSecuriteEnModeSmartphone,
                  precisions: e.target.value,
                },
              },
            })
          }
        />
      </div>

      {/* Mobile - Nombre d'appareils */}
      <h3 className="fr-h3 fr-mt-6w">Nombre d'appareils mobiles</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="tablette-ministere">
              Tablette Ministère
            </label>
            <input
              className="fr-input"
              type="number"
              id="tablette-ministere"
              value={daData.cadre3_ContraintesVolumetrie.mobile.tabletteMinistere}
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      tabletteMinistere: parseInt(e.target.value) || 0,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="tablette-personnel">
              Tablette Personnel
            </label>
            <input
              className="fr-input"
              type="number"
              id="tablette-personnel"
              value={daData.cadre3_ContraintesVolumetrie.mobile.tablettePersonnel}
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      tablettePersonnel: parseInt(e.target.value) || 0,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="smartphone-ministere">
              Smartphone Ministère
            </label>
            <input
              className="fr-input"
              type="number"
              id="smartphone-ministere"
              value={daData.cadre3_ContraintesVolumetrie.mobile.smartphoneMinistere}
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      smartphoneMinistere: parseInt(e.target.value) || 0,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="smartphone-personnel">
              Smartphone Personnel
            </label>
            <input
              className="fr-input"
              type="number"
              id="smartphone-personnel"
              value={daData.cadre3_ContraintesVolumetrie.mobile.smartphonePersonnel}
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      smartphonePersonnel: parseInt(e.target.value) || 0,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <h3 className="fr-h3 fr-mt-6w">Volumétrie données du SI Applicatif</h3>
      <p className="fr-text--sm">
        1 enregistrement = 1 macro-donnée métier au cœur du SI applicatif (ex: hébergement d'urgence, dossier médical, déclaration d'intérêt)
      </p>

      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="d1">
              D1 - Nombre enregistrements à récupérer
            </label>
            <input
              className="fr-input"
              type="text"
              id="d1"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d1_NombreEnregistrementsARecuperer
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d1_NombreEnregistrementsARecuperer: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="d2">
              D2 - Nombre enregistrements / an
            </label>
            <input
              className="fr-input"
              type="text"
              id="d2"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d2_NombreEnregistrementsParAn
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d2_NombreEnregistrementsParAn: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="d3">
              D3 - Taille moyenne enregistrement (KO)
            </label>
            <input
              className="fr-input"
              type="text"
              id="d3"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d3_TailleMoyenneEnregistrementKO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d3_TailleMoyenneEnregistrementKO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="d4">
              D4 - Nombre années enregistrements en base (BDD)
            </label>
            <input
              className="fr-input"
              type="text"
              id="d4"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d4_NombreAnneesEnregistrementsEnBaseBDD
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d4_NombreAnneesEnregistrementsEnBaseBDD: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="d5">
              D5 - Volume BDD Initial (GO) = (D1 × D3) / 1024²
            </label>
            <input
              className="fr-input"
              type="text"
              id="d5"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d5_VolumeBDDInitialGO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d5_VolumeBDDInitialGO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="d6">
              D6 - Volume BDD Annuel (GO) = (D2 × D3) / 1024²
            </label>
            <input
              className="fr-input"
              type="text"
              id="d6"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d6_VolumeBDDActuelGO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d6_VolumeBDDActuelGO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="d7">
              D7 - Volume BDD TOTAL (GO) = (D4 × D6) + D5
            </label>
            <input
              className="fr-input"
              type="text"
              id="d7"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d7_VolumeBDDTotalGO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d7_VolumeBDDTotalGO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="commentaires-volumetrie">
              Commentaires
            </label>
            <textarea
              className="fr-input"
              id="commentaires-volumetrie"
              rows={3}
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.commentaires
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      commentaires: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Volumétrie Fichiers du SI Applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Volumétrie Fichiers du SI Applicatif</h3>
      <p className="fr-text--sm">
        Les fichiers peuvent être liés à un enregistrement ou sans lien avec une base.
        Si 1er cas: F2 = D2 × nombre fichiers en moyenne par enregistrement
      </p>

      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="f1">
              F1 - Nombre de fichiers à récupérer
            </label>
            <input
              className="fr-input"
              type="text"
              id="f1"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f1_NombreDeFichiersARecuperer
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f1_NombreDeFichiersARecuperer: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="f2">
              F2 - Nombre de fichiers / an
            </label>
            <input
              className="fr-input"
              type="text"
              id="f2"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f2_NombreDeFichiersParAn
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f2_NombreDeFichiersParAn: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="f3">
              F3 - Taille moyenne d'un fichier (MO)
            </label>
            <input
              className="fr-input"
              type="text"
              id="f3"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f3_TailleMoyenneDunFichierMO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f3_TailleMoyenneDunFichierMO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="f4">
              F4 - Nombre années fichiers en File System (FS)
            </label>
            <input
              className="fr-input"
              type="text"
              id="f4"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f4_NombreAnneesFichiersEnFileSystemFS
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f4_NombreAnneesFichiersEnFileSystemFS: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="f5">
              F5 - Volume FS initial (GO) = (F1 × F3) / 1024
            </label>
            <input
              className="fr-input"
              type="text"
              id="f5"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f5_VolumeFSInitialGO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f5_VolumeFSInitialGO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="f6">
              F6 - Volume annuel (GO) = (F2 × F3) / 1024
            </label>
            <input
              className="fr-input"
              type="text"
              id="f6"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f6_VolumeFSActuelGO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f6_VolumeFSActuelGO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="f7">
              F7 - Volume FS TOTAL (GO) = (F4 × F6) + F5
            </label>
            <input
              className="fr-input"
              type="text"
              id="f7"
              value={
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f7_VolumeFSTotalGO
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f7_VolumeFSTotalGO: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Réduction volume données et fichiers */}
      <h3 className="fr-h3 fr-mt-6w">Réduction volume données et fichiers</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-checkbox-group">
            <input
              type="checkbox"
              id="purgeDonnees"
              checked={
                daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.purgeDonneesDansBDDApplicatif
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    reductionVolumeDonneesEtFichiers: {
                      ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                      purgeDonneesDansBDDApplicatif: e.target.checked,
                    },
                  },
                })
              }
            />
            <label className="fr-label" htmlFor="purgeDonnees">
              Purge données dans BDD applicatif
            </label>
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-checkbox-group">
            <input
              type="checkbox"
              id="purgeFichiers"
              checked={
                daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.purgeFichiersDansFSApplicatif
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    reductionVolumeDonneesEtFichiers: {
                      ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                      purgeFichiersDansFSApplicatif: e.target.checked,
                    },
                  },
                })
              }
            />
            <label className="fr-label" htmlFor="purgeFichiers">
              Purge fichiers dans FS applicatif
            </label>
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-checkbox-group">
            <input
              type="checkbox"
              id="archivageDonnees"
              checked={
                daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.archivageDonneesHorsApplicatif
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    reductionVolumeDonneesEtFichiers: {
                      ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                      archivageDonneesHorsApplicatif: e.target.checked,
                    },
                  },
                })
              }
            />
            <label className="fr-label" htmlFor="archivageDonnees">
              Archivage données hors applicatif
            </label>
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-checkbox-group">
            <input
              type="checkbox"
              id="archivageFichiers"
              checked={
                daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.archivageFichiersHorsApplicatif
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    reductionVolumeDonneesEtFichiers: {
                      ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                      archivageFichiersHorsApplicatif: e.target.checked,
                    },
                  },
                })
              }
            />
            <label className="fr-label" htmlFor="archivageFichiers">
              Archivage fichiers hors applicatif
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
