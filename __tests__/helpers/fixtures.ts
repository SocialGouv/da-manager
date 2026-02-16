import { db } from "@/lib/db";
import {
  users,
  forms,
  formAccess,
  versions,
  editLogs,
} from "@/lib/db/schema";
import { initialData } from "@/app/da/initialData";
import type { DAData } from "@/types/da.types";

let counter = 0;
function uniqueSuffix(): string {
  return `${Date.now()}-${++counter}`;
}

// ──────────────────────────────────────────────
// Users
// ──────────────────────────────────────────────

interface CreateUserOptions {
  email?: string;
  proconnectSub?: string;
  isAdmin?: boolean;
  givenName?: string;
  usualName?: string;
}

export async function createTestUser(opts: CreateUserOptions = {}) {
  const suffix = uniqueSuffix();
  const [user] = await db
    .insert(users)
    .values({
      proconnectSub: opts.proconnectSub ?? `sub-${suffix}`,
      email: opts.email ?? `user-${suffix}@test.fr`,
      givenName: opts.givenName ?? "Test",
      usualName: opts.usualName ?? "User",
      isAdmin: opts.isAdmin ?? false,
    })
    .returning();
  return user;
}

export async function createAdminUser(
  opts: Omit<CreateUserOptions, "isAdmin"> = {},
) {
  return createTestUser({ ...opts, isAdmin: true });
}

// ──────────────────────────────────────────────
// Forms (DA documents)
// ──────────────────────────────────────────────

export function makeDAData(overrides: { nomDuProjet?: string } = {}): DAData {
  return {
    ...initialData,
    cadre1_ProjetActeurs: {
      ...initialData.cadre1_ProjetActeurs,
      nomDuProjet: overrides.nomDuProjet ?? `DA-${uniqueSuffix()}`,
    },
  };
}

interface CreateFormOptions {
  nom?: string;
  data?: DAData;
}

export async function createTestForm(
  createdById: string,
  opts: CreateFormOptions = {},
) {
  const nom = opts.nom ?? `DA-${uniqueSuffix()}`;
  const data = opts.data ?? makeDAData({ nomDuProjet: nom });
  const [form] = await db
    .insert(forms)
    .values({ nom, data, createdBy: createdById })
    .returning();
  return form;
}

// ──────────────────────────────────────────────
// Form Access
// ──────────────────────────────────────────────

export async function grantTestAccess(
  formId: string,
  userId: string,
  role: "editor" | "viewer" = "editor",
) {
  const [access] = await db
    .insert(formAccess)
    .values({ formId, userId, role })
    .returning();
  return access;
}

// ──────────────────────────────────────────────
// Versions
// ──────────────────────────────────────────────

interface CreateVersionOptions {
  versionNumber?: number;
  name?: string;
  data?: DAData;
}

export async function createTestVersion(
  formId: string,
  createdById: string,
  opts: CreateVersionOptions = {},
) {
  const [version] = await db
    .insert(versions)
    .values({
      formId,
      versionNumber: opts.versionNumber ?? 1,
      name: opts.name ?? `v${opts.versionNumber ?? 1}`,
      data: opts.data ?? makeDAData(),
      createdBy: createdById,
    })
    .returning();
  return version;
}

// ──────────────────────────────────────────────
// Edit Logs
// ──────────────────────────────────────────────

export async function createTestEditLog(formId: string, userId: string) {
  const [log] = await db
    .insert(editLogs)
    .values({ formId, userId })
    .returning();
  return log;
}
