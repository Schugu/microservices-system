export interface IUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  numberPhone?: string;
  password: string;
  address?: string;
  createdAt?: Date,
  updatedAt?: Date
}