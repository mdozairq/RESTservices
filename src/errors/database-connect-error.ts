import { StatusCode } from '../interfaces';
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
