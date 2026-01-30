"use client";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Table } from "@codegouvfr/react-dsfr/Table";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre6ArchitectureFonctionnelle({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 6 : Architecture Fonctionnelle du SI</h2>

      {/* Description */}
      <Input
        label="Description de l'architecture fonctionnelle"
        textArea
        nativeTextAreaProps={{
          id: "cadre6-description",
          rows: 6,
          value: daData.cadre6_ArchitectureFonctionnelle.description,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre6_ArchitectureFonctionnelle: {
                ...daData.cadre6_ArchitectureFonctionnelle,
                description: e.target.value,
              },
            }),
        }}
      />

      {/* Schéma */}
      <Input
        label="Schéma d'architecture fonctionnelle (URL ou base64)"
        nativeInputProps={{
          id: "cadre6-schema",
          type: "text",
          placeholder: "URL ou base64 du schéma",
          value: daData.cadre6_ArchitectureFonctionnelle.schemaArchitectureFonctionnelle,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre6_ArchitectureFonctionnelle: {
                ...daData.cadre6_ArchitectureFonctionnelle,
                schemaArchitectureFonctionnelle: e.target.value,
              },
            }),
        }}
      />

      {/* Convention de flux */}
      <Input
        label="Convention de flux"
        textArea
        nativeTextAreaProps={{
          id: "cadre6-convention",
          rows: 3,
          placeholder: "Décrivez les conventions utilisées pour représenter les flux dans le schéma",
          value: daData.cadre6_ArchitectureFonctionnelle.conventionFlux,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre6_ArchitectureFonctionnelle: {
                ...daData.cadre6_ArchitectureFonctionnelle,
                conventionFlux: e.target.value,
              },
            }),
        }}
      />

      {/* Blocs fonctionnels */}
      <h3 className="fr-h3 fr-mt-6w">Blocs Fonctionnels</h3>
      <Table
        headers={["Nom du bloc", "Usages", "Type d'acteurs", "Actions"]}
        data={daData.cadre6_ArchitectureFonctionnelle.blocsFonctionnels.map((bloc, index) => [
          <Input
            key={`nom-${index}`}
            label=""
            nativeInputProps={{
              type: "text",
              value: bloc.nom,
              onChange: (e) => {
                const newBlocs = [...daData.cadre6_ArchitectureFonctionnelle.blocsFonctionnels];
                newBlocs[index].nom = e.target.value;
                setDAData({
                  ...daData,
                  cadre6_ArchitectureFonctionnelle: {
                    ...daData.cadre6_ArchitectureFonctionnelle,
                    blocsFonctionnels: newBlocs,
                  },
                });
              },
            }}
          />,
          <Input
            key={`usages-${index}`}
            label=""
            nativeInputProps={{
              type: "text",
              value: bloc.usages,
              onChange: (e) => {
                const newBlocs = [...daData.cadre6_ArchitectureFonctionnelle.blocsFonctionnels];
                newBlocs[index].usages = e.target.value;
                setDAData({
                  ...daData,
                  cadre6_ArchitectureFonctionnelle: {
                    ...daData.cadre6_ArchitectureFonctionnelle,
                    blocsFonctionnels: newBlocs,
                  },
                });
              },
            }}
          />,
          <Select
            key={`typeActeurs-${index}`}
            label=""
            nativeSelectProps={{
              value: bloc.typeActeurs,
              onChange: (e) => {
                const newBlocs = [...daData.cadre6_ArchitectureFonctionnelle.blocsFonctionnels];
                newBlocs[index].typeActeurs = e.target.value as "IHM" | "WS/API";
                setDAData({
                  ...daData,
                  cadre6_ArchitectureFonctionnelle: {
                    ...daData.cadre6_ArchitectureFonctionnelle,
                    blocsFonctionnels: newBlocs,
                  },
                });
              },
            }}
          >
            <option value="IHM">IHM</option>
            <option value="WS/API">WS/API</option>
          </Select>,
          <Button
            key={`delete-${index}`}
            priority="secondary"
            size="small"
            onClick={() => {
              const newBlocs = daData.cadre6_ArchitectureFonctionnelle.blocsFonctionnels.filter(
                (_, i) => i !== index
              );
              setDAData({
                ...daData,
                cadre6_ArchitectureFonctionnelle: {
                  ...daData.cadre6_ArchitectureFonctionnelle,
                  blocsFonctionnels: newBlocs,
                },
              });
            }}
          >
            Supprimer
          </Button>,
        ])}
      />
      <Button
        className="fr-mt-2w"
        size="small"
        onClick={() => {
          setDAData({
            ...daData,
            cadre6_ArchitectureFonctionnelle: {
              ...daData.cadre6_ArchitectureFonctionnelle,
              blocsFonctionnels: [
                ...daData.cadre6_ArchitectureFonctionnelle.blocsFonctionnels,
                { nom: "", usages: "", typeActeurs: "IHM" },
              ],
            },
          });
        }}
      >
        + Ajouter un bloc fonctionnel
      </Button>
    </div>
  );
}
