import { describe, it, expect, beforeEach } from "vitest";
import { checkFormAccess } from "@/lib/db/queries/forms";
import {
  grantAccess,
  revokeAccess,
  getFormAccessList,
  getUsersWithoutAccess,
  getSharedDAsForUser,
} from "@/lib/db/queries/form-access";
import {
  createTestUser,
  createAdminUser,
  createTestForm,
  grantTestAccess,
} from "../helpers/fixtures";

describe("checkFormAccess", () => {
  it("returns 'admin' for admin user regardless of any formAccess entry", async () => {
    const admin = await createAdminUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    const access = await checkFormAccess(form.id, admin.id, true);
    expect(access).toBe("admin");
  });

  it("returns 'admin' even if admin also has an editor entry in formAccess", async () => {
    const admin = await createAdminUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);
    await grantTestAccess(form.id, admin.id, "editor");

    const access = await checkFormAccess(form.id, admin.id, true);
    expect(access).toBe("admin");
  });

  it("returns 'editor' when user has explicit editor access", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);
    await grantTestAccess(form.id, user.id, "editor");

    const access = await checkFormAccess(form.id, user.id, false);
    expect(access).toBe("editor");
  });

  it("returns 'viewer' when user has explicit viewer access", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);
    await grantTestAccess(form.id, user.id, "viewer");

    const access = await checkFormAccess(form.id, user.id, false);
    expect(access).toBe("viewer");
  });

  it("returns 'viewer' as default for authenticated user with no explicit access", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    const access = await checkFormAccess(form.id, user.id, false);
    expect(access).toBe("viewer");
  });

  it("never returns null — always at least 'viewer'", async () => {
    const user = await createTestUser();
    // Use a random UUID for a form that doesn't even exist
    const access = await checkFormAccess(
      "00000000-0000-0000-0000-000000000000",
      user.id,
      false,
    );
    expect(access).toBe("viewer");
  });
});

describe("full access control matrix", () => {
  let adminUser: Awaited<ReturnType<typeof createAdminUser>>;
  let editorUser: Awaited<ReturnType<typeof createTestUser>>;
  let viewerUser: Awaited<ReturnType<typeof createTestUser>>;
  let noAccessUser: Awaited<ReturnType<typeof createTestUser>>;
  let formA: Awaited<ReturnType<typeof createTestForm>>;
  let formB: Awaited<ReturnType<typeof createTestForm>>;

  beforeEach(async () => {
    const owner = await createTestUser();
    adminUser = await createAdminUser();
    editorUser = await createTestUser({ givenName: "Editor" });
    viewerUser = await createTestUser({ givenName: "Viewer" });
    noAccessUser = await createTestUser({ givenName: "NoAccess" });

    formA = await createTestForm(owner.id, { nom: "Form A" });
    formB = await createTestForm(owner.id, { nom: "Form B" });

    // Grant explicit access only on formA
    await grantTestAccess(formA.id, editorUser.id, "editor");
    await grantTestAccess(formA.id, viewerUser.id, "viewer");
  });

  it("admin can access formA as 'admin'", async () => {
    expect(await checkFormAccess(formA.id, adminUser.id, true)).toBe("admin");
  });

  it("admin can access formB as 'admin'", async () => {
    expect(await checkFormAccess(formB.id, adminUser.id, true)).toBe("admin");
  });

  it("editorUser accesses formA as 'editor'", async () => {
    expect(await checkFormAccess(formA.id, editorUser.id, false)).toBe(
      "editor",
    );
  });

  it("editorUser accesses formB (no explicit access) as 'viewer'", async () => {
    expect(await checkFormAccess(formB.id, editorUser.id, false)).toBe(
      "viewer",
    );
  });

  it("viewerUser accesses formA as 'viewer'", async () => {
    expect(await checkFormAccess(formA.id, viewerUser.id, false)).toBe(
      "viewer",
    );
  });

  it("viewerUser accesses formB as 'viewer'", async () => {
    expect(await checkFormAccess(formB.id, viewerUser.id, false)).toBe(
      "viewer",
    );
  });

  it("noAccessUser accesses formA as 'viewer'", async () => {
    expect(await checkFormAccess(formA.id, noAccessUser.id, false)).toBe(
      "viewer",
    );
  });

  it("noAccessUser accesses formB as 'viewer'", async () => {
    expect(await checkFormAccess(formB.id, noAccessUser.id, false)).toBe(
      "viewer",
    );
  });
});

