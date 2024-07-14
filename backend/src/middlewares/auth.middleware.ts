import { type NextFunction, type Response } from "express";

import { AUTH_COOKIE_CONFIG, JWT_SECRET_KEY } from "../config/config";
import {generateAccessToken, generateAuthTokens, verifyAccessToken, verifyRefreshToken} from "../utils/jwt";
import { type CustomRequest } from "../types/auth.type";
import { getValue } from "../utils/object";
import createError from "../utils/http.error";
import { PLAIN_RESPONSE_MSG } from "../constant/error";
import { checkIfEmpty } from "../utils/validation";
import UserService from "../services/auth.service";
import userRepo from "../repositories/user.repository";

export const authenticationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const accessToken = getValue(req.cookies, AUTH_COOKIE_CONFIG.userAccessToken);
  const refreshToken = getValue(
    req.cookies,
    AUTH_COOKIE_CONFIG.userRefreshToken
  );

  try {
    if (checkIfEmpty(accessToken) && checkIfEmpty(refreshToken)) {
      throw createError(401, PLAIN_RESPONSE_MSG.unAuthenticated);
    }

    const { payload } = verifyAccessToken(
      accessToken,
      JWT_SECRET_KEY.accessTokenPrivateKey
    );

    if (payload === null) {
      const { refreshPayload } = verifyRefreshToken(
        refreshToken,
        JWT_SECRET_KEY.refreshTokenPrivateKey
      );

      if (refreshPayload === null) {
        // removing cookie from browser i refresh token is also invalid
        res.clearCookie(AUTH_COOKIE_CONFIG.userAccessToken);
        res.clearCookie(AUTH_COOKIE_CONFIG.userRefreshToken);
      }

      // if refresh token is valid
      const newAccessToken = generateAccessToken(
        refreshPayload.id,
        JWT_SECRET_KEY.accessTokenPrivateKey
      );

      req.user = refreshPayload.id;

      res.cookie(AUTH_COOKIE_CONFIG.userAccessToken, newAccessToken, {
        // httpOnly: false,
        secure: req.secure,
        sameSite: "lax",
        maxAge: AUTH_COOKIE_CONFIG.userAccessTokenMaxAge,
      });
    } else {
      req.user = payload.id;
    }
    next();
  } catch (error) {
    next(error);
  }
};

// export const authenticateAdminRoutes = (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const accessToken = getValue(
//     req.cookies,
//     AUTH_COOKIE_CONFIG.adminAccessToken
//   );
//   const refreshToken = getValue(
//     req.cookies,
//     AUTH_COOKIE_CONFIG.adminRefreshToken
//   );

//   try {
//     if (checkIfEmpty(accessToken) && checkIfEmpty(refreshToken)) {
//       throw createError(401, PLAIN_RESPONSE_MSG.unAuthenticated);
//     }

//     const { payload } = verifyAccessToken(
//       accessToken,
//       JWT_SECRET_KEY.accessTokenPrivateKey
//     );

//     if (payload === null) {
//       const { refreshPayload } = verifyRefreshToken(
//         refreshToken,
//         JWT_SECRET_KEY.refreshTokenPrivateKey
//       );

//       if (refreshPayload === null) {
//         // removing cookie from browser i refresh token is also invalid
//         res.clearCookie(AUTH_COOKIE_CONFIG.adminAccessToken);
//         res.clearCookie(AUTH_COOKIE_CONFIG.adminRefreshToken);
//       }

//       // if refresh token is valid
//       const newAccessToken =generateAccessToken(
//         refreshPayload.id,
//         JWT_SECRET_KEY.accessTokenPrivateKey
//       );

//       req.user = refreshPayload.id;

//       res.cookie(AUTH_COOKIE_CONFIG.adminAccessToken, newAccessToken, {
//         // httpOnly: false,
//         secure: req.secure,
//         sameSite: "lax",
//         maxAge: AUTH_COOKIE_CONFIG.adminAccessTokenMaxAge,
//       });
//     } else {
//       req.user = payload.id;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// export const validateAdmin = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { user } = req;
//   if (!user) {
//     throw createError(401, PLAIN_RESPONSE_MSG.unAuthenticated);
//   }

//   try {
//     const userDetails = await userRepo.getUserById(user);
//     if (checkIfEmpty(userDetails)) {
//       throw createError(401, PLAIN_RESPONSE_MSG.unAuthenticated);
//     }

//     if (!userDetails?.isAdmin) {
//       throw createError(403, PLAIN_RESPONSE_MSG.unAuthorized);
//     }


//     next();
//   } catch (error) {
//     next(error);
//   }
// };
