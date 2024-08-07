// it's possible that this might interfere with vercel env variables so editing it off
import 'dotenv/config';

import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || 'No database URL found - turso.ts',
  authToken: process.env.TURSO_AUTH_TOKEN,
});