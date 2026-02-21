import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findOrCreateUser } from "@/lib/db/queries/users";

const isDev =
  process.env.NODE_ENV === "development" ||
  process.env.ENABLE_DEV_LOGIN === "true";

const allowedEmailDomains = (process.env.ALLOWED_EMAIL_DOMAINS || "")
  .split(",")
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

function isEmailAllowed(email: string | null | undefined): boolean {
  if (allowedEmailDomains.length === 0) return true;
  if (!email) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && allowedEmailDomains.includes(domain);
}

// Provider de dev pour bypasser ProConnect quand l'instance de test est indisponible
const devProvider = Credentials({
  id: "dev-login",
  name: "Dev Login",
  credentials: {
    email: { label: "Email", type: "email" },
    name: { label: "Nom", type: "text" },
  },
  async authorize(credentials) {
    if (!isDev) return null;

    const email = (credentials.email as string) || "utilisateur@test.fr";
    const name = (credentials.name as string) || "Utilisateur Dev";
    const parts = name.split(" ");
    const givenName = parts[0] || "Utilisateur";
    const usualName = parts.slice(1).join(" ") || "Dev";
    const proconnectSub = `dev-${email}`;
    const forceAdmin = email === "admin@test.fr";

    // Créer/retrouver l'utilisateur en DB (même logique que ProConnect)
    await findOrCreateUser(proconnectSub, email, givenName, usualName, forceAdmin);

    return {
      id: proconnectSub,
      email,
      name,
      givenName,
      usualName,
    };
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "proconnect",
      name: "ProConnect",
      type: "oidc",
      issuer: process.env.PROCONNECT_ISSUER,
      clientId: process.env.PROCONNECT_CLIENT_ID,
      clientSecret: process.env.PROCONNECT_CLIENT_SECRET,
      checks: ["state", "pkce"],
      authorization: {
        params: {
          scope: "openid given_name usual_name email",
          acr_values: "eidas1",
        },
      },
      async profile(profile, tokens) {
        // Fetch additional user info from userinfo endpoint
        if (tokens.access_token) {
          try {
            const userInfoResponse = await fetch(
              `${process.env.PROCONNECT_ISSUER}/userinfo`,
              {
                headers: {
                  Authorization: `Bearer ${tokens.access_token}`,
                },
              },
            );
            const responseText = await userInfoResponse.text();

            let userInfo;
            // ProConnect returns a JWT, not plain JSON
            if (responseText.startsWith("eyJ")) {
              // It's a JWT, decode the payload (second part)
              const payload = responseText.split(".")[1];
              const decoded = Buffer.from(payload, "base64").toString("utf-8");
              userInfo = JSON.parse(decoded);
            } else {
              // Plain JSON
              userInfo = JSON.parse(responseText);
            }

            return {
              id: userInfo.sub || profile.sub,
              name: `${userInfo.given_name || ""} ${userInfo.usual_name || ""}`.trim(),
              email: userInfo.email,
              givenName: userInfo.given_name,
              usualName: userInfo.usual_name,
            };
          } catch (error) {
            console.error("Error fetching userinfo:", error);
          }
        }

        return {
          id: profile.sub,
          name: `${profile.given_name || ""} ${profile.usual_name || ""}`.trim(),
          email: profile.email,
          givenName: profile.given_name,
          usualName: profile.usual_name,
        };
      },
    },
    // Provider de dev uniquement en développement
    ...(isDev ? [devProvider] : []),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!isEmailAllowed(user.email)) {
        return false;
      }
      return true;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/auth")) return true;
      if (pathname === "/") return true; // Allow home page without auth
      if (pathname === "/declaration-accessibilite") return true; // Page publique
      return !!auth;
    },
    async jwt({ token, user, account, profile }) {
      // À la connexion initiale : créer/retrouver l'utilisateur en DB
      if (account && user) {
        // Pour ProConnect : profile.sub, pour Credentials : user.id (= "dev-{email}")
        const proconnectSub =
          account.provider === "dev-login"
            ? (user.id as string)
            : (profile?.sub as string) || (user.id as string);
        const email = user.email || "";
        const givenName = user.givenName;
        const usualName = user.usualName;
        const forceAdmin =
          account.provider === "dev-login" && email === "admin@test.fr"
            ? true
            : account.provider === "dev-login"
              ? false
              : undefined;

        try {
          const dbUser = await findOrCreateUser(
            proconnectSub,
            email,
            givenName,
            usualName,
            forceAdmin,
          );

          token.id = proconnectSub;
          token.dbUserId = dbUser.id;
          token.isAdmin = dbUser.isAdmin;
          token.givenName = givenName;
          token.usualName = usualName;
        } catch (error) {
          console.error(
            "Erreur lors de la création/récupération de l'utilisateur en DB:",
            error,
          );
          // Fallback : continuer sans les infos DB
          token.id = proconnectSub;
          token.givenName = givenName;
          token.usualName = usualName;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.dbUserId = token.dbUserId as string;
        session.user.isAdmin = token.isAdmin ?? false;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.givenName = token.givenName;
        session.user.usualName = token.usualName;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
});
