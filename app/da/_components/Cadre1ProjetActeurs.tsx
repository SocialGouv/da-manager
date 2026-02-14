import type { DAData } from "@/types/da.types";
import EditableTable from "./EditableTable";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
  formId?: string | null;
}

export default function Cadre1ProjetActeurs({ daData, setDAData }: CadreProps) {
  const nomDuProjet = daData.cadre1_ProjetActeurs.nomDuProjet;

  return (
    <div>
      <h3 className="fr-h4 fr-mt-4w">Nom du projet applicatif</h3>
      <div className="fr-input-group">
        <input
          className="fr-input fr-text--sm"
          id="nomDuProjet"
          type="text"
          value={nomDuProjet}
          readOnly
          disabled
        />
        <p className="fr-hint-text">
          Le nom du projet est défini à la création du DA
        </p>
      </div>

      <h3 className="fr-h4 fr-mt-6w">Contexte projet applicatif</h3>
      <textarea
        className="fr-input fr-text--sm"
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

      <h3 className="fr-h4 fr-mt-6w">Enjeux projet applicatif</h3>
      <textarea
        className="fr-input fr-text--sm"
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

      <h3 className="fr-h4 fr-mt-6w">Objectifs projet applicatif</h3>
      <textarea
        className="fr-input fr-text--sm"
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

      <h3 className="fr-h3 fr-mt-6w">Planning projet</h3>
      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Planning projet</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--sm">
                      Version
                    </th>
                    <th scope="col" className="fr-col--sm">
                      Date
                    </th>
                    <th scope="col" className="fr-col--lg">
                      Commentaires
                    </th>
                    <th
                      scope="col"
                      className="fr-col--xs"
                      style={{ textAlign: "right" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre1_ProjetActeurs.planningProjet.map(
                    (item, index) => (
                      <tr key={index}>
                        <td className="fr-bg-info">
                          <input
                            className="fr-table-input"
                            type="text"
                            value={item.version}
                            onChange={(e) => {
                              const newPlanning = [
                                ...daData.cadre1_ProjetActeurs.planningProjet,
                              ];
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
                            className="fr-table-input"
                            type="text"
                            value={item.date}
                            onChange={(e) => {
                              const newPlanning = [
                                ...daData.cadre1_ProjetActeurs.planningProjet,
                              ];
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
                            className="fr-table-input"
                            type="text"
                            value={item.commentaires}
                            onChange={(e) => {
                              const newPlanning = [
                                ...daData.cadre1_ProjetActeurs.planningProjet,
                              ];
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
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="fr-btn fr-btn--tertiary-no-outline"
                            type="button"
                            title="Supprimer"
                            onClick={() => {
                              const newPlanning =
                                daData.cadre1_ProjetActeurs.planningProjet.filter(
                                  (_, i) => i !== index,
                                );
                              setDAData({
                                ...daData,
                                cadre1_ProjetActeurs: {
                                  ...daData.cadre1_ProjetActeurs,
                                  planningProjet: newPlanning,
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

      <h3 className="fr-h3 fr-mt-6w">Acteurs du projet</h3>
      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Acteurs du projet</caption>
                <thead>
                  <tr>
                    <th scope="col" className="fr-col--md">
                      Rôle
                    </th>
                    <th scope="col">Nom</th>
                    <th scope="col" className="fr-col--md">
                      Fonction
                    </th>
                    <th scope="col">Entité</th>
                    <th
                      scope="col"
                      className="fr-col--xs"
                      style={{ textAlign: "right" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre1_ProjetActeurs.acteursDuProjet.map(
                    (item, index) => (
                      <tr key={index}>
                        <td className="fr-bg-info">
                          <input
                            className="fr-table-input"
                            type="text"
                            value={item.role}
                            onChange={(e) => {
                              const newActeurs = [
                                ...daData.cadre1_ProjetActeurs.acteursDuProjet,
                              ];
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
                            className="fr-table-input"
                            type="text"
                            value={item.nom}
                            onChange={(e) => {
                              const newActeurs = [
                                ...daData.cadre1_ProjetActeurs.acteursDuProjet,
                              ];
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
                            className="fr-table-input"
                            type="text"
                            value={item.fonction}
                            onChange={(e) => {
                              const newActeurs = [
                                ...daData.cadre1_ProjetActeurs.acteursDuProjet,
                              ];
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
                            className="fr-table-input"
                            type="text"
                            value={item.entite}
                            onChange={(e) => {
                              const newActeurs = [
                                ...daData.cadre1_ProjetActeurs.acteursDuProjet,
                              ];
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
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="fr-btn fr-btn--tertiary-no-outline"
                            type="button"
                            title="Supprimer"
                            onClick={() => {
                              const newActeurs =
                                daData.cadre1_ProjetActeurs.acteursDuProjet.filter(
                                  (_, i) => i !== index,
                                );
                              setDAData({
                                ...daData,
                                cadre1_ProjetActeurs: {
                                  ...daData.cadre1_ProjetActeurs,
                                  acteursDuProjet: newActeurs,
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

      <h3 className="fr-h3 fr-mt-6w">Acteurs métiers du SI applicatif</h3>
      <p className="fr-text--sm fr-mb-2w">
        M = Ministère, R = Réseau interministériel, E = Extranet, P = Public
      </p>
      <EditableTable
        caption="Acteurs métiers du SI applicatif"
        textColumns={[{ key: "profilsActeurs", label: "Profils acteurs" }]}
        groupHeader="Nombre utilisateurs"
        columns={[
          { key: "nombreUtilisateursM", label: "M", type: "number", headerClass: "fr-th--red", totalClass: "fr-td--red" },
          { key: "nombreUtilisateursR", label: "R", type: "number", headerClass: "fr-th--orange", totalClass: "fr-td--orange" },
          { key: "nombreUtilisateursE", label: "E", type: "number", headerClass: "fr-th--yellow", totalClass: "fr-td--yellow" },
          { key: "nombreUtilisateursP", label: "P", type: "number", headerClass: "fr-th--green", totalClass: "fr-td--green" },
        ]}
        rows={daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif}
        totalLabel="Total utilisateurs"
        addLabel="Ajouter un profil acteur"
        defaultRow={{
          profilsActeurs: "",
          nombreUtilisateursM: "0",
          nombreUtilisateursR: "0",
          nombreUtilisateursE: "0",
          nombreUtilisateursP: "0",
        }}
        onRowsChange={(rows) =>
          setDAData({
            ...daData,
            cadre1_ProjetActeurs: {
              ...daData.cadre1_ProjetActeurs,
              acteursMetiersDuSIApplicatif: rows,
            },
          })
        }
      />
    </div>
  );
}
