import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { GET } from "@/app/api/da/[id]/logs/route";
import { makeSession } from "../helpers/auth";
import { makeRequest, makeParams } from "../helpers/request";
import {
  createTestUser,
  createTestForm,
  createTestEditLog,
} from "../helpers/fixtures";

const mockAuth = vi.mocked(auth);

describe("GET /api/da/[id]/logs", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id/logs");
    const res = await GET(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 200 with edit logs for any authenticated user", async () => {
    const owner = await createTestUser();
    const viewer = await createTestUser();
    const form = await createTestForm(owner.id);

    await createTestEditLog(form.id, owner.id);
    await createTestEditLog(form.id, owner.id);
    await createTestEditLog(form.id, owner.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: viewer.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}/logs`);
    const res = await GET(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(3);
  });

  it("returns empty array when no logs exist", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const req = makeRequest(`/api/da/${form.id}/logs`);
    const res = await GET(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(0);
  });
});
