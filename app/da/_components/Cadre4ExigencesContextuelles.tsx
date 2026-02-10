import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre4ExigencesContextuelles({
  daData,
  setDAData,
}: CadreProps) {
  return (
    <div>
      {/* Echelle DICT EBIOS (1 à 4) – global SI */}
      <h3 className="fr-h3 fr-mt-6w">Echelle DICT EBIOS (1 à 4) – global SI</h3>
      <p className="fr-text--sm">
        Niveau de 1 à 4 pour chaque exigence (Disponibilité, Intégrité,
        Confidentialité, Traçabilité)
      </p>

      <h4 className="fr-h4 fr-mt-4w">Disponibilité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="dispo-front">
              Niveau Front (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="dispo-front"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceDisponibilite_NiveauFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_NiveauFront:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="dispo-front-prec">
              Précisions Front
            </label>
            <input
              className="fr-input"
              type="text"
              id="dispo-front-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceDisponibilite_PrecisionsFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_PrecisionsFront: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="dispo-back">
              Niveau Back (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="dispo-back"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceDisponibilite_NiveauBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_NiveauBack:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="dispo-back-prec">
              Précisions Back
            </label>
            <input
              className="fr-input"
              type="text"
              id="dispo-back-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceDisponibilite_PrecisionsBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_PrecisionsBack: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <h4 className="fr-h4 fr-mt-4w">Intégrité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="integrite-front">
              Niveau Front (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="integrite-front"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_NiveauFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_NiveauFront:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="integrite-front-prec">
              Précisions Front
            </label>
            <input
              className="fr-input"
              type="text"
              id="integrite-front-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceIntegrite_PrecisionsFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_PrecisionsFront: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="integrite-back">
              Niveau Back (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="integrite-back"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_NiveauBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_NiveauBack:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="integrite-back-prec">
              Précisions Back
            </label>
            <input
              className="fr-input"
              type="text"
              id="integrite-back-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceIntegrite_PrecisionsBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_PrecisionsBack: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <h4 className="fr-h4 fr-mt-4w">Confidentialité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="confid-front">
              Niveau Front (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="confid-front"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceConfidentialite_NiveauFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_NiveauFront:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="confid-front-prec">
              Précisions Front
            </label>
            <input
              className="fr-input"
              type="text"
              id="confid-front-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceConfidentialite_PrecisionsFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_PrecisionsFront: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="confid-back">
              Niveau Back (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="confid-back"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceConfidentialite_NiveauBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_NiveauBack:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="confid-back-prec">
              Précisions Back
            </label>
            <input
              className="fr-input"
              type="text"
              id="confid-back-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceConfidentialite_PrecisionsBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_PrecisionsBack: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <h4 className="fr-h4 fr-mt-4w">Traçabilité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="trace-front">
              Niveau Front (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="trace-front"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceTracabilite_NiveauFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_NiveauFront:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="trace-front-prec">
              Précisions Front
            </label>
            <input
              className="fr-input"
              type="text"
              id="trace-front-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceTracabilite_PrecisionsFront
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_PrecisionsFront: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-3">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="trace-back">
              Niveau Back (1-4)
            </label>
            <input
              className="fr-input"
              type="number"
              id="trace-back"
              min={1}
              max={4}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI.exigenceTracabilite_NiveauBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_NiveauBack:
                        parseInt(e.target.value) || 1,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-9">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="trace-back-prec">
              Précisions Back
            </label>
            <input
              className="fr-input"
              type="text"
              id="trace-back-prec"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleDICT_EBIOS_1a4_GlobalSI
                  .exigenceTracabilite_PrecisionsBack
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_PrecisionsBack: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Exigence PREUVE par fonctionnalité (cadre 2) */}
      <h3 className="fr-h3 fr-mt-6w">
        Exigence PREUVE par fonctionnalité (cadre 2)
      </h3>
      <p className="fr-text--sm">
        Les exigences de preuves se traduisent sur : la traçabilité des actions,
        l&apos;authentification des utilisateurs, l&apos;imputabilité du
        responsable de l&apos;action
      </p>
      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Exigence PREUVE par fonctionnalité</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--md">
                      Fonctionnalité
                    </th>
                    <th scope="col" className="fr-col--md">
                      Description Exigence Preuve
                    </th>
                    <th
                      scope="col"
                      className="fr-col--xs"
                      style={{ textAlign: "right" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre4_ExigencesContextuelles.exigencePREUVE_ParFonctionnalite.map(
                    (item, index) => (
                      <tr key={index}>
                        <td className="fr-bg-info">
                          <textarea
                            className="fr-table-input"
                            rows={2}
                            value={item.fonctionnalite}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .exigencePREUVE_ParFonctionnalite,
                              ];
                              newItems[index].fonctionnalite = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  exigencePREUVE_ParFonctionnalite: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <textarea
                            className="fr-table-input"
                            rows={2}
                            value={item.descriptionExigencePreuve}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .exigencePREUVE_ParFonctionnalite,
                              ];
                              newItems[index].descriptionExigencePreuve =
                                e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  exigencePREUVE_ParFonctionnalite: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="fr-btn fr-btn--tertiary-no-outline"
                            type="button"
                            title="Supprimer"
                            onClick={() => {
                              const newItems =
                                daData.cadre4_ExigencesContextuelles.exigencePREUVE_ParFonctionnalite.filter(
                                  (_, i) => i !== index,
                                );
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  exigencePREUVE_ParFonctionnalite: newItems,
                                },
                              });
                            }}
                          >
                            <span
                              className="fr-icon-close-line"
                              aria-hidden="true"
                            ></span>
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
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
                      cadre4_ExigencesContextuelles: {
                        ...daData.cadre4_ExigencesContextuelles,
                        exigencePREUVE_ParFonctionnalite: [
                          ...daData.cadre4_ExigencesContextuelles
                            .exigencePREUVE_ParFonctionnalite,
                          { fonctionnalite: "", descriptionExigencePreuve: "" },
                        ],
                      },
                    });
                  }}
                >
                  + Ajouter une exigence preuve
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Echelle IMPACT EBIOS – global SI */}
      <h3 className="fr-h3 fr-mt-6w">Echelle IMPACT EBIOS – global SI</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="impact-domaine">
              Domaine
            </label>
            <input
              className="fr-input"
              type="text"
              id="impact-domaine"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleIMPACT_EBIOS_GlobalSI.domaine
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleIMPACT_EBIOS_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleIMPACT_EBIOS_GlobalSI,
                      domaine: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="impact-niveau">
              Niveau
            </label>
            <input
              className="fr-input"
              type="text"
              id="impact-niveau"
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleIMPACT_EBIOS_GlobalSI.niveau
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleIMPACT_EBIOS_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleIMPACT_EBIOS_GlobalSI,
                      niveau: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-12">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="impact-description">
              Description
            </label>
            <textarea
              className="fr-input"
              id="impact-description"
              rows={3}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleIMPACT_EBIOS_GlobalSI.description
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleIMPACT_EBIOS_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleIMPACT_EBIOS_GlobalSI,
                      description: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-12">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="impact-contexte">
              Contexte applicatif
            </label>
            <textarea
              className="fr-input"
              id="impact-contexte"
              rows={3}
              value={
                daData.cadre4_ExigencesContextuelles
                  .echelleIMPACT_EBIOS_GlobalSI.contexteApplicatif
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleIMPACT_EBIOS_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles
                        .echelleIMPACT_EBIOS_GlobalSI,
                      contexteApplicatif: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Périodes applicatives */}
      <h3 className="fr-h3 fr-mt-6w">Périodes applicatives</h3>
      <p className="fr-text--sm">
        NUC = Nombre Utilisateurs Connectés | NRS = Nombre Requêtes Simultanées
      </p>
      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Périodes applicatives</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--md">
                      Période
                    </th>
                    <th scope="col" className="fr-col--sm">
                      Date Début
                    </th>
                    <th scope="col" className="fr-col--sm">
                      Date Fin
                    </th>
                    <th
                      scope="col"
                      className="fr-col--sm"
                      style={{ textAlign: "right" }}
                    >
                      NUC
                    </th>
                    <th
                      scope="col"
                      className="fr-col--sm"
                      style={{ textAlign: "right" }}
                    >
                      NRS
                    </th>
                    <th
                      scope="col"
                      className="fr-col--xs"
                      style={{ textAlign: "right" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre4_ExigencesContextuelles.periodesApplicatives.map(
                    (item, index) => (
                      <tr key={index}>
                        <td className="fr-bg-info">
                          <input
                            className="fr-table-input"
                            type="text"
                            placeholder="Standard/Critique/Charge"
                            value={item.periode}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .periodesApplicatives,
                              ];
                              newItems[index].periode = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  periodesApplicatives: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="date"
                            value={item.dateDebut}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .periodesApplicatives,
                              ];
                              newItems[index].dateDebut = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  periodesApplicatives: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="date"
                            value={item.dateFin}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .periodesApplicatives,
                              ];
                              newItems[index].dateFin = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  periodesApplicatives: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="text"
                            style={{ textAlign: "right" }}
                            value={item.nuc_NombreUtilisateursConnectes}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .periodesApplicatives,
                              ];
                              newItems[index].nuc_NombreUtilisateursConnectes =
                                e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  periodesApplicatives: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="text"
                            style={{ textAlign: "right" }}
                            value={item.nrs_NombreRequetesSimultaneesParSec}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .periodesApplicatives,
                              ];
                              newItems[
                                index
                              ].nrs_NombreRequetesSimultaneesParSec =
                                e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  periodesApplicatives: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="fr-btn fr-btn--tertiary-no-outline"
                            type="button"
                            title="Supprimer"
                            onClick={() => {
                              const newItems =
                                daData.cadre4_ExigencesContextuelles.periodesApplicatives.filter(
                                  (_, i) => i !== index,
                                );
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  periodesApplicatives: newItems,
                                },
                              });
                            }}
                          >
                            <span
                              className="fr-icon-close-line"
                              aria-hidden="true"
                            ></span>
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
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
                      cadre4_ExigencesContextuelles: {
                        ...daData.cadre4_ExigencesContextuelles,
                        periodesApplicatives: [
                          ...daData.cadre4_ExigencesContextuelles
                            .periodesApplicatives,
                          {
                            periode: "",
                            dateDebut: "",
                            dateFin: "",
                            nuc_NombreUtilisateursConnectes: "",
                            nrs_NombreRequetesSimultaneesParSec: "",
                          },
                        ],
                      },
                    });
                  }}
                >
                  + Ajouter une période
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Garantie de service */}
      <h3 className="fr-h3 fr-mt-6w">Garantie de service</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="pca">
              Plan de Continuité d&apos;Activité (PCA)
            </label>
            <input
              className="fr-input"
              type="text"
              id="pca"
              value={
                daData.cadre4_ExigencesContextuelles.garantieDeService
                  .planDeContinuiteActivite_PCA
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      planDeContinuiteActivite_PCA: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="pra">
              Plan de Reprise d&apos;Activité (PRA)
            </label>
            <input
              className="fr-input"
              type="text"
              id="pra"
              value={
                daData.cadre4_ExigencesContextuelles.garantieDeService
                  .planDeRepriseActivite_PRA
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      planDeRepriseActivite_PRA: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="pdma">
              Perte de Données Maximale Admissible (PDMA)
            </label>
            <input
              className="fr-input"
              type="text"
              id="pdma"
              value={
                daData.cadre4_ExigencesContextuelles.garantieDeService
                  .perteDeDonneesNonAdmissible
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      perteDeDonneesNonAdmissible: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="dmia">
              Durée Maximale d&apos;Interruption Admissible (DMIA)
            </label>
            <input
              className="fr-input"
              type="text"
              id="dmia"
              value={
                daData.cadre4_ExigencesContextuelles.garantieDeService
                  .dureMaximaleInterruptionAdmissible_DMIA
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      dureMaximaleInterruptionAdmissible_DMIA: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-12">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="impact-perte">
              Impact Métier en cas de perte de données
            </label>
            <textarea
              className="fr-input"
              id="impact-perte"
              rows={3}
              value={
                daData.cadre4_ExigencesContextuelles.garantieDeService
                  .impactMetierEnCasDePerteDeDonnees
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      impactMetierEnCasDePerteDeDonnees: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
        <div className="fr-col-12">
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="impact-defaillance">
              Impact Métier en cas de défaillance service
            </label>
            <textarea
              className="fr-input"
              id="impact-defaillance"
              rows={3}
              value={
                daData.cadre4_ExigencesContextuelles.garantieDeService
                  .impactMetierEnCasDeDefaillanceService
              }
              onChange={(e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      impactMetierEnCasDeDefaillanceService: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Temps de réponse */}
      <h3 className="fr-h3 fr-mt-6w">Temps de réponse</h3>
      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Temps de réponse</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--lg">
                      Type d&apos;affichage/traitement
                    </th>
                    <th scope="col" className="fr-col--xs">
                      Période Standard (s)
                    </th>
                    <th scope="col" className="fr-col--xs">
                      Période de charge (s)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fr-bg-info">
                      Affichage Page d&apos;accueil
                    </td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .affichagePageAccueil_PeriodeStandard
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                affichagePageAccueil_PeriodeStandard:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .affichagePageAccueil_PeriodeDeCharge
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                affichagePageAccueil_PeriodeDeCharge:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fr-bg-info">Affichage Page simple</td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .affichagePageSimple_PeriodeStandard
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                affichagePageSimple_PeriodeStandard:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .affichagePageSimple_PeriodeDeCharge
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                affichagePageSimple_PeriodeDeCharge:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fr-bg-info">Affichage Page complexe</td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .affichagePageComplexe_PeriodeStandard
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                affichagePageComplexe_PeriodeStandard:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .affichagePageComplexe_PeriodeDeCharge
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                affichagePageComplexe_PeriodeDeCharge:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fr-bg-info">Traitement requête simple</td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .traitementRequeteSimple_PeriodeStandard
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                traitementRequeteSimple_PeriodeStandard:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .traitementRequeteSimple_PeriodeDeCharge
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                traitementRequeteSimple_PeriodeDeCharge:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fr-bg-info">Traitement requête complexe</td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .traitementRequeteComplexe_PeriodeStandard
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                traitementRequeteComplexe_PeriodeStandard:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="fr-table-input"
                        type="number"
                        step={0.1}
                        min={0}
                        value={
                          daData.cadre4_ExigencesContextuelles.tempsDeReponse
                            .traitementRequeteComplexe_PeriodeDeCharge
                        }
                        onChange={(e) =>
                          setDAData({
                            ...daData,
                            cadre4_ExigencesContextuelles: {
                              ...daData.cadre4_ExigencesContextuelles,
                              tempsDeReponse: {
                                ...daData.cadre4_ExigencesContextuelles
                                  .tempsDeReponse,
                                traitementRequeteComplexe_PeriodeDeCharge:
                                  parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-input-group fr-mt-2w">
        <label className="fr-label" htmlFor="temps-precisions">
          Précisions
        </label>
        <textarea
          className="fr-input"
          id="temps-precisions"
          rows={3}
          value={daData.cadre4_ExigencesContextuelles.tempsDeReponse.precisions}
          onChange={(e) =>
            setDAData({
              ...daData,
              cadre4_ExigencesContextuelles: {
                ...daData.cadre4_ExigencesContextuelles,
                tempsDeReponse: {
                  ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                  precisions: e.target.value,
                },
              },
            })
          }
        />
      </div>

      {/* Traitements automatisés */}
      <h3 className="fr-h3 fr-mt-6w">Traitements automatisés</h3>
      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Traitements automatisés</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--md">
                      Batch(s) applicatifs
                    </th>
                    <th scope="col" className="fr-col--sm">
                      Plage
                    </th>
                    <th scope="col" className="fr-col--sm">
                      Fréquence
                    </th>
                    <th scope="col" className="fr-col--sm">
                      Impact Métier
                    </th>
                    <th scope="col" className="fr-col--sm">
                      Impact Charge
                    </th>
                    <th
                      scope="col"
                      className="fr-col--xs"
                      style={{ textAlign: "right" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre4_ExigencesContextuelles.traitementsAutomatises.map(
                    (item, index) => (
                      <tr key={index}>
                        <td className="fr-bg-info">
                          <input
                            className="fr-table-input"
                            type="text"
                            value={item.batchsApplicatifs}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .traitementsAutomatises,
                              ];
                              newItems[index].batchsApplicatifs =
                                e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  traitementsAutomatises: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="text"
                            value={item.plage}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .traitementsAutomatises,
                              ];
                              newItems[index].plage = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  traitementsAutomatises: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="text"
                            value={item.frequence}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .traitementsAutomatises,
                              ];
                              newItems[index].frequence = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  traitementsAutomatises: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="text"
                            value={item.impactMetier}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .traitementsAutomatises,
                              ];
                              newItems[index].impactMetier = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  traitementsAutomatises: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="fr-table-input"
                            type="text"
                            value={item.impactCharge}
                            onChange={(e) => {
                              const newItems = [
                                ...daData.cadre4_ExigencesContextuelles
                                  .traitementsAutomatises,
                              ];
                              newItems[index].impactCharge = e.target.value;
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  traitementsAutomatises: newItems,
                                },
                              });
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="fr-btn fr-btn--tertiary-no-outline"
                            type="button"
                            title="Supprimer"
                            onClick={() => {
                              const newItems =
                                daData.cadre4_ExigencesContextuelles.traitementsAutomatises.filter(
                                  (_, i) => i !== index,
                                );
                              setDAData({
                                ...daData,
                                cadre4_ExigencesContextuelles: {
                                  ...daData.cadre4_ExigencesContextuelles,
                                  traitementsAutomatises: newItems,
                                },
                              });
                            }}
                          >
                            <span
                              className="fr-icon-close-line"
                              aria-hidden="true"
                            ></span>
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
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
                      cadre4_ExigencesContextuelles: {
                        ...daData.cadre4_ExigencesContextuelles,
                        traitementsAutomatises: [
                          ...daData.cadre4_ExigencesContextuelles
                            .traitementsAutomatises,
                          {
                            batchsApplicatifs: "",
                            plage: "",
                            frequence: "",
                            impactMetier: "",
                            impactCharge: "",
                          },
                        ],
                      },
                    });
                  }}
                >
                  + Ajouter un traitement automatisé
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
