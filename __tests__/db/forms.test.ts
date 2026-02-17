import { describe, it, expect } from "vitest";
import {
  createForm,
  getFormById,
  getAllForms,
  getFormsForUser,
  updateFormData,
  deleteForm,
  isFormNameTaken,
  renameForm,
} from "@/lib/db/queries/forms";
import { db } from "@/lib/db";
import { versions, formAccess, editLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  createTestUser,
  createAdminUser,
  createTestForm,
  createTestEditLog,
  createTestVersion,
  grantTestAccess,
  makeDAData,
} from "../helpers/fixtures";

describe("createForm", () => {
  it("creates a form with nom, data, and createdBy", async () => {
    const user = await createTestUser();
    const data = makeDAData({ nomDuProjet: "Mon DA" });
    const form = await createForm("Mon DA", data, user.id);

    expect(form.nom).toBe("Mon DA");
    expect(form.data).toEqual(data);
    expect(form.createdBy).toBe(user.id);
    expect(form.id).toBeDefined();
    expect(form.createdAt).toBeInstanceOf(Date);
    expect(form.updatedAt).toBeInstanceOf(Date);
  });

  it("generates a unique UUID for each form", async () => {
    const user = await createTestUser();
    const f1 = await createTestForm(user.id, { nom: "DA-1" });
    const f2 = await createTestForm(user.id, { nom: "DA-2" });

    expect(f1.id).not.toBe(f2.id);
  });
});

describe("getFormById", () => {
  it("returns a form by its UUID", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const found = await getFormById(form.id);

    expect(found).not.toBeNull();
    expect(found!.id).toBe(form.id);
    expect(found!.nom).toBe(form.nom);
  });

  it("returns null for non-existent UUID", async () => {
    const found = await getFormById("00000000-0000-0000-0000-000000000000");
    expect(found).toBeNull();
  });
});

describe("getAllForms", () => {
  it("returns all forms ordered by updatedAt DESC", async () => {
    const user = await createTestUser();
    const f1 = await createTestForm(user.id, { nom: "Old" });
    const f2 = await createTestForm(user.id, { nom: "Middle" });
    const f3 = await createTestForm(user.id, { nom: "New" });

    const all = await getAllForms();
    expect(all).toHaveLength(3);
    // Most recently created should be first (highest updatedAt)
    expect(all[0].nom).toBe("New");
  });

  it("returns empty array when no forms exist", async () => {
    const all = await getAllForms();
    expect(all).toHaveLength(0);
  });

  it("includes author name from creator when no edit logs exist", async () => {
    const user = await createTestUser({
      givenName: "Jean",
      usualName: "Dupont",
    });
    await createTestForm(user.id);

    const all = await getAllForms();
    expect(all).toHaveLength(1);
    expect(all[0].authorGivenName).toBe("Jean");
    expect(all[0].authorUsualName).toBe("Dupont");
  });

  it("uses last editor name from edit_logs over creator name", async () => {
    const creator = await createTestUser({
      givenName: "Creator",
      usualName: "Original",
    });
    const editor = await createTestUser({
      givenName: "Editor",
      usualName: "Latest",
    });
    const form = await createTestForm(creator.id);
    await createTestEditLog(form.id, editor.id);

    const all = await getAllForms();
    expect(all).toHaveLength(1);
    expect(all[0].authorGivenName).toBe("Editor");
    expect(all[0].authorUsualName).toBe("Latest");
  });
});

describe("getFormsForUser", () => {
  it("returns all forms for admin user regardless of formAccess", async () => {
    const admin = await createAdminUser();
    const other = await createTestUser();
    await createTestForm(other.id, { nom: "DA-1" });
    await createTestForm(other.id, { nom: "DA-2" });
    await createTestForm(other.id, { nom: "DA-3" });

    const result = await getFormsForUser(admin.id, true);
    expect(result).toHaveLength(3);
  });

  it("returns only forms shared via formAccess for non-admin", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const f1 = await createTestForm(owner.id, { nom: "Shared" });
    await createTestForm(owner.id, { nom: "Not Shared 1" });
    await createTestForm(owner.id, { nom: "Not Shared 2" });

    await grantTestAccess(f1.id, viewer.id, "editor");

    const result = await getFormsForUser(viewer.id, false);
    expect(result).toHaveLength(1);
    expect(result[0].nom).toBe("Shared");
  });

  it("returns empty array for non-admin with no access", async () => {
    const owner = await createTestUser();
    const loner = await createTestUser();
    await createTestForm(owner.id);

    const result = await getFormsForUser(loner.id, false);
    expect(result).toHaveLength(0);
  });
});

