import { Har } from "./type";
import fs from 'fs'

export function fromPath(path: string): Har | null {
  if (!fs.existsSync(path)) {
    return null
  }
  const content = fs.readFileSync(path, { encoding: 'utf-8' });
  return fromString(content)
}

export function fromString(content: string): Har | null {
  try {
    return JSON.parse(content)
  } catch (e) {
    throw e
  }
}
