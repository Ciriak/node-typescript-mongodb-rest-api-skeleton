import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import mongoosePaginate from 'mongoose-paginate-v2';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  verification?: string;
  verified?: boolean;
  phone?: string;
  city?: string;
  country?: string;
  urlTwitter?: string;
  urlGitHub?: string;
  loginAttempts?: number;
  blockExpires: Date;
  comparePassword(
    passwordAttempt: string,
    callback: (err: Error | null, isMatch?: boolean) => void
  ): void;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    verification: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    urlTwitter: {
      type: String,
      validate: {
        validator(v: string) {
          return v === '' ? true : validator.isURL(v);
        },
        message: 'NOT_A_VALID_URL'
      },
      lowercase: true
    },
    urlGitHub: {
      type: String,
      validate: {
        validator(v: string) {
          return v === '' ? true : validator.isURL(v);
        },
        message: 'NOT_A_VALID_URL'
      },
      lowercase: true
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const hash = (
  user: IUser,
  salt: string,
  next: (err?: mongoose.NativeError | null | undefined) => void
) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    user.password = newHash;
    return next();
  });
};

const genSalt = (
  user: IUser,
  SALT_FACTOR: number | undefined,
  next: (err?: mongoose.NativeError | null | undefined) => void
) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return hash(user, salt, next);
  });
};

UserSchema.pre('save', function (next) {
  const that = this as IUser;
  const SALT_FACTOR = 5;
  if (!that.isModified('password')) {
    return next();
  }
  return genSalt(that, SALT_FACTOR, next);
});

UserSchema.methods.comparePassword = (
  passwordAttempt: string,
  callback: (err: Error | null, isMatch?: boolean) => void
) => {
  bcrypt.compare(passwordAttempt, UserSchema.get('password'), (err, isMatch) =>
    err ? callback(err) : callback(null, isMatch)
  );
};
UserSchema.plugin(mongoosePaginate);
export default mongoose.model<IUser>('User', UserSchema);
