import CampaignModel from "./campaign.model";
import UserModel from "./user.model";
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IDonation extends Document {
  campaignId: mongoose.Types.ObjectId;
  donationAmount: number;
  transactionId: string;
  donorId: mongoose.Types.ObjectId;
  pidx: string; // or you can use the User interface/model here
  status: "PENDING" | "COMPLETED";
  createdAt?: Date;
  updatedAt?: Date;
}

const DonationSchema: Schema <IDonation> = new mongoose.Schema(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    donationAmount: {
      type: Number,
      required: true,
      min: 2,
      max: 2000000,
    },
    transactionId: {
      type: String,
      min: 2,
      max: 2000000,
    },
    pidx: {
      type: String,
      min: 2,
      max: 2000,
    },
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
    // collection: "authUsers"
  }
);

// users => authusers
const DonationModel:Model<IDonation> = mongoose.model<IDonation>("Donation", DonationSchema);
export default DonationModel;
