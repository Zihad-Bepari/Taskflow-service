// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use `adapter` instead of `url` for Prisma 7
    url: env("DATABASE_URL"), // PrismaClient will use this for migrations
  },
});
