import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { Products } from "../../models/products";
import { StatusCode } from "../../interfaces";
import { body } from "express-validator";
import { Variants } from "../../models/variants";

const router = express.Router();

router.post(
  "/product/new",
  [
    body("productName")
      .not()
      .isEmpty()
      .withMessage("categoryName must be required."),
  ],
  async (req: Request, res: Response) => {
    const { productName, description, productImageUrl, variant } = req.body;
    let existingVariant;
    let existingProduct = await Products.findOne({ productName: productName });
    if (existingProduct) {
      return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `${productName} already exist`});
    }
    if (variant) {
      existingVariant = await Variants.findOne({
        variantName: variant,
      });
      if (!existingVariant)
      return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `${variant} doesn't exist` });
    }
    try {
      let product = await Products.create({productName, description, productImageUrl});
      product.childVariant?.push(existingVariant?._id);
      await product.save();
      return res
        .status(StatusCode.CREATED)
        .send({ message: `New product ${productName} created`, product });
    } catch (error) {
      console.log(error);
      return res
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({ message: "Iternal Server Error" });
    }
  }
);

export { router as newProductsRouter };
