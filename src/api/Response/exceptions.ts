class CustomError extends Error {
  data: any;
  code: number;
  name: string;

  constructor(name: string, data: any, code: number, message?: string) {
    super(message);
    this.name = name;
    this.code = code;
    this.data = data;
  }
}

export const NotFound = (data: any, message?: string) =>
  new CustomError("NOT_FOUND", data, 404, message);

export const BadRequest = (data: any, message?: string) =>
  new CustomError("BAD_REQUEST", data, 400, message);

export const Unauthorized = (data: any, message?: string) =>
  new CustomError("UNAUTHORIZED", data, 401, message);
