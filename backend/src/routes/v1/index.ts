import { Router } from "express";
const router = Router();
import authRouter from "./auth.router";
import campaignRouter from "./campaign.router";
import donationRouter from "./donation.router";

router.use("/auth", authRouter);

router.use("/campaign", campaignRouter);

router.use("/donation", donationRouter);



export default router;
