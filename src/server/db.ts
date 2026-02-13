import { env } from "@/env";
import { PrismaClient as CEClient } from "../../generated/ce";
import { PrismaClient as SageClient } from "../../generated/sage";

const createCEClient = () =>
  new CEClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const createSageClient = () => new SageClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
})

const globalForPrisma = globalThis as unknown as {
  ce_db: ReturnType<typeof createCEClient> | undefined;
  sage_db: ReturnType<typeof createSageClient> | undefined;
};

export const ceDb = globalForPrisma.ce_db ?? createCEClient();
export const sageDb = globalForPrisma.sage_db ?? createSageClient();

if (env.NODE_ENV !== "production") globalForPrisma.ce_db = ceDb;
if (env.NODE_ENV !== "production") globalForPrisma.sage_db = sageDb;
