import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { GET, POST } from "@/app/api/da/[id]/access/route";
import { DELETE } from "@/app/api/da/[id]/access/[userId]/route";
import { makeSession } from "../helpers/auth";
import { makeRequest, makeParams } from "../helpers/request";
import {
  createAdminUser,
  createTestUser,
  createTestForm,
  grantTestAccess,
} from "../helpers/fixtures";
import { checkFormAccess } from "@/lib/db/queries/forms";

const mockAuth = vi.mocked(auth);

// ─── GET /api/da/[id]/access ─────────────────────────

describe("GET /api/da/[id]/access", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id/access");
    const res = await GET(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da/some-id/access");
    const res = await GET(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(403);
  });

  it("returns 200 with accessList and availableUsers for admin", async () => {
    const admin = await createAdminUser();
    const userA = await createTestUser({ givenName: "Alice" });
    const userB = await createTestUser({ givenName: "Bob" });
    const form = await createTestForm(admin.id);

    await grantTestAccess(form.id, userA.id, "editor");

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/access`);
    const res = await GET(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.accessList).toHaveLength(1);
    expect(body.accessList[0].userGivenName).toBe("Alice");

    // userB and admin should be in availableUsers (not userA)
    const availableEmails = body.availableUsers.map(
      (u: { email: string }) => u.email,
    );
    expect(availableEmails).toContain(userB.email);
    expect(availableEmails).not.toContain(userA.email);
  });
});

// ─── POST /api/da/[id]/access ────────────────────────

describe("POST /api/da/[id]/access", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id/access", {
      method: "POST",
      body: { userId: "x" },
    });
    const res = await POST(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da/some-id/access", {
      method: "POST",
      body: { userId: "x" },
    });
    const res = await POST(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(403);
  });

  it("returns 400 when userId is missing from body", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest("/api/da/some-id/access", {
      method: "POST",
      body: { role: "editor" },
    });
    const res = await POST(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(400);
  });

  it("returns 201 and grants editor access by default", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();
    const form = await createTestForm(admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/access`, {
      method: "POST",
      body: { userId: user.id },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.role).toBe("editor");

    // Verify in DB
    const access = await checkFormAccess(form.id, user.id, false);
    expect(access).toBe("editor");
  });

  it("returns 201 and grants viewer access when role='viewer'", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();
    const form = await createTestForm(admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/access`, {
      method: "POST",
      body: { userId: user.id, role: "viewer" },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.role).toBe("viewer");
  });

  it("defaults to editor when role is any other value", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();
    const form = await createTestForm(admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/access`, {
      method: "POST",
      body: { userId: user.id, role: "something-invalid" },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.role).toBe("editor");
  });

  it("upserts existing access (changes role)", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();
    const form = await createTestForm(admin.id);

    await grantTestAccess(form.id, user.id, "viewer");

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/access`, {
      method: "POST",
      body: { userId: user.id, role: "editor" },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.role).toBe("editor");
  });
});

// ─── DELETE /api/da/[id]/access/[userId] ─────────────

describe("DELETE /api/da/[id]/access/[userId]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/x/access/y", { method: "DELETE" });
    const res = await DELETE(
      req,
      makeParams({ id: "x", userId: "y" }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da/x/access/y", { method: "DELETE" });
    const res = await DELETE(
      req,
      makeParams({ id: "x", userId: "y" }),
    );
    expect(res.status).toBe(403);
  });

  it("returns 200 and revokes access", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();
    const form = await createTestForm(admin.id);

    await grantTestAccess(form.id, user.id, "editor");

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/access/${user.id}`, {
      method: "DELETE",
    });
    const res = await DELETE(
      req,
      makeParams({ id: form.id, userId: user.id }),
    );
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);

    // Should fall back to default viewer
    const access = await checkFormAccess(form.id, user.id, false);
    expect(access).toBe("viewer");
  });

  it("returns 200 even when access entry does not exist (idempotent)", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();
    const form = await createTestForm(admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/access/${user.id}`, {
      method: "DELETE",
    });
    const res = await DELETE(
      req,
      makeParams({ id: form.id, userId: user.id }),
    );
    expect(res.status).toBe(200);
  });
});
