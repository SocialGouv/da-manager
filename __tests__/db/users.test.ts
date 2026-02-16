import { describe, it, expect } from "vitest";
import {
  findOrCreateUser,
  getUserById,
  getAllUsers,
  updateUserAdmin,
  countAdmins,
} from "@/lib/db/queries/users";
import { createTestUser, createAdminUser } from "../helpers/fixtures";

describe("findOrCreateUser", () => {
  it("creates a new user when no user exists with that proconnectSub or email", async () => {
    // Insert a dummy user first so DB is not empty (to avoid first-user-admin)
    await createTestUser();

    const user = await findOrCreateUser(
      "sub-new",
      "new@test.fr",
      "Alice",
      "Martin",
      undefined,
    );

    expect(user.proconnectSub).toBe("sub-new");
    expect(user.email).toBe("new@test.fr");
    expect(user.givenName).toBe("Alice");
    expect(user.usualName).toBe("Martin");
    expect(user.isAdmin).toBe(false);
  });

  it("makes the first user in an empty DB an admin automatically", async () => {
    const user = await findOrCreateUser(
      "sub-first",
      "first@test.fr",
      "First",
      "User",
      undefined,
    );

    expect(user.isAdmin).toBe(true);
  });

  it("does NOT make the second user an admin", async () => {
    await createTestUser(); // First user exists

    const user = await findOrCreateUser(
      "sub-second",
      "second@test.fr",
      "Second",
      "User",
      undefined,
    );

    expect(user.isAdmin).toBe(false);
  });

  it("returns and updates existing user when proconnectSub matches", async () => {
    const existing = await createTestUser({
      proconnectSub: "sub-existing",
      email: "old@test.fr",
      givenName: "Old",
      usualName: "Name",
    });

    const updated = await findOrCreateUser(
      "sub-existing",
      "new@test.fr",
      "NewGiven",
      "NewUsual",
      undefined,
    );

    expect(updated.id).toBe(existing.id);
    expect(updated.email).toBe("new@test.fr");
    expect(updated.givenName).toBe("NewGiven");
    expect(updated.usualName).toBe("NewUsual");

    // No duplicate created
    const all = await getAllUsers();
    expect(all).toHaveLength(1);
  });

  it("matches seed user by email and attaches the real proconnectSub", async () => {
    // Simulate a seed user (like the ones created in migrate.ts)
    await createTestUser({
      proconnectSub: "seed-bob@gov.fr",
      email: "bob@gov.fr",
      isAdmin: true,
    });

    const updated = await findOrCreateUser(
      "real-proconnect-sub",
      "bob@gov.fr",
      "Bob",
      "Seed",
      undefined,
    );

    expect(updated.proconnectSub).toBe("real-proconnect-sub");
    expect(updated.isAdmin).toBe(true); // Admin status preserved from seed

    // No duplicate created
    const all = await getAllUsers();
    expect(all).toHaveLength(1);
  });

  it("respects forceAdmin=true to promote a user", async () => {
    const existing = await createTestUser({
      proconnectSub: "sub-promote",
      isAdmin: false,
    });

    const updated = await findOrCreateUser(
      "sub-promote",
      existing.email,
      "Test",
      "User",
      true,
    );

    expect(updated.isAdmin).toBe(true);
  });

  it("respects forceAdmin=false to demote a user", async () => {
    const existing = await createAdminUser({
      proconnectSub: "sub-demote",
    });

    const updated = await findOrCreateUser(
      "sub-demote",
      existing.email,
      "Test",
      "User",
      false,
    );

    expect(updated.isAdmin).toBe(false);
  });

  it("does not change isAdmin when forceAdmin is undefined", async () => {
    const existing = await createAdminUser({
      proconnectSub: "sub-keep",
    });

    const updated = await findOrCreateUser(
      "sub-keep",
      existing.email,
      "Test",
      "User",
      undefined,
    );

    expect(updated.isAdmin).toBe(true);
  });
});

describe("getUserById", () => {
  it("returns user when found", async () => {
    const created = await createTestUser({ givenName: "Alice" });
    const found = await getUserById(created.id);

    expect(found).not.toBeNull();
    expect(found!.id).toBe(created.id);
    expect(found!.givenName).toBe("Alice");
  });

  it("returns null for non-existent UUID", async () => {
    const found = await getUserById("00000000-0000-0000-0000-000000000000");
    expect(found).toBeNull();
  });
});

describe("getAllUsers", () => {
  it("returns all users ordered by createdAt", async () => {
    const u1 = await createTestUser({ givenName: "First" });
    const u2 = await createTestUser({ givenName: "Second" });
    const u3 = await createTestUser({ givenName: "Third" });

    const all = await getAllUsers();
    expect(all).toHaveLength(3);
    expect(all[0].id).toBe(u1.id);
    expect(all[1].id).toBe(u2.id);
    expect(all[2].id).toBe(u3.id);
  });

  it("returns empty array when no users", async () => {
    const all = await getAllUsers();
    expect(all).toHaveLength(0);
  });
});

describe("updateUserAdmin", () => {
  it("sets isAdmin to true", async () => {
    const user = await createTestUser({ isAdmin: false });
    const updated = await updateUserAdmin(user.id, true);

    expect(updated).toBeDefined();
    expect(updated!.isAdmin).toBe(true);
  });

  it("sets isAdmin to false", async () => {
    const user = await createAdminUser();
    const updated = await updateUserAdmin(user.id, false);

    expect(updated).toBeDefined();
    expect(updated!.isAdmin).toBe(false);
  });

  it("returns undefined for non-existent user ID", async () => {
    const updated = await updateUserAdmin(
      "00000000-0000-0000-0000-000000000000",
      true,
    );
    expect(updated).toBeUndefined();
  });
});

describe("countAdmins", () => {
  it("returns 0 when no admins exist", async () => {
    await createTestUser({ isAdmin: false });
    await createTestUser({ isAdmin: false });

    const count = await countAdmins();
    expect(count).toBe(0);
  });

  it("returns correct count with mixed admin/non-admin users", async () => {
    await createAdminUser();
    await createAdminUser();
    await createTestUser({ isAdmin: false });

    const count = await countAdmins();
    expect(count).toBe(2);
  });
});
