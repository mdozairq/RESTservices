import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { indexCategoriesRouter } from "./routes/category";
import { newCategoriesRouter } from "./routes/category/new";
import { editCategoriesRouter } from "./routes/category/edit";
import { deleteCategoriesRouter } from "./routes/category/delete";
import { NotFoundError } from "./errors/not-found-error";
import { indexProductsRouter } from "./routes/product";
import { newProductsRouter } from "./routes/product/new";
import { editProductsRouter } from "./routes/product/edit";
import { deleteProductsRouter } from "./routes/product/delete";
import { indexVariantsRouter } from "./routes/variant";
import { newVariantsRouter } from "./routes/variant/new";
import { editVariantsRouter } from "./routes/variant/edit";
import { deleteVariantsRouter } from "./routes/variant/delete";

const App = express();
App.set("trust proxy", true);
App.use(json());


//categories routers
App.use(indexCategoriesRouter);
App.use(newCategoriesRouter);
App.use(editCategoriesRouter);
App.use(deleteCategoriesRouter);

//product routers
App.use(indexProductsRouter);
App.use(newProductsRouter);
App.use(editProductsRouter);
App.use(deleteProductsRouter);

//variant routers
App.use(indexVariantsRouter);
App.use(newVariantsRouter);
App.use(editVariantsRouter);
App.use(deleteVariantsRouter);

//handling route
App.all("*", async (req: Request, res: Response, next: NextFunction) => {
    return next(new NotFoundError());;
});

export { App };
