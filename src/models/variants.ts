import mongoose, { Document, Schema, model } from "mongoose";

interface VariantAttr {
  mrp: number;
}

export interface VariantDoc extends Document {
  mrp: number;
  variantName?: string;
  discountPrice?: number;
  size?: string;
  colour?: string;
}

export const variantSchema = new Schema(
  {
    mrp: {
      type: Number,
      required: true,
    },
    variantName: {
      type: String,
      required: false,
    },
    discountPrice: {
      type: Number,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    colour: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const Variants = model<VariantDoc>("variants", variantSchema);
