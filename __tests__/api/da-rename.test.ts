import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { PATCH } from "@/app/api/da/[id]/rename/route";
import { getFormById } from "@/lib/db/queries/forms";
import { makeRequest, makeParams } from "../helpers/request";
import { makeSession } from "../helpers/auth";
import {
  createTestUser,
  createAdminUser,
  createTestForm,
} from "../helpers/fixtures";

const mockAuth = vi.mocked(auth);

describe("PATCH /api/da/[id]/rename", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("/api/da/some-id/rename", {
      method: "PATCH",
      body: { nom: "New Name" },
    });
    const res = await PATCH(req, makeParams({ id: "some-id" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    const user = await createTestUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: user.id, isAdmin: false }),
    );

    const form = await createTestForm(user.id, { nom: "Test DA" });
    const req = makeRequest(`/api/da/${form.id}/rename`, {
      method: "PATCH",
      body: { nom: "Renamed" },
    });
    const res = await PATCH(req, makeParams({ id: form.id }));
    expect(res.status).toBe(403);
  });

  it("returns 404 when DA does not exist", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const fakeId = "00000000-0000-0000-0000-000000000000";
    const req = makeRequest(`/api/da/${fakeId}/rename`, {
      method: "PATCH",
      body: { nom: "Renamed" },
    });
    const res = await PATCH(req, makeParams({ id: fakeId }));
    expect(res.status).toBe(404);
  });

  it("returns 400 when nom is missing", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const form = await createTestForm(admin.id, { nom: "Test DA" });
    const req = makeRequest(`/api/da/${form.id}/rename`, {
      method: "PATCH",
      body: {},
    });
    const res = await PATCH(req, makeParams({ id: form.id }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when nom is empty string", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const form = await createTestForm(admin.id, { nom: "Test DA" });
    const req = makeRequest(`/api/da/${form.id}/rename`, {
      method: "PATCH",
      body: { nom: "   " },
    });
    const res = await PATCH(req, makeParams({ id: form.id }));
    expect(res.status).toBe(400);
  });

  it("returns 409 when new name conflicts with another DA", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    await createTestForm(admin.id, { nom: "Alpha" });
    const formB = await createTestForm(admin.id, { nom: "Beta" });

    const req = makeRequest(`/api/da/${formB.id}/rename`, {
      method: "PATCH",
      body: { nom: "Alpha" },
    });
    const res = await PATCH(req, makeParams({ id: formB.id }));
    expect(res.status).toBe(409);

    const body = await res.json();
    expect(body.nameTaken).toBe(true);
  });

  it("renames successfully and returns updated form", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const form = await createTestForm(admin.id, { nom: "Original Name" });
    const req = makeRequest(`/api/da/${form.id}/rename`, {
      method: "PATCH",
      body: { nom: "Renamed DA" },
    });
    const res = await PATCH(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.id).toBe(form.id);
    expect(body.nom).toBe("Renamed DA");
    expect(body.updatedAt).toBeDefined();
  });

  it("persists the rename in the database (both nom and data)", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const form = await createTestForm(admin.id, { nom: "Before Rename" });
    const req = makeRequest(`/api/da/${form.id}/rename`, {
      method: "PATCH",
      body: { nom: "After Rename" },
    });
    await PATCH(req, makeParams({ id: form.id }));

    const updated = await getFormById(form.id);
    expect(updated).not.toBeNull();
    expect(updated!.nom).toBe("After Rename");
    expect(
      (updated!.data as { cadre1_ProjetActeurs?: { nomDuProjet?: string } })
        .cadre1_ProjetActeurs?.nomDuProjet,
    ).toBe("After Rename");
  });

  it("trims whitespace from the new name", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const form = await createTestForm(admin.id, { nom: "Trim Test" });
    const req = makeRequest(`/api/da/${form.id}/rename`, {
      method: "PATCH",
      body: { nom: "  Trimmed Name  " },
    });
    const res = await PATCH(req, makeParams({ id: form.id }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.nom).toBe("Trimmed Name");
  });

  it("allows renaming to the same name (no conflict with self)", async () => {
    const admin = await createAdminUser();
    mockAuth.mockResolvedValue(
      makeSession({ dbUserId: admin.id, isAdmin: true }),
    );

    const form = await createTestForm(admin.id, { nom: "Same Name" });
    const req = makeRequest(`/api/da/${form.id}/rename`, {
      method: "PATCH",
      body: { nom: "Same Name" },
    });
    const res = await PATCH(req, makeParams({ id: form.id }));
    // isFormNameTaken excludes the current form, so no conflict
    expect(res.status).toBe(200);
  });
});
