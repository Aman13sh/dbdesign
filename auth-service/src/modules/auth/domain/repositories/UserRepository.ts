import { User } from "#/modules/auth/domain/entities/User.js";
import { Email } from "#/modules/auth/domain/value-objects/Email.js";
import { UserId } from "#/modules/auth/domain/value-objects/UserId.js";

export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
}
