import { z } from "zod";

export const float = (minValue?: number, maxValue?: number) => {
  let schema = z.number({
    invalid_type_error: "El campo debe ser un número.",
    required_error: "Este campo es requerido.",
  });

  if (minValue !== undefined) {
    schema = schema.min(minValue, {
      message: `Debe ser al menos ${minValue}.`,
    });
  }

  if (maxValue !== undefined) {
    schema = schema.max(maxValue, {
      message: `No puede ser mayor que ${maxValue}.`,
    });
  }

  return schema;
};
