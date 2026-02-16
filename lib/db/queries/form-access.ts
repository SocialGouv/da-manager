import { db } from "@/lib/db";
import { formAccess, forms, users } from "@/lib/db/schema";
import { eq, and, notInArray, desc } from "drizzle-orm";

/**
 * Liste les utilisateurs ayant accès à un DA, avec leurs infos.
 */
export async function getFormAccessList(formId: string) {
  return db
    .select({
      id: formAccess.id,
      userId: formAccess.userId,
      role: formAccess.role,
      createdAt: formAccess.createdAt,
      userEmail: users.email,
      userGivenName: users.givenName,
      userUsualName: users.usualName,
      userIsAdmin: users.isAdmin,
    })
    .from(formAccess)
    .innerJoin(users, eq(formAccess.userId, users.id))
    .where(eq(formAccess.formId, formId))
    .orderBy(users.usualName);
}

/**
 * Accorde l'accès à un DA pour un utilisateur.
 */
export async function grantAccess(
  formId: string,
  userId: string,
  role: "viewer" | "editor" = "editor",
) {
  const [access] = await db
    .insert(formAccess)
    .values({ formId, userId, role })
    .onConflictDoUpdate({
      target: [formAccess.formId, formAccess.userId],
      set: { role },
    })
    .returning();
  return access;
}

/**
 * Révoque l'accès à un DA pour un utilisateur.
 */
export async function revokeAccess(formId: string, userId: string) {
  await db
    .delete(formAccess)
    .where(
      and(eq(formAccess.formId, formId), eq(formAccess.userId, userId)),
    );
}

/**
 * Liste les DA partagés à un utilisateur via formAccess.
 */
export async function getSharedDAsForUser(userId: string) {
  return db
    .select({
      id: forms.id,
      nom: forms.nom,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
      sharedAt: formAccess.createdAt,
    })
    .from(formAccess)
    .innerJoin(forms, eq(formAccess.formId, forms.id))
    .where(eq(formAccess.userId, userId))
    .orderBy(desc(forms.updatedAt));
}

/**
 * Liste les utilisateurs qui n'ont PAS encore accès à un DA donné.
 */
export async function getUsersWithoutAccess(formId: string) {
  // Récupérer les IDs des utilisateurs qui ont déjà accès
  const existingAccess = await db
    .select({ userId: formAccess.userId })
    .from(formAccess)
    .where(eq(formAccess.formId, formId));

  const existingUserIds = existingAccess.map((a) => a.userId);

  if (existingUserIds.length === 0) {
    return db.select().from(users).orderBy(users.usualName);
  }

  return db
    .select()
    .from(users)
    .where(notInArray(users.id, existingUserIds))
    .orderBy(users.usualName);
}
