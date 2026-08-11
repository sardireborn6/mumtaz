import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js pakai konvensi .env.local untuk secret dev lokal — dotenv default
// cuma baca .env, jadi di-arahkan eksplisit ke .env.local di sini supaya
// Prisma CLI & seed script baca env var yang sama dengan app-nya.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
