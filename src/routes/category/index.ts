import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { Categories } from "../../models/categories";
import { StatusCode } from "../../interfaces";

const router = express.Router();

router.get("/category/index", async (req: Request, res: Response) => {
  let allCategory = await Categories.find().populate("products");
  if (!allCategory) {
    return res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `Categories not Found.` });
  }
  return res.status(StatusCode.OK).send({ allCategory });
});

export { router as indexCategoriesRouter };
