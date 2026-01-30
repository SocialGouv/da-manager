import NextAuth from "next-auth";

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
            const userInfoResponse = await fetch(`${process.env.PROCONNECT_ISSUER}/userinfo`, {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
              },
            });
            const responseText = await userInfoResponse.text();

            let userInfo;
            // ProConnect returns a JWT, not plain JSON
            if (responseText.startsWith('eyJ')) {
              // It's a JWT, decode the payload (second part)
              const payload = responseText.split('.')[1];
              const decoded = Buffer.from(payload, 'base64').toString('utf-8');
              userInfo = JSON.parse(decoded);
            } else {
              // Plain JSON
              userInfo = JSON.parse(responseText);
            }

            return {
              id: userInfo.sub || profile.sub,
              name: `${userInfo.given_name || ''} ${userInfo.usual_name || ''}`.trim(),
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
          name: `${profile.given_name || ''} ${profile.usual_name || ''}`.trim(),
          email: profile.email,
          givenName: profile.given_name,
          usualName: profile.usual_name,
        };
      },
    },
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/auth")) return true;
      if (pathname === "/") return true; // Allow home page without auth
      return !!auth;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.givenName = (profile as any).given_name;
        token.usualName = (profile as any).usual_name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).givenName = token.givenName;
        (session.user as any).usualName = token.usualName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
