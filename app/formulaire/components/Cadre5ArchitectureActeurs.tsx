"use client";

import type { DAData } from "@/types/da.types";
import ExcalidrawSchemaEditor from "./ExcalidrawSchemaEditor";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre5ArchitectureActeurs({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 5 : Architecture Acteurs du SI</h2>

      <ExcalidrawSchemaEditor
        cadreData={daData.cadre5_ArchitectureActeurs}
        cadreType={5}
        initialData={daData.cadre5_ArchitectureActeurs.schemaActeursJSON}
        onSave={(jsonData, imageData) => {
          setDAData({
            ...daData,
            cadre5_ArchitectureActeurs: {
              ...daData.cadre5_ArchitectureActeurs,
              schemaActeursJSON: jsonData,
              schemaActeursImage: imageData,
            },
          });
        }}
        onCancel={() => {
          // Rien à faire, pas de fermeture possible
        }}
      />
    </div>
  );
}
