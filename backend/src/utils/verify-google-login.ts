import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import {errObject} from "../interfaces/user.interface"

const client = new OAuth2Client(
  "14292226212-4grdaa9mlss9plc3kf0f92oqqhcr67ej.apps.googleusercontent.com"
);

async function verifyGoogleToken(
  token: string
): Promise<TokenPayload | undefined | errObject> {
  try {
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken: token,
      audience:
        "14292226212-4grdaa9mlss9plc3kf0f92oqqhcr67ej.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
    });
    console.log("ticket", ticket);
    const payload: TokenPayload | undefined = ticket.getPayload();
    return payload;
  } catch (error) {
    console.log("Error verifying Google ID token:", error);
    return { error: "Invalid user detected. Please try again" };
  }
}

export default verifyGoogleToken
