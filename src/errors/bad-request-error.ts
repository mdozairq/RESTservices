import { StatusCode } from '../interfaces';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = StatusCode.BAD_REQUEST;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
