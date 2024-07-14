const jwt = require("jsonwebtoken");
import { type Request, type Response, type NextFunction } from "express";
import { CustomRequest, MulterRequest } from "../types/auth.type";
import campaignSvc from "../services/campaign.service";
import { DynamicMessages, PLAIN_RESPONSE_MSG } from "../constant/error";

class CampaignController {
  async register(
    req: MulterRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("req.body, ", req.body, req.user, ", req.file,", req.file);

      const response = await campaignSvc.createCampaign({
        ...req.body,
        _id: req.user,
        ...req.file,
      });

      res.status(200).json({
        message: DynamicMessages.createMessage("Campaign"),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCampaigns(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const campaigns = await campaignSvc.getCampaigns();
      res.status(200).json(campaigns);
    } catch (error) {
      next(error);
    }
  }

  async getApplicationAnalytics(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    console.log("here");

    res.json({ message: "here is your analytics" });
  }
}

const campaignCtrl = new CampaignController();
export default campaignCtrl;
