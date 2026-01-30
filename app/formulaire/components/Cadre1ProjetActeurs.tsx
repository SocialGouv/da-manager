import type { DAData } from "@/types/da.types";
import Table from "@codegouvfr/react-dsfr/Table";
import Input from "@codegouvfr/react-dsfr/Input";
import Button from "@codegouvfr/react-dsfr/Button";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre1ProjetActeurs({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 1 : Projet - Acteurs</h2>

      {/* Nom du projet applicatif */}
      <Input
        label="Nom du projet applicatif"
        nativeInputProps={{
          id: "nomDuProjet",
          value: daData.cadre1_ProjetActeurs.nomDuProjet,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre1_ProjetActeurs: {
                ...daData.cadre1_ProjetActeurs,
                nomDuProjet: e.target.value,
              },
            })
        }}
      />

      {/* Contexte projet applicatif */}
      <Input
        label="Contexte projet applicatif"
        textArea
        nativeTextAreaProps={{
          id: "contexteProjetApplicatif",
          rows: 8,
          value: daData.cadre1_ProjetActeurs.contexteProjetApplicatif,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre1_ProjetActeurs: {
                ...daData.cadre1_ProjetActeurs,
                contexteProjetApplicatif: e.target.value,
              },
            })
        }}
      />

      {/* Enjeux projet applicatif */}
      <Input
        label="Enjeux projet applicatif"
        textArea
        nativeTextAreaProps={{
          id: "enjeuxProjetApplicatif",
          rows: 8,
          value: daData.cadre1_ProjetActeurs.enjeuxProjetApplicatif,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre1_ProjetActeurs: {
                ...daData.cadre1_ProjetActeurs,
                enjeuxProjetApplicatif: e.target.value,
              },
            })
        }}
      />

      {/* Objectifs projet applicatif */}
      <Input
        label="Objectifs projet applicatif"
        textArea
        nativeTextAreaProps={{
          id: "objectifsProjetApplicatif",
          rows: 8,
          value: daData.cadre1_ProjetActeurs.objectifsProjetApplicatif,
          onChange: (e) =>
            setDAData({
              ...daData,
              cadre1_ProjetActeurs: {
                ...daData.cadre1_ProjetActeurs,
                objectifsProjetApplicatif: e.target.value,
              },
            })
        }}
      />

      {/* Planning projet - 3 lignes FIXES */}
      <h3 className="fr-h3 fr-mt-6w">Planning projet</h3>
      <Table
        headers={["Version", "Date", "Commentaires"]}
        data={daData.cadre1_ProjetActeurs.planningProjet.map((item, index) => [
          <Input
            key={`version-${index}`}
            nativeInputProps={{
              value: item.version,
              readOnly: true,
              style: { backgroundColor: '#e8edff', fontWeight: 'bold' }
            }}
          />,
          <Input
            key={`date-${index}`}
            nativeInputProps={{
              value: item.date,
              onChange: (e) => {
                const newPlanning = [...daData.cadre1_ProjetActeurs.planningProjet];
                newPlanning[index].date = e.target.value;
                setDAData({
                  ...daData,
                  cadre1_ProjetActeurs: {
                    ...daData.cadre1_ProjetActeurs,
                    planningProjet: newPlanning,
                  },
                });
              }
            }}
          />,
          <Input
            key={`commentaires-${index}`}
            nativeInputProps={{
              value: item.commentaires,
              onChange: (e) => {
                const newPlanning = [...daData.cadre1_ProjetActeurs.planningProjet];
                newPlanning[index].commentaires = e.target.value;
                setDAData({
                  ...daData,
                  cadre1_ProjetActeurs: {
                    ...daData.cadre1_ProjetActeurs,
                    planningProjet: newPlanning,
                  },
                });
              }
            }}
          />
        ])}
      />

      {/* Acteurs du projet - Rôles FIXES */}
      <h3 className="fr-h3 fr-mt-6w">Acteurs du projet</h3>
      <Table
        headers={["Rôle", "Nom", "Fonction", "Entité"]}
        data={daData.cadre1_ProjetActeurs.acteursDuProjet.map((item, index) => [
          <Input
            key={`role-${index}`}
            nativeInputProps={{
              value: item.role,
              readOnly: true,
              style: { backgroundColor: '#e8edff', fontWeight: 'bold' }
            }}
          />,
          <Input
            key={`nom-${index}`}
            nativeInputProps={{
              value: item.nom,
              onChange: (e) => {
                const newActeurs = [...daData.cadre1_ProjetActeurs.acteursDuProjet];
                newActeurs[index].nom = e.target.value;
                setDAData({
                  ...daData,
                  cadre1_ProjetActeurs: {
                    ...daData.cadre1_ProjetActeurs,
                    acteursDuProjet: newActeurs,
                  },
                });
              }
            }}
          />,
          <Input
            key={`fonction-${index}`}
            nativeInputProps={{
              value: item.fonction,
              onChange: (e) => {
                const newActeurs = [...daData.cadre1_ProjetActeurs.acteursDuProjet];
                newActeurs[index].fonction = e.target.value;
                setDAData({
                  ...daData,
                  cadre1_ProjetActeurs: {
                    ...daData.cadre1_ProjetActeurs,
                    acteursDuProjet: newActeurs,
                  },
                });
              }
            }}
          />,
          <Input
            key={`entite-${index}`}
            nativeInputProps={{
              value: item.entite,
              onChange: (e) => {
                const newActeurs = [...daData.cadre1_ProjetActeurs.acteursDuProjet];
                newActeurs[index].entite = e.target.value;
                setDAData({
                  ...daData,
                  cadre1_ProjetActeurs: {
                    ...daData.cadre1_ProjetActeurs,
                    acteursDuProjet: newActeurs,
                  },
                });
              }
            }}
          />
        ])}
      />

      {/* Acteurs métiers du SI applicatif - Tableau DYNAMIQUE */}
      <h3 className="fr-h3 fr-mt-6w">Acteurs métiers du SI applicatif</h3>
      <p className="fr-text--sm fr-mb-2w">M = Ministère, R = Réseau interministériel, E = Extranet, P = Public</p>
      <Table
        headers={["Profils acteurs", "M", "R", "E", "P", "Actions"]}
        data={[
          ...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.map((item, index) => [
            <Input
              key={`profil-${index}`}
              nativeInputProps={{
                value: item.profilsActeurs,
                onChange: (e) => {
                  const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                  newActeurs[index].profilsActeurs = e.target.value;
                  setDAData({
                    ...daData,
                    cadre1_ProjetActeurs: {
                      ...daData.cadre1_ProjetActeurs,
                      acteursMetiersDuSIApplicatif: newActeurs,
                    },
                  });
                }
              }}
            />,
            <div key={`m-${index}`} style={{ backgroundColor: '#ffcccc', padding: '0.5rem' }}>
              <Input
                nativeInputProps={{
                  type: "number",
                  value: item.nombreUtilisateursM,
                  onChange: (e) => {
                    const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                    newActeurs[index].nombreUtilisateursM = e.target.value;
                    setDAData({
                      ...daData,
                      cadre1_ProjetActeurs: {
                        ...daData.cadre1_ProjetActeurs,
                        acteursMetiersDuSIApplicatif: newActeurs,
                      },
                    });
                  }
                }}
              />
            </div>,
            <div key={`r-${index}`} style={{ backgroundColor: '#ffe5cc', padding: '0.5rem' }}>
              <Input
                nativeInputProps={{
                  type: "number",
                  value: item.nombreUtilisateursR,
                  onChange: (e) => {
                    const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                    newActeurs[index].nombreUtilisateursR = e.target.value;
                    setDAData({
                      ...daData,
                      cadre1_ProjetActeurs: {
                        ...daData.cadre1_ProjetActeurs,
                        acteursMetiersDuSIApplicatif: newActeurs,
                      },
                    });
                  }
                }}
              />
            </div>,
            <div key={`e-${index}`} style={{ backgroundColor: '#ffffcc', padding: '0.5rem' }}>
              <Input
                nativeInputProps={{
                  type: "number",
                  value: item.nombreUtilisateursE,
                  onChange: (e) => {
                    const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                    newActeurs[index].nombreUtilisateursE = e.target.value;
                    setDAData({
                      ...daData,
                      cadre1_ProjetActeurs: {
                        ...daData.cadre1_ProjetActeurs,
                        acteursMetiersDuSIApplicatif: newActeurs,
                      },
                    });
                  }
                }}
              />
            </div>,
            <div key={`p-${index}`} style={{ backgroundColor: '#ccffcc', padding: '0.5rem' }}>
              <Input
                nativeInputProps={{
                  type: "number",
                  value: item.nombreUtilisateursP,
                  onChange: (e) => {
                    const newActeurs = [...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif];
                    newActeurs[index].nombreUtilisateursP = e.target.value;
                    setDAData({
                      ...daData,
                      cadre1_ProjetActeurs: {
                        ...daData.cadre1_ProjetActeurs,
                        acteursMetiersDuSIApplicatif: newActeurs,
                      },
                    });
                  }
                }}
              />
            </div>,
            <Button
              key={`btn-${index}`}
              priority="secondary"
              size="small"
              onClick={() => {
                const newActeurs = daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.filter((_, i) => i !== index);
                setDAData({
                  ...daData,
                  cadre1_ProjetActeurs: {
                    ...daData.cadre1_ProjetActeurs,
                    acteursMetiersDuSIApplicatif: newActeurs,
                  },
                });
              }}
            >
              Supprimer
            </Button>
          ]),
          // Ligne Total
          [
            <strong key="total-label">Total utilisateurs</strong>,
            <div key="total-m" style={{ backgroundColor: '#ff0000', color: 'white', textAlign: 'center', padding: '0.5rem', fontWeight: 'bold' }}>
              {daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                (sum, item) => sum + (parseInt(item.nombreUtilisateursM) || 0),
                0
              )}
            </div>,
            <div key="total-r" style={{ backgroundColor: '#ff9900', color: 'white', textAlign: 'center', padding: '0.5rem', fontWeight: 'bold' }}>
              {daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                (sum, item) => sum + (parseInt(item.nombreUtilisateursR) || 0),
                0
              )}
            </div>,
            <div key="total-e" style={{ backgroundColor: '#ffff00', textAlign: 'center', padding: '0.5rem', fontWeight: 'bold' }}>
              {daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                (sum, item) => sum + (parseInt(item.nombreUtilisateursE) || 0),
                0
              )}
            </div>,
            <div key="total-p" style={{ backgroundColor: '#00ff00', textAlign: 'center', padding: '0.5rem', fontWeight: 'bold' }}>
              {daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif.reduce(
                (sum, item) => sum + (parseInt(item.nombreUtilisateursP) || 0),
                0
              )}
            </div>,
            <span key="total-action"></span>
          ]
        ]}
      />
      <Button
        className="fr-mt-2w"
        priority="secondary"
        size="small"
        onClick={() => {
          setDAData({
            ...daData,
            cadre1_ProjetActeurs: {
              ...daData.cadre1_ProjetActeurs,
              acteursMetiersDuSIApplicatif: [
                ...daData.cadre1_ProjetActeurs.acteursMetiersDuSIApplicatif,
                {
                  profilsActeurs: "",
                  nombreUtilisateursM: "0",
                  nombreUtilisateursR: "0",
                  nombreUtilisateursE: "0",
                  nombreUtilisateursP: "0",
                },
              ],
            },
          });
        }}
      >
        + Ajouter un profil acteur
      </Button>
    </div>
  );
}
