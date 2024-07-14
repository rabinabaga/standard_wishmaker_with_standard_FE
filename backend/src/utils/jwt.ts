import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
export const generateAccessToken = (
  userId: string,
  secretKey: string
): string => {
  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: "1d",
  });
  return token;
};

export const generateRefreshToken = (
  userId: string,
  secretKey: string
): string => {
  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: "1d",
  });
  return token;
};

export const generateAuthTokens = (userId: any) => {
  const accessToken = generateAccessToken(
    userId,
    JWT_SECRET_KEY.accessTokenPrivateKey
  );
  const refreshToken = generateRefreshToken(
    userId,
    JWT_SECRET_KEY.refreshTokenPrivateKey
  );
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (
  accessToken: string,
  secretKey: string
): any => {
  try {
    const decoded = jwt.verify(accessToken, secretKey) as JwtPayload;
    return { payload: decoded, expired: false };
  } catch (error: any) {
    console.log("verify access token", error);

    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};

export const verifyRefreshToken = (
  refreshToken: string,
  secretKey: string
): any => {
  try {
    const docoded = jwt.verify(refreshToken, secretKey) as JwtPayload;
    return { refreshPayload: docoded, expired: false };
  } catch (error: any) {
    console.log("error in verify refresh token", error);

    return {
      refreshPayload: null,
      epxired: error.message.includes("jwt expired"),
    };
  }
};
