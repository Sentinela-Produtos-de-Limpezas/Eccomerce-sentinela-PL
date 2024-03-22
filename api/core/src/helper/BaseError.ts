export class BaseError  extends Error {
  constructor(message: string, statusCode?: number) {
    super(message);
  
  }
}
