import { User } from "#/modules/auth/domain/entities/User.js";
import { Email } from "#/modules/auth/domain/value-objects/Email.js";
import { UserId } from "#/modules/auth/domain/value-objects/UserId.js";
import { UserRepository } from "#/modules/auth/domain/repositories/UserRepository.js";
import { IdGenerator } from "#/modules/auth/application/ports/IdGenerator.js";
import { PasswordHasher } from "#/modules/auth/application/ports/PasswordHasher.js";

export interface RegisterUserInput {
  email: string;
  password: string;
}

export interface RegisterUserOutput {
  userId: string;
  email: string;
}

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(
    input: RegisterUserInput,
  ): Promise<RegisterUserOutput> {
    const email = new Email(input.email);

    const existingUser =
      await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash =
      await this.passwordHasher.hash(input.password);

    const userId =
      new UserId(this.idGenerator.generate());

    const user = new User(
      userId,
      email,
      passwordHash,
    );

    await this.userRepository.save(user);

    return {
      userId: user.getId().getValue(),
      email: user.getEmail().getValue(),
    };
  }
}