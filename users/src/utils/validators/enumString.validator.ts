import { z } from "zod";

export const enumString = (values: string[]) =>
  z.string().refine(
    (val) => values.includes(val),
    {
      message: `El campo: debe ser uno de: ${values.join(', ')}`,
    }
  );