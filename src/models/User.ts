import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "../interfaces/user";

const User = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dials: [
      {
        dial: String,
        kind: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser & Document>("User", User);
