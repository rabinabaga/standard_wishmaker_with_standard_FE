import createError from "../utils/http.error";
import { DynamicMessages, PLAIN_RESPONSE_MSG } from "../constant/error";
import { createCampaign } from "../interfaces/campaign.interface";
import donationRepo from "../repositories/donation.repository";
import request from "request-promise";
import {
  createDonation,
  donationInitializeUpdateData,
} from "../interfaces/donation.interface";
import campaignRepo from "../repositories/campaign.repository";
import { CustomRequest } from "../types/auth.type";
class DonationService {
  async createDonation(body: createDonation): Promise<any> {
    const donation = await donationRepo.createDonation({
      donationAmount: body.donationAmount,
      campaignId: body.campaignId,
      donorId: body._id,
    });
    const options = {
      method: "POST",
      url: "https://a.khalti.com/api/v2/epayment/initiate/",
      headers: {
        Authorization: "key live_secret_key_68791341fdd94846a146f0457ff7b455",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: "http://localhost:8001/api/v1/donation/payment-callback/",
        website_url: "http://localhost:3000",
        amount: "1000",
        purchase_order_id: donation._id,
        purchase_order_name: "test",
        customer_info: {
          name: "Ram Bahadur",
          email: "test@khalti.com",
          phone: "9800000001",
        },
      }),
    };

    const response = await request(options);
    const responseObj = await JSON.parse(response);
    const donationInitializedResponse =
      await this.findAndUpdateDonationInitialize({
        donationId: donation._id,
        pidx: responseObj["pidx"],
      });

    const campaign = await campaignRepo.getCampaignById(body._id);
    const resultForFrontend = {
      responseFromKhalti: response,
      campaign: campaign,
      donationAmount: body.donationAmount,
    };

    return resultForFrontend;
  }

  async findAndUpdateDonationInitialize(data: donationInitializeUpdateData) {
    return donationRepo.updateDonationInitialize(data);
  }

  async handlePayment(req:CustomRequest) {
    const query = req.query;
    console.log("query", query);
    // Get specific values
    const pidx = query.pidx;

    const transactionId = query.transaction_id;
    const amount = query.amount;
    const status = query.status;

    if (status === "Completed") {
      const updatedDonation = await donationRepo.updateDonationCompleted;
      return updatedDonation;
    } else {
     throw createError(400, PLAIN_RESPONSE_MSG.serverError)
    }
  }
}

const donationSvc = new DonationService();
export default donationSvc;
