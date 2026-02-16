import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { GET, PUT, DELETE } from "@/app/api/da/[id]/route";
import { makeSession } from "../helpers/auth";
import { makeRequest, makeParams } from "../helpers/request";
import {
  createAdminUser,
  createTestUser,
  createTestForm,
  createTestVersion,
  createTestEditLog,
  grantTestAccess,
  makeDAData,
} from "../helpers/fixtures";
import { getFormById } from "@/lib/db/queries/forms";
import { db } from "@/lib/db";
import { editLogs, versions, formAccess } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const mockAuth = vi.mocked(auth);

// ─── GET /api/da/[id] ───────────────────────────────

describe("GET /api/da/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id");
    const res = await GET(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 404 for non-existent DA", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(`/api/da/${fakeId}`);
    const res = await GET(req, makeParams({ id: fakeId }));
    expect(res.status).toBe(404);
  });

  it("returns 200 with access='admin' for admin user", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}`);
    const res = await GET(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.access).toBe("admin");
    expect(body.id).toBe(form.id);
    expect(body.nom).toBe(form.nom);
    expect(body.data).toBeDefined();
  });

  it("returns 200 with access='editor' for user with editor formAccess", async () => {
    const owner = await createTestUser();
    const editor = await createTestUser();
    const form = await createTestForm(owner.id);
    await grantTestAccess(form.id, editor.id, "editor");

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: editor.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}`);
    const res = await GET(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.access).toBe("editor");
  });

  it("returns 200 with access='viewer' for user with no explicit access", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const form = await createTestForm(owner.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: viewer.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}`);
    const res = await GET(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.access).toBe("viewer");
  });
});

// ─── PUT /api/da/[id] ───────────────────────────────

describe("PUT /api/da/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id", {
      method: "PUT",
      body: { data: makeDAData() },
    });
    const res = await PUT(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user has only viewer access", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const form = await createTestForm(owner.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: viewer.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}`, {
      method: "PUT",
      body: { data: makeDAData({ nomDuProjet: "Edit Attempt" }) },
    });
    const res = await PUT(req, makeParams({ id: form.id }));
    expect(res.status).toBe(403);
  });

  it("returns 404 for non-existent DA", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(`/api/da/${fakeId}`, {
      method: "PUT",
      body: { data: makeDAData() },
    });
    const res = await PUT(req, makeParams({ id: fakeId }));
    expect(res.status).toBe(404);
  });

  it("returns 400 when body has no data field", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}`, {
      method: "PUT",
      body: { someOtherField: true },
    });
    const res = await PUT(req, makeParams({ id: form.id }));
    expect(res.status).toBe(400);
  });

  it("returns 200 for admin and updates DA data", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id, { nom: "Old Name" });
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const newData = makeDAData({ nomDuProjet: "New Name" });
    const req = makeRequest(`/api/da/${form.id}`, {
      method: "PUT",
      body: { data: newData },
    });
    const res = await PUT(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.nom).toBe("New Name");

    // Verify in DB
    const updated = await getFormById(form.id);
    expect(updated!.nom).toBe("New Name");
  });

  it("returns 200 for editor and updates DA data", async () => {
    const owner = await createTestUser();
    const editor = await createTestUser();
    const form = await createTestForm(owner.id, { nom: "Original" });
    await grantTestAccess(form.id, editor.id, "editor");

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: editor.id, isAdmin: false }),
    );

    const newData = makeDAData({ nomDuProjet: "Edited By Editor" });
    const req = makeRequest(`/api/da/${form.id}`, {
      method: "PUT",
      body: { data: newData },
    });
    const res = await PUT(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.nom).toBe("Edited By Editor");
  });

  it("returns 409 on optimistic locking conflict", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    const staleUpdatedAt = form.updatedAt.toISOString();

    // First update changes updatedAt
    const data1 = makeDAData({ nomDuProjet: "First Edit" });
    const req1 = makeRequest(`/api/da/${form.id}`, {
      method: "PUT",
      body: { data: data1 },
    });
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );
    await PUT(req1, makeParams({ id: form.id }));

    // Second update with stale timestamp
    const data2 = makeDAData({ nomDuProjet: "Conflict" });
    const req2 = makeRequest(`/api/da/${form.id}`, {
      method: "PUT",
      body: { data: data2, updatedAt: staleUpdatedAt },
    });
    const res = await PUT(req2, makeParams({ id: form.id }));
    expect(res.status).toBe(409);

    const body = await res.json();
    expect(body.conflict).toBe(true);
  });

  it("returns 409 when new name conflicts with another DA", async () => {
    const admin = await createAdminUser();
    await createTestForm(admin.id, { nom: "Alpha" });
    const formB = await createTestForm(admin.id, { nom: "Beta" });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const newData = makeDAData({ nomDuProjet: "Alpha" });
    const req = makeRequest(`/api/da/${formB.id}`, {
      method: "PUT",
      body: { data: newData },
    });
    const res = await PUT(req, makeParams({ id: formB.id }));
    expect(res.status).toBe(409);

    const body = await res.json();
    expect(body.nameTaken).toBe(true);
  });

  it("creates an edit log entry on successful update", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const newData = makeDAData({ nomDuProjet: "Logged Edit" });
    const req = makeRequest(`/api/da/${form.id}`, {
      method: "PUT",
      body: { data: newData },
    });
    await PUT(req, makeParams({ id: form.id }));

    const logs = await db
      .select()
      .from(editLogs)
      .where(eq(editLogs.formId, form.id));
    expect(logs).toHaveLength(1);
    expect(logs[0].userId).toBe(admin.id);
  });
});

// ─── DELETE /api/da/[id] ────────────────────────────

describe("DELETE /api/da/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id", { method: "DELETE" });
    const res = await DELETE(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    const owner = await createTestUser();
    const form = await createTestForm(owner.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}`, { method: "DELETE" });
    const res = await DELETE(req, makeParams({ id: form.id }));
    expect(res.status).toBe(403);
  });

  it("returns 404 for non-existent DA", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(`/api/da/${fakeId}`, { method: "DELETE" });
    const res = await DELETE(req, makeParams({ id: fakeId }));
    expect(res.status).toBe(404);
  });

  it("returns 200 and deletes the DA for admin", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}`, { method: "DELETE" });
    const res = await DELETE(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);

    // Verify form is gone
    const found = await getFormById(form.id);
    expect(found).toBeNull();
  });

  it("cascade-deletes versions, access, and logs", async () => {
    const admin = await createAdminUser();
    const user = await createTestUser();
    const form = await createTestForm(admin.id);

    await createTestVersion(form.id, admin.id);
    await grantTestAccess(form.id, user.id);
    await createTestEditLog(form.id, admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}`, { method: "DELETE" });
    await DELETE(req, makeParams({ id: form.id }));

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
