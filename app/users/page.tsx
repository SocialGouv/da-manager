import { promises as fs } from "fs";
import path from "path";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  direction: string;
  dateCreation: string;
}

async function getUserList(): Promise<User[]> {
  try {
    const filePath = path.join(process.cwd(), "public/users/index.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(
      "Erreur lors du chargement de la liste des utilisateurs:",
      error,
    );
    return [];
  }
}

export default async function Users() {
  const users = await getUserList();

  return (
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--middle fr-my-4w">
        <div className="fr-col-12">
          <h1 className="fr-h1">Gestion des utilisateurs</h1>
          <p className="fr-text--lead">Liste des utilisateurs du système</p>
        </div>
      </div>

      <div className="fr-table fr-table--no-scroll fr-table--no-caption fr-table--bordered fr-table--sm">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <caption>Liste des utilisateurs</caption>
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rôle</th>
                    <th scope="col">Direction</th>
                    <th scope="col">Date de création</th>
                    <th
                      scope="col"
                      style={{ textAlign: "right" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        {user.prenom} {user.nom}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.direction}</td>
                      <td>
                        {new Date(user.dateCreation).toLocaleDateString(
                          "fr-FR",
                        )}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="fr-btn fr-btn--tertiary-no-outline"
                          type="button"
                          title="Modifier"
                        >
                          <span
                            className="fr-icon-edit-line"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          className="fr-btn fr-btn--tertiary-no-outline"
                          type="button"
                          title="Supprimer"
                        >
                          <span
                            className="fr-icon-delete-line"
                            aria-hidden="true"
                          ></span>
                        </button>
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
                <button className="fr-btn fr-btn--secondary">
                  <span
                    className="fr-icon-add-line"
                    aria-hidden="true"
                  ></span>
                  Ajouter un utilisateur
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
