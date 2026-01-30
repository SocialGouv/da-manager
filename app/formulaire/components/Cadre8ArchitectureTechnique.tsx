import { Input } from "@codegouvfr/react-dsfr/Input";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre8ArchitectureTechnique({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 8 : Architecture Technique</h2>

      {/* Description */}
      <Input
        label="Description de l'architecture technique"
        textArea
        nativeTextAreaProps={{
          id: "cadre8-description",
          rows: 6,
          value: daData.cadre8_ArchitectureTechnique.description,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre8_ArchitectureTechnique: {
                ...daData.cadre8_ArchitectureTechnique,
                description: e.target.value,
              },
            }),
        }}
      />

      {/* Schéma */}
      <Input
        label="Schéma d'architecture technique - mode logique (URL ou base64)"
        nativeInputProps={{
          id: "cadre8-schema",
          type: "text",
          placeholder: "URL ou base64 du schéma",
          value: daData.cadre8_ArchitectureTechnique.schemaArchitectureTechnique,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre8_ArchitectureTechnique: {
                ...daData.cadre8_ArchitectureTechnique,
                schemaArchitectureTechnique: e.target.value,
              },
            }),
        }}
      />

      {/* Notes */}
      <Input
        label="Notes et précisions"
        textArea
        nativeTextAreaProps={{
          id: "cadre8-notes",
          rows: 6,
          placeholder: "Ajoutez des notes ou précisions sur l'architecture technique",
          value: daData.cadre8_ArchitectureTechnique.notes,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre8_ArchitectureTechnique: {
                ...daData.cadre8_ArchitectureTechnique,
                notes: e.target.value,
              },
            }),
        }}
      />
    </div>
  );
}
