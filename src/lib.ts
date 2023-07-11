import { Har } from "./type";
import fs from "fs";
import validator from "./validator";
import { InvalidHarFormat } from "./error";

export function fromPath(path: string): Har | null {
  if (!fs.existsSync(path)) {
    return null;
  }
  const content = fs.readFileSync(path, { encoding: "utf-8" });
  return fromString(content);
}

export function fromString(content: string): Har | null {
  try {
    const json = JSON.parse(content);
    if (!validator.verify(json)) {
      throw new InvalidHarFormat("InvalidHarFormat");
    }
    return json;
  } catch (e) {
    throw e;
  }
}
