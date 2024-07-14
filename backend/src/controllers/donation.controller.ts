import { type Request, type Response, type NextFunction } from "express";
import { CustomRequest, MulterRequest } from "../types/auth.type";
import { DynamicMessages, PLAIN_RESPONSE_MSG } from "../constant/error";
import donationSvc from "../services/donation.service";

class DonationController {
  async register(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await donationSvc.createDonation({
        ...req.body,
        _id: req.user,
      });

      res.status(200).json({
        message: DynamicMessages.createMessage("Donation "),
        data: response,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async handlePayment(req: CustomRequest,
    res: Response,
    next: NextFunction) {
   
   try{
     // Extract query parameters from the request
    const response = await donationSvc.handlePayment(req);
    console.log("response in handle data", response);
    const data = {
      result: { donationData: response },
      meta: null,
      msg: "donation successful" 
    };
    res.redirect("http://localhost:3000/home");
   }catch(error){
    next(error);
   }
  }
}

const donationCtrl = new DonationController();
export default donationCtrl;
