import Button from "@codegouvfr/react-dsfr/Button";

export default async function AuthError({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="fr-container fr-my-12w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-8">
          <div className="fr-alert fr-alert--error">
            <h3 className="fr-alert__title">Erreur d&apos;authentification</h3>
            <p>
              {error === "Configuration" && "Erreur de configuration de ProConnect. Vérifiez que l'URL PROCONNECT_ISSUER est correcte et que les redirect URIs sont bien configurés dans ProConnect."}
              {error === "AccessDenied" && "L'accès a été refusé. Vous avez annulé la connexion."}
              {error === "Verification" && "Le lien de vérification a expiré ou a déjà été utilisé."}
              {!error && "Une erreur est survenue lors de l'authentification."}
            </p>
            {error && (
              <p className="fr-text--sm">
                Code d&apos;erreur: <code>{error}</code>
              </p>
            )}
          </div>

          <div className="fr-mt-4w">
            <Button
              linkProps={{ href: "/auth/signin" }}
              priority="secondary"
            >
              Retour à la page de connexion
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
