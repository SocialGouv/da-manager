import type { DAData } from "@/types/da.types";

export default function ReadonlyCadre3({ daData }: { daData: DAData }) {
  const cadre = daData.cadre3_ContraintesVolumetrie;

  const filteredDependances = cadre.dependancesAvecDautresSI.filter(
    (row) => row.systemeInformation.trim() !== ""
  );

  const vol = cadre.volumetrieDonneesDuSIApplicatif;
  const fichiers = cadre.volumetrieFichiersDuSIApplicatif;
  const reduction = cadre.reductionVolumeDonneesEtFichiers;

  return (
    <div>
      {/* Contraintes l\u00e9gales */}
      <h3 className="fr-h4 fr-mt-4w">Contraintes l&eacute;gales</h3>
      <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
        {cadre.contraintesLegales}
      </div>

      {/* Contraintes m\u00e9tiers */}
      <h3 className="fr-h4 fr-mt-4w">Contraintes m&eacute;tiers</h3>
      <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
        {cadre.contraintesMetiers}
      </div>

      {/* D\u00e9pendances avec d'autres SI */}
      {filteredDependances.length > 0 && (
        <>
          <h3 className="fr-h3 fr-mt-6w">D&eacute;pendances avec d&apos;autres SI</h3>
          <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
            <div className="fr-table__wrapper">
              <div className="fr-table__container">
                <div className="fr-table__content">
                  <table>
                    <caption>D&eacute;pendances avec d&apos;autres SI</caption>
                    <thead>
                      <tr>
                        <th scope="col">Syst&egrave;me d&apos;information</th>
                        <th scope="col" style={{ textAlign: "center" }}>Fournisseur</th>
                        <th scope="col" style={{ textAlign: "center" }}>Consommateur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDependances.map((item, index) => (
                        <tr key={index}>
                          <td>{item.systemeInformation}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.fournisseur ? (
                              <span className="fr-icon-check-line" aria-hidden="true"></span>
                            ) : (
                              "\u2014"
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.consommateur ? (
                              <span className="fr-icon-check-line" aria-hidden="true"></span>
                            ) : (
                              "\u2014"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* D\u00e9pendances avec le poste de travail */}
      <h3 className="fr-h4 fr-mt-4w">D&eacute;pendances avec le poste de travail</h3>
      <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
        {cadre.dependancesAvecLePosteDeTravail}
      </div>

      {/* Niveau utilisabilit\u00e9/s\u00e9curit\u00e9 en mode Tablette */}
      <h3 className="fr-h3 fr-mt-6w">
        Niveau d&apos;utilisabilit&eacute;/s&eacute;curit&eacute; en mode Tablette
      </h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Mode Connect&eacute;</h3>
          <p className="fr-text--sm">{cadre.niveauUtilisabiliteSecuriteEnModeTablette.modeConnecte}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Mode D&eacute;connect&eacute;</h3>
          <p className="fr-text--sm">{cadre.niveauUtilisabiliteSecuriteEnModeTablette.modeDeconnecte}</p>
        </div>
      </div>
      {cadre.niveauUtilisabiliteSecuriteEnModeTablette.precisions && (
        <>
          <h3 className="fr-h4 fr-mt-4w">Pr&eacute;cisions</h3>
          <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
            {cadre.niveauUtilisabiliteSecuriteEnModeTablette.precisions}
          </div>
        </>
      )}

      {/* Niveau utilisabilit\u00e9/s\u00e9curit\u00e9 en mode Smartphone */}
      <h3 className="fr-h3 fr-mt-6w">
        Niveau d&apos;utilisabilit&eacute;/s&eacute;curit&eacute; en mode Smartphone
      </h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Mode Connect&eacute;</h3>
          <p className="fr-text--sm">{cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.modeConnecte}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Mode D&eacute;connect&eacute;</h3>
          <p className="fr-text--sm">{cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.modeDeconnecte}</p>
        </div>
      </div>
      {cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.precisions && (
        <>
          <h3 className="fr-h4 fr-mt-4w">Pr&eacute;cisions</h3>
          <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
            {cadre.niveauUtilisabiliteSecuriteEnModeSmartphone.precisions}
          </div>
        </>
      )}

      {/* Mobile - Nombre d'appareils */}
      <h3 className="fr-h3 fr-mt-6w">Nombre d&apos;appareils mobiles</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Tablette Minist&egrave;re</h3>
          <p className="fr-text--sm">{cadre.mobile.tabletteMinistere}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Tablette Personnel</h3>
          <p className="fr-text--sm">{cadre.mobile.tablettePersonnel}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Smartphone Minist&egrave;re</h3>
          <p className="fr-text--sm">{cadre.mobile.smartphoneMinistere}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">Smartphone Personnel</h3>
          <p className="fr-text--sm">{cadre.mobile.smartphonePersonnel}</p>
        </div>
      </div>

      {/* Volum\u00e9trie donn\u00e9es du SI Applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Volum&eacute;trie donn&eacute;es du SI Applicatif</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">D1 - Nombre enregistrements &agrave; r&eacute;cup&eacute;rer</h3>
          <p className="fr-text--sm">{vol.d1_NombreEnregistrementsARecuperer}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">D2 - Nombre enregistrements / an</h3>
          <p className="fr-text--sm">{vol.d2_NombreEnregistrementsParAn}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">D3 - Taille moyenne enregistrement (KO)</h3>
          <p className="fr-text--sm">{vol.d3_TailleMoyenneEnregistrementKO}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">D4 - Nombre ann&eacute;es enregistrements en base (BDD)</h3>
          <p className="fr-text--sm">{vol.d4_NombreAnneesEnregistrementsEnBaseBDD}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">D5 - Volume BDD Initial (GO)</h3>
          <p className="fr-text--sm">{vol.d5_VolumeBDDInitialGO}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">D6 - Volume BDD Annuel (GO)</h3>
          <p className="fr-text--sm">{vol.d6_VolumeBDDActuelGO}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">D7 - Volume BDD TOTAL (GO)</h3>
          <p className="fr-text--sm">{vol.d7_VolumeBDDTotalGO}</p>
        </div>
        {vol.commentaires && (
          <div className="fr-col-6">
            <h3 className="fr-h4 fr-mt-4w">Commentaires</h3>
            <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
              {vol.commentaires}
            </div>
          </div>
        )}
      </div>

      {/* Volum\u00e9trie Fichiers du SI Applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Volum&eacute;trie Fichiers du SI Applicatif</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">F1 - Nombre de fichiers &agrave; r&eacute;cup&eacute;rer</h3>
          <p className="fr-text--sm">{fichiers.f1_NombreDeFichiersARecuperer}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">F2 - Nombre de fichiers / an</h3>
          <p className="fr-text--sm">{fichiers.f2_NombreDeFichiersParAn}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">F3 - Taille moyenne d&apos;un fichier (MO)</h3>
          <p className="fr-text--sm">{fichiers.f3_TailleMoyenneDunFichierMO}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">F4 - Nombre ann&eacute;es fichiers en File System (FS)</h3>
          <p className="fr-text--sm">{fichiers.f4_NombreAnneesFichiersEnFileSystemFS}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">F5 - Volume FS initial (GO)</h3>
          <p className="fr-text--sm">{fichiers.f5_VolumeFSInitialGO}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">F6 - Volume annuel (GO)</h3>
          <p className="fr-text--sm">{fichiers.f6_VolumeFSActuelGO}</p>
        </div>
        <div className="fr-col-6">
          <h3 className="fr-h4 fr-mt-4w">F7 - Volume FS TOTAL (GO)</h3>
          <p className="fr-text--sm">{fichiers.f7_VolumeFSTotalGO}</p>
        </div>
      </div>

      {/* R\u00e9duction volume donn\u00e9es et fichiers */}
      <h3 className="fr-h3 fr-mt-6w">R&eacute;duction volume donn&eacute;es et fichiers</h3>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <p className="fr-text--sm">
            {reduction.purgeDonneesDansBDDApplicatif ? "\u2713" : "\u2717"} Purge donn&eacute;es dans BDD applicatif
          </p>
        </div>
        <div className="fr-col-6">
          <p className="fr-text--sm">
            {reduction.purgeFichiersDansFSApplicatif ? "\u2713" : "\u2717"} Purge fichiers dans FS applicatif
          </p>
        </div>
        <div className="fr-col-6">
          <p className="fr-text--sm">
            {reduction.archivageDonneesHorsApplicatif ? "\u2713" : "\u2717"} Archivage donn&eacute;es hors applicatif
          </p>
        </div>
        <div className="fr-col-6">
          <p className="fr-text--sm">
            {reduction.archivageFichiersHorsApplicatif ? "\u2713" : "\u2717"} Archivage fichiers hors applicatif
          </p>
        </div>
      </div>
    </div>
  );
}
