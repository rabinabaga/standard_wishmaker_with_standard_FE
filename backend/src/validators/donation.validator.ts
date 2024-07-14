import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export const CreateDonationValidator = Joi.object({
  donationAmount: Joi.number().required().min(2),
  campaignId: Joi.string().required().min(2),
});
