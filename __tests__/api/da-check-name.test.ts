import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { GET } from "@/app/api/da/check-name/route";
import { makeSession } from "../helpers/auth";
import { makeRequest } from "../helpers/request";
import { createAdminUser, createTestUser, createTestForm } from "../helpers/fixtures";

const mockAuth = vi.mocked(auth);

describe("GET /api/da/check-name", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/check-name", {
      searchParams: { nom: "test" },
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns { taken: false } when nom is empty", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da/check-name", {
      searchParams: { nom: "" },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.taken).toBe(false);
  });

  it("returns { taken: false } when nom is missing", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da/check-name");
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.taken).toBe(false);
  });

  it("returns { taken: true } when name exists", async () => {
    const admin = await createAdminUser();
    await createTestForm(admin.id, { nom: "My DA" });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest("/api/da/check-name", {
      searchParams: { nom: "My DA" },
    });
    const res = await GET(req);
    const body = await res.json();
    expect(body.taken).toBe(true);
  });

  it("returns { taken: true } case-insensitively", async () => {
    const admin = await createAdminUser();
    await createTestForm(admin.id, { nom: "My DA" });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest("/api/da/check-name", {
      searchParams: { nom: "my da" },
    });
    const res = await GET(req);
    const body = await res.json();
    expect(body.taken).toBe(true);
  });

  it("returns { taken: false } when name is unique", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest("/api/da/check-name", {
      searchParams: { nom: "Nonexistent" },
    });
    const res = await GET(req);
    const body = await res.json();
    expect(body.taken).toBe(false);
  });

  it("returns { taken: false } when excluded by excludeId", async () => {
    const admin = await createAdminUser();
    const form = await createTestForm(admin.id, { nom: "My DA" });

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const req = makeRequest("/api/da/check-name", {
      searchParams: { nom: "My DA", excludeId: form.id },
    });
    const res = await GET(req);
    const body = await res.json();
    expect(body.taken).toBe(false);
  });
});
