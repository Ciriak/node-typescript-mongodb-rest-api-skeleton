import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IUserAccess extends Document {
  email: string;
  ip: string;
  browser: string;
  country: string;
}

const UserAccessSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "EMAIL_IS_NOT_VALID",
      },
      lowercase: true,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default mongoose.model<IUserAccess>("UserAccess", UserAccessSchema);
