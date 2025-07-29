import { Router } from "express";
import { usersRoutes } from "../modules/users/routes";

export const mainRoutes = Router();

mainRoutes.use("", usersRoutes);