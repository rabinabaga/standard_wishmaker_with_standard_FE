const campaignRouter = require("express").Router();

import campaignCtrl from "../../controllers/campaign.controller";

import ValidateRequest from "../../middlewares/validate.request";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";
import upload from "../../utils/upload";
import { CreateCampaignValidator } from "../../validators/campaign.validator";
import checkPermission from "../../middlewares/rbac.middleware";
campaignRouter.post(
  "/",
  upload.single("imageSrc"),
    ValidateRequest(CreateCampaignValidator),
  authenticationMiddleware,
  campaignCtrl.register
);

campaignRouter.get(
  "/",

  //   ValidateRequest(CreateCampaignValidator),
  authenticationMiddleware,
  campaignCtrl.getCampaigns
);

campaignRouter.get(
  "/application-analytics",

  //   ValidateRequest(CreateCampaignValidator),
  authenticationMiddleware,
  checkPermission("admin"),
  campaignCtrl.getApplicationAnalytics
);

export default campaignRouter;