describe("grantAccess", () => {
  it("creates a new formAccess entry with editor role by default", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    const access = await grantAccess(form.id, user.id);
    expect(access.role).toBe("editor");

    const check = await checkFormAccess(form.id, user.id, false);
    expect(check).toBe("editor");
  });

  it("creates entry with viewer role when specified", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    const access = await grantAccess(form.id, user.id, "viewer");
    expect(access.role).toBe("viewer");
  });

  it("upserts: changes role from viewer to editor on same formId+userId", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    await grantAccess(form.id, user.id, "viewer");
    const updated = await grantAccess(form.id, user.id, "editor");

    expect(updated.role).toBe("editor");

    // Verify only 1 row exists
    const list = await getFormAccessList(form.id);
    expect(list).toHaveLength(1);
  });

  it("upserts: changes role from editor to viewer", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    await grantAccess(form.id, user.id, "editor");
    const updated = await grantAccess(form.id, user.id, "viewer");

    expect(updated.role).toBe("viewer");
  });
});

describe("revokeAccess", () => {
  it("removes the formAccess entry", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    await grantAccess(form.id, user.id, "editor");
    await revokeAccess(form.id, user.id);

    // Should fall back to default "viewer"
    const check = await checkFormAccess(form.id, user.id, false);
    expect(check).toBe("viewer");
  });

  it("does not throw when entry does not exist", async () => {
    const user = await createTestUser();
    // Should not throw
    await expect(
      revokeAccess("00000000-0000-0000-0000-000000000000", user.id),
    ).resolves.toBeUndefined();
  });
});

describe("getFormAccessList", () => {
  it("returns all users with explicit access, including user details", async () => {
    const owner = await createTestUser();
    const userA = await createTestUser({
      givenName: "Alice",
      usualName: "Martin",
    });
    const userB = await createTestUser({
      givenName: "Bob",
      usualName: "Dupont",
    });
    const form = await createTestForm(owner.id);

    await grantAccess(form.id, userA.id, "editor");
    await grantAccess(form.id, userB.id, "viewer");

    const list = await getFormAccessList(form.id);
    expect(list).toHaveLength(2);

    const emails = list.map((l) => l.userEmail);
    expect(emails).toContain(userA.email);
    expect(emails).toContain(userB.email);
  });

  it("returns empty array when no explicit access exists", async () => {
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    const list = await getFormAccessList(form.id);
    expect(list).toHaveLength(0);
  });
});

describe("getUsersWithoutAccess", () => {
  it("returns all users when no one has access", async () => {
    await createTestUser({ givenName: "U1" });
    await createTestUser({ givenName: "U2" });
    await createTestUser({ givenName: "U3" });
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    const withoutAccess = await getUsersWithoutAccess(form.id);
    // All 4 users (3 + owner) should be returned
    expect(withoutAccess).toHaveLength(4);
  });

  it("excludes users who already have access", async () => {
    const u1 = await createTestUser({ givenName: "U1" });
    const u2 = await createTestUser({ givenName: "U2" });
    await createTestUser({ givenName: "U3" });
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);

    await grantAccess(form.id, u1.id);
    await grantAccess(form.id, u2.id);

    const withoutAccess = await getUsersWithoutAccess(form.id);
    // Only U3 and owner should remain
    expect(withoutAccess).toHaveLength(2);
  });

  it("returns empty array when all users have access", async () => {
    const u1 = await createTestUser();
    const u2 = await createTestUser();
    const form = await createTestForm(u1.id);

    await grantAccess(form.id, u1.id);
    await grantAccess(form.id, u2.id);

    const withoutAccess = await getUsersWithoutAccess(form.id);
    expect(withoutAccess).toHaveLength(0);
  });
});

describe("getSharedDAsForUser", () => {
  it("returns DAs shared with a user via formAccess", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const f1 = await createTestForm(owner.id, { nom: "Shared-1" });
    const f2 = await createTestForm(owner.id, { nom: "Shared-2" });
    await createTestForm(owner.id, { nom: "Not Shared" });

    await grantAccess(f1.id, viewer.id);
    await grantAccess(f2.id, viewer.id);

    const shared = await getSharedDAsForUser(viewer.id);
    expect(shared).toHaveLength(2);
  });

  it("returns empty array when user has no shared DAs", async () => {
    const user = await createTestUser();
    const shared = await getSharedDAsForUser(user.id);
    expect(shared).toHaveLength(0);
  });
});
