import { signIn } from "@/auth";

const isDev = process.env.NODE_ENV === "development";

export default function SignIn() {
  return (
    <main className="fr-container fr-my-12w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-callout">
            <h1 className="fr-callout__title">Connexion</h1>
            <p className="fr-callout__text">
              Connectez-vous avec ProConnect pour accéder à l&apos;application
              de gestion des Documents d&apos;Architecture.
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("proconnect", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="fr-btn fr-btn--lg fr-btn--icon-left fr-icon-account-circle-fill"
              >
                Se connecter avec ProConnect
              </button>
            </form>

            {isDev && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    margin: "1.5rem 0",
                  }}
                >
                  <hr style={{ flex: 1 }} />
                  <span className="fr-text--sm fr-text--bold">ou</span>
                  <hr style={{ flex: 1 }} />
                </div>

                <form
                  action={async (formData: FormData) => {
                    "use server";
                    const email =
                      (formData.get("email") as string) || "dev@test.fr";
                    const name =
                      (formData.get("name") as string) || "Utilisateur Dev";
                    await signIn("dev-login", {
                      email,
                      name,
                      redirectTo: "/",
                    });
                  }}
                >
                  <div className="fr-input-group">
                    <label className="fr-label" htmlFor="dev-email">
                      Email
                    </label>
                    <input
                      className="fr-input"
                      type="email"
                      id="dev-email"
                      name="email"
                      defaultValue="dev@test.fr"
                    />
                  </div>
                  <div className="fr-input-group fr-mt-2w">
                    <label className="fr-label" htmlFor="dev-name">
                      Nom complet
                    </label>
                    <input
                      className="fr-input"
                      type="text"
                      id="dev-name"
                      name="name"
                      defaultValue="Utilisateur Dev"
                    />
                  </div>
                  <button
                    type="submit"
                    className="fr-btn fr-btn--secondary fr-btn--lg fr-btn--icon-left fr-icon-code-s-line fr-mt-2w"
                  >
                    Connexion Dev (bypass)
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
