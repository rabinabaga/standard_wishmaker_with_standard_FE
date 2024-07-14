import { UserFromDb } from "../../interfaces/user.interface";
import { UserModel } from "../../models/user.model";
const jwt = require("jsonwebtoken");
import { type Request, type Response, type NextFunction } from "express";
import userSvc from "../../services/auth.service";
import { PLAIN_RESPONSE_MSG } from "../../constant/error";
import { AUTH_COOKIE_CONFIG } from "../../config/config";
import { omit } from "lodash";
import DonationModel from "../../models/donation.model";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await userSvc.createUser(req.body);

     
          
      res.status(200).json({
        message: PLAIN_RESPONSE_MSG.verifyEmailSent,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userSvc.verifyUser(req.params.token);
      res.status(200).json({
        success: true,
        data: data,
        message: "User verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async loginGoogleUser(req: Request, res: Response, next: NextFunction){
    userSvc.loginGoogleUser(req.body.token)
//TODO: return user after saving
    
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = await userSvc.loginUser(req.body);
      res.cookie(AUTH_COOKIE_CONFIG.userAccessToken, accessToken, {
        secure: req.secure,
        sameSite: "lax",
        maxAge: AUTH_COOKIE_CONFIG.userAccessTokenMaxAge,
      });

      res.cookie(AUTH_COOKIE_CONFIG.userRefreshToken, refreshToken, {
        secure: req.secure,
        sameSite: "lax",
        maxAge: AUTH_COOKIE_CONFIG.userRefreshTokenMaxAge,
      });

      res.status(200).json({
        message: PLAIN_RESPONSE_MSG.validLogin,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

const authCtrl = new AuthController();
export default authCtrl;
