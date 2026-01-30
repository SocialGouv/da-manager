import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Table } from "@codegouvfr/react-dsfr/Table";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre10MatricesFlux({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 10 : Matrices des Flux Applicatifs</h2>

      <Table
        headers={["Numéro Flux", "Source", "Destination", "Protocole", "Commentaires", "Actions"]}
        data={daData.cadre10_MatricesFlux.fluxApplicatifs.map((flux, index) => [
          <Input
            key={`numeroFlux-${index}`}
            nativeInputProps={{
              type: "text",
              value: flux.numeroFlux,
              onChange: (e) => {
                const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                newFlux[index].numeroFlux = e.target.value;
                setDAData({
                  ...daData,
                  cadre10_MatricesFlux: {
                    fluxApplicatifs: newFlux,
                  },
                });
              },
            }}
          />,
          <Input
            key={`source-${index}`}
            nativeInputProps={{
              type: "text",
              value: flux.source,
              onChange: (e) => {
                const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                newFlux[index].source = e.target.value;
                setDAData({
                  ...daData,
                  cadre10_MatricesFlux: {
                    fluxApplicatifs: newFlux,
                  },
                });
              },
            }}
          />,
          <Input
            key={`destination-${index}`}
            nativeInputProps={{
              type: "text",
              value: flux.destination,
              onChange: (e) => {
                const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                newFlux[index].destination = e.target.value;
                setDAData({
                  ...daData,
                  cadre10_MatricesFlux: {
                    fluxApplicatifs: newFlux,
                  },
                });
              },
            }}
          />,
          <Input
            key={`protocole-${index}`}
            nativeInputProps={{
              type: "text",
              value: flux.protocole,
              onChange: (e) => {
                const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                newFlux[index].protocole = e.target.value;
                setDAData({
                  ...daData,
                  cadre10_MatricesFlux: {
                    fluxApplicatifs: newFlux,
                  },
                });
              },
            }}
          />,
          <Input
            key={`commentaires-${index}`}
            nativeInputProps={{
              type: "text",
              value: flux.commentaires,
              onChange: (e) => {
                const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                newFlux[index].commentaires = e.target.value;
                setDAData({
                  ...daData,
                  cadre10_MatricesFlux: {
                    fluxApplicatifs: newFlux,
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
              const newFlux = daData.cadre10_MatricesFlux.fluxApplicatifs.filter(
                (_, i) => i !== index
              );
              setDAData({
                ...daData,
                cadre10_MatricesFlux: {
                  fluxApplicatifs: newFlux,
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
            cadre10_MatricesFlux: {
              fluxApplicatifs: [
                ...daData.cadre10_MatricesFlux.fluxApplicatifs,
                {
                  numeroFlux: "",
                  source: "",
                  destination: "",
                  protocole: "",
                  commentaires: "",
                },
              ],
            },
          });
        }}
      >
        + Ajouter un flux applicatif
      </Button>
    </div>
  );
}
