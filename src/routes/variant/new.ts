import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { StatusCode, VariantAttr } from "../../interfaces";
import { Variants } from "../../models/variants";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/variant/new",
  [body("mrp").not().isEmpty().withMessage("mrp must be required.")],
  async (req: Request, res: Response) => {
    const { mrp, variantName, discountPrice, size, colour } = req.body;
    let existingVariant = await Variants.findOne({ variantName: variantName });
    if (existingVariant) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: `${variantName} already exist` });
    }
    try {
      let variant = await Variants.create(req.body as VariantAttr);
      return res
        .status(StatusCode.CREATED)
        .send({ message: `New variant ${variantName} created`, variant });
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Iternal Server Error" });
    }
  }
);

export { router as newVariantsRouter };
