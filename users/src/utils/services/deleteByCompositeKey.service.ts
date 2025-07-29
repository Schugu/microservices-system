import { ServiceError } from "../logs/serviceError";

type PrimaryKeyConfig = {
  primaryKeyFields: readonly string[];
  compositeKeyName: string;
};

type DeleteByCompositeKeyOptions<T, U = undefined> = {
  modelName: string;
  prismaModel: any;
  select: T;
  include?: U;
  primaryKeyConfig: PrimaryKeyConfig;
};

export function deleteByCompositeKey<T, U = undefined>({
  modelName,
  prismaModel,
  select,
  include,
  primaryKeyConfig,
}: DeleteByCompositeKeyOptions<T, U>) {
  const { primaryKeyFields, compositeKeyName } = primaryKeyConfig;

  return async (whereClause: Record<string, any>) => {
    try {
      // Validación
      for (const key of primaryKeyFields) {
        if (!(key in whereClause)) {
          throw new Error(`Falta el campo de clave compuesta "${key}" en whereClause`);
        }
      }

      const result = await prismaModel.delete({
        where: {
          [compositeKeyName]: whereClause,
        },
        select,
        ...(include && { include }),
      });

      return result;
    } catch (error) {
      const serviceName = `DELETE_BY_COMPOSITE_KEY_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "eliminar el registro por clave compuesta", error);
    }
  };
}
