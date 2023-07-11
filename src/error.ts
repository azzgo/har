export class InvalidHarFormat extends Error {
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, InvalidHarFormat.prototype);
  }
}

export class UnsupportSpecVersion extends Error {
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, UnsupportSpecVersion.prototype);
  }
}
