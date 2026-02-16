import { beforeEach } from "vitest";

// Set DATABASE_URL BEFORE any application module is imported.
// This is critical: lib/db/index.ts reads process.env.DATABASE_URL at import time.
process.env.DATABASE_URL =
  "postgresql://da_user:da_password@localhost:5432/da_manager_test";

import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

beforeEach(async () => {
  // Truncate all tables with CASCADE to respect FK constraints.
  await db.execute(sql`
    TRUNCATE TABLE edit_logs, form_access, versions, forms, users CASCADE
  `);
});
