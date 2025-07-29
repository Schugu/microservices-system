import { z } from "zod";

export const password = z
  .string({
    invalid_type_error: "El campo debe ser una cadena de texto.",
  })
  .min(6, { message: "Debe tener al menos 6 caracteres." })
  .max(128, { message: "No puede tener más de 128 caracteres." })
  .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula." })
  .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula." })
  .regex(/[0-9]/, { message: "Debe contener al menos un número." })
  .refine(value => !/\s/.test(value), {
    message: "No debe contener espacios en blanco.",
  });