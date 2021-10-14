import mongoose, { Schema, Document } from "mongoose";

import { IContact } from "../interfaces/contact";

const Contact = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
    },
    dials: [
      {
        _id: false,
        kind: { type: String, required: true },
        dial: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IContact & Document>("Contact", Contact);
