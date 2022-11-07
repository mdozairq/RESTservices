import { StatusCode } from '../interfaces';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = StatusCode.NOT_FOUND;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}
