import type { DAData } from "@/types/da.types";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre2FonctionnalitesDonnees({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <h2 className="fr-h2">Cadre 2 : Exigences Fonctionnelles</h2>

      {/* Fonctionnalités du SI applicatif */}
      <h3 className="fr-h3">Fonctionnalités du SI applicatif</h3>
      <p className="fr-text--sm">M = Ministère, R = Réseau Interministériel, E = Extranet, P = Public</p>
      <table className="fr-table">
        <thead>
          <tr>
            <th>Fonctionnalité</th>
            <th>M</th>
            <th>R</th>
            <th>E</th>
            <th>P</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif.map((item, index) => (
            <tr key={index}>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.fonctionnalite,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif];
                      newItems[index].fonctionnalite = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fonctionnalitesDuSIApplicatif: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.M,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif];
                          newItems[index].M = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fonctionnalitesDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.R,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif];
                          newItems[index].R = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fonctionnalitesDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.E,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif];
                          newItems[index].E = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fonctionnalitesDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.P,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif];
                          newItems[index].P = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fonctionnalitesDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Button
                  size="small"
                  priority="secondary"
                  onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fonctionnalitesDuSIApplicatif: daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif.filter((_, i) => i !== index)}});}}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#e8edff', fontWeight: 'bold' }}>
            <td>Total fonctionnalités</td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif.filter(item => item.M).length}
            </td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif.filter(item => item.R).length}
            </td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif.filter(item => item.E).length}
            </td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif.filter(item => item.P).length}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fonctionnalitesDuSIApplicatif: [...daData.cadre2_FonctionnalitesDonnees.fonctionnalitesDuSIApplicatif, {fonctionnalite: "", M: false, R: false, E: false, P: false}]}});}}
      >
        + Ajouter une fonctionnalité
      </Button>

      {/* Données métier du SI Applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Données métier du SI Applicatif</h3>
      <table className="fr-table">
        <thead>
          <tr>
            <th>Donnée</th>
            <th>M</th>
            <th>R</th>
            <th>E</th>
            <th>P</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif.map((item, index) => (
            <tr key={index}>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.donnee,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif];
                      newItems[index].donnee = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, donneesMetierDuSIApplicatif: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.M,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif];
                          newItems[index].M = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, donneesMetierDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.R,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif];
                          newItems[index].R = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, donneesMetierDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.E,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif];
                          newItems[index].E = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, donneesMetierDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.P,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif];
                          newItems[index].P = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, donneesMetierDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Button
                  size="small"
                  priority="secondary"
                  onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, donneesMetierDuSIApplicatif: daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif.filter((_, i) => i !== index)}});}}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#e8edff', fontWeight: 'bold' }}>
            <td>Total</td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif.filter(item => item.M).length}
            </td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif.filter(item => item.R).length}
            </td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif.filter(item => item.E).length}
            </td>
            <td style={{ textAlign: 'center' }}>
              {daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif.filter(item => item.P).length}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, donneesMetierDuSIApplicatif: [...daData.cadre2_FonctionnalitesDonnees.donneesMetierDuSIApplicatif, {donnee: "", M: false, R: false, E: false, P: false}]}});}}
      >
        + Ajouter une donnée
      </Button>

      {/* Fichiers métiers du SI applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Fichiers métiers du SI applicatif</h3>
      <table className="fr-table">
        <thead>
          <tr>
            <th>Fichier</th>
            <th>M</th>
            <th>R</th>
            <th>E</th>
            <th>P</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif.map((item, index) => (
            <tr key={index}>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.fichier,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif];
                      newItems[index].fichier = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fichiersMetiersDuSIApplicatif: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.M,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif];
                          newItems[index].M = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fichiersMetiersDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.R,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif];
                          newItems[index].R = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fichiersMetiersDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.E,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif];
                          newItems[index].E = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fichiersMetiersDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.P,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif];
                          newItems[index].P = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fichiersMetiersDuSIApplicatif: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Button
                  size="small"
                  priority="secondary"
                  onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fichiersMetiersDuSIApplicatif: daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif.filter((_, i) => i !== index)}});}}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#e8edff', fontWeight: 'bold' }}>
            <td>Total</td>
            <td style={{ textAlign: 'center' }}>{daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif.filter(item => item.M).length}</td>
            <td style={{ textAlign: 'center' }}>{daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif.filter(item => item.R).length}</td>
            <td style={{ textAlign: 'center' }}>{daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif.filter(item => item.E).length}</td>
            <td style={{ textAlign: 'center' }}>{daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif.filter(item => item.P).length}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, fichiersMetiersDuSIApplicatif: [...daData.cadre2_FonctionnalitesDonnees.fichiersMetiersDuSIApplicatif, {fichier: "", M: false, R: false, E: false, P: false}]}});}}
      >
        + Ajouter un fichier
      </Button>

      {/* Référentiel données (hors SI) */}
      <h3 className="fr-h3 fr-mt-6w">Référentiel données (hors SI)</h3>
      <table className="fr-table">
        <thead>
          <tr>
            <th>Référentiel</th>
            <th>Mode échange</th>
            <th>SI Source</th>
            <th>M</th>
            <th>R</th>
            <th>E</th>
            <th>P</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI.map((item, index) => (
            <tr key={index}>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.referentiel,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI];
                      newItems[index].referentiel = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.modeEchange,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI];
                      newItems[index].modeEchange = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.siSource,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI];
                      newItems[index].siSource = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.M,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI];
                          newItems[index].M = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.R,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI];
                          newItems[index].R = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.E,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI];
                          newItems[index].E = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.P,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI];
                          newItems[index].P = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Button
                  size="small"
                  priority="secondary"
                  onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI.filter((_, i) => i !== index)}});}}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, referentielsDonneesHorsSI: [...daData.cadre2_FonctionnalitesDonnees.referentielsDonneesHorsSI, {referentiel: "", modeEchange: "", siSource: "", M: false, R: false, E: false, P: false}]}});}}
      >
        + Ajouter un référentiel
      </Button>

      {/* Sensibilité des données */}
      <h3 className="fr-h3 fr-mt-6w">Sensibilité des données</h3>
      <p className="fr-text--sm">Cocher les données concernées et compléter si manquantes</p>
      <table className="fr-table">
        <thead>
          <tr>
            <th>Type de données</th>
            <th style={{ textAlign: 'center' }}>Très sensible</th>
            <th style={{ textAlign: 'center' }}>Sensible</th>
          </tr>
        </thead>
        <tbody>
          {[
            { key: 'NIR', label: 'NIR', section: 'Architecture technique' },
            { key: 'medicales', label: 'Médicales', section: 'Architecture technique' },
            { key: 'viePrivee', label: 'Vie privée', section: 'Architecture technique' },
            { key: 'etatCivil', label: 'État civil', section: 'Architecture technique' },
            { key: 'identite', label: 'Identité', section: 'Architecture technique' },
            { key: 'viePersonnelle', label: 'Vie personnelle', section: 'Architecture technique' },
            { key: 'biometrique', label: 'Biométrique', section: 'Architecture technique' },
            { key: 'vieProfessionnelle', label: 'Vie professionnelle', section: 'Architecture technique' },
            { key: 'mecanismeFraude', label: 'Mécanisme fraude', section: 'Architecture technique' },
            { key: 'mouvementsSalariaux', label: 'Mouvements salariaux', section: 'Architecture technique' },
            { key: 'santeEconomique', label: 'Santé économique', section: 'Architecture technique' },
            { key: 'patrimoine', label: 'Patrimoine', section: 'Architecture technique' },
            { key: 'appartenanceSyndicale', label: 'Appartenance syndicale', section: 'Architecture technique' },
            { key: 'justice', label: 'Justice', section: 'Organisationnel' },
            { key: 'adressePostale', label: 'Adresse postale', section: 'Organisationnel' },
            { key: 'faillesVulnerabilite', label: 'Failles & Vulnérabilité', section: 'Architecture sécurité' },
            { key: 'publicDonnees', label: 'Public', section: 'Public' },
            { key: 'editoriaux', label: 'Éditoriaux', section: 'Public' },
            { key: 'publicationExtranet', label: 'Publication Extranet', section: 'Public' },
            { key: 'campagneDeCom', label: 'Campagne de com', section: 'Public' },
            { key: 'statistiquesPubliables', label: 'Statistiques publiables', section: 'Public' },
          ].map(({ key, label }) => {
            const value = daData.cadre2_FonctionnalitesDonnees.sensibiliteDesDonnees[key as keyof typeof daData.cadre2_FonctionnalitesDonnees.sensibiliteDesDonnees];
            return (
              <tr key={key}>
                <td>{label}</td>
                <td style={{ textAlign: 'center' }}>
                  <RadioButtons
                    options={[
                      {
                        label: "",
                        nativeInputProps: {
                          checked: value === "Très sensible",
                          onChange: () => {
                            const newValue = value === "Très sensible" ? "" : "Très sensible";
                            setDAData({
                              ...daData,
                              cadre2_FonctionnalitesDonnees: {
                                ...daData.cadre2_FonctionnalitesDonnees,
                                sensibiliteDesDonnees: {
                                  ...daData.cadre2_FonctionnalitesDonnees.sensibiliteDesDonnees,
                                  [key]: newValue
                                }
                              }
                            });
                          }
                        }
                      }
                    ]}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <RadioButtons
                    options={[
                      {
                        label: "",
                        nativeInputProps: {
                          checked: value === "Sensible",
                          onChange: () => {
                            const newValue = value === "Sensible" ? "" : "Sensible";
                            setDAData({
                              ...daData,
                              cadre2_FonctionnalitesDonnees: {
                                ...daData.cadre2_FonctionnalitesDonnees,
                                sensibiliteDesDonnees: {
                                  ...daData.cadre2_FonctionnalitesDonnees.sensibiliteDesDonnees,
                                  [key]: newValue
                                }
                              }
                            });
                          }
                        }
                      }
                    ]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Input
        label="Autres données sensibles"
        textArea
        nativeTextAreaProps={{
          rows: 3,
          value: daData.cadre2_FonctionnalitesDonnees.sensibiliteDesDonnees.autres,
          onChange: (e) => {
            setDAData({
              ...daData,
              cadre2_FonctionnalitesDonnees: {
                ...daData.cadre2_FonctionnalitesDonnees,
                sensibiliteDesDonnees: {
                  ...daData.cadre2_FonctionnalitesDonnees.sensibiliteDesDonnees,
                  autres: e.target.value
                }
              }
            });
          }
        }}
        className="fr-mt-4w"
      />

      {/* Services utilisés par application */}
      <h3 className="fr-h3 fr-mt-6w">Services utilisés par application (externes au SI applicatif)</h3>
      <table className="fr-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Mode échange</th>
            <th>SI Source</th>
            <th>M</th>
            <th>R</th>
            <th>E</th>
            <th>P</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication.map((item, index) => (
            <tr key={index}>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.service,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication];
                      newItems[index].service = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.modeEchange,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication];
                      newItems[index].modeEchange = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Input
                  nativeInputProps={{
                    value: item.siSource,
                    onChange: (e) => {
                      const newItems = [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication];
                      newItems[index].siSource = e.target.value;
                      setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: newItems}});
                    }
                  }}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.M,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication];
                          newItems[index].M = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.R,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication];
                          newItems[index].R = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.E,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication];
                          newItems[index].E = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Checkbox
                  options={[
                    {
                      label: "",
                      nativeInputProps: {
                        checked: item.P,
                        onChange: (e) => {
                          const newItems = [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication];
                          newItems[index].P = e.target.checked;
                          setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: newItems}});
                        }
                      }
                    }
                  ]}
                />
              </td>
              <td>
                <Button
                  size="small"
                  priority="secondary"
                  onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication.filter((_, i) => i !== index)}});}}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        size="small"
        className="fr-mt-2w"
        onClick={() => {setDAData({...daData, cadre2_FonctionnalitesDonnees: {...daData.cadre2_FonctionnalitesDonnees, servicesUtilisesParApplication: [...daData.cadre2_FonctionnalitesDonnees.servicesUtilisesParApplication, {service: "", modeEchange: "", siSource: "", M: false, R: false, E: false, P: false}]}});}}
      >
        + Ajouter un service
      </Button>
    </div>
  );
}
