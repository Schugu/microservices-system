import express from "express";
import { userRoutes } from "./user.routes";

export const usersRoutes = express.Router();

usersRoutes.use("", userRoutes);
