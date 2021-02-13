import mongoose, { Document } from 'mongoose';
import validator from 'validator';

export interface IForgotPassword extends Document {
  email: string;
  verification?: string;
  used?: boolean;
  ipRequest?: string;
  browserRequest?: string;
  countryRequest?: string;
  ipChanged?: string | null;
  browserChanged?: string;
  countryChanged?: string;
}

const ForgotPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      required: true
    },
    verification: {
      type: String
    },
    used: {
      type: Boolean,
      default: false
    },
    ipRequest: {
      type: String
    },
    browserRequest: {
      type: String
    },
    countryRequest: {
      type: String
    },
    ipChanged: {
      type: String
    },
    browserChanged: {
      type: String
    },
    countryChanged: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
export default mongoose.model<IForgotPassword>(
  'ForgotPassword',
  ForgotPasswordSchema
);
