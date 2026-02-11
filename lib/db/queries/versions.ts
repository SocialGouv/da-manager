import { db } from "@/lib/db";
import { versions } from "@/lib/db/schema";
import { eq, desc, isNull, and, sql, lt } from "drizzle-orm";
import type { DAData } from "@/types/da.types";

const MAX_AUTO_SAVES = 50;
const AUTO_SAVE_THROTTLE_SECONDS = 30;

/**
 * Crée une version auto-save.
 * Throttle : ne crée pas de version si la dernière auto-save date de < 30 secondes.
 * Nettoyage : ne garde que les 50 dernières auto-saves.
 */
export async function createAutoSaveVersion(
  formId: string,
  data: DAData,
  userId: string,
) {
  // Vérifier le throttle : dernière auto-save < 30 secondes ?
  const [lastAutoSave] = await db
    .select({ createdAt: versions.createdAt })
    .from(versions)
    .where(and(eq(versions.formId, formId), isNull(versions.name)))
    .orderBy(desc(versions.createdAt))
    .limit(1);

  if (lastAutoSave) {
    const elapsed =
      (Date.now() - new Date(lastAutoSave.createdAt).getTime()) / 1000;
    if (elapsed < AUTO_SAVE_THROTTLE_SECONDS) {
      return null; // Trop récent, on skip
    }
  }

  // Calculer le prochain numéro de version
  const [lastVersion] = await db
    .select({ versionNumber: versions.versionNumber })
    .from(versions)
    .where(eq(versions.formId, formId))
    .orderBy(desc(versions.versionNumber))
    .limit(1);

  const nextNumber = (lastVersion?.versionNumber ?? 0) + 1;

  // Créer la version auto-save
  const [version] = await db
    .insert(versions)
    .values({
      formId,
      versionNumber: nextNumber,
      name: null, // auto-save
      data,
      createdBy: userId,
    })
    .returning();

  // Nettoyage : supprimer les auto-saves excédentaires
  const autoSaves = await db
    .select({ id: versions.id, createdAt: versions.createdAt })
    .from(versions)
    .where(and(eq(versions.formId, formId), isNull(versions.name)))
    .orderBy(desc(versions.createdAt));

  if (autoSaves.length > MAX_AUTO_SAVES) {
    const toDelete = autoSaves.slice(MAX_AUTO_SAVES).map((v) => v.id);
    if (toDelete.length > 0) {
      await db.delete(versions).where(
        sql`${versions.id} IN (${sql.join(
          toDelete.map((id) => sql`${id}`),
          sql`, `,
        )})`,
      );
    }
  }

  return version;
}

/**
 * Crée un snapshot nommé (version figée).
 */
export async function createNamedVersion(
  formId: string,
  name: string,
  data: DAData,
  userId: string,
) {
  // Calculer le prochain numéro de version
  const [lastVersion] = await db
    .select({ versionNumber: versions.versionNumber })
    .from(versions)
    .where(eq(versions.formId, formId))
    .orderBy(desc(versions.versionNumber))
    .limit(1);

  const nextNumber = (lastVersion?.versionNumber ?? 0) + 1;

  const [version] = await db
    .insert(versions)
    .values({
      formId,
      versionNumber: nextNumber,
      name,
      data,
      createdBy: userId,
    })
    .returning();

  return version;
}

/**
 * Liste les versions d'un DA (triées par date desc).
 */
export async function getVersionsForForm(formId: string) {
  return db
    .select({
      id: versions.id,
      versionNumber: versions.versionNumber,
      name: versions.name,
      createdAt: versions.createdAt,
      createdBy: versions.createdBy,
    })
    .from(versions)
    .where(eq(versions.formId, formId))
    .orderBy(desc(versions.createdAt));
}

/**
 * Récupère une version spécifique.
 */
export async function getVersionById(versionId: string) {
  const [version] = await db
    .select()
    .from(versions)
    .where(eq(versions.id, versionId))
    .limit(1);
  return version ?? null;
}
