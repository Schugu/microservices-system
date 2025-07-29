import { z } from "zod";

export const isoDate = z.string({
  invalid_type_error: "El campo debe ser de tipo string.",
  required_error: "El campo es requerido."
})
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, {
    message: "La fecha debe tener el formato ISO-8601 completo.",
  })
  .refine(dateStr => !isNaN(new Date(dateStr).getTime()), {
    message: "Fecha inválida",
  });
