import i18n from "i18n";
import { IUser } from "../../models/user";
import prepareToSendEmail from "./prepareToSendEmail";

/**
 * Sends reset password email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendResetPasswordEmailMessage = (locale: string, user: IUser) => {
  i18n.setLocale(locale);
  const subject = i18n.__("forgotPassword.SUBJECT");
  const htmlMessage = i18n.__(
    "forgotPassword.MESSAGE",
    user.email,
    process.env.FRONTEND_URL || "",
    user.verification || ""
  );
  prepareToSendEmail(user, subject, htmlMessage);
};

export default sendResetPasswordEmailMessage;
