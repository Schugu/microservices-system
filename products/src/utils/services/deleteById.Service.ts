import { ServiceError } from "../logs/serviceError";

type deleteByIdOptions<T, U = undefined> = {
  modelName: string;
  prismaModel: any;
  select: T;
  include?: U;
};

export function deleteById<T, U = undefined>({
  modelName,
  prismaModel,
  select,
  include,
}: deleteByIdOptions<T, U>) {
  return async ({ id }: { id: string }) => {
    try {
      const result = await prismaModel.delete({
        where: { id },
        select,
        ...(include && { include }),
      });

      return result || null;
    } catch (error) {
      const serviceName = `DELETE_BY_ID_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "eliminar el registro por id", error);
    }
  };
}
