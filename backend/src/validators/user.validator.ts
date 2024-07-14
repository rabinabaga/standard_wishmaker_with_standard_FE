import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex =
  /^\+?([1-9]{1}[0-9]{0,4})?[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const CreateUserValidator = Joi.object({
  firstName: Joi.string().required().min(2),
  lastName: Joi.string().required().min(2),
  email: Joi.string().required().min(10).regex(emailRegex),
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const LoginUserValidator = Joi.object({
  
  email: Joi.string().required().min(10).regex(emailRegex),
  password: Joi.string().required().min(8),

});
export const LoginGoogleUserValidator = Joi.object({
credential:Joi.string().required()
});
// export const LoginUserValidator = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.string().required(),
//   isFirstTimeLogin: Joi.boolean(),
// });

// export const ChangeUserPasswordValidator = Joi.object({
//   oldPassword: Joi.string().required(),
//   password: Joi.string().required().min(8),
//   confirmPassword: Joi.string().required().valid(Joi.ref("password")).min(8),
// });

// export const PasswordResetRequestValidator = Joi.object({
//   email: Joi.string().required().min(10).regex(emailRegex),
// });

// export const PasswordResetValidator = Joi.object({
//   password: Joi.string().required().min(8),
//   confirmPassword: Joi.string().required().min(8).valid(Joi.ref("password")),
//   email: Joi.string().required().min(10).regex(emailRegex),
//   code: Joi.string().required(),
// });

// const userUpdateSchema: ObjectSchema = Joi.object({
//   firstName: Joi.string().required().min(2),
//   lastName: Joi.string().required().min(2),
//   email: Joi.string().required().min(10).regex(emailRegex),
//   mobile: Joi.string().required().min(8).regex(mobileRegex),
//   state: Joi.string(),
//   city: Joi.string(),
//   streetAddress: Joi.string(),
//   zipCode: Joi.string(),
//   profile: Joi.any().allow(),
//   userName: Joi.string().allow(),
//   selectedZipCode: Joi.array().allow(),
// });

// export const createAdminUserSchema: ObjectSchema = Joi.object({
//   firstName: Joi.string().required().min(2),
//   lastName: Joi.string().required().min(2),
//   email: Joi.string().required().min(10).regex(emailRegex),
//   mobile: Joi.string().required().min(8).regex(mobileRegex),
//   password: Joi.string().required().min(8),
//   confirmPassword: Joi.string().required().valid(Joi.ref("password")).min(8),
// });

// const systemGeneratedPasswordChangeSchema: ObjectSchema = Joi.object({
//   password: Joi.string().required().min(8),
//   confirmPassword: Joi.string().required().valid(Joi.ref("password")).min(8),
//   isFirstTimeLogin: Joi.boolean().allow(),
//   zipCode: Joi.string().allow(),
// });

// const updateSelectedZipCodeSchema: ObjectSchema = Joi.object({
//   selectedZipCode: Joi.array().required(),
// });

// // Middleware function to validate request body against schema
// export const validateUpdateUserPayload = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) =>
//   userUpdateSchema
//     .validateAsync(req.body)
//     .then(() => next())
//     .catch((err) => next(err));

// export const validateCreateAdminUserPayload = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) =>
//   createAdminUserSchema
//     .validateAsync(req.body)
//     .then(() => next())
//     .catch((err) => next(err));

// export const validateSystemGeneratedPasswordChangePayload = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) =>
//   systemGeneratedPasswordChangeSchema
//     .validateAsync(req.body)
//     .then(() => next())
//     .catch((err) => next(err));

// export const validateUpdateSelectedZipCodePayload = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) =>
//   updateSelectedZipCodeSchema
//     .validateAsync(req.body)
//     .then(() => next())
//     .catch((err) => next(err));
