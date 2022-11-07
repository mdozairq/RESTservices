import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { ProductAttr, StatusCode } from "../../interfaces";
import { body } from "express-validator";
import { Categories, CategoryAttr } from "../../models/categories";
import { ProductDoc, Products } from "../../models/products";

const router = express.Router();

router.put(
  "/category/edit/:id",
  [
    body("categoryName")
      .not()
      .isEmpty()
      .withMessage("categoryName must be required."),
  ],
  async (req: Request, res: Response) => {
    const { categoryName, childCategory, product } = req.body;
    let category = await Categories.findById(req.params.id);
    let existingChildCategory, existingProduct: ProductDoc | null;
    if (!category) {
      return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message:`${categoryName} not found with id ${req.params.id}` });
      
    }
    if (childCategory) {
      existingChildCategory = await Categories.findOne({
        categoryName: childCategory,
      });
      if (!existingChildCategory)
      return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `${childCategory} doesn't exist`});
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
    let newChildCategory: string[] | undefined =
      category.childCategories?.filter((ele) => ele !== childCategory);
    newChildCategory?.push(childCategory);
    category.childCategories = newChildCategory;

    let newProductArray: ProductDoc[] | undefined = category.products?.filter(
      (ele) => ele !== existingProduct!._id
    );
    newProductArray?.push(existingProduct!._id);
    category.products = newProductArray;
    try {
      await category.save();
      return res
        .status(StatusCode.ACCEPTED)
        .send({ message: `Category ${categoryName} updated`, category });
    } catch (error) {
      console.log(error);
      return res
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({ message: "Iternal Server Error" });
    }
  }
);

export { router as editCategoriesRouter };
