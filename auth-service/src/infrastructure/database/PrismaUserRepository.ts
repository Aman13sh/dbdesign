import { prisma } from "#/infrastructure/database/prisma.js";
import { User } from "#/modules/auth/domain/entities/User.js";
import { UserRepository } from "#/modules/auth/domain/repositories/UserRepository.js";
import { Email } from "#/modules/auth/domain/value-objects/Email.js";
import { UserId } from "#/modules/auth/domain/value-objects/UserId.js";

export class PrismaUserRepository implements UserRepository {
  async findById(id: UserId): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email.getValue(),
      },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.getId().getValue(),
        email: user.getEmail().getValue(),
        passwordHash: user.getPasswordHash(),
      },
    });
  }

  private toDomain(user: {
    id: string;
    email: string;
    passwordHash: string;
  }): User {
    return new User(
      new UserId(user.id),
      new Email(user.email),
      user.passwordHash,
    );
  }
}
