export class InvalidHarFormat extends Error {
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, InvalidHarFormat.prototype);
  }
}
