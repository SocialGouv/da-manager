import { describe, it, expect } from "vitest";
import {
  createNamedVersion,
  getVersionsForForm,
  getVersionById,
  deleteVersion,
  getVersionCountsForForms,
} from "@/lib/db/queries/versions";
import { getFormById, updateFormData } from "@/lib/db/queries/forms";
import {
  createTestUser,
  createTestForm,
  createTestVersion,
  makeDAData,
} from "../helpers/fixtures";

describe("createNamedVersion", () => {
  it("creates a version with versionNumber=1 for first version", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const data = makeDAData({ nomDuProjet: "Snapshot" });

    const version = await createNamedVersion(
      form.id,
      "Initial",
      data,
      user.id,
    );

    expect(version.versionNumber).toBe(1);
    expect(version.name).toBe("Initial");
    expect(version.formId).toBe(form.id);
    expect(version.createdBy).toBe(user.id);
  });

  it("auto-increments versionNumber from the highest existing", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const data = makeDAData();

    await createNamedVersion(form.id, "v1", data, user.id);
    await createNamedVersion(form.id, "v2", data, user.id);
    const v3 = await createNamedVersion(form.id, "v3", data, user.id);

    expect(v3.versionNumber).toBe(3);
  });

  it("stores the snapshot of form data at creation time", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const snapshotData = makeDAData({ nomDuProjet: "Snapshot Data" });

    const version = await createNamedVersion(
      form.id,
      "v1",
      snapshotData,
      user.id,
    );

    // Update the form with different data
    await updateFormData(form.id, makeDAData({ nomDuProjet: "Changed" }));

    // Version should still have original data
    const retrieved = await getVersionById(version.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved!.data.cadre1_ProjetActeurs.nomDuProjet).toBe(
      "Snapshot Data",
    );
  });
});

describe("getVersionsForForm", () => {
  it("returns versions ordered by createdAt DESC with author info", async () => {
    const user = await createTestUser({
      givenName: "Jean",
      usualName: "Dupont",
    });
    const form = await createTestForm(user.id);
    const data = makeDAData();

    await createNamedVersion(form.id, "v1", data, user.id);
    await createNamedVersion(form.id, "v2", data, user.id);
    await createNamedVersion(form.id, "v3", data, user.id);

    const result = await getVersionsForForm(form.id);
    expect(result).toHaveLength(3);
    // Most recent first
    expect(result[0].name).toBe("v3");
    expect(result[0].authorGivenName).toBe("Jean");
    expect(result[0].authorUsualName).toBe("Dupont");
  });

  it("returns empty array when no versions exist for form", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    const result = await getVersionsForForm(form.id);
    expect(result).toHaveLength(0);
  });
});

describe("getVersionById", () => {
  it("returns the version with full data", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const data = makeDAData({ nomDuProjet: "Version Data" });
    const version = await createNamedVersion(
      form.id,
      "v1",
      data,
      user.id,
    );

    const found = await getVersionById(version.id);
    expect(found).not.toBeNull();
    expect(found!.id).toBe(version.id);
    expect(found!.data.cadre1_ProjetActeurs.nomDuProjet).toBe("Version Data");
  });

  it("returns null for non-existent version", async () => {
    const found = await getVersionById(
      "00000000-0000-0000-0000-000000000000",
    );
    expect(found).toBeNull();
  });
});

describe("deleteVersion", () => {
  it("deletes a specific version", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const version = await createTestVersion(form.id, user.id);

    await deleteVersion(version.id);

    const found = await getVersionById(version.id);
    expect(found).toBeNull();
  });

  it("does not affect other versions of the same form", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);
    const v1 = await createTestVersion(form.id, user.id, {
      versionNumber: 1,
      name: "v1",
    });
    const v2 = await createTestVersion(form.id, user.id, {
      versionNumber: 2,
      name: "v2",
    });

    await deleteVersion(v1.id);

    expect(await getVersionById(v1.id)).toBeNull();
    expect(await getVersionById(v2.id)).not.toBeNull();
  });
});

describe("getVersionCountsForForms", () => {
  it("returns correct counts per formId", async () => {
    const user = await createTestUser();
    const formA = await createTestForm(user.id, { nom: "FA" });
    const formB = await createTestForm(user.id, { nom: "FB" });

    await createTestVersion(formA.id, user.id, { versionNumber: 1 });
    await createTestVersion(formA.id, user.id, { versionNumber: 2 });
    await createTestVersion(formA.id, user.id, { versionNumber: 3 });
    await createTestVersion(formB.id, user.id, { versionNumber: 1 });

    const counts = await getVersionCountsForForms([formA.id, formB.id]);
    expect(counts[formA.id]).toBe(3);
    expect(counts[formB.id]).toBe(1);
  });

  it("returns empty object for empty input array", async () => {
    const counts = await getVersionCountsForForms([]);
    expect(counts).toEqual({});
  });

  it("omits forms with zero versions", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    const counts = await getVersionCountsForForms([form.id]);
    expect(counts[form.id]).toBeUndefined();
  });
});
