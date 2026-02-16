import { describe, it, expect } from "vitest";
import {
  createEditLog,
  getEditLogsForForm,
  getEditLogsForUser,
} from "@/lib/db/queries/editLogs";
import { createTestUser, createTestForm } from "../helpers/fixtures";

describe("createEditLog", () => {
  it("creates an edit log entry linked to form and user", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    const log = await createEditLog(form.id, user.id);

    expect(log.formId).toBe(form.id);
    expect(log.userId).toBe(user.id);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});

describe("getEditLogsForForm", () => {
  it("returns logs ordered by createdAt DESC with user info", async () => {
    const user = await createTestUser({
      givenName: "Jean",
      usualName: "Dupont",
      email: "jean@test.fr",
    });
    const form = await createTestForm(user.id);

    await createEditLog(form.id, user.id);
    await createEditLog(form.id, user.id);
    await createEditLog(form.id, user.id);

    const logs = await getEditLogsForForm(form.id);
    expect(logs).toHaveLength(3);
    // Check DESC order
    expect(logs[0].createdAt.getTime()).toBeGreaterThanOrEqual(
      logs[1].createdAt.getTime(),
    );
    // Check user info joined
    expect(logs[0].userName).toBe("Dupont");
    expect(logs[0].userGivenName).toBe("Jean");
    expect(logs[0].userEmail).toBe("jean@test.fr");
  });

  it("limits results to the specified count", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    for (let i = 0; i < 5; i++) {
      await createEditLog(form.id, user.id);
    }

    const logs = await getEditLogsForForm(form.id, 2);
    expect(logs).toHaveLength(2);
  });

  it("returns empty array when no logs exist", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    const logs = await getEditLogsForForm(form.id);
    expect(logs).toHaveLength(0);
  });
});

describe("getEditLogsForUser", () => {
  it("returns logs for a specific user with form name via join", async () => {
    const user = await createTestUser();
    const form1 = await createTestForm(user.id, { nom: "DA Alpha" });
    const form2 = await createTestForm(user.id, { nom: "DA Beta" });

    await createEditLog(form1.id, user.id);
    await createEditLog(form2.id, user.id);

    const logs = await getEditLogsForUser(user.id);
    expect(logs).toHaveLength(2);

    const formNames = logs.map((l) => l.formNom);
    expect(formNames).toContain("DA Alpha");
    expect(formNames).toContain("DA Beta");
  });

  it("limits results to the specified count", async () => {
    const user = await createTestUser();
    const form = await createTestForm(user.id);

    for (let i = 0; i < 5; i++) {
      await createEditLog(form.id, user.id);
    }

    const logs = await getEditLogsForUser(user.id, 3);
    expect(logs).toHaveLength(3);
  });

  it("returns empty array when user has no logs", async () => {
    const user = await createTestUser();
    const logs = await getEditLogsForUser(user.id);
    expect(logs).toHaveLength(0);
  });
});
