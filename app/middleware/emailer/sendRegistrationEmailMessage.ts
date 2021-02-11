import { IUser } from "../../models/user";
import i18n from "i18n";
import prepareToSendEmail from "./prepareToSendEmail";

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendRegistrationEmailMessage = (locale: string, user: IUser) => {
  i18n.setLocale(locale);
  const subject = i18n.__("registration.SUBJECT");
  const htmlMessage = i18n.__(
    "registration.MESSAGE",
    user.name,
    process.env.FRONTEND_URL || "",
    user.verification || ""
  );
  prepareToSendEmail(user, subject, htmlMessage);
};

export default sendRegistrationEmailMessage;
