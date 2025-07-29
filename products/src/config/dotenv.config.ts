import dotenv from "dotenv";
import { validateEnv } from "../utils/validateEnv";

dotenv.config();

export const PORT = parseInt(process.env.PORT ?? "8080", 10);
export const HOST = validateEnv("HOST", process.env.HOST);
export const CORS_ORIGIN = validateEnv("CORS_ORIGIN", process.env.CORS_ORIGIN);
export const DATABASE_URL = validateEnv("DATABASE_URL", process.env.DATABASE_URL);
export const BASE_DIR = validateEnv("BASE_DIR", process.env.BASE_DIR);
export const NODE_ENV = validateEnv('NODE_ENV',process.env.NODE_ENV);





