import { auth, signOut } from "@/auth";

export default async function HeaderWithAuth() {
  const session = await auth();

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <p className="fr-logo">
                    RÉPUBLIQUE
                    <br />
                    FRANÇAISE
                  </p>
                </div>
              </div>
              <div className="fr-header__service">
                <a href="/" title="Accueil - Documents d'Architecture">
                  <p className="fr-header__service-title">
                    Documents d&apos;Architecture
                  </p>
                </a>
                <p className="fr-header__service-tagline">
                  Outil de création et gestion des DA
                </p>
              </div>
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <ul className="fr-btns-group">
                  {session?.user && (
                    <>
                      <li>
                        <a
                          className="fr-btn fr-icon-account-circle-line"
                          href="#"
                        >
                          {session.user.name}
                        </a>
                      </li>
                      <li>
                        <form
                          action={async () => {
                            "use server";
                            await signOut();
                          }}
                        >
                          <button
                            type="submit"
                            className="fr-btn fr-icon-logout-box-r-line"
                          >
                            Se déconnecter
                          </button>
                        </form>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-header__menu fr-modal" id="modal-header-navigation" aria-labelledby="fr-btn-menu-mobile">
        <div className="fr-container">
          <div className="fr-header__menu-links" />
        </div>
      </div>
    </header>
  );
}
