import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
const sendEmail = async (data: any, callback: (arg0: boolean) => void) => {
  const transporter = nodemailer.createTransport(
    mg({
      auth: {
        api_key: process.env.EMAIL_SMTP_API_MAILGUN || "",
        domain: process.env.EMAIL_SMTP_DOMAIN_MAILGUN || "",
      },
    })
  );
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: `${data.user.name} <${data.user.email}>`,
    subject: data.subject,
    html: data.htmlMessage,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return callback(false);
    }
    return callback(true);
  });
};

export default sendEmail;
