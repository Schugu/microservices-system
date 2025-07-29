import { z } from "zod";
import * as validator from "../../../utils/validators/index";

export const productSchema = z.object({
  name: validator.string(1, 100),
  price: validator.float(0.1)
}).strict();

