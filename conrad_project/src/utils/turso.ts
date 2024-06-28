import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || 'No database URL found - turso.ts',
  authToken: process.env.TURSO_AUTH_TOKEN,
});