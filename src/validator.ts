import Ajv, { ValidateFunction } from "ajv";
import { Har } from "./type";
import HarSchema from "./har-schema.json";

class Validator {
  private validate: ValidateFunction;

  constructor() {
    this.validate = new Ajv().compile(HarSchema);
  }

  verify(json: any): boolean {
    return this.validate(json);
  }

  checkVersion(har: Har): boolean {
    return har.log.version.trim() === "1.2";
  }
}

export default new Validator();