describe("updateFormData", () => {
  it("updates form data and derives nom from nomDuProjet", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id, { nom: "Old Name" });

    const newData = makeDAData({ nomDuProjet: "New Name" });
    const updated = await updateFormData(form.id, newData);

    expect(updated).not.toBeNull();
    expect(updated!.nom).toBe("New Name");
  });

  it("updates the updatedAt timestamp", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const originalUpdatedAt = form.updatedAt;

    // Small delay to ensure timestamp changes
    await new Promise((resolve) => setTimeout(resolve, 10));

    const newData = makeDAData({ nomDuProjet: "Updated" });
    const updated = await updateFormData(form.id, newData);

    expect(updated).not.toBeNull();
    expect(updated!.updatedAt.getTime()).toBeGreaterThan(
      originalUpdatedAt.getTime(),
    );
  });

  it("returns null on optimistic locking conflict (stale updatedAt)", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const staleTimestamp = form.updatedAt;

    // First update succeeds and changes updatedAt
    await updateFormData(form.id, makeDAData({ nomDuProjet: "First Edit" }));

    // Second update with stale timestamp should fail
    const conflicting = await updateFormData(
      form.id,
      makeDAData({ nomDuProjet: "Conflict" }),
      staleTimestamp,
    );

    expect(conflicting).toBeNull();
  });

  it("succeeds when expectedUpdatedAt matches current", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    const updated = await updateFormData(
      form.id,
      makeDAData({ nomDuProjet: "Matches" }),
      form.updatedAt,
    );

    expect(updated).not.toBeNull();
    expect(updated!.nom).toBe("Matches");
  });

  it("succeeds without expectedUpdatedAt (no locking)", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    const updated = await updateFormData(
      form.id,
      makeDAData({ nomDuProjet: "No Lock" }),
    );

    expect(updated).not.toBeNull();
    expect(updated!.nom).toBe("No Lock");
  });

  it("returns null for non-existent formId", async () => {
    const updated = await updateFormData(
      "00000000-0000-0000-0000-000000000000",
      makeDAData(),
    );

    expect(updated).toBeNull();
  });
});

describe("deleteForm", () => {
  it("removes the form from the database", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    await deleteForm(form.id);

    const found = await getFormById(form.id);
    expect(found).toBeNull();
  });

  it("cascades to versions, formAccess, and editLogs", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    await createTestVersion(form.id, user.id);
    await grantTestAccess(form.id, user.id);
    await createTestEditLog(form.id, user.id);

    await deleteForm(form.id);

    // Check all related rows are gone
    const remainingVersions = await db
      .select()
      .from(versions)
      .where(eq(versions.formId, form.id));
    const remainingAccess = await db
      .select()
      .from(formAccess)
      .where(eq(formAccess.formId, form.id));
    const remainingLogs = await db
      .select()
      .from(editLogs)
      .where(eq(editLogs.formId, form.id));

    expect(remainingVersions).toHaveLength(0);
    expect(remainingAccess).toHaveLength(0);
    expect(remainingLogs).toHaveLength(0);
  });
});

describe("isFormNameTaken", () => {
  it("returns true when a form with that name exists (exact case)", async () => {
    const user = await createTestUser();
    await createTestForm(user.id, { nom: "My DA" });

    expect(await isFormNameTaken("My DA")).toBe(true);
  });

  it("returns true case-insensitively", async () => {
    const user = await createTestUser();
    await createTestForm(user.id, { nom: "My DA" });

    expect(await isFormNameTaken("my da")).toBe(true);
    expect(await isFormNameTaken("MY DA")).toBe(true);
  });

  it("returns false when name is not taken", async () => {
    expect(await isFormNameTaken("Nonexistent")).toBe(false);
  });

  it("returns false when name is taken but excluded by formId", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id, { nom: "My DA" });

    expect(await isFormNameTaken("My DA", form.id)).toBe(false);
  });

  it("still detects another form's name even with excludeFormId", async () => {
    const user = await createTestUser();
    await createTestForm(user.id, { nom: "Alpha" });
    const formB = await createTestForm(user.id, { nom: "Beta" });

    expect(await isFormNameTaken("Alpha", formB.id)).toBe(true);
  });
});

describe("renameForm", () => {
  it("updates both nom and data.cadre1_ProjetActeurs.nomDuProjet", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id, { nom: "Old Name" });

    const updated = await renameForm(form.id, "New Name");

    expect(updated).not.toBeNull();
    expect(updated!.nom).toBe("New Name");
    expect(
      (updated!.data as { cadre1_ProjetActeurs?: { nomDuProjet?: string } })
        .cadre1_ProjetActeurs?.nomDuProjet,
    ).toBe("New Name");
  });

  it("persists the rename in the database", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id, { nom: "Before" });

    await renameForm(form.id, "After");

    const found = await getFormById(form.id);
    expect(found).not.toBeNull();
    expect(found!.nom).toBe("After");
    expect(
      (found!.data as { cadre1_ProjetActeurs?: { nomDuProjet?: string } })
        .cadre1_ProjetActeurs?.nomDuProjet,
    ).toBe("After");
  });

  it("updates the updatedAt timestamp", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id, { nom: "Timestamp Test" });
    const originalUpdatedAt = form.updatedAt;

    await new Promise((resolve) => setTimeout(resolve, 10));

    const updated = await renameForm(form.id, "Renamed");

    expect(updated).not.toBeNull();
    expect(updated!.updatedAt.getTime()).toBeGreaterThan(
      originalUpdatedAt.getTime(),
    );
  });

  it("returns null for non-existent formId", async () => {
    const result = await renameForm(
      "00000000-0000-0000-0000-000000000000",
      "Whatever",
    );
    expect(result).toBeNull();
  });

  it("preserves other data fields when renaming", async () => {
    const user = await createTestUser();
    const data = makeDAData({ nomDuProjet: "Original" });
    const form = await createTestForm(user.id, { nom: "Original", data });

    const updated = await renameForm(form.id, "Renamed");

    expect(updated).not.toBeNull();
    // The rest of cadre1_ProjetActeurs and other cadres should remain intact
    const updatedData = updated!.data as Record<string, unknown>;
    expect(updatedData.cadre2_FonctionnalitesDonnees).toBeDefined();
    expect(updatedData.cadre3_ContraintesVolumetrie).toBeDefined();
  });
});
