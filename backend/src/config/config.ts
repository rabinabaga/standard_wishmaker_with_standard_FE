const PRODUCTION_ENV = "production";
const STAGING_ENV = "staging";

export const DB_SECRET = {
  DB_URI: "mongodb+srv://rabinabaga:1612ten@cluster0.fyh6ucm.mongodb.net/",
  DB_NAME: "wishmaker",
};

export const AUTH_COOKIE_CONFIG = {
  adminAccessToken: "real-state-admin-access-token",
  adminRefreshToken: "real-state-admin-refresh-token",
  adminAccessTokenMaxAge: 1000 * 60 * 60,
  adminRefreshTokenMaxAge: 1000 * 60 * 60 * 24,
  userAccessToken: "user-access-token",
  userRefreshToken: "user-refresh-token",
  userAccessTokenMaxAge: 1000 * 60 * 60,
  userRefreshTokenMaxAge: 1000 * 60 * 60 * 24,
};

 export const JWT_SECRET_KEY = {
   refreshTokenPrivateKey: "thisisrefreshtokenkey",
   accessTokenPrivateKey:"thisisaccesstokenkey"
 };

export const EMAIL_CONFIG = {
  emailServer: "sandbox.smtp.mailtrap.io", //host
  emailPort: 2525, //port
  emailServerUsername: "2b5dae739691e0",
  emailServerPassword: "dc7c53da038f23",
  // emailSecure: true,
};

export const saltWorkFactor = 10;

export const BASE_ADMIN_URL = ((env) => {
  switch (env) {
    case PRODUCTION_ENV:
      return "https://panel.pokharauae.com";
    case STAGING_ENV:
      return "https://panel.pokharauae.com";
    default:
      return "http://localhost:3001";
  }
})(process.env.ENV);

export const BASE_USER_URL = ((env) => {
  switch (env) {
    case PRODUCTION_ENV:
      return "https://localhost:3000";
    case STAGING_ENV:
      return "https://localhost:3000";
    default:
      return "http://localhost:3002";
  }
})(process.env.ENV);
