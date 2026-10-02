export class Email {
  constructor(
    private readonly value: string,
  ) {
    if (!this.isValid()) {
      throw new Error('Invalid email address');
    }
  }

  getValue(): string {
    return this.value;
  }

  private isValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
  }
}