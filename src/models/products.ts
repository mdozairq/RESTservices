import mongoose, { Document, Schema, model } from "mongoose";
import { VariantDoc, variantSchema } from "./variants";

interface ProductAttr {
  productName: string;
}

export interface ProductDoc extends Document {
  productName: string;
  description?: string;
  productImageUrl?: string;
  childVariant?: [VariantDoc];
}

export const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    productImageUrl: {
      type: String,
      required: false,
    },
    childVariant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "variants",
        required: false,
      },
    ],
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

export const Products = model<ProductDoc>("products", productSchema);
