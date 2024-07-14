export interface createCampaign {
  campaignTitle: string;
  goalAmount: string;
  filename: string;
  _id: string;
  status?: string;
}

export interface createCampaignWithCampaignerId {
  campaignTitle: string;
  goalAmount: string;
  imageSrc: string;
  campaigner_id: string;
  status?: string;
}
