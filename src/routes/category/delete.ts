import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { StatusCode } from "../../interfaces";
import { Categories, CategoryAttr } from "../../models/categories";

const router = express.Router();

router.delete("/category/delete/:id", async (req: Request, res: Response) => {
  let category = await Categories.findByIdAndDelete(req.params.id);
  if (!category) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .send({ message: `Category not Found.` });
  }
  try {
    return res
      .status(StatusCode.OK)
      .send({ message: `Category deleted with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
    return res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Iternal Server Error" });
  }
});

export { router as deleteCategoriesRouter };
