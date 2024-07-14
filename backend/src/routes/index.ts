import { Router } from "express";
const router = Router();
import authRouter from "./v1/auth.router";
import campaignRouter from "./v1/campaign.router";
import donationRouter from "./v1/donation.router";

router.use("/auth", authRouter);

router.use("/campaign", campaignRouter);

router.use("/donation", donationRouter);

export default router;
