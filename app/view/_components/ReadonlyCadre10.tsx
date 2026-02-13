import type { DAData } from "@/types/da.types";

interface ReadonlyCadreProps {
  daData: DAData;
}

export default function ReadonlyCadre10({ daData }: ReadonlyCadreProps) {
  const flux = daData.cadre10_MatricesFlux.fluxApplicatifs.filter(
    (f) => f.source.trim() !== ""
  );

  if (flux.length === 0) {
    return (
      <div className="fr-callout">
        <p className="fr-callout__text">Aucun flux défini</p>
      </div>
    );
  }

  return (
    <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered">
      <div className="fr-table__wrapper">
        <div className="fr-table__container">
          <div className="fr-table__content">
            <table>
              <caption>Matrices des flux applicatifs</caption>
              <thead>
                <tr>
                  <th scope="col">N° Flux</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Protocole</th>
                  <th scope="col">Commentaires</th>
                </tr>
              </thead>
              <tbody>
                {flux.map((f, index) => (
                  <tr key={index}>
                    <td>{f.numeroFlux}</td>
                    <td>{f.source}</td>
                    <td>{f.destination}</td>
                    <td>{f.protocole}</td>
                    <td>{f.commentaires}</td>
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
