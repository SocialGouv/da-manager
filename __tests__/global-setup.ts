import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "path";

const ADMIN_URL = "postgresql://da_user:da_password@localhost:5432/postgres";
const TEST_DB_URL =
  "postgresql://da_user:da_password@localhost:5432/da_manager_test";

export async function setup() {
  // 1) Connect to the default "postgres" DB to create the test DB
  const adminClient = postgres(ADMIN_URL, { max: 1 });
  try {
    await adminClient.unsafe(`CREATE DATABASE da_manager_test`);
    console.log("[test] Created database da_manager_test");
  } catch (error: unknown) {
    if ((error as { message?: string }).message?.includes("already exists")) {
      console.log("[test] Database da_manager_test already exists");
    } else {
      throw error;
    }
  }
  await adminClient.end();

  // 2) Run Drizzle migrations on the test DB
  const migrationClient = postgres(TEST_DB_URL, { max: 1 });
  const db = drizzle(migrationClient);
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), "drizzle"),
  });
  console.log("[test] Migrations applied to da_manager_test");
  await migrationClient.end();
}

export async function teardown() {
  // Intentionally leave the test DB for faster subsequent runs.
  // Migrations are idempotent; truncation happens per-test.
}
