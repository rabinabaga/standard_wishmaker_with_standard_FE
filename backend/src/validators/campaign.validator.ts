import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export const CreateCampaignValidator = Joi.object({
  campaignTitle: Joi.string().required().min(2),
  goalAmount: Joi.number().required().min(2),
});
