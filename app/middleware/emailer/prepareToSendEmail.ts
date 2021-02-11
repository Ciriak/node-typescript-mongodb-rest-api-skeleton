import { IUser } from "../../models/user";

import sendEmail from "./sendEmail";

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = (
  user: IUser,
  subject: string = "",
  htmlMessage: string = ""
) => {
  const parsedUser = {
    name: user.name,
    email: user.email,
    verification: user.verification,
  };
  const data = {
    parsedUser,
    subject,
    htmlMessage,
  };
  if (process.env.NODE_ENV === "production") {
    sendEmail(data, (messageSent) =>
      messageSent
        ? console.log(`Email SENT to: ${parsedUser.email}`)
        : console.log(`Email FAILED to: ${parsedUser.email}`)
    );
  } else if (process.env.NODE_ENV === "development") {
    console.log(data);
  }
};

export default prepareToSendEmail;
