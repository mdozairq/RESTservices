import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { StatusCode } from "../../interfaces";
import { Variants } from "../../models/variants";
import { body, param } from "express-validator";

const router = express.Router();

router.put(
  "/variant/edit/:id",
  [
    body("mrp").not().isEmpty().withMessage("mrp must be required."),
    param("id").not().isEmpty().withMessage("id in params must be required."),
  ],
  async (req: Request, res: Response) => {
    const { mrp, variantName, discountPrice, size, colour } = req.body;
    let variant = await Variants.findById(req.params.id);
    if (!variant) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: `${variantName} not found with id ${req.params.id}` });
    }
    variant.variantName = variantName;
    variant.mrp = mrp;
    variant.discountPrice = discountPrice;
    variant.size = size;
    variant.colour = colour;
    try {
      await variant.save();
      return res
        .status(StatusCode.ACCEPTED)
        .send({ message: `variant ${variantName} updated`, variant });
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Iternal Server Error" });
    }
  }
);

export { router as editVariantsRouter };
