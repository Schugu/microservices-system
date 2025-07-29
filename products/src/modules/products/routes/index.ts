import express from "express";
import { productRoutes } from "./product.routes";

export const productsRoutes = express.Router();

productsRoutes.use("", productRoutes);
