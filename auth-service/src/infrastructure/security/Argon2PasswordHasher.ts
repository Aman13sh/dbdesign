import argon2 from "argon2";
import { PasswordHasher } from "#/modules/auth/application/ports/PasswordHasher.js";

export class Argon2PasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
    });
  }
}