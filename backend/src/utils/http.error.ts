import createHttpError from "http-errors";

const createError = (statusCode: number, message: string): Error =>
  // eslint-disable-next-line implicit-arrow-linebreak
  createHttpError(statusCode, message);

export default createError;

