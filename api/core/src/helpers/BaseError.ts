import { StatusCode } from './controllerStatusCode';

export class BaseError {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number = StatusCode.INTERNAL_SERVER_ERROR ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}