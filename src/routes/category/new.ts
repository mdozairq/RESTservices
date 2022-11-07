import express, { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { ProductAttr, StatusCode } from "../../interfaces";
import { body } from "express-validator";
import { Categories, CategoryAttr } from "../../models/categories";
import { Products } from "../../models/products";

const router = express.Router();

router.post(
  "/category/new",
  [
    body("categoryName")
      .not()
      .isEmpty()
      .withMessage("categoryName must be required."),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName, childCategory, product } = req.body;
    let existingChildCategory, existingProduct;
    let existingCategory = await Categories.findOne({
      categoryName: categoryName,
    });
    if (existingCategory) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: `${categoryName} already exist` });
    }

    if (childCategory) {
      existingChildCategory = await Categories.findOne({
        categoryName: childCategory,
      });
      if (!existingChildCategory)
        return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `${childCategory} doesn't exist` });
    }
    if (product) {
      existingProduct = await Products.findOne({
        productName: product,
      });
      if (!existingProduct)
        return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `${product} doesn't exist` });
    }
    try {
      const category = await Categories.create({ categoryName });
      category.childCategories?.push(childCategory);
      category.products?.push(existingProduct?._id);
      await category.save();
      return res
        .status(StatusCode.CREATED)
        .send({ message: `New Category ${categoryName} created`, category });
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Iternal Server Error" });
    }
  }
);

export { router as newCategoriesRouter };
