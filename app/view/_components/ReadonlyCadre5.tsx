/* eslint-disable @next/next/no-img-element */
import type { DAData } from "@/types/da.types";

interface ReadonlyCadreProps {
  daData: DAData;
}

export default function ReadonlyCadre5({ daData }: ReadonlyCadreProps) {
  const image = daData.cadre5_ArchitectureActeurs.schemaActeursImage;

  return (
    <div>
      {image ? (
        <img
          src={image}
          alt="Schéma d'architecture des acteurs"
          style={{ maxWidth: "100%" }}
        />
      ) : (
        <div className="fr-callout">
          <p className="fr-callout__text">Aucun schéma disponible</p>
        </div>
      )}
    </div>
  );
}
