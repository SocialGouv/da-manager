import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";

/**
 * Trouve un utilisateur par son identifiant ProConnect, ou le crée s'il n'existe pas.
 * Le tout premier utilisateur inscrit devient automatiquement admin.
 */
export async function findOrCreateUser(
  proconnectSub: string,
  email: string,
  givenName: string | undefined,
  usualName: string | undefined,
) {
  // Chercher l'utilisateur existant
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.proconnectSub, proconnectSub))
    .limit(1);

  if (existing.length > 0) {
    // Mettre à jour les infos en cas de changement côté ProConnect
    const [updated] = await db
      .update(users)
      .set({
        email,
        givenName,
        usualName,
        updatedAt: new Date(),
      })
      .where(eq(users.proconnectSub, proconnectSub))
      .returning();
    return updated;
  }

  // Vérifier si c'est le tout premier utilisateur
  const [{ value: userCount }] = await db
    .select({ value: count() })
    .from(users);
  const isFirstUser = userCount === 0;

  // Créer le nouvel utilisateur
  const [newUser] = await db
    .insert(users)
    .values({
      proconnectSub,
      email,
      givenName,
      usualName,
      isAdmin: isFirstUser,
    })
    .returning();

  return newUser;
}

/**
 * Récupère un utilisateur par son ID (UUID de la DB).
 */
export async function getUserById(userId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user ?? null;
}

/**
 * Liste tous les utilisateurs.
 */
export async function getAllUsers() {
  return db.select().from(users).orderBy(users.createdAt);
}

/**
 * Met à jour le statut admin d'un utilisateur.
 */
export async function updateUserAdmin(userId: string, isAdmin: boolean) {
  const [updated] = await db
    .update(users)
    .set({ isAdmin, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  return updated;
}

/**
 * Supprime un utilisateur.
 */
export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}
