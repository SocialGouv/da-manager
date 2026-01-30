import type { DAData } from "@/types/da.types";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { Button } from "@codegouvfr/react-dsfr/Button";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre3ContraintesVolumetrie({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 3 : Contraintes - Volumétrie</h2>

      {/* Contraintes légales */}
      <Input
        label="Contraintes légales"
        textArea
        nativeTextAreaProps={{
          id: "contraintesLegales",
          rows: 6,
          value: daData.cadre3_ContraintesVolumetrie.contraintesLegales,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                contraintesLegales: e.target.value,
              },
            }),
        }}
      />

      {/* Contraintes métiers */}
      <Input
        label="Contraintes métiers"
        textArea
        nativeTextAreaProps={{
          id: "contraintesMetiers",
          rows: 8,
          value: daData.cadre3_ContraintesVolumetrie.contraintesMetiers,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                contraintesMetiers: e.target.value,
              },
            }),
        }}
      />

      {/* Dépendances avec d'autres SI */}
      <h3 className="fr-h3 fr-mt-6w">Dépendances avec d'autres SI</h3>
      <table className="fr-table">
        <thead>
          <tr>
            <th>Système d'information</th>
            <th>Fournisseur</th>
            <th>Consommateur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI.map((item, index) => (
            <tr key={index}>
              <td>
                <Input
                  nativeInputProps={{
                    type: "text",
                    value: item.systemeInformation,
                    onChange: (e) => {
                      const newItems = [...daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI];
                      newItems[index].systemeInformation = e.target.value;
                      setDAData({
                        ...daData,
                        cadre3_ContraintesVolumetrie: {
                          ...daData.cadre3_ContraintesVolumetrie,
                          dependancesAvecDautresSI: newItems,
                        },
                      });
                    },
                  }}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.fournisseur,
                        onChange: (e) => {
                          const newItems = [...daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI];
                          newItems[index].fournisseur = e.target.checked;
                          setDAData({
                            ...daData,
                            cadre3_ContraintesVolumetrie: {
                              ...daData.cadre3_ContraintesVolumetrie,
                              dependancesAvecDautresSI: newItems,
                            },
                          });
                        },
                      },
                    },
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.consommateur,
                        onChange: (e) => {
                          const newItems = [...daData.cadre3_ContraintesVolumetrie.dependancesAvecDautresSI];
                          newItems[index].consommateur = e.target.checked;
                          setDAData({
                            ...daData,
                            cadre3_ContraintesVolumetrie: {
                              ...daData.cadre3_ContraintesVolumetrie,
                              dependancesAvecDautresSI: newItems,
                            },
                          });
                        },
                      },
                    },
                  ]}
                />
              </td>
              <td>
                <Button
                  size="small"
                  priority="secondary"
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
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        size="small"
        className="fr-mt-2w"
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
      </Button>

      {/* Dépendances avec le poste de travail */}
      <Input
        label="Dépendances avec le poste de travail"
        textArea
        nativeTextAreaProps={{
          id: "dependancesAvecLePosteDeTravail",
          rows: 4,
          value:
            daData.cadre3_ContraintesVolumetrie.dependancesAvecLePosteDeTravail,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre3_ContraintesVolumetrie: {
                ...daData.cadre3_ContraintesVolumetrie,
                dependancesAvecLePosteDeTravail: e.target.value,
              },
            }),
        }}
      />

      {/* Niveau utilisabilité/sécurité en mode Tablette */}
      <h3 className="fr-h3 fr-mt-6w">
        Niveau d'utilisabilité/sécurité en mode Tablette
      </h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <Select
            label="Mode Connecté"
            nativeSelectProps={{
              value:
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeTablette.modeConnecte,
              onChange: (e) =>
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
                }),
            }}
          >
            <option value="Néant">Néant</option>
            <option value="Faible">Faible</option>
            <option value="Moyen">Moyen</option>
            <option value="Fort">Fort</option>
          </Select>
        </div>
        <div className="fr-col-6">
          <Select
            label="Mode Déconnecté"
            nativeSelectProps={{
              value:
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeTablette.modeDeconnecte,
              onChange: (e) =>
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
                }),
            }}
          >
            <option value="Néant">Néant</option>
            <option value="Faible">Faible</option>
            <option value="Moyen">Moyen</option>
            <option value="Fort">Fort</option>
          </Select>
        </div>
      </div>
      <Input
        label="Précisions (si moyen/fort)"
        textArea
        nativeTextAreaProps={{
          rows: 3,
          value:
            daData.cadre3_ContraintesVolumetrie
              .niveauUtilisabiliteSecuriteEnModeTablette.precisions,
          onChange: (e) =>
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
            }),
        }}
      />

      {/* Niveau utilisabilité/sécurité en mode Smartphone */}
      <h3 className="fr-h3 fr-mt-6w">
        Niveau d'utilisabilité/sécurité en mode Smartphone
      </h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <Select
            label="Mode Connecté"
            nativeSelectProps={{
              value:
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeSmartphone.modeConnecte,
              onChange: (e) =>
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
                }),
            }}
          >
            <option value="Néant">Néant</option>
            <option value="Faible">Faible</option>
            <option value="Moyen">Moyen</option>
            <option value="Fort">Fort</option>
          </Select>
        </div>
        <div className="fr-col-6">
          <Select
            label="Mode Déconnecté"
            nativeSelectProps={{
              value:
                daData.cadre3_ContraintesVolumetrie
                  .niveauUtilisabiliteSecuriteEnModeSmartphone.modeDeconnecte,
              onChange: (e) =>
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
                }),
            }}
          >
            <option value="Néant">Néant</option>
            <option value="Faible">Faible</option>
            <option value="Moyen">Moyen</option>
            <option value="Fort">Fort</option>
          </Select>
        </div>
      </div>
      <Input
        label="Précisions (si moyen/fort)"
        textArea
        nativeTextAreaProps={{
          rows: 3,
          value:
            daData.cadre3_ContraintesVolumetrie
              .niveauUtilisabiliteSecuriteEnModeSmartphone.precisions,
          onChange: (e) =>
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
            }),
        }}
      />

      {/* Mobile - Nombre d'appareils */}
      <h3 className="fr-h3 fr-mt-6w">Nombre d'appareils mobiles</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <Input
            label="Tablette Ministère"
            nativeInputProps={{
              type: "number",
              value: daData.cadre3_ContraintesVolumetrie.mobile.tabletteMinistere,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      tabletteMinistere: parseInt(e.target.value) || 0,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Tablette Personnel"
            nativeInputProps={{
              type: "number",
              value: daData.cadre3_ContraintesVolumetrie.mobile.tablettePersonnel,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      tablettePersonnel: parseInt(e.target.value) || 0,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Smartphone Ministère"
            nativeInputProps={{
              type: "number",
              value: daData.cadre3_ContraintesVolumetrie.mobile.smartphoneMinistere,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      smartphoneMinistere: parseInt(e.target.value) || 0,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Smartphone Personnel"
            nativeInputProps={{
              type: "number",
              value: daData.cadre3_ContraintesVolumetrie.mobile.smartphonePersonnel,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    mobile: {
                      ...daData.cadre3_ContraintesVolumetrie.mobile,
                      smartphonePersonnel: parseInt(e.target.value) || 0,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      <h3 className="fr-h3 fr-mt-6w">Volumétrie données du SI Applicatif</h3>
      <p className="fr-text--sm">
        1 enregistrement = 1 macro-donnée métier au cœur du SI applicatif (ex: hébergement d'urgence, dossier médical, déclaration d'intérêt)
      </p>

      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <Input
            label="D1 - Nombre enregistrements à récupérer"
            nativeInputProps={{
              type: "text",
              id: "d1",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d1_NombreEnregistrementsARecuperer,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d1_NombreEnregistrementsARecuperer: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="D2 - Nombre enregistrements / an"
            nativeInputProps={{
              type: "text",
              id: "d2",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d2_NombreEnregistrementsParAn,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d2_NombreEnregistrementsParAn: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="D3 - Taille moyenne enregistrement (KO)"
            nativeInputProps={{
              type: "text",
              id: "d3",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d3_TailleMoyenneEnregistrementKO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d3_TailleMoyenneEnregistrementKO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="D4 - Nombre années enregistrements en base (BDD)"
            nativeInputProps={{
              type: "text",
              id: "d4",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d4_NombreAnneesEnregistrementsEnBaseBDD,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d4_NombreAnneesEnregistrementsEnBaseBDD: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="D5 - Volume BDD Initial (GO) = (D1 × D3) / 1024²"
            nativeInputProps={{
              type: "text",
              id: "d5",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d5_VolumeBDDInitialGO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d5_VolumeBDDInitialGO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="D6 - Volume BDD Annuel (GO) = (D2 × D3) / 1024²"
            nativeInputProps={{
              type: "text",
              id: "d6",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d6_VolumeBDDActuelGO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d6_VolumeBDDActuelGO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="D7 - Volume BDD TOTAL (GO) = (D4 × D6) + D5"
            nativeInputProps={{
              type: "text",
              id: "d7",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.d7_VolumeBDDTotalGO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      d7_VolumeBDDTotalGO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Commentaires"
            textArea
            nativeTextAreaProps={{
              id: "commentaires-volumetrie",
              rows: 3,
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif.commentaires,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieDonneesDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieDonneesDuSIApplicatif,
                      commentaires: e.target.value,
                    },
                  },
                }),
            }}
          />
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
          <Input
            label="F1 - Nombre de fichiers à récupérer"
            nativeInputProps={{
              type: "text",
              id: "f1",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f1_NombreDeFichiersARecuperer,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f1_NombreDeFichiersARecuperer: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="F2 - Nombre de fichiers / an"
            nativeInputProps={{
              type: "text",
              id: "f2",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f2_NombreDeFichiersParAn,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f2_NombreDeFichiersParAn: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="F3 - Taille moyenne d'un fichier (MO)"
            nativeInputProps={{
              type: "text",
              id: "f3",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f3_TailleMoyenneDunFichierMO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f3_TailleMoyenneDunFichierMO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="F4 - Nombre années fichiers en File System (FS)"
            nativeInputProps={{
              type: "text",
              id: "f4",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f4_NombreAnneesFichiersEnFileSystemFS,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f4_NombreAnneesFichiersEnFileSystemFS: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="F5 - Volume FS initial (GO) = (F1 × F3) / 1024"
            nativeInputProps={{
              type: "text",
              id: "f5",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f5_VolumeFSInitialGO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f5_VolumeFSInitialGO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="F6 - Volume annuel (GO) = (F2 × F3) / 1024"
            nativeInputProps={{
              type: "text",
              id: "f6",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f6_VolumeFSActuelGO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f6_VolumeFSActuelGO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="F7 - Volume FS TOTAL (GO) = (F4 × F6) + F5"
            nativeInputProps={{
              type: "text",
              id: "f7",
              value:
                daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif.f7_VolumeFSTotalGO,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre3_ContraintesVolumetrie: {
                    ...daData.cadre3_ContraintesVolumetrie,
                    volumetrieFichiersDuSIApplicatif: {
                      ...daData.cadre3_ContraintesVolumetrie.volumetrieFichiersDuSIApplicatif,
                      f7_VolumeFSTotalGO: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      {/* Réduction volume données et fichiers */}
      <h3 className="fr-h3 fr-mt-6w">Réduction volume données et fichiers</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <Checkbox
            options={[
              {
                label: "Purge données dans BDD applicatif",
                nativeInputProps: {
                  id: "purgeDonnees",
                  checked:
                    daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.purgeDonneesDansBDDApplicatif,
                  onChange: (e) =>
                    setDAData({
                      ...daData,
                      cadre3_ContraintesVolumetrie: {
                        ...daData.cadre3_ContraintesVolumetrie,
                        reductionVolumeDonneesEtFichiers: {
                          ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                          purgeDonneesDansBDDApplicatif: e.target.checked,
                        },
                      },
                    }),
                },
              },
            ]}
          />
        </div>
        <div className="fr-col-6">
          <Checkbox
            options={[
              {
                label: "Purge fichiers dans FS applicatif",
                nativeInputProps: {
                  id: "purgeFichiers",
                  checked:
                    daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.purgeFichiersDansFSApplicatif,
                  onChange: (e) =>
                    setDAData({
                      ...daData,
                      cadre3_ContraintesVolumetrie: {
                        ...daData.cadre3_ContraintesVolumetrie,
                        reductionVolumeDonneesEtFichiers: {
                          ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                          purgeFichiersDansFSApplicatif: e.target.checked,
                        },
                      },
                    }),
                },
              },
            ]}
          />
        </div>
        <div className="fr-col-6">
          <Checkbox
            options={[
              {
                label: "Archivage données hors applicatif",
                nativeInputProps: {
                  id: "archivageDonnees",
                  checked:
                    daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.archivageDonneesHorsApplicatif,
                  onChange: (e) =>
                    setDAData({
                      ...daData,
                      cadre3_ContraintesVolumetrie: {
                        ...daData.cadre3_ContraintesVolumetrie,
                        reductionVolumeDonneesEtFichiers: {
                          ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                          archivageDonneesHorsApplicatif: e.target.checked,
                        },
                      },
                    }),
                },
              },
            ]}
          />
        </div>
        <div className="fr-col-6">
          <Checkbox
            options={[
              {
                label: "Archivage fichiers hors applicatif",
                nativeInputProps: {
                  id: "archivageFichiers",
                  checked:
                    daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers.archivageFichiersHorsApplicatif,
                  onChange: (e) =>
                    setDAData({
                      ...daData,
                      cadre3_ContraintesVolumetrie: {
                        ...daData.cadre3_ContraintesVolumetrie,
                        reductionVolumeDonneesEtFichiers: {
                          ...daData.cadre3_ContraintesVolumetrie.reductionVolumeDonneesEtFichiers,
                          archivageFichiersHorsApplicatif: e.target.checked,
                        },
                      },
                    }),
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
