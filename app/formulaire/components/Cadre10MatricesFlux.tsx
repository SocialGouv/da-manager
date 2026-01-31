import type { DAData } from "@/types/da.types";

interface CadreProps {
  daData: DAData;
  setDAData: (data: DAData) => void;
}

export default function Cadre10MatricesFlux({ daData, setDAData }: CadreProps) {
  return (
    <div>
      <div className="fr-table">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <thead>
                  <tr>
                    <th>Numéro Flux</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Protocole</th>
                    <th>Commentaires</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {daData.cadre10_MatricesFlux.fluxApplicatifs.map((flux, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={flux.numeroFlux}
                          onChange={(e) => {
                            const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                            newFlux[index].numeroFlux = e.target.value;
                            setDAData({
                              ...daData,
                              cadre10_MatricesFlux: {
                                fluxApplicatifs: newFlux,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={flux.source}
                          onChange={(e) => {
                            const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                            newFlux[index].source = e.target.value;
                            setDAData({
                              ...daData,
                              cadre10_MatricesFlux: {
                                fluxApplicatifs: newFlux,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={flux.destination}
                          onChange={(e) => {
                            const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                            newFlux[index].destination = e.target.value;
                            setDAData({
                              ...daData,
                              cadre10_MatricesFlux: {
                                fluxApplicatifs: newFlux,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={flux.protocole}
                          onChange={(e) => {
                            const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                            newFlux[index].protocole = e.target.value;
                            setDAData({
                              ...daData,
                              cadre10_MatricesFlux: {
                                fluxApplicatifs: newFlux,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="fr-input"
                          type="text"
                          value={flux.commentaires}
                          onChange={(e) => {
                            const newFlux = [...daData.cadre10_MatricesFlux.fluxApplicatifs];
                            newFlux[index].commentaires = e.target.value;
                            setDAData({
                              ...daData,
                              cadre10_MatricesFlux: {
                                fluxApplicatifs: newFlux,
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="fr-btn fr-btn--sm fr-btn--secondary fr-icon-delete-line"
                          type="button"
                          title="Supprimer"
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
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="fr-table__footer">
          <div className="fr-table__footer--end">
            <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-md">
              <li>
                <button
                  className="fr-btn fr-btn--secondary"
                  type="button"
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
                  <span className="fr-icon-add-line" aria-hidden="true"></span>
                  Ajouter un flux applicatif
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
