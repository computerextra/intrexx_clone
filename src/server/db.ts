import { env } from "@/env";
import { PrismaClient as CEClient } from "../../generated/ce";
import { PrismaClient as SageClient } from "../../generated/sage";
import { PrismaClient as OldCEClient } from "../../generated/ce-old";

const createCEClient = () =>
  new CEClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const createOldCEClient = () =>
  new OldCEClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const createSageClient = () => new SageClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
})

const globalForPrisma = globalThis as unknown as {
  ce_db: ReturnType<typeof createCEClient> | undefined;
  old_ce_db: ReturnType<typeof createOldCEClient> | undefined;
  sage_db: ReturnType<typeof createSageClient> | undefined;
};

export const ceDb = globalForPrisma.ce_db ?? createCEClient();
export const oldCeDb = globalForPrisma.old_ce_db ?? createOldCEClient();
export const sageDb = globalForPrisma.sage_db ?? createSageClient();

if (env.NODE_ENV !== "production") globalForPrisma.ce_db = ceDb;
if (env.NODE_ENV !== "production") globalForPrisma.sage_db = sageDb;
if (env.NODE_ENV !== "production") globalForPrisma.old_ce_db = oldCeDb;
