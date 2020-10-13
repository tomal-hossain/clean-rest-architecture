import { RequiredParameterError } from './error.js'

export function requiredParam (param) {
  throw new RequiredParameterError(param)
}
