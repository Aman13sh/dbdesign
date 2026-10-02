import { Email } from "#/modules/auth/domain/value-objects/Email.js";
import { UserId } from "#/modules/auth/domain/value-objects/UserId.js";

export class User {
  constructor(
    private readonly id: UserId,
    private email: Email,
    private passwordHash: string,
  ) {}

  getId(): UserId {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}