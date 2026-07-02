import { z } from "zod";

/**
 * Environment validation — fails at build/boot, never silently at runtime.
 * Add variables here as integrations land (e.g. Lark Bitable credentials in
 * Phase 4). Server-only secrets must NOT use the NEXT_PUBLIC_ prefix.
 */
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Phase 4 (uncomment when the Lark integration lands):
  // LARK_APP_ID: z.string().min(1),
  // LARK_APP_SECRET: z.string().min(1),
  // LARK_BITABLE_APP_TOKEN: z.string().min(1),
  // LARK_BITABLE_TABLE_ID: z.string().min(1),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables — see log above.");
}

export const env = parsed.data;
