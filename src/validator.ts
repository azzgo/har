import path from 'path'
import Ajv, { ValidateFunction } from 'ajv'
import fs from 'fs'
import {Har} from './type'

class Validator {
  private validate: ValidateFunction
 
  constructor() {
    const Schema = fs.readFileSync(path.resolve(__dirname, './har-schema.json'), { encoding: 'utf-8' })
    this.validate = new Ajv().compile(JSON.parse(Schema))
  }

  verify(json: any): boolean {
    return this.validate(json)
  }

  checkVersion(har: Har): boolean {
    return har.log.version.trim() === "1.2"
  }
}

export default new Validator()
