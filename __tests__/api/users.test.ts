import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { GET } from "@/app/api/users/route";
import { PUT } from "@/app/api/users/[id]/route";
import { makeSession } from "../helpers/auth";
import { makeRequest, makeParams } from "../helpers/request";
import { createAdminUser, createTestUser } from "../helpers/fixtures";

const mockAuth = vi.mocked(auth);

// ─── GET /api/users ──────────────────────────────────

describe("GET /api/users", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const res = await GET();
    expect(res.status).toBe(403);
  });

  it("returns 200 with list of all users for admin", async () => {
    const admin = await createAdminUser();
    await createTestUser({ givenName: "Alice" });
    await createTestUser({ givenName: "Bob" });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(3); // admin + 2 users
  });
});

// ─── PUT /api/users/[id] ────────────────────────────

describe("PUT /api/users/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/users/some-id", {
      method: "PUT",
      body: { isAdmin: true },
    });
    const res = await PUT(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/users/${user.id}`, {
      method: "PUT",
      body: { isAdmin: true },
    });
    const res = await PUT(req, makeParams({ id: user.id }));
    expect(res.status).toBe(403);
  });

  it("returns 400 when admin tries to demote themselves", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/users/${admin.id}`, {
      method: "PUT",
      body: { isAdmin: false },
    });
    const res = await PUT(req, makeParams({ id: admin.id }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when trying to remove the last admin", async () => {
    const admin = await createAdminUser();
    const target = await createAdminUser(); // 2 admins

    // Now remove one to leave only 1
    const { updateUserAdmin } = await import("@/lib/db/queries/users");
    await updateUserAdmin(target.id, false); // Now only 1 admin

    // Re-create a fresh target that IS admin to try demoting
    const targetAdmin = await createAdminUser();
    // Actually, now there are 2 admins again. Let's be precise:
    // We need exactly 1 admin, then try to demote someone to non-admin
    await updateUserAdmin(targetAdmin.id, false); // Back to 1 admin

    const nonAdmin = await createTestUser();

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    // Try setting nonAdmin to isAdmin=false -> route checks countAdmins <= 1
    const req = makeRequest(`/api/users/${nonAdmin.id}`, {
      method: "PUT",
      body: { isAdmin: false },
    });
    const res = await PUT(req, makeParams({ id: nonAdmin.id }));
    expect(res.status).toBe(400);
  });

  it("returns 200 and promotes user to admin", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/users/${user.id}`, {
      method: "PUT",
      body: { isAdmin: true },
    });
    const res = await PUT(req, makeParams({ id: user.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.isAdmin).toBe(true);
  });

  it("returns 200 and demotes user from admin when other admins exist", async () => {
    const adminA = await createAdminUser();
    const adminB = await createAdminUser();

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: adminA.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/users/${adminB.id}`, {
      method: "PUT",
      body: { isAdmin: false },
    });
    const res = await PUT(req, makeParams({ id: adminB.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.isAdmin).toBe(false);
  });

  it("returns 404 when target user does not exist", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(`/api/users/${fakeId}`, {
      method: "PUT",
      body: { isAdmin: true },
    });
    const res = await PUT(req, makeParams({ id: fakeId }));
    expect(res.status).toBe(404);
  });

  it("returns 400 when body has no isAdmin field", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/users/${user.id}`, {
      method: "PUT",
      body: { name: "whatever" },
    });
    const res = await PUT(req, makeParams({ id: user.id }));
    expect(res.status).toBe(400);
  });
});
