import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Table } from "@codegouvfr/react-dsfr/Table";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre12URLsAnnexe({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 12 : URLs Applicatives & Annexe</h2>

      {/* URLs Applicatives */}
      <h3 className="fr-h3">URLs Applicatives</h3>
      <Table
        headers={[
          "Libellé URL",
          "Acteur Appelant",
          "Ressource Appelée",
          "Fonctionnalité/Service Fourni",
          "Données Transitent",
          "Précisions",
          "Actions",
        ]}
        data={daData.cadre12_URLs.urls.map((url, index) => [
          <Input
            key={`libelleURL-${index}`}
            nativeInputProps={{
              type: "text",
              value: url.libelleURL,
              onChange: (e) => {
                const newURLs = [...daData.cadre12_URLs.urls];
                newURLs[index].libelleURL = e.target.value;
                setDAData({
                  ...daData,
                  cadre12_URLs: {
                    urls: newURLs,
                  },
                });
              },
            }}
          />,
          <Input
            key={`acteurAppelant-${index}`}
            nativeInputProps={{
              type: "text",
              value: url.acteurAppelant,
              onChange: (e) => {
                const newURLs = [...daData.cadre12_URLs.urls];
                newURLs[index].acteurAppelant = e.target.value;
                setDAData({
                  ...daData,
                  cadre12_URLs: {
                    urls: newURLs,
                  },
                });
              },
            }}
          />,
          <Input
            key={`ressourceAppelee-${index}`}
            nativeInputProps={{
              type: "text",
              value: url.ressourceAppelee,
              onChange: (e) => {
                const newURLs = [...daData.cadre12_URLs.urls];
                newURLs[index].ressourceAppelee = e.target.value;
                setDAData({
                  ...daData,
                  cadre12_URLs: {
                    urls: newURLs,
                  },
                });
              },
            }}
          />,
          <Input
            key={`fonctionnaliteOuServiceFourni-${index}`}
            nativeInputProps={{
              type: "text",
              value: url.fonctionnaliteOuServiceFourni,
              onChange: (e) => {
                const newURLs = [...daData.cadre12_URLs.urls];
                newURLs[index].fonctionnaliteOuServiceFourni = e.target.value;
                setDAData({
                  ...daData,
                  cadre12_URLs: {
                    urls: newURLs,
                  },
                });
              },
            }}
          />,
          <Input
            key={`donneesTransitent-${index}`}
            nativeInputProps={{
              type: "text",
              value: url.donneesTransitent,
              onChange: (e) => {
                const newURLs = [...daData.cadre12_URLs.urls];
                newURLs[index].donneesTransitent = e.target.value;
                setDAData({
                  ...daData,
                  cadre12_URLs: {
                    urls: newURLs,
                  },
                });
              },
            }}
          />,
          <Input
            key={`precisions-${index}`}
            nativeInputProps={{
              type: "text",
              value: url.precisions,
              onChange: (e) => {
                const newURLs = [...daData.cadre12_URLs.urls];
                newURLs[index].precisions = e.target.value;
                setDAData({
                  ...daData,
                  cadre12_URLs: {
                    urls: newURLs,
                  },
                });
              },
            }}
          />,
          <Button
            key={`delete-${index}`}
            size="small"
            priority="secondary"
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
            Supprimer
          </Button>,
        ])}
      />
      <Button
        size="small"
        className="fr-mt-2w"
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
        + Ajouter une URL applicative
      </Button>

      {/* Annexe : Suivi des changements */}
      <h3 className="fr-h3 fr-mt-6w">Annexe : Suivi des Changements</h3>

      <Input
        label="Versionnage (X.Y.Z.K)"
        nativeInputProps={{
          id: "versionnage",
          type: "text",
          placeholder: "1.0.0.0",
          value: daData.annexe_SuiviChangements.versionnage,
          onChange: (e) =>
            setDAData({
              ...daData,
              annexe_SuiviChangements: {
                ...daData.annexe_SuiviChangements,
                versionnage: e.target.value,
              },
            }),
        }}
      />

      <Table
        headers={[
          "Version",
          "Date",
          "Demandeur Changement",
          "Rapporteur Changement",
          "Description Détaillée",
          "Actions",
        ]}
        data={daData.annexe_SuiviChangements.changements.map((changement, index) => [
          <Input
            key={`version-${index}`}
            nativeInputProps={{
              type: "text",
              placeholder: "x.y.z",
              value: changement.version,
              onChange: (e) => {
                const newChangements = [...daData.annexe_SuiviChangements.changements];
                newChangements[index].version = e.target.value;
                setDAData({
                  ...daData,
                  annexe_SuiviChangements: {
                    ...daData.annexe_SuiviChangements,
                    changements: newChangements,
                  },
                });
              },
            }}
          />,
          <Input
            key={`date-${index}`}
            nativeInputProps={{
              type: "date",
              value: changement.date,
              onChange: (e) => {
                const newChangements = [...daData.annexe_SuiviChangements.changements];
                newChangements[index].date = e.target.value;
                setDAData({
                  ...daData,
                  annexe_SuiviChangements: {
                    ...daData.annexe_SuiviChangements,
                    changements: newChangements,
                  },
                });
              },
            }}
          />,
          <Input
            key={`demandeurChangement-${index}`}
            nativeInputProps={{
              type: "text",
              value: changement.demandeurChangement,
              onChange: (e) => {
                const newChangements = [...daData.annexe_SuiviChangements.changements];
                newChangements[index].demandeurChangement = e.target.value;
                setDAData({
                  ...daData,
                  annexe_SuiviChangements: {
                    ...daData.annexe_SuiviChangements,
                    changements: newChangements,
                  },
                });
              },
            }}
          />,
          <Input
            key={`rapporteurChangement-${index}`}
            nativeInputProps={{
              type: "text",
              value: changement.rapporteurChangement,
              onChange: (e) => {
                const newChangements = [...daData.annexe_SuiviChangements.changements];
                newChangements[index].rapporteurChangement = e.target.value;
                setDAData({
                  ...daData,
                  annexe_SuiviChangements: {
                    ...daData.annexe_SuiviChangements,
                    changements: newChangements,
                  },
                });
              },
            }}
          />,
          <Input
            key={`descriptionDetaillee-${index}`}
            nativeInputProps={{
              type: "text",
              value: changement.descriptionDetaillee,
              onChange: (e) => {
                const newChangements = [...daData.annexe_SuiviChangements.changements];
                newChangements[index].descriptionDetaillee = e.target.value;
                setDAData({
                  ...daData,
                  annexe_SuiviChangements: {
                    ...daData.annexe_SuiviChangements,
                    changements: newChangements,
                  },
                });
              },
            }}
          />,
          <Button
            key={`delete-${index}`}
            size="small"
            priority="secondary"
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
            Supprimer
          </Button>,
        ])}
      />
      <Button
        size="small"
        className="fr-mt-2w"
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
        + Ajouter un changement
      </Button>
    </div>
  );
}
