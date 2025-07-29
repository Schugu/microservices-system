import { z } from "zod";

export const uuid = z.string({
  invalid_type_error: "El campo debe ser de tipo string.",
  required_error: "El campo es requerido."
}).uuid({ message: "El campo debe ser un UUID válido." })

