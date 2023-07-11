import { Har } from "./type";
import fs from 'fs'

export function fromPath(path: string): Har | null {
  if (!fs.existsSync(path)) {
    return null
  }
  const content = fs.readFileSync(path, { encoding: 'utf-8' });
  try {
    return JSON.parse(content)
  } catch (e) {
    throw e
  }
}
