import { z } from "zod";
import * as validator from "../../../utils/validators/index";

export const userSchema = z.object({
  name: validator.string(1, 100),
  username: validator.string(1, 100).toLowerCase(),
  email: validator.email,
  numberPhone: validator.string(1, 20).optional(),
  password: validator.password,
  address: validator.string(1, 100).optional(),
}).strict();