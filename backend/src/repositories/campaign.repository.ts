import { PLAIN_RESPONSE_MSG } from "../constant/error";
import {
  createCampaign,
  createCampaignWithCampaignerId,
} from "../interfaces/campaign.interface";
import {
  UserFromDb,
  UserFromDbDuringUpdate,
  createUser,
} from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import CampaignModel from "../models/campaign.model";
import createError from "../utils/http.error";
import { removeKey } from "../utils/object";
class CampaignRepository {
  async createCampaign(data: createCampaignWithCampaignerId) {
    const campaignInstance = new CampaignModel(data);
    const campaignData = await campaignInstance.save();
    return campaignData;
  }

  async getCampaigns() {
    return await CampaignModel.find().populate("campaigner_id");
  }

  async getCampaignById(_id: string) {
    return CampaignModel.findById(_id);
  }
}
const campaignRepo = new CampaignRepository();
export default campaignRepo;
