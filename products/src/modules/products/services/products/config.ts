import { IProduct } from "../../interfaces/product.interfaces";
import { formatName } from "../../../../utils/formatName";
import { formatToCode } from "../../../../utils/formatToCode";

export const searchFields = ["name", "code"];

export const select = {
  id: true,
  name: true,
  code: true,
  price: true,
  createdAt: true,
  updatedAt: true,
}

export const data = async (input: IProduct) => ({
  name: formatName(input.name),
  code: formatToCode(input.name),
  price: input.price,
});

export const updateData = async (data: Pick<IProduct, 'id'> & Partial<IProduct>) => {
  const updateData: any = {};

  if (data.name) {
    updateData.name = formatName(data.name);
    updateData.code = formatToCode(data.name);
  }
  if (data.price !== undefined) updateData.price = data.price

  return updateData;
};

export const filterData = (filter: Partial<IProduct>) => {
  const filters: any[] = [];

  for (const key in select) {
    const value = filter[key as keyof typeof filter];

    if (value !== undefined) {
      if (key === "name") {
        filters.push({ code: formatToCode(value as string) });
      } else {
        filters.push({ [key]: value });
      }
    }
  }

  return filters;
};