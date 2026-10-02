import { router } from "#/infrastructure/trpc/trpc.js";
import { createAuthRouter } from "#/modules/auth/interface/trpc/authRouter.js";
import { RegisterUser } from "#/modules/auth/application/use-cases/RegisterUser.js";

export const createAppRouter = (
  registerUser: RegisterUser,
) =>
  router({
    auth: createAuthRouter(registerUser),
  });

export type AppRouter = ReturnType<typeof createAppRouter>;
