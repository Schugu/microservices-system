import { Router } from "express";
import { productsRoutes } from "../modules/products/routes";

export const mainRoutes = Router();

mainRoutes.use("", productsRoutes);