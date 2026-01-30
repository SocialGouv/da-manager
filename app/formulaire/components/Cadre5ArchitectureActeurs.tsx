import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Table } from "@codegouvfr/react-dsfr/Table";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre5ArchitectureActeurs({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 5 : Architecture Acteurs du SI</h2>

      {/* Description */}
      <Input
        label="Description de l'architecture des acteurs"
        textArea
        nativeTextAreaProps={{
          rows: 6,
          value: daData.cadre5_ArchitectureActeurs.description,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre5_ArchitectureActeurs: {
                ...daData.cadre5_ArchitectureActeurs,
                description: e.target.value,
              },
            }),
        }}
      />

      {/* Schéma */}
      <Input
        label="Schéma des acteurs (URL ou base64)"
        nativeInputProps={{
          type: "text",
          placeholder: "URL ou base64 du schéma",
          value: daData.cadre5_ArchitectureActeurs.schemaActeurs,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre5_ArchitectureActeurs: {
                ...daData.cadre5_ArchitectureActeurs,
                schemaActeurs: e.target.value,
              },
            }),
        }}
      />

      {/* Acteurs Consommateurs */}
      <h3 className="fr-h3 fr-mt-6w">Acteurs Consommateurs</h3>
      <Table
        headers={["Nom", "Type", "Description", "Actions"]}
        data={daData.cadre5_ArchitectureActeurs.acteursConsommateurs.map((acteur, index) => [
          <Input
            key={`nom-${index}`}
            label=""
            nativeInputProps={{
              type: "text",
              value: acteur.nom,
              onChange: (e) => {
                const newActeurs = [...daData.cadre5_ArchitectureActeurs.acteursConsommateurs];
                newActeurs[index].nom = e.target.value;
                setDAData({
                  ...daData,
                  cadre5_ArchitectureActeurs: {
                    ...daData.cadre5_ArchitectureActeurs,
                    acteursConsommateurs: newActeurs,
                  },
                });
              },
            }}
          />,
          <Select
            key={`type-${index}`}
            label=""
            nativeSelectProps={{
              value: acteur.type,
              onChange: (e) => {
                const newActeurs = [...daData.cadre5_ArchitectureActeurs.acteursConsommateurs];
                newActeurs[index].type = e.target.value as "Humain (IHM)" | "SI (WS/API)";
                setDAData({
                  ...daData,
                  cadre5_ArchitectureActeurs: {
                    ...daData.cadre5_ArchitectureActeurs,
                    acteursConsommateurs: newActeurs,
                  },
                });
              },
            }}
          >
            <option value="Humain (IHM)">Humain (IHM)</option>
            <option value="SI (WS/API)">SI (WS/API)</option>
          </Select>,
          <Input
            key={`description-${index}`}
            label=""
            nativeInputProps={{
              type: "text",
              value: acteur.description,
              onChange: (e) => {
                const newActeurs = [...daData.cadre5_ArchitectureActeurs.acteursConsommateurs];
                newActeurs[index].description = e.target.value;
                setDAData({
                  ...daData,
                  cadre5_ArchitectureActeurs: {
                    ...daData.cadre5_ArchitectureActeurs,
                    acteursConsommateurs: newActeurs,
                  },
                });
              },
            }}
          />,
          <Button
            key={`action-${index}`}
            size="small"
            priority="secondary"
            onClick={() => {
              const newActeurs = daData.cadre5_ArchitectureActeurs.acteursConsommateurs.filter(
                (_, i) => i !== index
              );
              setDAData({
                ...daData,
                cadre5_ArchitectureActeurs: {
                  ...daData.cadre5_ArchitectureActeurs,
                  acteursConsommateurs: newActeurs,
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
            cadre5_ArchitectureActeurs: {
              ...daData.cadre5_ArchitectureActeurs,
              acteursConsommateurs: [
                ...daData.cadre5_ArchitectureActeurs.acteursConsommateurs,
                { nom: "", type: "Humain (IHM)", description: "" },
              ],
            },
          });
        }}
      >
        + Ajouter un acteur consommateur
      </Button>

      {/* Acteurs Fournisseurs */}
      <h3 className="fr-h3 fr-mt-6w">Acteurs Fournisseurs</h3>
      <Table
        headers={["Nom", "Type", "Description", "Actions"]}
        data={daData.cadre5_ArchitectureActeurs.acteursFournisseurs.map((acteur, index) => [
          <Input
            key={`nom-${index}`}
            label=""
            nativeInputProps={{
              type: "text",
              value: acteur.nom,
              onChange: (e) => {
                const newActeurs = [...daData.cadre5_ArchitectureActeurs.acteursFournisseurs];
                newActeurs[index].nom = e.target.value;
                setDAData({
                  ...daData,
                  cadre5_ArchitectureActeurs: {
                    ...daData.cadre5_ArchitectureActeurs,
                    acteursFournisseurs: newActeurs,
                  },
                });
              },
            }}
          />,
          <Select
            key={`type-${index}`}
            label=""
            nativeSelectProps={{
              value: acteur.type,
              onChange: (e) => {
                const newActeurs = [...daData.cadre5_ArchitectureActeurs.acteursFournisseurs];
                newActeurs[index].type = e.target.value as "Humain (IHM)" | "SI (WS/API)";
                setDAData({
                  ...daData,
                  cadre5_ArchitectureActeurs: {
                    ...daData.cadre5_ArchitectureActeurs,
                    acteursFournisseurs: newActeurs,
                  },
                });
              },
            }}
          >
            <option value="Humain (IHM)">Humain (IHM)</option>
            <option value="SI (WS/API)">SI (WS/API)</option>
          </Select>,
          <Input
            key={`description-${index}`}
            label=""
            nativeInputProps={{
              type: "text",
              value: acteur.description,
              onChange: (e) => {
                const newActeurs = [...daData.cadre5_ArchitectureActeurs.acteursFournisseurs];
                newActeurs[index].description = e.target.value;
                setDAData({
                  ...daData,
                  cadre5_ArchitectureActeurs: {
                    ...daData.cadre5_ArchitectureActeurs,
                    acteursFournisseurs: newActeurs,
                  },
                });
              },
            }}
          />,
          <Button
            key={`action-${index}`}
            size="small"
            priority="secondary"
            onClick={() => {
              const newActeurs = daData.cadre5_ArchitectureActeurs.acteursFournisseurs.filter(
                (_, i) => i !== index
              );
              setDAData({
                ...daData,
                cadre5_ArchitectureActeurs: {
                  ...daData.cadre5_ArchitectureActeurs,
                  acteursFournisseurs: newActeurs,
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
            cadre5_ArchitectureActeurs: {
              ...daData.cadre5_ArchitectureActeurs,
              acteursFournisseurs: [
                ...daData.cadre5_ArchitectureActeurs.acteursFournisseurs,
                { nom: "", type: "Humain (IHM)", description: "" },
              ],
            },
          });
        }}
      >
        + Ajouter un acteur fournisseur
      </Button>
    </div>
  );
}
