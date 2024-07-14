const donationRouter = require("express").Router();

import campaignCtrl from "../../controllers/campaign.controller";

import ValidateRequest from "../../middlewares/validate.request";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";
import upload from "../../utils/upload";
import { CreateCampaignValidator } from "../../validators/campaign.validator";
import checkPermission from "../../middlewares/rbac.middleware";
import { CreateDonationValidator } from "../../validators/donation.validator";
import donationCtrl from "../../controllers/donation.controller";
donationRouter.post(
  "/",
  ValidateRequest(CreateDonationValidator),
  authenticationMiddleware,
  donationCtrl.register
);



export default donationRouter;
