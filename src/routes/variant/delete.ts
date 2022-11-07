import express, { Request, Response } from "express";
import { Variants } from "../../models/variants";
import { StatusCode } from "../../interfaces";
import { param } from "express-validator";

const router = express.Router();

router.delete(
  "/variant/delete/:id",
  [param("id").not().isEmpty().withMessage("id in params must be required.")],
  async (req: Request, res: Response) => {
    let variant = await Variants.findByIdAndDelete(req.params.id);
    if (!variant) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: `variant not found with id ${req.params.id}` });
    }
    try {
      return res
        .status(201)
        .send({ message: `variant deleted with id ${req.params.id}` });
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Iternal Server Error" });
    }
  }
);

export { router as deleteVariantsRouter };
