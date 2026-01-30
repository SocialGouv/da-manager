import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Table } from "@codegouvfr/react-dsfr/Table";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre4ExigencesContextuelles({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 4 : Exigences Contextuelles</h2>

      {/* Exigences sur les accès utilisateurs */}
      <Input
        label="Exigences sur les accès utilisateurs"
        textArea
        nativeTextAreaProps={{
          id: "exigencesSurLesAccesUtilisateurs",
          rows: 6,
          value: daData.cadre4_ExigencesContextuelles.exigencesSurLesAccesUtilisateurs,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre4_ExigencesContextuelles: {
                ...daData.cadre4_ExigencesContextuelles,
                exigencesSurLesAccesUtilisateurs: e.target.value,
              },
            }),
        }}
      />

      {/* Exigence Disponibilité */}
      <Input
        label="Exigence Disponibilité"
        textArea
        nativeTextAreaProps={{
          id: "exigenceDisponibilite",
          rows: 6,
          value: daData.cadre4_ExigencesContextuelles.exigenceDisponibilite,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre4_ExigencesContextuelles: {
                ...daData.cadre4_ExigencesContextuelles,
                exigenceDisponibilite: e.target.value,
              },
            }),
        }}
      />

      {/* Exigence Intégrité */}
      <Input
        label="Exigence Intégrité"
        textArea
        nativeTextAreaProps={{
          id: "exigenceIntegrite",
          rows: 6,
          value: daData.cadre4_ExigencesContextuelles.exigenceIntegrite,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre4_ExigencesContextuelles: {
                ...daData.cadre4_ExigencesContextuelles,
                exigenceIntegrite: e.target.value,
              },
            }),
        }}
      />

      {/* Exigence Confidentialité */}
      <Input
        label="Exigence Confidentialité"
        textArea
        nativeTextAreaProps={{
          id: "exigenceConfidentialite",
          rows: 6,
          value: daData.cadre4_ExigencesContextuelles.exigenceConfidentialite,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre4_ExigencesContextuelles: {
                ...daData.cadre4_ExigencesContextuelles,
                exigenceConfidentialite: e.target.value,
              },
            }),
        }}
      />

      {/* Exigence Traçabilité */}
      <Input
        label="Exigence Traçabilité"
        textArea
        nativeTextAreaProps={{
          id: "exigenceTracabilite",
          rows: 6,
          value: daData.cadre4_ExigencesContextuelles.exigenceTracabilite,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre4_ExigencesContextuelles: {
                ...daData.cadre4_ExigencesContextuelles,
                exigenceTracabilite: e.target.value,
              },
            }),
        }}
      />

      {/* Echelle DICT EBIOS (1 à 4) – global SI */}
      <h3 className="fr-h3 fr-mt-6w">Echelle DICT EBIOS (1 à 4) – global SI</h3>
      <p className="fr-text--sm">Niveau de 1 à 4 pour chaque exigence (Disponibilité, Intégrité, Confidentialité, Traçabilité)</p>

      <h4 className="fr-h4 fr-mt-4w">Disponibilité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <Input
            label="Niveau Front (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceDisponibilite_NiveauFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_NiveauFront: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Front"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceDisponibilite_PrecisionsFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_PrecisionsFront: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-3">
          <Input
            label="Niveau Back (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceDisponibilite_NiveauBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_NiveauBack: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Back"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceDisponibilite_PrecisionsBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceDisponibilite_PrecisionsBack: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      <h4 className="fr-h4 fr-mt-4w">Intégrité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <Input
            label="Niveau Front (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_NiveauFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_NiveauFront: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Front"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_PrecisionsFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_PrecisionsFront: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-3">
          <Input
            label="Niveau Back (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_NiveauBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_NiveauBack: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Back"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceIntegrite_PrecisionsBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceIntegrite_PrecisionsBack: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      <h4 className="fr-h4 fr-mt-4w">Confidentialité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <Input
            label="Niveau Front (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceConfidentialite_NiveauFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_NiveauFront: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Front"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceConfidentialite_PrecisionsFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_PrecisionsFront: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-3">
          <Input
            label="Niveau Back (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceConfidentialite_NiveauBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_NiveauBack: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Back"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceConfidentialite_PrecisionsBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceConfidentialite_PrecisionsBack: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      <h4 className="fr-h4 fr-mt-4w">Traçabilité</h4>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-3">
          <Input
            label="Niveau Front (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceTracabilite_NiveauFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_NiveauFront: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Front"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceTracabilite_PrecisionsFront,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_PrecisionsFront: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-3">
          <Input
            label="Niveau Back (1-4)"
            nativeInputProps={{
              type: "number",
              min: 1,
              max: 4,
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceTracabilite_NiveauBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_NiveauBack: parseInt(e.target.value) || 1,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-9">
          <Input
            label="Précisions Back"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI.exigenceTracabilite_PrecisionsBack,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleDICT_EBIOS_1a4_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleDICT_EBIOS_1a4_GlobalSI,
                      exigenceTracabilite_PrecisionsBack: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      {/* Echelle IMPACT EBIOS – global SI */}
      <h3 className="fr-h3 fr-mt-6w">Echelle IMPACT EBIOS – global SI</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <Input
            label="Domaine"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleIMPACT_EBIOS_GlobalSI.domaine,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleIMPACT_EBIOS_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleIMPACT_EBIOS_GlobalSI,
                      domaine: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Niveau"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.echelleIMPACT_EBIOS_GlobalSI.niveau,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleIMPACT_EBIOS_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleIMPACT_EBIOS_GlobalSI,
                      niveau: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-12">
          <Input
            label="Description"
            textArea
            nativeTextAreaProps={{
              rows: 3,
              value: daData.cadre4_ExigencesContextuelles.echelleIMPACT_EBIOS_GlobalSI.description,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    echelleIMPACT_EBIOS_GlobalSI: {
                      ...daData.cadre4_ExigencesContextuelles.echelleIMPACT_EBIOS_GlobalSI,
                      description: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      {/* Exigence PREUVE par fonctionnalité (cadre 2) */}
      <h3 className="fr-h3 fr-mt-6w">Exigence PREUVE par fonctionnalité (cadre 2)</h3>
      <p className="fr-text--sm">
        Les exigences de preuves se traduisent sur : la traçabilité des actions, l'authentification des utilisateurs, l'imputabilité du responsable de l'action
      </p>
      <Table
        headers={["Fonctionnalité", "Description Exigence Preuve", "Actions"]}
        data={daData.cadre4_ExigencesContextuelles.exigencePREUVE_ParFonctionnalite.map((item, index) => [
          <Input
            key={`fonc-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.fonctionnalite,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.exigencePREUVE_ParFonctionnalite];
                newItems[index].fonctionnalite = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    exigencePREUVE_ParFonctionnalite: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`desc-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.descriptionExigencePreuve,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.exigencePREUVE_ParFonctionnalite];
                newItems[index].descriptionExigencePreuve = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    exigencePREUVE_ParFonctionnalite: newItems,
                  },
                });
              },
            }}
          />,
          <Button
            key={`btn-${index}`}
            priority="secondary"
            size="small"
            onClick={() => {
              const newItems = daData.cadre4_ExigencesContextuelles.exigencePREUVE_ParFonctionnalite.filter(
                (_, i) => i !== index
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
            Supprimer
          </Button>
        ])}
      />
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {
          setDAData({
            ...daData,
            cadre4_ExigencesContextuelles: {
              ...daData.cadre4_ExigencesContextuelles,
              exigencePREUVE_ParFonctionnalite: [
                ...daData.cadre4_ExigencesContextuelles.exigencePREUVE_ParFonctionnalite,
                { fonctionnalite: "", descriptionExigencePreuve: "" },
              ],
            },
          });
        }}
      >
        + Ajouter une exigence preuve
      </Button>

      {/* Garantie de service */}
      <h3 className="fr-h3 fr-mt-6w">Garantie de service</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <Input
            label="Plan de Continuité d'Activité (PCA)"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.garantieDeService.planDeContinuiteActivite_PCA,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      planDeContinuiteActivite_PCA: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Plan de Reprise d'Activité (PRA)"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.garantieDeService.planDeRepriseActivite_PRA,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      planDeRepriseActivite_PRA: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Perte de Données Maximale Admissible (PDMA)"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.garantieDeService.perteDeDonneesNonAdmissible,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      perteDeDonneesNonAdmissible: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
        <div className="fr-col-6">
          <Input
            label="Durée Maximale d'Interruption Admissible (DMIA)"
            nativeInputProps={{
              type: "text",
              value: daData.cadre4_ExigencesContextuelles.garantieDeService.dureMaximaleInterruptionAdmissible_DMIA,
              onChange: (e) =>
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    garantieDeService: {
                      ...daData.cadre4_ExigencesContextuelles.garantieDeService,
                      dureMaximaleInterruptionAdmissible_DMIA: e.target.value,
                    },
                  },
                }),
            }}
          />
        </div>
      </div>

      {/* Périodes applicatives */}
      <h3 className="fr-h3 fr-mt-6w">Périodes applicatives</h3>
      <p className="fr-text--sm">
        NUC = Nombre Utilisateurs Connectés | NRS = Nombre Requêtes Simultanées
      </p>
      <Table
        headers={["Période", "Date Début", "Date Fin", "NUC", "NRS", "Actions"]}
        data={daData.cadre4_ExigencesContextuelles.periodesApplicatives.map((item, index) => [
          <Input
            key={`periode-${index}`}
            nativeInputProps={{
              type: "text",
              placeholder: "Standard/Critique/Charge",
              value: item.periode,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.periodesApplicatives];
                newItems[index].periode = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    periodesApplicatives: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`dateDebut-${index}`}
            nativeInputProps={{
              type: "date",
              value: item.dateDebut,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.periodesApplicatives];
                newItems[index].dateDebut = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    periodesApplicatives: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`dateFin-${index}`}
            nativeInputProps={{
              type: "date",
              value: item.dateFin,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.periodesApplicatives];
                newItems[index].dateFin = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    periodesApplicatives: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`nuc-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.nuc_NombreUtilisateursConnectes,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.periodesApplicatives];
                newItems[index].nuc_NombreUtilisateursConnectes = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    periodesApplicatives: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`nrs-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.nrs_NombreRequetesSimultaneesParSec,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.periodesApplicatives];
                newItems[index].nrs_NombreRequetesSimultaneesParSec = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    periodesApplicatives: newItems,
                  },
                });
              },
            }}
          />,
          <Button
            key={`btn-${index}`}
            priority="secondary"
            size="small"
            onClick={() => {
              const newItems = daData.cadre4_ExigencesContextuelles.periodesApplicatives.filter(
                (_, i) => i !== index
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
            Supprimer
          </Button>
        ])}
      />
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {
          setDAData({
            ...daData,
            cadre4_ExigencesContextuelles: {
              ...daData.cadre4_ExigencesContextuelles,
              periodesApplicatives: [
                ...daData.cadre4_ExigencesContextuelles.periodesApplicatives,
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
      </Button>

      {/* Temps de réponse */}
      <h3 className="fr-h3 fr-mt-6w">Temps de réponse</h3>
      <Table
        headers={["Type d'affichage/traitement", "Période Standard (s)", "Période de charge (s)"]}
        data={[
          [
            "Affichage Page d'accueil",
            <Input
              key="accueil-std"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.affichagePageAccueil_PeriodeStandard,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        affichagePageAccueil_PeriodeStandard: e.target.value,
                      },
                    },
                  }),
              }}
            />,
            <Input
              key="accueil-charge"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.affichagePageAccueil_PeriodeDeCharge,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        affichagePageAccueil_PeriodeDeCharge: e.target.value,
                      },
                    },
                  }),
              }}
            />
          ],
          [
            "Affichage Page simple",
            <Input
              key="simple-std"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.affichagePageSimple_PeriodeStandard,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        affichagePageSimple_PeriodeStandard: e.target.value,
                      },
                    },
                  }),
              }}
            />,
            <Input
              key="simple-charge"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.affichagePageSimple_PeriodeDeCharge,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        affichagePageSimple_PeriodeDeCharge: e.target.value,
                      },
                    },
                  }),
              }}
            />
          ],
          [
            "Affichage Page complexe",
            <Input
              key="complexe-std"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.affichagePageComplexe_PeriodeStandard,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        affichagePageComplexe_PeriodeStandard: e.target.value,
                      },
                    },
                  }),
              }}
            />,
            <Input
              key="complexe-charge"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.affichagePageComplexe_PeriodeDeCharge,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        affichagePageComplexe_PeriodeDeCharge: e.target.value,
                      },
                    },
                  }),
              }}
            />
          ],
          [
            "Traitement requête simple",
            <Input
              key="req-simple-std"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.traitementRequeteSimple_PeriodeStandard,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        traitementRequeteSimple_PeriodeStandard: e.target.value,
                      },
                    },
                  }),
              }}
            />,
            <Input
              key="req-simple-charge"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.traitementRequeteSimple_PeriodeDeCharge,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        traitementRequeteSimple_PeriodeDeCharge: e.target.value,
                      },
                    },
                  }),
              }}
            />
          ],
          [
            "Traitement requête complexe",
            <Input
              key="req-complexe-std"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.traitementRequeteComplexe_PeriodeStandard,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        traitementRequeteComplexe_PeriodeStandard: e.target.value,
                      },
                    },
                  }),
              }}
            />,
            <Input
              key="req-complexe-charge"
              nativeInputProps={{
                type: "text",
                value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.traitementRequeteComplexe_PeriodeDeCharge,
                onChange: (e) =>
                  setDAData({
                    ...daData,
                    cadre4_ExigencesContextuelles: {
                      ...daData.cadre4_ExigencesContextuelles,
                      tempsDeReponse: {
                        ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                        traitementRequeteComplexe_PeriodeDeCharge: e.target.value,
                      },
                    },
                  }),
              }}
            />
          ]
        ]}
      />
      <Input
        label="Précisions"
        textArea
        className="fr-mt-2w"
        nativeTextAreaProps={{
          rows: 3,
          value: daData.cadre4_ExigencesContextuelles.tempsDeReponse.precisions,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre4_ExigencesContextuelles: {
                ...daData.cadre4_ExigencesContextuelles,
                tempsDeReponse: {
                  ...daData.cadre4_ExigencesContextuelles.tempsDeReponse,
                  precisions: e.target.value,
                },
              },
            }),
        }}
      />

      {/* Traitements automatisés */}
      <h3 className="fr-h3 fr-mt-6w">Traitements automatisés</h3>
      <Table
        headers={["Batch(s) applicatifs", "Plage", "Fréquence", "Impact Métier", "Impact Charge", "Actions"]}
        data={daData.cadre4_ExigencesContextuelles.traitementsAutomatises.map((item, index) => [
          <Input
            key={`batch-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.batchsApplicatifs,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.traitementsAutomatises];
                newItems[index].batchsApplicatifs = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    traitementsAutomatises: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`plage-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.plage,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.traitementsAutomatises];
                newItems[index].plage = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    traitementsAutomatises: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`freq-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.frequence,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.traitementsAutomatises];
                newItems[index].frequence = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    traitementsAutomatises: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`metier-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.impactMetier,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.traitementsAutomatises];
                newItems[index].impactMetier = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    traitementsAutomatises: newItems,
                  },
                });
              },
            }}
          />,
          <Input
            key={`charge-${index}`}
            nativeInputProps={{
              type: "text",
              value: item.impactCharge,
              onChange: (e) => {
                const newItems = [...daData.cadre4_ExigencesContextuelles.traitementsAutomatises];
                newItems[index].impactCharge = e.target.value;
                setDAData({
                  ...daData,
                  cadre4_ExigencesContextuelles: {
                    ...daData.cadre4_ExigencesContextuelles,
                    traitementsAutomatises: newItems,
                  },
                });
              },
            }}
          />,
          <Button
            key={`btn-${index}`}
            priority="secondary"
            size="small"
            onClick={() => {
              const newItems = daData.cadre4_ExigencesContextuelles.traitementsAutomatises.filter(
                (_, i) => i !== index
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
            Supprimer
          </Button>
        ])}
      />
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {
          setDAData({
            ...daData,
            cadre4_ExigencesContextuelles: {
              ...daData.cadre4_ExigencesContextuelles,
              traitementsAutomatises: [
                ...daData.cadre4_ExigencesContextuelles.traitementsAutomatises,
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
      </Button>
    </div>
  );
}
