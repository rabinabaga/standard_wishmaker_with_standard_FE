import CampaignModel from "../models/campaign.model";

import {
  createDonationWithDonorId,
  donationCompletedData,
  donationInitializeUpdateData,
} from "../interfaces/donation.interface";
import DonationModel from "../models/donation.model";
class DonationRepository {
  async createDonation(data: createDonationWithDonorId) {
    const donationInstance = new DonationModel(data);
    const donationData = await donationInstance.save();
    return donationData;
  }

  async updateDonationInitialize(data: donationInitializeUpdateData) {
    return DonationModel.findByIdAndUpdate(
      data.donationId,
      {
        $set: {
          pidx: data.pidx,
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation on the updated document
        // Omit undefined fields from the update
      }
    );
  }

  async updateDonationCompleted(data: donationCompletedData) {
    return DonationModel.findOneAndUpdate(
      { pidx: data.pidx }, // Filter criteria
      { $set: { transactionId: data.transactionId, status: "COMPLETED" } }, // Update operation
      { new: true } // Options: `new: true` returns the updated document
    );
  }

  async getDonationsPerDay() {
    return DonationModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalDonations: { $sum: "$donationAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  }
}
const donationRepo = new DonationRepository();
export default donationRepo;
