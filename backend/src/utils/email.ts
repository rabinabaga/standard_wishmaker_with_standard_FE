import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../config/config";

interface EmailArgs {
  to: string;
  subject: string;
  from?: string;
  text?: string;
  html?: any;
  attachments?: any;
}

const transporter = nodemailer.createTransport({
  host: EMAIL_CONFIG.emailServer,
  port: EMAIL_CONFIG.emailPort,
  // secure: EMAIL_CONFIG.emailSecure,
  auth: {
    user: EMAIL_CONFIG.emailServerUsername,
    pass: EMAIL_CONFIG.emailServerPassword,
  },
});

// verify connection configuration
// transporter.verify(function (error, success) {
//   if (error != null) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }

// });

const sendEmail = async ({
  to,
  subject,
  html,
  text,
  attachments,
  from = EMAIL_CONFIG.emailServerUsername,
}: EmailArgs): Promise<void> => {

  try {
      const info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });
  } catch (error) {
    console.log("error in send email", error);
    
  }
};

export default sendEmail;
