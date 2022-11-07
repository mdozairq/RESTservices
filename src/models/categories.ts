import mongoose, { Document, Schema, model } from "mongoose";
import { ProductDoc, productSchema } from "./products";

export interface CategoryAttr {
  categoryName: string;
}

export interface CategoryDoc extends Document {
  categoryName: string;
  childCategories?: string[];
  products?: ProductDoc[];
}

export const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    childCategories: {
      type: [String],
      required: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
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

export const Categories = model<CategoryDoc>("categories", categorySchema);
