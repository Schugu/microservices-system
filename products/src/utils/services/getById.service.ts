import { ServiceError } from "../logs/serviceError";

type getByIdOptions<T, U = undefined> = {
  modelName: string;
  prismaModel: any;
  select: T;
  include?: U;
};

export function getById<T, U = undefined>({
  modelName,
  prismaModel,
  select,
  include,
}: getByIdOptions<T, U>) {
  return async ({ id }: { id: string }) => {
    try {
      const result = await prismaModel.findUnique({
        where: { id },
        select,
        ...(include && { include }),
      });

      return result || null;
    } catch (error) {
      const serviceName = `GET_BY_ID_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "obtener el registro por id", error);
    }
  };
}
