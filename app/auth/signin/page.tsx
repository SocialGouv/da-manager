import { signIn } from "@/auth";
import Button from "@codegouvfr/react-dsfr/Button";

export default function SignIn() {
  return (
    <main className="fr-container fr-my-12w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-callout">
            <h1 className="fr-callout__title">Connexion</h1>
            <p className="fr-callout__text">
              Connectez-vous avec ProConnect pour accéder à l&apos;application de gestion des Documents d&apos;Architecture.
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("proconnect", { redirectTo: "/" });
              }}
            >
              <Button
                type="submit"
                size="large"
                iconId="fr-icon-account-circle-fill"
                iconPosition="left"
              >
                Se connecter avec ProConnect
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
