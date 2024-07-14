import createError from "../utils/http.error";
import { DynamicMessages, PLAIN_RESPONSE_MSG } from "../constant/error";

import { createCampaign } from "../interfaces/campaign.interface";
import campaignRepo from "../repositories/campaign.repository";

class CampaignService {
  async createCampaign(body: createCampaign): Promise<any> {
    console.log("body in campaign service", body);

    const campaign = await campaignRepo.createCampaign({
      campaignTitle: body.campaignTitle,
      goalAmount: body.goalAmount,
      imageSrc: body.filename,
      campaigner_id: body._id,
    });

    return campaign;
  }

  async getCampaigns() {
    const campaigns = await campaignRepo.getCampaigns();
    if (campaigns === null) {
      throw createError(204, DynamicMessages.notFoundMessage("Campaigns"));
    }
    return campaigns;
  }

}

const campaignSvc = new CampaignService();
export default campaignSvc;
