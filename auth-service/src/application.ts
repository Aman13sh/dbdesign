import Fastify, { FastifyInstance } from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

import { PrismaUserRepository } from "#/infrastructure/database/PrismaUserRepository.js";
import { UuidV7Generator } from "#/infrastructure/id/UuidV7Generator.js";
import { Argon2PasswordHasher } from "#/infrastructure/security/Argon2PasswordHasher.js";
import { createAppRouter } from "#/infrastructure/trpc/router.js";

import { RegisterUser } from "#/modules/auth/application/use-cases/RegisterUser.js";

export class Application {
  private readonly fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
  }

  async initialize(): Promise<void> {
    const userRepository = new PrismaUserRepository();

    const idGenerator = new UuidV7Generator();

    const passwordHasher = new Argon2PasswordHasher();

    const registerUser = new RegisterUser(
      userRepository,
      idGenerator,
      passwordHasher,
    );

    const appRouter = createAppRouter(registerUser);

    await this.fastify.register(fastifyTRPCPlugin, {
      prefix: "/trpc",
      trpcOptions: {
        router: appRouter,
      },
    });
  }

  get instance(): FastifyInstance {
    return this.fastify;
  }

  async start(port: number): Promise<void> {
    await this.initialize();

    await this.fastify.listen({
      port,
      host: "0.0.0.0",
    });
  }
}

