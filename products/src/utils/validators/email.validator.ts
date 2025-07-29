import { z } from "zod";

export const email =
  z.string({
    invalid_type_error: "El campo debe ser de tipostring",
    required_error: "El campo es requerido."
  })
    .trim()
    .toLowerCase()
    .email({
      message: "Debes ingresar un correo electronico válido..."
    })

