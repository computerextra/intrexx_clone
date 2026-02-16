import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const ceOld_CEZentral_KundenRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ kundennummer: z.string().min(7).max(7) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.oldCeDb.xTABLE898B92CE.findFirst({
        where: {
          STR_KUNDENNUMMER_D45D177B: input.kundennummer
        },
        include: {
          XDATAGROUPFFC21EED: true
        }
      })
    }),
});
