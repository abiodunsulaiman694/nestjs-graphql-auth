import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      lowercase: true,
      maxlength: 50,
    },
    email: {
      type: String,
      lowercase: true,
      maxlength: 200,
      required: true,
      trim: true,
      unique: true,
    },
    imageUrl: String,
    password: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      lowercase: true,
      maxlength: 50,
    },
    bio: {
      type: String,
      lowercase: true,
      maxlength: 500,
    },
    role: {
      type: String,
      role: ['Pastor', 'Leader', 'Member'],
      default: 'Member',
    },
  },
  { timestamps: true },
);
