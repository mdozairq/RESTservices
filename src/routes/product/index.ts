import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { StatusCode } from "../../interfaces";
import {Products} from "../../models/products"

const router = express.Router();

router.get("/product/index", async (req: Request, res: Response) => {
  let allProduct = await Products.find().populate('childVariant');
  if (!allProduct) {
    return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `Products not Found.` });
  }
  return res.status(StatusCode.OK).send({ allProduct });
});

export { router as indexProductsRouter };
