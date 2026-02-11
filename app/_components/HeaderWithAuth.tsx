import { auth, signOut } from "@/auth";
import Link from "next/link";

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
                <Link href="/" title="Accueil - Documents d'Architecture">
                  <p className="fr-header__service-title">
                    Documents d&apos;Architecture
                  </p>
                </Link>
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

      <div
        className="fr-header__menu fr-modal"
        id="header-menu"
        aria-labelledby="header-menu-btn"
      >
        <div className="fr-container">
          <button
            aria-controls="header-menu"
            title="Fermer"
            type="button"
            id="button-28"
            className="fr-btn--close fr-btn"
          >
            Fermer
          </button>
          <div className="fr-header__menu-links"></div>
          <nav
            className="fr-nav"
            id="header-navigation"
            role="navigation"
            aria-label="Menu principal"
          >
            <ul className="fr-nav__list">
              {session?.user?.isAdmin && (
                <li className="fr-nav__item">
                  <Link
                    id="navigation-item-2"
                    type="link"
                    href="/users"
                    className="fr-nav__link"
                  >
                    <span
                      className="fr-icon-account-line fr-mr-1w"
                      aria-hidden="true"
                    ></span>
                    Gestion des utilisateurs
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div
        className="fr-header__menu fr-modal"
        id="modal-header-navigation"
        aria-labelledby="fr-btn-menu-mobile"
      >
        <div className="fr-container">
          <div className="fr-header__menu-links" />
        </div>
      </div>
    </header>
  );
}
