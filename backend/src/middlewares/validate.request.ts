import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
const ValidateRequest = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const validated = schema.parse(req.body);
      const validated = await schema.validateAsync(req.body);

      next();
    } catch (exception) {
      next(exception);
    }
  };
};

export default ValidateRequest;
