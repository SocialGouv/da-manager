import { Header } from "@codegouvfr/react-dsfr/Header";
import { auth, signOut } from "@/auth";

export default async function HeaderWithAuth() {
  const session = await auth();

  return (
    <Header
      brandTop={<>RÉPUBLIQUE<br/>FRANÇAISE</>}
      serviceTitle="Documents d'Architecture"
      serviceTagline="Outil de création et gestion des DA"
      homeLinkProps={{
        href: "/",
        title: "Accueil - Documents d'Architecture"
      }}
      quickAccessItems={
        session?.user
          ? [
              {
                iconId: "fr-icon-account-circle-line",
                linkProps: {
                  href: "#",
                },
                text: session.user.name,
              },
              {
                iconId: "fr-icon-logout-box-r-line",
                buttonProps: {
                  onClick: async () => {
                    "use server";
                    await signOut();
                  },
                },
                text: "Se déconnecter",
              },
            ]
          : []
      }
    />
  );
}
