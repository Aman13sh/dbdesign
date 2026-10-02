import { z } from "zod";
import {
  router,
  publicProcedure,
} from "#/infrastructure/trpc/trpc.js";
import { RegisterUser } from "#/modules/auth/application/use-cases/RegisterUser.js";

export const createAuthRouter = (
  registerUser: RegisterUser,
) =>
  router({
    register: publicProcedure
      .input(
        z.object({
          email: z.email(),
          password: z.string().min(8),
        }),
      )
      .mutation(async ({ input }) => {
        return registerUser.execute(input);
      }),
  });

