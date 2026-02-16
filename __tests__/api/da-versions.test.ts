import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import {
  GET as GET_LIST,
  POST,
} from "@/app/api/da/[id]/versions/route";
import {
  GET as GET_ONE,
  DELETE,
} from "@/app/api/da/[id]/versions/[versionId]/route";
import { makeSession } from "../helpers/auth";
import { makeRequest, makeParams } from "../helpers/request";
import {
  createAdminUser,
  createTestUser,
  createTestForm,
  createTestVersion,
  grantTestAccess,
  makeDAData,
} from "../helpers/fixtures";
import { getVersionById } from "@/lib/db/queries/versions";

const mockAuth = vi.mocked(auth);

// ─── GET /api/da/[id]/versions ───────────────────────

describe("GET /api/da/[id]/versions", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id/versions");
    const res = await GET_LIST(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 200 with version list for any authenticated user", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const form = await createTestForm(owner.id);

    await createTestVersion(form.id, owner.id, {
      versionNumber: 1,
      name: "v1",
    });
    await createTestVersion(form.id, owner.id, {
      versionNumber: 2,
      name: "v2",
    });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: viewer.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}/versions`);
    const res = await GET_LIST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(2);
  });
});

// ─── POST /api/da/[id]/versions ──────────────────────

describe("POST /api/da/[id]/versions", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id/versions", {
      method: "POST",
      body: { name: "v1" },
    });
    const res = await POST(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is viewer (no explicit access)", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const form = await createTestForm(owner.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: viewer.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}/versions`, {
      method: "POST",
      body: { name: "v1" },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(403);
  });

  it("returns 400 when version name is missing", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/versions`, {
      method: "POST",
      body: { name: "" },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when version name is only whitespace", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/versions`, {
      method: "POST",
      body: { name: "   " },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(400);
  });

  it("returns 404 when DA does not exist", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(`/api/da/${fakeId}/versions`, {
      method: "POST",
      body: { name: "v1" },
    });
    const res = await POST(req, makeParams({ id: fakeId }));
    expect(res.status).toBe(404);
  });

  it("returns 201 for admin and creates version", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(`/api/da/${form.id}/versions`, {
      method: "POST",
      body: { name: "v1.0" },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.name).toBe("v1.0");
    expect(body.versionNumber).toBe(1);
  });

  it("returns 201 for editor and creates version", async () => {
    const owner = await createTestUser();
    const editor = await createTestUser();
    const form = await createTestForm(owner.id);
    await grantTestAccess(form.id, editor.id, "editor");

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: editor.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}/versions`, {
      method: "POST",
      body: { name: "Editor version" },
    });
    const res = await POST(req, makeParams({ id: form.id }));
    expect(res.status).toBe(201);
  });

  it("auto-increments version number", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req1 = makeRequest(`/api/da/${form.id}/versions`, {
      method: "POST",
      body: { name: "First" },
    });
    const res1 = await POST(req1, makeParams({ id: form.id }));
    const body1 = await res1.json();
    expect(body1.versionNumber).toBe(1);

    const req2 = makeRequest(`/api/da/${form.id}/versions`, {
      method: "POST",
      body: { name: "Second" },
    });
    const res2 = await POST(req2, makeParams({ id: form.id }));
    const body2 = await res2.json();
    expect(body2.versionNumber).toBe(2);
  });
});

// ─── GET /api/da/[id]/versions/[versionId] ───────────

describe("GET /api/da/[id]/versions/[versionId]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/x/versions/y");
    const res = await GET_ONE(
      req,
      makeParams({ id: "x", versionId: "y" }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 404 when version does not exist", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeVersionId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(
      `/api/da/${form.id}/versions/${fakeVersionId}`,
    );
    const res = await GET_ONE(
      req,
      makeParams({ id: form.id, versionId: fakeVersionId }),
    );
    expect(res.status).toBe(404);
  });

  it("returns 404 when version belongs to a different DA", async () => {
    const admin = await createAdminUser();
    const formA = await createTestForm(admin.id, { nom: "Form A" });
    const formB = await createTestForm(admin.id, { nom: "Form B" });
    const version = await createTestVersion(formA.id, admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    // Try to access formA's version via formB's URL
    const req = makeRequest(
      `/api/da/${formB.id}/versions/${version.id}`,
    );
    const res = await GET_ONE(
      req,
      makeParams({ id: formB.id, versionId: version.id }),
    );
    expect(res.status).toBe(404);
  });

  it("returns 200 with full version data", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    const data = makeDAData({ nomDuProjet: "Version Snapshot" });
    const version = await createTestVersion(form.id, admin.id, {
      data,
      name: "v1",
    });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(
      `/api/da/${form.id}/versions/${version.id}`,
    );
    const res = await GET_ONE(
      req,
      makeParams({ id: form.id, versionId: version.id }),
    );
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data).toBeDefined();
    expect(body.data.cadre1_ProjetActeurs.nomDuProjet).toBe(
      "Version Snapshot",
    );
  });
});

// ─── DELETE /api/da/[id]/versions/[versionId] ────────

describe("DELETE /api/da/[id]/versions/[versionId]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/x/versions/y", { method: "DELETE" });
    const res = await DELETE(
      req,
      makeParams({ id: "x", versionId: "y" }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da/x/versions/y", { method: "DELETE" });
    const res = await DELETE(
      req,
      makeParams({ id: "x", versionId: "y" }),
    );
    expect(res.status).toBe(403);
  });

  it("returns 404 when version does not exist", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeVersionId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(
      `/api/da/${form.id}/versions/${fakeVersionId}`,
      { method: "DELETE" },
    );
    const res = await DELETE(
      req,
      makeParams({ id: form.id, versionId: fakeVersionId }),
    );
    expect(res.status).toBe(404);
  });

  it("returns 404 when version belongs to different DA", async () => {
    const admin = await createAdminUser();
    const formA = await createTestForm(admin.id, { nom: "Form A" });
    const formB = await createTestForm(admin.id, { nom: "Form B" });
    const version = await createTestVersion(formA.id, admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(
      `/api/da/${formB.id}/versions/${version.id}`,
      { method: "DELETE" },
    );
    const res = await DELETE(
      req,
      makeParams({ id: formB.id, versionId: version.id }),
    );
    expect(res.status).toBe(404);
  });

  it("returns 200 and deletes version for admin", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id);
    const version = await createTestVersion(form.id, admin.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest(
      `/api/da/${form.id}/versions/${version.id}`,
      { method: "DELETE" },
    );
    const res = await DELETE(
      req,
      makeParams({ id: form.id, versionId: version.id }),
    );
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);

    const found = await getVersionById(version.id);
    expect(found).toBeNull();
  });
});
