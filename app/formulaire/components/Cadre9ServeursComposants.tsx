import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Table } from "@codegouvfr/react-dsfr/Table";
import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre9ServeursComposants({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 9 : Serveurs et Composants Applicatifs</h2>

      {daData.cadre9_ServeursComposants.serveurs.map((serveur, serveurIndex) => (
        <div key={serveurIndex} className="fr-mb-6w" style={{ border: "1px solid #ddd", padding: "1rem" }}>
          <h3 className="fr-h3">Serveur {serveurIndex + 1}</h3>

          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-6">
              <Input
                label="Nom du serveur (logique)"
                nativeInputProps={{
                  type: "text",
                  value: serveur.nomServeur,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].nomServeur = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />
            </div>
            <div className="fr-col-6">
              <Select
                label="Type"
                nativeSelectProps={{
                  value: serveur.type,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].type = e.target.value as "Machine Virtuelle" | "Container" | "Serverless" | "Bare Metal";
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              >
                <option value="Machine Virtuelle">Machine Virtuelle</option>
                <option value="Container">Container</option>
                <option value="Serverless">Serverless</option>
                <option value="Bare Metal">Bare Metal</option>
              </Select>
            </div>
          </div>

          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-4">
              <Input
                label="Rôle"
                nativeInputProps={{
                  type: "text",
                  value: serveur.role,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].role = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />
            </div>
            <div className="fr-col-4">
              <Input
                label="vCPU"
                nativeInputProps={{
                  type: "number",
                  min: 0,
                  value: serveur.vCPU,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].vCPU = parseInt(e.target.value) || 0;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />
            </div>
            <div className="fr-col-4">
              <Input
                label="RAM (GO)"
                nativeInputProps={{
                  type: "number",
                  min: 0,
                  value: serveur.ramGO,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].ramGO = parseInt(e.target.value) || 0;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />
            </div>
          </div>

          <h4 className="fr-h4 fr-mt-4w">Composants Logiciels</h4>
          <Table
            headers={["Catégorie", "Composant", "Version", "Rôle", "Actions"]}
            data={serveur.composantsLogiciels.map((composant, composantIndex) => [
              <Input
                key={`categorie-${composantIndex}`}
                nativeInputProps={{
                  type: "text",
                  value: composant.categorie,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].composantsLogiciels[composantIndex].categorie = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />,
              <Input
                key={`composant-${composantIndex}`}
                nativeInputProps={{
                  type: "text",
                  value: composant.composant,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].composantsLogiciels[composantIndex].composant = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />,
              <Input
                key={`version-${composantIndex}`}
                nativeInputProps={{
                  type: "text",
                  value: composant.version,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].composantsLogiciels[composantIndex].version = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />,
              <Input
                key={`role-${composantIndex}`}
                nativeInputProps={{
                  type: "text",
                  value: composant.role,
                  onChange: (e) => {
                    const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                    newServeurs[serveurIndex].composantsLogiciels[composantIndex].role = e.target.value;
                    setDAData({
                      ...daData,
                      cadre9_ServeursComposants: {
                        serveurs: newServeurs,
                      },
                    });
                  },
                }}
              />,
              <Button
                key={`delete-${composantIndex}`}
                size="small"
                priority="secondary"
                onClick={() => {
                  const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
                  newServeurs[serveurIndex].composantsLogiciels = newServeurs[serveurIndex].composantsLogiciels.filter(
                    (_, i) => i !== composantIndex
                  );
                  setDAData({
                    ...daData,
                    cadre9_ServeursComposants: {
                      serveurs: newServeurs,
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
              const newServeurs = [...daData.cadre9_ServeursComposants.serveurs];
              newServeurs[serveurIndex].composantsLogiciels.push({
                categorie: "",
                composant: "",
                version: "",
                role: "",
              });
              setDAData({
                ...daData,
                cadre9_ServeursComposants: {
                  serveurs: newServeurs,
                },
              });
            }}
          >
            + Ajouter un composant logiciel
          </Button>

          <div className="fr-mt-2w">
            <Button
              size="small"
              priority="secondary"
              onClick={() => {
                const newServeurs = daData.cadre9_ServeursComposants.serveurs.filter(
                  (_, i) => i !== serveurIndex
                );
                setDAData({
                  ...daData,
                  cadre9_ServeursComposants: {
                    serveurs: newServeurs,
                  },
                });
              }}
            >
              Supprimer ce serveur
            </Button>
          </div>
        </div>
      ))}

      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {
          setDAData({
            ...daData,
            cadre9_ServeursComposants: {
              serveurs: [
                ...daData.cadre9_ServeursComposants.serveurs,
                {
                  nomServeur: "",
                  type: "Machine Virtuelle",
                  role: "",
                  vCPU: 0,
                  ramGO: 0,
                  composantsLogiciels: [],
                },
              ],
            },
          });
        }}
      >
        + Ajouter un serveur
      </Button>
    </div>
  );
}
