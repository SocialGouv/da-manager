import { db } from "@/lib/db";
import { forms, formAccess } from "@/lib/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import type { DAData } from "@/types/da.types";

/**
 * Crée un nouveau DA.
 */
export async function createForm(
  nom: string,
  data: DAData,
  createdBy: string,
) {
  const [form] = await db
    .insert(forms)
    .values({
      nom,
      data,
      createdBy,
    })
    .returning();
  return form;
}

/**
 * Récupère un DA par son ID.
 */
export async function getFormById(formId: string) {
  const [form] = await db
    .select()
    .from(forms)
    .where(eq(forms.id, formId))
    .limit(1);
  return form ?? null;
}

/**
 * Liste les DA accessibles par un utilisateur.
 * - Admin : tous les DA
 * - Non-admin : uniquement les DA partagés via form_access
 */
export async function getFormsForUser(userId: string, isAdmin: boolean) {
  if (isAdmin) {
    return db
      .select({
        id: forms.id,
        nom: forms.nom,
        createdAt: forms.createdAt,
        updatedAt: forms.updatedAt,
      })
      .from(forms)
      .orderBy(desc(forms.updatedAt));
  }

  return db
    .select({
      id: forms.id,
      nom: forms.nom,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
    })
    .from(forms)
    .innerJoin(formAccess, eq(forms.id, formAccess.formId))
    .where(eq(formAccess.userId, userId))
    .orderBy(desc(forms.updatedAt));
}

/**
 * Met à jour les données d'un DA.
 * Si expectedUpdatedAt est fourni, vérifie que le document n'a pas été modifié
 * entre-temps (optimistic locking). Retourne null en cas de conflit.
 */
export async function updateFormData(
  formId: string,
  data: DAData,
  expectedUpdatedAt?: Date,
) {
  const nom =
    data.cadre1_ProjetActeurs?.nomDuProjet || "Document d'Architecture";

  const whereClause = expectedUpdatedAt
    ? and(eq(forms.id, formId), eq(forms.updatedAt, expectedUpdatedAt))
    : eq(forms.id, formId);

  const result = await db
    .update(forms)
    .set({
      data,
      nom,
      updatedAt: new Date(),
    })
    .where(whereClause)
    .returning();

  // Si aucune ligne mise à jour et qu'on avait un expectedUpdatedAt → conflit
  if (result.length === 0) {
    return null;
  }

  return result[0];
}

/**
 * Supprime un DA.
 */
export async function deleteForm(formId: string) {
  await db.delete(forms).where(eq(forms.id, formId));
}

/**
 * Vérifie si un utilisateur a accès à un DA.
 * Retourne le rôle ('viewer' | 'editor') ou null si pas d'accès.
 */
export async function checkFormAccess(
  formId: string,
  userId: string,
  isAdmin: boolean,
): Promise<"admin" | "editor" | "viewer" | null> {
  if (isAdmin) return "admin";

  const [access] = await db
    .select({ role: formAccess.role })
    .from(formAccess)
    .where(
      sql`${formAccess.formId} = ${formId} AND ${formAccess.userId} = ${userId}`,
    )
    .limit(1);

  return (access?.role as "viewer" | "editor") ?? null;
}
