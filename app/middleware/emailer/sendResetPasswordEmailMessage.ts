import i18n from 'i18n';
import { IForgotPassword } from '../../models/forgotPassword';
import { IUser } from '../../models/user';
import prepareToSendEmail from './prepareToSendEmail';

/**
 * Sends reset password email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendResetPasswordEmailMessage = (
  locale: string,
  user: IForgotPassword
) => {
  i18n.setLocale(locale);
  const subject = i18n.__('forgotPassword.SUBJECT');
  const htmlMessage = i18n.__(
    'forgotPassword.MESSAGE',
    user.email,
    process.env.FRONTEND_URL || '',
    user.verification || ''
  );
  prepareToSendEmail(user as IUser, subject, htmlMessage);
};

export default sendResetPasswordEmailMessage;
