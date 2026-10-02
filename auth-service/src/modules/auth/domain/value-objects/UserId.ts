export class UserId {
  constructor(
    private readonly value: string,
  ) {}

  getValue(): string {
    return this.value;
  }
}