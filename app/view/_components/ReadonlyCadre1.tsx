import type { DAData } from "@/types/da.types";
import ReadonlyTable from "./ReadonlyTable";

export default function ReadonlyCadre1({ daData }: { daData: DAData }) {
  const cadre = daData.cadre1_ProjetActeurs;

  const filteredPlanning = cadre.planningProjet.filter(
    (row) => row.version.trim() !== "" || row.date.trim() !== "" || row.commentaires.trim() !== ""
  );

  const filteredActeurs = cadre.acteursDuProjet.filter(
    (row) =>
      row.role.trim() !== "" ||
      row.nom.trim() !== "" ||
      row.fonction.trim() !== "" ||
      row.entite.trim() !== ""
  );

  return (
    <div>
      <h3 className="fr-h4 fr-mt-4w">Nom du projet applicatif</h3>
      <p className="fr-text--sm">{cadre.nomDuProjet}</p>

      <h3 className="fr-h4 fr-mt-6w">Contexte projet applicatif</h3>
      <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
        {cadre.contexteProjetApplicatif}
      </div>

      <h3 className="fr-h4 fr-mt-6w">Enjeux projet applicatif</h3>
      <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
        {cadre.enjeuxProjetApplicatif}
      </div>

      <h3 className="fr-h4 fr-mt-6w">Objectifs projet applicatif</h3>
      <div className="fr-text--sm" style={{ whiteSpace: "pre-wrap" }}>
        {cadre.objectifsProjetApplicatif}
      </div>

      {filteredPlanning.length > 0 && (
        <>
          <h3 className="fr-h3 fr-mt-6w">Planning projet</h3>
          <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
            <div className="fr-table__wrapper">
              <div className="fr-table__container">
                <div className="fr-table__content">
                  <table>
                    <caption>Planning projet</caption>
                    <thead>
                      <tr>
                        <th scope="col">Version</th>
                        <th scope="col">Date</th>
                        <th scope="col">Commentaires</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlanning.map((item, index) => (
                        <tr key={index}>
                          <td>{item.version}</td>
                          <td>{item.date}</td>
                          <td>{item.commentaires}</td>
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

      {filteredActeurs.length > 0 && (
        <>
          <h3 className="fr-h3 fr-mt-6w">Acteurs du projet</h3>
          <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
            <div className="fr-table__wrapper">
              <div className="fr-table__container">
                <div className="fr-table__content">
                  <table>
                    <caption>Acteurs du projet</caption>
                    <thead>
                      <tr>
                        <th scope="col">R&ocirc;le</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Fonction</th>
                        <th scope="col">Entit&eacute;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActeurs.map((item, index) => (
                        <tr key={index}>
                          <td>{item.role}</td>
                          <td>{item.nom}</td>
                          <td>{item.fonction}</td>
                          <td>{item.entite}</td>
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

      <h3 className="fr-h3 fr-mt-6w">Acteurs m&eacute;tiers du SI applicatif</h3>
      <p className="fr-text--sm fr-mb-2w">
        M = Minist&egrave;re, R = R&eacute;seau interminist&eacute;riel, E = Extranet, P = Public
      </p>
      <ReadonlyTable
        caption="Acteurs m&eacute;tiers du SI applicatif"
        textColumns={[{ key: "profilsActeurs", label: "Profils acteurs" }]}
        groupHeader="Nombre utilisateurs"
        columns={[
          { key: "nombreUtilisateursM", label: "M", type: "number", headerClass: "fr-th--red", totalClass: "fr-td--red" },
          { key: "nombreUtilisateursR", label: "R", type: "number", headerClass: "fr-th--orange", totalClass: "fr-td--orange" },
          { key: "nombreUtilisateursE", label: "E", type: "number", headerClass: "fr-th--yellow", totalClass: "fr-td--yellow" },
          { key: "nombreUtilisateursP", label: "P", type: "number", headerClass: "fr-th--green", totalClass: "fr-td--green" },
        ]}
        rows={cadre.acteursMetiersDuSIApplicatif}
        totalLabel="Total utilisateurs"
      />
    </div>
  );
}
