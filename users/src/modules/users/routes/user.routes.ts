import express from "express";
import { validateSchema, validateSchemaPartial } from "../../../middlewares/validateSchema";
import { userSchema } from "../schemas/user.schema";
import * as controller from "../controllers/users";

export const userRoutes = express.Router();

userRoutes.post("", validateSchema(userSchema), controller.create);
userRoutes.post("/filters", validateSchemaPartial(userSchema), controller.getByFilters);
userRoutes.get("", controller.getAll);
userRoutes.get("/:id", controller.getById);
userRoutes.patch("/:id", validateSchemaPartial(userSchema), controller.editById);
userRoutes.delete("/:id", controller.deleteById);
