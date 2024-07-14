export interface createDonationWithDonorId {
  donationAmount: number;
  campaignId: string;
  donorId: string;
}
export interface createDonation {
  donationAmount: number;
  campaignId: string;
  _id: string;
  status?: string;
}

export interface DonationWithId extends createDonationWithDonorId {
  _id: string;
}

export interface donationInitializeUpdateData {
  donationId: string;
  pidx: string;
}

export interface donationCompletedData {
  pidx: string;
  transactionId: string;
}
