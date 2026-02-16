/**
 * Build a session object matching the next-auth Session type declared in
 * types/next-auth.d.ts.
 */
export function makeSession(user: {
  dbUserId: string;
  isAdmin: boolean;
  email?: string;
  name?: string;
  givenName?: string;
  usualName?: string;
}) {
  return {
    user: {
      id: `proconnect-${user.dbUserId}`,
      dbUserId: user.dbUserId,
      isAdmin: user.isAdmin,
      name: user.name ?? "Test User",
      email: user.email ?? "test@test.fr",
      givenName: user.givenName,
      usualName: user.usualName,
    },
    expires: new Date(Date.now() + 86_400_000).toISOString(),
  };
}
