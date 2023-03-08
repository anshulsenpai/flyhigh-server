import { Schema, model } from 'mongoose';
import validator from "validator"
import { IUser } from '../interfaces/interfaces';


const userSchema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email address',
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'any'),
      message: 'Invalid phone number',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isStrongPassword(value),
      message: 'Password is not strong enough',
    },
  },
  address: { type: String, required: true },
  cart: [{ type: String }],
  userType: {
    type: String,
    default: "member"
  },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export default model<IUser>('User', userSchema);
