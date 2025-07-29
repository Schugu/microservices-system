import { z } from "zod";

export const boolean = z.boolean({
  invalid_type_error: "El campo debe ser de tipo booleano.",
  required_error: "El campo es requerido."
});

