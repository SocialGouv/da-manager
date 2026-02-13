/* eslint-disable @next/next/no-img-element */
import type { DAData } from "@/types/da.types";

interface ReadonlyCadreProps {
  daData: DAData;
}

export default function ReadonlyCadre6({ daData }: ReadonlyCadreProps) {
  const image =
    daData.cadre6_ArchitectureFonctionnelle
      .schemaArchitectureFonctionnelleImage;

  return (
    <div>
      {image ? (
        <img
          src={image}
          alt="Schéma d'architecture fonctionnelle"
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
