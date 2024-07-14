// const GamePlanModel = require("./game_plan.model");
import { Request } from "express";
import { UserModel } from "../models/user.model";
import userRepo from "../repositories/user.repository";
import {
  UserFromDb,
  UserFromDbDuringRegister,
  createUser,
  errObject,
  loginGoogleUser,
  loginUser,
} from "../interfaces/user.interface";
import { get, omit } from "lodash";


import createError from "../utils/http.error";
import { PLAIN_RESPONSE_MSG } from "../constant/error";
import {
  AUTH_COOKIE_CONFIG,
  BASE_ADMIN_URL,
  BASE_USER_URL,
} from "../config/config";
import { getValue, removeKey } from "../utils/object";
import EmailService from "./email.service";
import { generateRandomString } from "../utils/math-related";
import { compareHash } from "../utils/bcrypt";
import { generateAuthTokens } from "../utils/jwt";
import verifyGoogleToken from "../utils/verify-google-login";
import { TokenPayload } from "google-auth-library";

class UserService {
  async findOneByEmail(email: string): Promise<UserFromDb | null> {
    const userFromDb: UserFromDb = await userRepo.findOneByEmail(email);
    if (!userFromDb) {
      return null;
    }
    return userFromDb;
  }

  async createUser(body: createUser): Promise<any> {
    const oldUser = await this.findOneByEmail(body.email);

    if (oldUser === null) {
      console.log("here");
      const tokennew = generateRandomString(20);
      const {
        email,
        password,
        firstName,
        lastName,
        token,
      }: UserFromDbDuringRegister = await userRepo.createUser({
        ...body,
        token: tokennew,
      });
      let baseUrl = BASE_USER_URL;

      await EmailService.sendAccountCreationEmailToUser({
        email,
        baseUrl,
        token,
      });
    } else {
      throw createError(409, PLAIN_RESPONSE_MSG.emailAlreadyExists);
    }
  }

  async loginUser(body: loginUser): Promise<any> {
    const oldUser = await this.findOneByEmail(body.email);

    if (oldUser === null) {
      throw createError(403, PLAIN_RESPONSE_MSG.invalidAuth);
    } else {
      const hasSamePassword = await compareHash(
        body.password,
        oldUser.password
      );
      if (hasSamePassword) {
        const { refreshToken, accessToken } = generateAuthTokens(oldUser._id);
        return { refreshToken, accessToken };
      } else {
        throw createError(403, PLAIN_RESPONSE_MSG.invalidCredentials);
      }
    }
  }

  
  async loginGoogleUser(body: loginGoogleUser ):Promise<void>{
    const verificationResponse: errObject | TokenPayload | undefined =
      await verifyGoogleToken(body.credential);

    // Type guard to check if an object is an ErrObject
    function isErrObject(obj: any): obj is errObject {
      return (obj as errObject).error !== undefined;
    }

    if (verificationResponse !== undefined) {
     if (isErrObject(verificationResponse)) {
           throw createError(401, PLAIN_RESPONSE_MSG.invalidToken);
     }
      const profile = verificationResponse;
      console.log("profile", profile.email);
      
    }

   
  }
  async verifyUser(token: string) {
    const user = await userRepo.findOneByToken(token);
    if (user === null) {
      throw createError(401, PLAIN_RESPONSE_MSG.invalidToken);
    } else {
      await userRepo.updateUserStatus(user._id);
      const userData = await userRepo.removeTokenFromUser(user._id);
      
      const updatedUserData = removeKey(userData.toObject(), "password");
      return updatedUserData;
    }
  }

  //   try {
  //     const game_plans = await GamePlanModel.find(filter);
  //     console.log("game plans", game_plans);
  //     return game_plans;
  //   } catch (exception) {
  //     throw exception;
  //   }
  // };
  // deleteGamePlan = async (req) => {
  //   const filter = { _id: req.params.id };
  //   try {
  //     const res = await GamePlanModel.deleteOne(filter);
  //     console.log("response of delete", res, filter, res.deletedCount);
  //     return res;
  //   } catch (exception) {
  //     throw exception;
  //   }
  // };
}

const userSvc = new UserService();
export default userSvc;
