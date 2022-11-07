import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { StatusCode } from "../../interfaces";
import { Products } from "../../models/products";
import { body, param } from "express-validator";
import { Variants } from "../../models/variants";

const router = express.Router();

router.put(
  "/product/edit/:id",
  [
    body("productName")
      .not()
      .isEmpty()
      .withMessage("categoryName must be required."),
    param("id").not().isEmpty().withMessage("id in params must be required."),
  ],
  async (req: Request, res: Response) => {
    const { productName, description, productImageUrl, variant } = req.body;
    let existingVariant;
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `${productName} not found with id ${req.params.id}` });
    }
    if (variant) {
      existingVariant = await Variants.findOne({
        variantName: variant,
      });
      if (!existingVariant)return res
      .status(StatusCode.BAD_REQUEST)
      .send({ message: `${variant} doesn't exist` });
    }
    product.productName = productName;
    product.description = description;
    product.productImageUrl = productImageUrl;
    product.childVariant?.push(existingVariant?._id);
    try {
      await product.save();
      return res
        .status(StatusCode.ACCEPTED)
        .send({ message: `product ${productName} updated`, product });
    } catch (error) {
      console.log(error);
      return res
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({ message: "Iternal Server Error" });
    }
  }
);

export { router as editProductsRouter };
