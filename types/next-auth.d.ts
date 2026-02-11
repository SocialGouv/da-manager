import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // proconnect sub
      dbUserId: string; // UUID de la DB
      isAdmin: boolean;
      name: string;
      email: string;
      givenName?: string;
      usualName?: string;
    };
  }

  interface User {
    givenName?: string;
    usualName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    dbUserId?: string;
    isAdmin?: boolean;
    givenName?: string;
    usualName?: string;
  }
}
