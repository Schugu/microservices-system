import express from "express";
import { validateSchema, validateSchemaPartial } from "../../../middlewares/validateSchema";
import { productSchema } from "../schemas/product.schema";
import * as controller from "../controllers/products";

export const productRoutes = express.Router();

productRoutes.post("", validateSchema(productSchema), controller.create);
productRoutes.post("/filters", validateSchemaPartial(productSchema), controller.getByFilters);
productRoutes.get("", controller.getAll);
productRoutes.get("/:id", controller.getById);
productRoutes.patch("/:id", validateSchemaPartial(productSchema), controller.editById);
productRoutes.delete("/:id", controller.deleteById);
