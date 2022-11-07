import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { StatusCode } from "../../interfaces";
import { Products } from "../../models/products";

const router = express.Router();

router.delete("/product/delete/:id", async (req: Request, res: Response) => {
  let product = await Products.findByIdAndDelete(req.params.id);
  if (!product) {
    return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: `product not found with id ${req.params.id}` });
  }
  try {
    return res
      .status(StatusCode.CREATED)
      .send({ message: `product deleted with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
    return res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Iternal Server Error" });
  }
});


export { router as deleteProductsRouter };
