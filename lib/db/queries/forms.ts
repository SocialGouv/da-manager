import { db } from "@/lib/db";
import { forms, formAccess, users, editLogs } from "@/lib/db/schema";
import { eq, desc, sql, and, ne } from "drizzle-orm";
import type { DAData } from "@/types/da.types";

/**
 * Vérifie si un nom de DA est déjà utilisé (insensible à la casse).
 * Exclut optionnellement un DA (pour l'édition).
 */
export async function isFormNameTaken(
  nom: string,
  excludeFormId?: string,
): Promise<boolean> {
  const conditions = [sql`LOWER(${forms.nom}) = LOWER(${nom})`];
  if (excludeFormId) {
    conditions.push(ne(forms.id, excludeFormId));
  }

  const result = await db
    .select({ id: forms.id })
    .from(forms)
    .where(and(...conditions))
    .limit(1);

  return result.length > 0;
}

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
 * Liste tous les DA avec info auteur (dernier éditeur ou créateur).
 */
export async function getAllForms() {
  const lastEditorSubquery = db
    .select({
      formId: editLogs.formId,
      userId: editLogs.userId,
    })
    .from(editLogs)
    .where(
      sql`${editLogs.id} = (
        SELECT el2.id FROM edit_logs el2
        WHERE el2.form_id = ${editLogs.formId}
        ORDER BY el2.created_at DESC
        LIMIT 1
      )`,
    )
    .as("last_editor");

  return db
    .select({
      id: forms.id,
      nom: forms.nom,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
      authorGivenName:
        sql<string>`COALESCE(${users.givenName}, creator.given_name)`.as(
          "author_given_name",
        ),
      authorUsualName:
        sql<string>`COALESCE(${users.usualName}, creator.usual_name)`.as(
          "author_usual_name",
        ),
    })
    .from(forms)
    .leftJoin(lastEditorSubquery, eq(forms.id, lastEditorSubquery.formId))
    .leftJoin(users, eq(lastEditorSubquery.userId, users.id))
    .leftJoin(
      sql`users as creator`,
      sql`creator.id = ${forms.createdBy}`,
    )
    .orderBy(desc(forms.updatedAt));
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
    // Sous-requête : dernier éditeur via edit_logs
    const lastEditorSubquery = db
      .select({
        formId: editLogs.formId,
        userId: editLogs.userId,
      })
      .from(editLogs)
      .where(
        sql`${editLogs.id} = (
          SELECT el2.id FROM edit_logs el2
          WHERE el2.form_id = ${editLogs.formId}
          ORDER BY el2.created_at DESC
          LIMIT 1
        )`,
      )
      .as("last_editor");

    // Fallback : dernier éditeur, sinon créateur du DA
    return db
      .select({
        id: forms.id,
        nom: forms.nom,
        createdAt: forms.createdAt,
        updatedAt: forms.updatedAt,
        authorGivenName:
          sql<string>`COALESCE(${users.givenName}, creator.given_name)`.as(
            "author_given_name",
          ),
        authorUsualName:
          sql<string>`COALESCE(${users.usualName}, creator.usual_name)`.as(
            "author_usual_name",
          ),
      })
      .from(forms)
      .leftJoin(lastEditorSubquery, eq(forms.id, lastEditorSubquery.formId))
      .leftJoin(users, eq(lastEditorSubquery.userId, users.id))
      .leftJoin(
        sql`users as creator`,
        sql`creator.id = ${forms.createdBy}`,
      )
      .orderBy(desc(forms.updatedAt));
  }

  // Sous-requête : dernier éditeur via edit_logs
  const lastEditorSubquery = db
    .select({
      formId: editLogs.formId,
      userId: editLogs.userId,
    })
    .from(editLogs)
    .where(
      sql`${editLogs.id} = (
        SELECT el2.id FROM edit_logs el2
        WHERE el2.form_id = ${editLogs.formId}
        ORDER BY el2.created_at DESC
        LIMIT 1
      )`,
    )
    .as("last_editor_nonadmin");

  return db
    .select({
      id: forms.id,
      nom: forms.nom,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
      authorGivenName:
        sql<string>`COALESCE(${users.givenName}, creator_na.given_name)`.as(
          "author_given_name",
        ),
      authorUsualName:
        sql<string>`COALESCE(${users.usualName}, creator_na.usual_name)`.as(
          "author_usual_name",
        ),
    })
    .from(forms)
    .innerJoin(formAccess, eq(forms.id, formAccess.formId))
    .leftJoin(lastEditorSubquery, eq(forms.id, lastEditorSubquery.formId))
    .leftJoin(users, eq(lastEditorSubquery.userId, users.id))
    .leftJoin(
      sql`users as creator_na`,
      sql`creator_na.id = ${forms.createdBy}`,
    )
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

  // Optimistic locking : vérification applicative du timestamp
  if (expectedUpdatedAt) {
    const [current] = await db
      .select({ updatedAt: forms.updatedAt })
      .from(forms)
      .where(eq(forms.id, formId))
      .limit(1);

    if (
      current &&
      current.updatedAt.getTime() !== expectedUpdatedAt.getTime()
    ) {
      return null; // Conflit détecté
    }
  }

  const result = await db
    .update(forms)
    .set({
      data,
      nom,
      updatedAt: new Date(),
    })
    .where(eq(forms.id, formId))
    .returning();

  if (result.length === 0) {
    return null;
  }

  return result[0];
}

/**
 * Renomme un DA (met à jour forms.nom ET data.cadre1_ProjetActeurs.nomDuProjet).
 */
export async function renameForm(formId: string, newNom: string) {
  const form = await getFormById(formId);
  if (!form) return null;

  const updatedData = { ...form.data } as DAData;
  if (updatedData.cadre1_ProjetActeurs) {
    updatedData.cadre1_ProjetActeurs.nomDuProjet = newNom;
  }

  const [result] = await db
    .update(forms)
    .set({
      nom: newNom,
      data: updatedData,
      updatedAt: new Date(),
    })
    .where(eq(forms.id, formId))
    .returning();

  return result ?? null;
}

/**
 * Supprime un DA.
 */
export async function deleteForm(formId: string) {
  await db.delete(forms).where(eq(forms.id, formId));
}

/**
 * Vérifie si un utilisateur a accès à un DA.
 * - Admin → "admin"
 * - Accès explicite via formAccess → "editor" | "viewer"
 * - Tout utilisateur authentifié → "viewer" (accès lecture par défaut)
 */
export async function checkFormAccess(
  formId: string,
  userId: string,
  isAdmin: boolean,
): Promise<"admin" | "editor" | "viewer"> {
  if (isAdmin) return "admin";

  const [access] = await db
    .select({ role: formAccess.role })
    .from(formAccess)
    .where(
      sql`${formAccess.formId} = ${formId} AND ${formAccess.userId} = ${userId}`,
    )
    .limit(1);

  return (access?.role as "editor" | "viewer") ?? "viewer";
}
