class CustomError extends Error {
  data: any;
  code: number;

  constructor(data: any, code: number, message?: string) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export const NotFound = (data: any, message?: string) => new CustomError(data, 404, message);
export const BadRequest = (data: any, message?: string) => new CustomError(data, 400, message);
export const Unauthorized = (data: any, message?: string) => new CustomError(data, 401, message);
