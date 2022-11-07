import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { StatusCode } from "../../interfaces";
import { Variants } from "../../models/variants";

const router = express.Router();

router.get("/variant/index", async (req: Request, res: Response) => {
  let allVariant = await Variants.find();
  if (!allVariant) {
    return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `Variants not Found.` });
  }
  return res.status(StatusCode.OK).send({ allVariant });
});

export { router as indexVariantsRouter };
