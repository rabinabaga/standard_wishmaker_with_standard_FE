import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

import sendEmail from "../utils/email";
import { BASE_USER_URL } from "../config/config";

const createHTMLToSend = (pathName: string, replacements: any): string => {
  const html = fs.readFileSync(pathName, {
    encoding: "utf-8",
  });
  const template = Handlebars.compile(html);

  const htmlToSend = template(replacements);


  return htmlToSend;
};

const sendWelcomeEmailToCustomer = async ({
  email,
  user,
  baseUrl,
  password,
}: {
  email: string;
  baseUrl: string;
  user: any;
  password: string;
}): Promise<void> => {
  const subject =
    "Welcome to 4EverLending USA – Let's Get Started on Your Home Buying Journey!";
  const loginUrl = `${baseUrl}/account-creation/?email=${email}&passwd=${password}`;

  const pathName = path.join(
    __dirname,
    "../templates/email/customer-welcome.html"
  );
  const html = createHTMLToSend(pathName, {
    loginUrl,
    userFirstName: user.firstName,
  });

  await sendEmail({
    to: email,
    subject,
    html,
    text: "",
  });
};

const sendWelcomeEmailToAgent = async ({
  email,
  user,
  baseUrl,
  password,
}: {
  email: string;
  baseUrl: string;
  user: any;
  password: string;
}): Promise<void> => {
  const subject =
    "Welcome to 4EverLending USA – Start Listing and Selling Your Properties Today!";
  const loginUrl = `${baseUrl}/account-creation/?email=${email}&passwd=${password}`;

  const pathName = path.join(
    __dirname,
    "../templates/email/agent-welcome.html"
  );
  const html = createHTMLToSend(pathName, {
    loginUrl,
    agentFirstName: user.firstName,
  });

  await sendEmail({
    to: email,
    subject,
    html,
    text: "",
  });
};

const sendPasswordResetRequestEmail = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<void> => {
  const subject = "Password Reset Request";
  const resetPasswordUrl = `${BASE_USER_URL}/reset-password/?email=${email}&code=${code}`;
  const message = `Please copy and paste this url [${resetPasswordUrl}] to reset your email. If you had not used the email, you can safely ignore this message.`;

  const pathName = path.join(
    __dirname,
    "../templates/email/password-reset-email.html"
  );
  const html = createHTMLToSend(pathName, { resetPasswordUrl, email });

  await sendEmail({
    to: email,
    subject,
    html,
    text: message,
  });
};

const sendAccountCreationEmailToUser = async ({
  email,
  token,
  baseUrl,
}: {
  email: string;
  token: string;
  baseUrl: string;
}): Promise<void> => {
  const subject = "Account Creation";
  
  
  const verificationUrl = `${baseUrl}/account-creation/?email=${email}&token=${token}`;
  const message = `Please copy and paste this url [${verificationUrl}] to verify your email. If you had not used the email, you can safely ignore this message.`;

  const pathName = path.join(__dirname, "../templates/email/verify-email.html");
  const html = createHTMLToSend(pathName, { verificationUrl, email });

  await sendEmail({
    to: "tarinaresi850@gmail.com",
    subject,
    html,
    text: message,
  });
};

const sendTwoFACodeToEmail = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<void> => {
  const subject = "Verification Code";

  const pathName = path.join(
    __dirname,
    "../templates/email/verification-code.html"
  );
  const html = createHTMLToSend(pathName, { code });

  await sendEmail({
    to: email,
    subject,
    html,
    text: "",
  });
};

const EmailService = {
  sendWelcomeEmailToCustomer,
  sendPasswordResetRequestEmail,
  sendAccountCreationEmailToUser,
  sendTwoFACodeToEmail,
  sendWelcomeEmailToAgent,
};

export default EmailService;
// ({
//   from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//   to: "tarinaresi50@gmail.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// });