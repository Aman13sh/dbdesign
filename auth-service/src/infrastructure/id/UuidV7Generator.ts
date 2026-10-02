import { v7 as uuidv7 } from "uuid";
import { IdGenerator } from "#/modules/auth/application/ports/IdGenerator.js";

export class UuidV7Generator implements IdGenerator {
  generate(): string {
    return uuidv7();
  }
}