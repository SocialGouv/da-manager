import type { DAData } from "@/types/da.types";

interface ReadonlyCadreProps {
  daData: DAData;
}

export default function ReadonlyCadre12({ daData }: ReadonlyCadreProps) {
  const urls = daData.cadre12_URLs.urls.filter(
    (u) => u.libelleURL.trim() !== ""
  );

  if (urls.length === 0) {
    return (
      <div className="fr-callout">
        <p className="fr-callout__text">Aucune URL définie</p>
      </div>
    );
  }

  return (
    <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered">
      <div className="fr-table__wrapper">
        <div className="fr-table__container">
          <div className="fr-table__content">
            <table>
              <caption>URLs applicatives</caption>
              <thead>
                <tr>
                  <th scope="col">Libellé URL</th>
                  <th scope="col">Acteur appelant</th>
                  <th scope="col">Ressource appelée</th>
                  <th scope="col">Fonctionnalité / Service fourni</th>
                  <th scope="col">Données transitent</th>
                  <th scope="col">Précisions</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url, index) => (
                  <tr key={index}>
                    <td>{url.libelleURL}</td>
                    <td>{url.acteurAppelant}</td>
                    <td>{url.ressourceAppelee}</td>
                    <td>{url.fonctionnaliteOuServiceFourni}</td>
                    <td>{url.donneesTransitent}</td>
                    <td>{url.precisions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
