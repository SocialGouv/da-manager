import { vi, describe, it, expect, beforeEach } from "vitest";

// The ONLY mock in the entire test suite
vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { GET, POST } from "@/app/api/da/route";
import { makeSession } from "../helpers/auth";
import { makeRequest } from "../helpers/request";
import {
  createAdminUser,
  createTestUser,
  createTestForm,
  grantTestAccess,
} from "../helpers/fixtures";
import { getFormById } from "@/lib/db/queries/forms";

const mockAuth = vi.mocked(auth);

describe("GET /api/da", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns all DAs for admin user", async () => {
    const admin = await createAdminUser();
    const other = await createTestUser();
    await createTestForm(other.id, { nom: "DA-1" });
    await createTestForm(other.id, { nom: "DA-2" });
    await createTestForm(other.id, { nom: "DA-3" });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(3);
  });

  it("returns only shared DAs for non-admin user", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const f1 = await createTestForm(owner.id, { nom: "Shared" });
    await createTestForm(owner.id, { nom: "Not-Shared-1" });
    await createTestForm(owner.id, { nom: "Not-Shared-2" });

    await grantTestAccess(f1.id, viewer.id, "editor");

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: viewer.id, isAdmin: false }),
    );

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].nom).toBe("Shared");
  });

  it("returns empty array for non-admin with no shared DAs", async () => {
    const owner = await createTestUser();
    const loner = await createTestUser();
    await createTestForm(owner.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: loner.id, isAdmin: false }),
    );

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(0);
  });
});

describe("POST /api/da", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da", {
      method: "POST",
      body: { nom: "X" },
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da", {
      method: "POST",
      body: { nom: "Test DA" },
    });
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it("returns 201 and creates DA when admin with valid name", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest("/api/da", {
      method: "POST",
      body: { nom: "Test DA" },
    });
    const res = await POST(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.nom).toBe("Test DA");
    expect(body.id).toBeDefined();

    // Verify form exists in DB
    const form = await getFormById(body.id);
    expect(form).not.toBeNull();
    expect(form!.nom).toBe("Test DA");
  });

  it("returns 409 when name is already taken", async () => {
    const admin = await createAdminUser();
    await createTestForm(admin.id, { nom: "Existing" });
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest("/api/da", {
      method: "POST",
      body: { nom: "Existing" },
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });

  it("uses default name when body is empty", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    // Send request with no body - use GET-like request then POST handler will catch JSON parse error
    const req = makeRequest("/api/da", { method: "POST" });
    const res = await POST(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.nom).toBe("Nouveau Document d'Architecture");
  });

  it("populates initialData with nomDuProjet matching the nom", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest("/api/da", {
      method: "POST",
      body: { nom: "My Project" },
    });
    const res = await POST(req);
    expect(res.status).toBe(201);

    const resBody = await res.json();
    const form = await getFormById(resBody.id);
    expect(form).not.toBeNull();
    expect(form!.data.cadre1_ProjetActeurs.nomDuProjet).toBe("My Project");
  });
});
