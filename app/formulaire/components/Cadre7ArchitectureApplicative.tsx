import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre7ArchitectureApplicative({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 7 : Architecture Applicative</h2>

      {/* Description */}
      <Input
        label="Description de l'architecture applicative"
        textArea
        nativeTextAreaProps={{
          rows: 6,
          value: daData.cadre7_ArchitectureApplicative.description,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre7_ArchitectureApplicative: {
                ...daData.cadre7_ArchitectureApplicative,
                description: e.target.value,
              },
            }),
        }}
      />

      {/* Schéma */}
      <Input
        label="Schéma d'architecture applicative (URL ou base64)"
        nativeInputProps={{
          type: "text",
          placeholder: "URL ou base64 du schéma",
          value: daData.cadre7_ArchitectureApplicative.schemaArchitectureApplicative,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre7_ArchitectureApplicative: {
                ...daData.cadre7_ArchitectureApplicative,
                schemaArchitectureApplicative: e.target.value,
              },
            }),
        }}
      />

      {/* Piles de composants */}
      <h3 className="fr-h3 fr-mt-6w">Piles de Composants</h3>
      {daData.cadre7_ArchitectureApplicative.pilesComposants.map((pile, pileIndex) => (
        <div key={pileIndex} className="fr-mb-4w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-6">
              <Input
                label="Fonctionnalité"
                nativeInputProps={{
                  type: "text",
                  value: pile.fonctionnalite,
                  onChange: (e) => {
                    const newPiles = [...daData.cadre7_ArchitectureApplicative.pilesComposants];
                    newPiles[pileIndex].fonctionnalite = e.target.value;
                    setDAData({
                      ...daData,
                      cadre7_ArchitectureApplicative: {
                        ...daData.cadre7_ArchitectureApplicative,
                        pilesComposants: newPiles,
                      },
                    });
                  },
                }}
              />
            </div>
            <div className="fr-col-6">
              <Button
                size="small"
                priority="secondary"
                onClick={() => {
                  const newPiles = daData.cadre7_ArchitectureApplicative.pilesComposants.filter(
                    (_, i) => i !== pileIndex
                  );
                  setDAData({
                    ...daData,
                    cadre7_ArchitectureApplicative: {
                      ...daData.cadre7_ArchitectureApplicative,
                      pilesComposants: newPiles,
                    },
                  });
                }}
              >
                Supprimer cette pile
              </Button>
            </div>
          </div>

          <Input
            label="Composants (un par ligne)"
            textArea
            nativeTextAreaProps={{
              rows: 5,
              value: pile.composants.join("\n"),
              onChange: (e) => {
                const newPiles = [...daData.cadre7_ArchitectureApplicative.pilesComposants];
                newPiles[pileIndex].composants = e.target.value.split("\n").filter(c => c.trim() !== "");
                setDAData({
                  ...daData,
                  cadre7_ArchitectureApplicative: {
                    ...daData.cadre7_ArchitectureApplicative,
                    pilesComposants: newPiles,
                  },
                });
              },
            }}
          />
        </div>
      ))}
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {
          setDAData({
            ...daData,
            cadre7_ArchitectureApplicative: {
              ...daData.cadre7_ArchitectureApplicative,
              pilesComposants: [
                ...daData.cadre7_ArchitectureApplicative.pilesComposants,
                { fonctionnalite: "", composants: [] },
              ],
            },
          });
        }}
      >
        + Ajouter une pile de composants
      </Button>
    </div>
  );
}
