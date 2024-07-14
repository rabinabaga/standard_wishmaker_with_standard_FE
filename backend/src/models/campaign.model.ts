import mongoose, { Document, Schema, Model } from "mongoose";
import UserModel from "./user.model";

export interface ICampaign extends Document {
  campaignTitle: string;
  goalAmount: number;
  imageSrc: string;
  campaigner_id: mongoose.Types.ObjectId; // or you can use the User interface/model here
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}
const CampaignSchema: Schema<ICampaign> = new mongoose.Schema(
  {
    campaignTitle: {
      type: String,
      required: true,
      min: 2,
      max: 200,
    },
    goalAmount: {
      type: Number,
      required: true,
      min: 2,
      max: 2000000,
    },
    imageSrc: {
      type: String,
      required: true,
      min: 2,
      max: 800,
    },
    campaigner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
    // collection: "authUsers"
  }
);

// Create the model
const CampaignModel: Model<ICampaign> = mongoose.model<ICampaign>('Campaign', CampaignSchema);

export default CampaignModel;