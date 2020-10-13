export class UniqueConstraintError extends Error {
    constructor (value) {
      super(`${value} must be unique.`)
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UniqueConstraintError)
      }
    }
}
  
export class InvalidPropertyError extends Error {
    constructor (msg) {
        super(msg)

        if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidPropertyError)
        }
    }
}
  
export class RequiredParameterError extends Error {
    constructor (param) {
      super(`Property ${param} can not be null or undefined.`)
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, RequiredParameterError)
      }
    }
}

export class DatabaseConnectionError extends Error {
    constructor () {
      super(`Unable to connect with database. Please try after sometimes`)
  
      if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseConnectionError)
      }
    }
}