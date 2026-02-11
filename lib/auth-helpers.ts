import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Vérifie que l'utilisateur est authentifié.
 * Redirige vers /auth/signin si non connecté.
 * À utiliser dans les Server Components et Server Actions.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  return session;
}

/**
 * Vérifie que l'utilisateur est admin.
 * Redirige vers / si non admin.
 * À utiliser dans les Server Components et Server Actions.
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (!session.user.isAdmin) {
    redirect("/");
  }
  return session;
}

/**
 * Vérifie l'authentification pour les API routes.
 * Retourne la session ou null (pas de redirection).
 */
export async function getAuthSession() {
  return auth();
}
