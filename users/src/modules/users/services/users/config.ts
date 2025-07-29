import { IUser } from "../../interfaces/user.interfaces";
import { formatName } from "../../../../utils/formatName";
import bcrypt from "bcryptjs";

export const searchFields = ["name", "username", "email", "numberPhone", "refNumberPhone", "address", "neighborhood"];

export const select = {
  id: true,
  name: true,
  username: true,
  email: true,
  numberPhone: true,
  // password: true,
  address: true,
  createdAt: true,
  updatedAt: true,
}

export const data = async (input: IUser) => ({
  name: formatName(input.name),
  username: formatName(input.username),
  email: formatName(input.email),
  password: await bcrypt.hash(input.password, 10),
  ...(input.numberPhone && { numberPhone: input.numberPhone }),
  ...(input.address && { address: input.address }),
});

export const updateData = async (data: Pick<IUser, 'id'> & Partial<IUser>) => {
  const updateData: any = {};

  if (data.name) updateData.name = formatName(data.name);
  if (data.username) updateData.username = data.username
  if (data.email) updateData.email = data.email;
  if (data.numberPhone) updateData.numberPhone = data.numberPhone;
  if (data.address) updateData.address = data.address;

  return updateData;
};

export const filterData = (filter: Partial<IUser>) => {
  const filters: any[] = [];

  for (const key in select) {
    const value = filter[key as keyof typeof filter];

    if (value !== undefined) {
      if (key === "name") {
        filters.push({ name: formatName(value as string) });
      } else {
        filters.push({ [key]: value });
      }
    }
  }

  return filters;
};